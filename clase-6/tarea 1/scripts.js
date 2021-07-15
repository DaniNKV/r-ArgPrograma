/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/
let DOM = {
    siguientePasoBtn: document.querySelector('#siguiente-paso'),
    cantidadFamiliares: document.querySelector('#cantidadFamiliares'),
    integrantesDiv: document.querySelector('#integrantes'),
    integrante: [], //Todos los integrantes se pushean aca//
    preguntaTrabajo: [], //Los switches de trabajo se pushean aca//
    calcularBtn: document.querySelector('#boton-calcular'),
    analisisEdad: document.querySelector('#analisis-edad'),
    analisisSalario: document.querySelector('#analisis-salario')
}


DOM.siguientePasoBtn.onclick = function (event) {
    const cantidadIntegrantes = Number(DOM.cantidadFamiliares.value);
    
    crearIntegrantes(cantidadIntegrantes);
    ocultarBotonSiguientePaso();
    event.preventDefault();
};


function crearIntegrantes (cantidadIntegrantes) {
    if (cantidadIntegrantes > 0) {
        mostrarBotonCalculo();
    }
    else {
        resetear();
    }

    for(let i=0 ; i<cantidadIntegrantes; i++) {
        crearIntegrante(i);
    }
}


function borrarIntegrantesAnteriores() {
    const $integrantes = document.querySelectorAll('#integrantes .integrante')
    for (i=0 ; i<$integrantes.length ; i++) {
        $integrantes[i].remove();
  
    };
    DOM.integrante = [];
    DOM.preguntaTrabajo = [];

}

document.querySelector('#resetear').onclick = function(){
    resetear()
}

function resetear() {
    borrarIntegrantesAnteriores();
    ocultarBotonCalculo();
    ocultarResultado();
    mostrarBotonSiguientePaso();
}

function crearIntegrante (indice) {
    // Crea elemento por cada integrante ingresado
    creaInputEdad(indice);

    // Crea la pregunta del trabajo de cada integrante
    creaPreguntaTrabajo(indice);
    
    // Si el integrante trabaja, crea un Input para el Salario
    DOM.preguntaTrabajo.forEach((pregunta, indice) => {
        pregunta.onchange = crearSalario = (e) => {
            const integranteTrabaja = e.target.checked;
            if ( integranteTrabaja == true ) {
                creaInputSueldo(indice);
            }else {
                eliminaInputSueldo(indice);
            }
        }
    })
}

function creaInputEdad (indice) {
    const div = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');

    div.className = "integrante integrante" + (indice + 1);

    label.textContent = "Edad del integrante: #" + (indice + 1);

    input.type = "number";
    input.className = "input"
    
    DOM.integrantesDiv.appendChild(div)
    div.appendChild(label);
    div.appendChild(input);

    DOM.integrante.push(div)



}

function creaPreguntaTrabajo(indice) {
    const labelTrabajo = document.createElement('label');
    const preguntaTrabajo = document.createElement('input');
    const spanTrabajo = document.createElement('span');
    DOM.preguntaTrabajo.push(preguntaTrabajo);

    labelTrabajo.className = 'switch';
    labelTrabajo.innerHTML = "Trabaja?"

    preguntaTrabajo.type = 'checkbox';
    preguntaTrabajo.className = 'input-trabajo';

    spanTrabajo.className = 'slider-round';

    DOM.integrante[indice].appendChild(labelTrabajo);
    labelTrabajo.appendChild(preguntaTrabajo);
    preguntaTrabajo.appendChild(spanTrabajo);
}
function creaInputSueldo (indice) {
    const inputSueldo = document.createElement('input');
    
    inputSueldo.type = 'number';
    inputSueldo.placeholder = "Ingrese su sueldo anual"
    inputSueldo.className = "salario salario" + (indice + 1);
    
    DOM.integrante[indice].appendChild(inputSueldo);
}
function eliminaInputSueldo (indice) {
    document.querySelector('.salario.salario' + (indice + 1)).remove()
    
}

document.querySelector('#boton-calcular').onclick = function (event) {
    const numeros = obtenerEdadesIntegrantes();
    mostrarEdad('promedio', calcularPromedio(numeros));
    mostrarEdad('menor', calcularMenor(numeros));
    mostrarEdad('mayor', calcularMayor(numeros));
    mostrarResultados();
    
    event.preventDefault();
    

};

function obtenerEdadesIntegrantes() {
    const $integrantes = document.querySelectorAll('.integrante input.input');
    const edades = [] ;
    for(i=0 ; i < $integrantes.length ; i++) {
        edades.push(Number($integrantes[i].value));
    }
    return edades;
}

function mostrarEdad(tipo, valor) {
    //concateno # + el tipo + sufijo -edad / document.querySelector('#mayor-edad').textcontent
    document.querySelector(`#${tipo}-edad`).textContent = valor
}

function ocultarBotonSiguientePaso () {
    if (DOM.cantidadFamiliares.value > 0) {
        DOM.siguientePasoBtn.className = 'oculto';
    }else {
        mostrarBotonSiguientePaso();
    }
}

function mostrarBotonSiguientePaso () {
    DOM.siguientePasoBtn.className = '';
}

function mostrarBotonCalculo () {
    DOM.calcularBtn.className = ''; 
}

function ocultarBotonCalculo(){
    DOM.calcularBtn.className = 'oculto';
}

function mostrarResultados(){
    DOM.analisisEdad.className = '';
    DOM.analisisSalario.className = '';

}
function ocultarResultado() {
    DOM.analisisEdad.className = 'oculto';
    DOM.analisisSalario.className = 'oculto';
}
/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/
