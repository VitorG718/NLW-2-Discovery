const Database = require("sqlite-async"); // importa o banco de dados

function execute(db) {
    /**
     * db -> objeto do banco de dados
     * exec() -> executa os comandos SQL dentro das crases
     */
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER,
            class_id INTEGER
        );
    `);
}

/**
 * module -> objeto
 * exports -> atributo que indica o que será adquirido quando for feito o require() desse arquivo
 */
module.exports = Database.open(__dirname + "/database.sqlite").then(execute); // abre o banco de dados e quando feito executa a função execute