/**
 * Desestruturação dos dados com {subjects, weekdays, getSubject}
 */
const {subjects, weekdays, getSubject, convertHoursToMinutes} = require("./utils/format")

const Database = require("./database/db");
const createProffy = require("./database/createProffy");

function pageLanding (req, res) {
    //return res.send("Hello World!"); // retorna a resposta da requisição
    //return res.sendFile(__dirname + "/views/index.html"); // __dirname mostra o diretório em que o arquivo atual está
    return res.render("index.html"); // nesse momento está sendo usada a renderização do nunjucks, assim como já foi definida o caminho para os arquivos html, basta agora informar o nome do arquivo
    // esse return retorna o arquivo local concatenado com o diretório local do servidor
}

async function pageStudy (req, res) {
    const filters = req.query; // pega todos os elementos enviados para a url da página (após o ?)

    if(!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", {filters, subjects, weekdays});
    }

    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = ` 
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <=${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = "${filters.subject}"
    `

    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render("study.html", {proffys, filters, subjects, weekdays}); 
        /**
         * Está sendo enviado o objeto proffys para ser trabalhado no front-end da página
         * Agora os filters enviados do front-end e os objetos do back estão sendo enviados também
         */
    } catch (error) {
        console.log(error);
    }
}

function pageGiveClasses (req, res) {
    return res.render("give-classes.html", {subjects, weekdays});
}

async function saveClasses (req, res) {
    const data = req.body;

    /**
     * Object -> se refere ao tipo Objeto
     * keys -> tranforma o objeto em um array:
     * ['name','avatar','whatsapp','bio','subject','cost','weekday','time_from','time_to']
     */
    /**
        const isEmpty = Object.keys(data).length == 0;
        if(!isEmpty) {

            data.subject = getSubject(data.subject);
            
            proffys.push(data); // adiciona um novo elemento ao proffys
            return res.redirect("/study"); // redireciona a nossa aplicação para outra página
        }
    */

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio,
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await Database
        await createProffy(db, {proffyValue, classValue, classScheduleValues})

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}