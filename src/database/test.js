const Database = require("./db"); // não é necessária a extensão .js por ser um arquivo js
const createProffy = require("./createProffy");

Database.then(async (db) => {
    // Inserir os dados 
    proffyValue = {
        name: "Vitor Oliveira",
        avatar: "https://avatars0.githubusercontent.com/u/52329675?s=460&u=f318c55affcc3d70e4daa359515cbbc43daa64e2&v=4", 
        whatsapp: "61999994355",
        bio: "Iniciando agora como instrutor de geografia, mas com um hype a mil!"
    }   

    classValue = {
        subject: 1,
        cost: "30,00"
    }

    classScheduleValues = [
        {
            weekday: 2,
            time_from: 1500,
            time_to: 2020
        }, 
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    // await createProffy(db, {proffyValue, classValue, classScheduleValues});
    // Consultar os dados
    const selectedAllProffys = await db.all("SELECT * FROM proffys");
    // console.log(selectedAllProffys);

    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1
    `)
    console.log(selectClassesAndProffys);

});