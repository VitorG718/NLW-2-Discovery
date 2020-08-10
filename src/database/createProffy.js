module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) {
    /**
     * inserir dados na table de teachers
     * 
     * await -> espera até que a execução da linha termine,
     * porém só funciona se a função conter a keyword 'async'
     * 
     * ${} -> para adicionar variáveis no texto com crases
     */
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `);

    const proffy_id = insertedProffy.lastID;

    /**
     * inserir dados na tabela classes
     */
    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `);
    
    const class_id = insertedClass.lastID;

    /**
     * inserir dados na tabela class schedule
     */
    const insertdAllClassScheduleValues = classScheduleValues.map((values) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${values.weekday}",
                "${values.time_from}",
                "${values.time_to}"
            );
        `);
    });

    /**
     * Execução de todos os db.run() das class_schedules
     * 
     * Promise -> um obejeto sobre as promessas
     * .all() -> executa um array de promessas
     * 
     * vai esperar a resposta de cada promessa
     */
    await Promise.all(insertdAllClassScheduleValues);
}

/**
 * No projeto que importa essa função os nomes dos componentes do objeto passados devem 
 * ser iguais a esses (proffyValue, classValue, classScheduleValue)
 */