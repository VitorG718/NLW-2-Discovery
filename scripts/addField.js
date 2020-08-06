/* Seleciona o botão e executa a função cloneField quando houver um click */
document.querySelector('#add-time').addEventListener('click', cloneField);

function cloneField() {
    const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true);

    /* Seleciona todos os elementos com a especificação dada */
    const fields = newFieldContainer.querySelectorAll('input');

    /* Para cada elemento do node é executada a função especificada */
    fields.forEach(function(field) {
        field.value = ""; /* Limpando o valor dos inputs */
    }); 
    
    document.querySelector("#schedule-items").appendChild(newFieldContainer);
}