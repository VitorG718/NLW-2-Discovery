const express = require("express"); // objeto do express
const server = express(); // funcionalidades do express

server.use(express.static("public")); // mostra para o servidor onde estão os arquivos necessários para o funcionamento da página (.css. .js, imagens ...)

server.get("/", (req, res) => {
    //return res.send("Hello World!"); // retorna a resposta da requisição
    return res.sendFile(__dirname + '/views/index.html'); // __dirname mostra o diretório em que o arquivo atual está
    // esse return retorna o arquivo local concatenado com o diretório local do servidor
});

server.get("/study", (req, res) => {
    return res.sendFile(__dirname + "/views/study.html");
});

server.get("/give-classes", (req, res) => {
    return res.sendFile(__dirname + "/views/give-classes.html");
});

server.listen(5500); // indica qual porta será usada ouvir a aplicação