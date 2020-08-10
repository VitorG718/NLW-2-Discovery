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

function getSubject(subjectNumber) {
    /**
     * + -> para garantir que esse valor seja um número
     * -1 -> pois no select começa com 1
     */
    const position = +subjectNumber - 1;
    
    return subjects[position];
}

function convertHoursToMinutes(time) {
    const [hour, minutes] = time.split(":")
    return Number((Number(hour) * 60) + Number(minutes))
}

module.exports = {
    subjects,
    weekdays,
    getSubject, 
    convertHoursToMinutes
}