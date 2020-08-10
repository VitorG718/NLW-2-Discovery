const express = require("express"); // objeto do express
const server = express(); // funcionalidades do express
const nunjucks = require("nunjucks"); // importando o nunjuncks

const {pageLanding, pageStudy, pageGiveClasses, saveClasses} = require("./pages")

// configurando o nunjucks (tempalte engine)
nunjucks.configure("src/views", { /* informa onde os arquivos html estão */
    express: server, /* informa o objeto com as funcionalidades do express */
    noCache: true /* informa que não será usado a cache na aplicação */
});

server.use(express.static("public")); // mostra para o servidor onde estão os arquivos necessários para o funcionamento da página (.css. .js, imagens ...)

server
// recebe os dados do req.body
.use(express.urlencoded({extended: true}))
.get("/",pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
.listen(5500); // indica qual porta será usada ouvir a aplicação