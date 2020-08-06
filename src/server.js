const express = require('express'); // objeto do express
const server = express(); // funcionalidades do express

server.get('/', (req, res) => {
    return res.send("Hello World!"); // retorna a resposta da requisição
});

server.listen(5500); // indica qual porta será usada ouvir a aplicação