// Simulando a base de dados
const proffys = [
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: "61995953315",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20,00",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },
    {
        name: "Mayk Brito",
        avatar: "https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4", 
        whatsapp: "11993174695",
        bio: "Instrutor de Educação Física para iniciantes, minha missão de vida é levar saúde e contribuir para o crescimento de quem se interessar.<br><br>Comecei a minha jornada profissional em 2001, quando meu pai me deu dois alteres de 32kg com a seguinte condição: \"Aprenda a fazer dinheiro com isso!\"",
        subject: "Educação Física",
        cost: "40,00",
        weekday: [5],
        time_from: [1500],
        time_to: [2020]
    },
    {
        name: "Vitor Oliveira",
        avatar: "https://avatars0.githubusercontent.com/u/52329675?s=460&u=f318c55affcc3d70e4daa359515cbbc43daa64e2&v=4", 
        whatsapp: "61999994355",
        bio: "Iniciando agora como instrutor de geografia, mas com um hype a mil!",
        subject: "Geografia",
        cost: "30,00",
        weekday: [2],
        time_from: [1500],
        time_to: [2020]
    }
];

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
];

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
];

const express = require("express"); // objeto do express
const server = express(); // funcionalidades do express
const nunjucks = require("nunjucks"); // importando o nunjuncks

// configurando o nunjucks (tempalte engine)
nunjucks.configure("src/views", { /* informa onde os arquivos html estão */
    express: server, /* informa o objeto com as funcionalidades do express */
    noCache: true /* informa que não será usado a cache na aplicação */
});

server.use(express.static("public")); // mostra para o servidor onde estão os arquivos necessários para o funcionamento da página (.css. .js, imagens ...)

server.get("/", (req, res) => {
    //return res.send("Hello World!"); // retorna a resposta da requisição
    //return res.sendFile(__dirname + "/views/index.html"); // __dirname mostra o diretório em que o arquivo atual está
    return res.render("index.html"); // nesse momento está sendo usada a renderização do nunjucks, assim como já foi definida o caminho para os arquivos html, basta agora informar o nome do arquivo
    // esse return retorna o arquivo local concatenado com o diretório local do servidor
});

server.get("/study", (req, res) => {
    const filters = req.query; // pega todos os elementos enviados para a url da página (após o ?)
    return res.render("study.html", {proffys, filters, subjects, weekdays}); // está sendo enviado o objeto proffys para ser trabalhado no front-end da página
    // Agora os filters enviados do front-end e os objetos do back estão sendo enviados também
});

server.get("/give-classes", (req, res) => {
    return res.render("give-classes.html");
});

server.listen(5500); // indica qual porta será usada ouvir a aplicação