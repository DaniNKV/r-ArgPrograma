
// #########    Elementos del DOM    ######### //
let DOM = {
    //Botones
    siguientePasoBtn: document.querySelector('#siguiente-paso'),
    calcularBtn: document.querySelector('#boton-calcular'),
    resetearBtn: document.querySelector('#resetear'),
    
    //Datos app
    cantidadFamiliares: document.querySelector('#cantidad-familiares'),
    integrantesDiv: document.querySelector('#integrantes'),
    integrante: [], //Todos los integrantes se pushean aca//
    preguntaTrabajo: [], //Los switches de trabajo se pushean aca//
    
    //Analisis de los datos
    analisisEdad: document.querySelector('#analisis-edad'),
    analisisSalario: document.querySelector('#analisis-salario')
}



// #########    INTERACCIÓN PRINCIPAL  ######### //

function segundoPaso (event) {
    const cantidadIntegrantes = Number(DOM.cantidadFamiliares.value.trim());
    const validacionCantidad = validarCantidadFamiliares(cantidadIntegrantes)

    if (validacionCantidad == '') {
        crearIntegrantes(cantidadIntegrantes);
        ocultarBotonSiguientePaso();
    }else {
        mostrarError(validacionCantidad);

    }

    event.preventDefault();

};


// Sección EDAD
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
    const 
        div = document.createElement('div'),
        label = document.createElement('label'),
        input = document.createElement('input');

    div.className = "integrante integrante" + (indice + 1);

    label.textContent = "Edad del integrante:"

    input.type = "number";
    input.className = "input"
    input.placeholder = "#"+(indice + 1)

    input.addEventListener('change', e => validarEdad)

    DOM.integrantesDiv.appendChild(div)
    div.appendChild(label);
    div.appendChild(input);

    DOM.integrante.push(div)
}



// Sección SALARIO
function creaPreguntaTrabajo(indice) {
    const labelTrabajo = document.createElement('label');
    const preguntaTrabajo = document.createElement('input');
    const spanTrabajo = document.createElement('span');
    DOM.preguntaTrabajo.push(preguntaTrabajo);
    const p = document.createElement('P')


    labelTrabajo.className = 'switch';
    p.innerText = "Trabaja?"

    preguntaTrabajo.type = 'checkbox';
    preguntaTrabajo.className = 'input-trabajo';

    spanTrabajo.className = 'slider round';

    DOM.integrante[indice].appendChild(labelTrabajo);
    labelTrabajo.appendChild(p);
    labelTrabajo.appendChild(preguntaTrabajo);

    labelTrabajo.appendChild(spanTrabajo);
}

function creaInputSueldo (indice) {
    const inputSueldo = document.createElement('input');
    
    inputSueldo.type = 'number';
    inputSueldo.placeholder = "Ingrese su sueldo anual"
    inputSueldo.className = "salario salario" + (indice + 1);

    inputSueldo.addEventListener('change', e => validarSueldo)

    
    DOM.integrante[indice].appendChild(inputSueldo);
}


// Calcular con las edades y salarios ingresados
function calcularEdadesYSalarios (event) {
    const numeros = obtenerEdadesIntegrantes();
    const salarios = obtenerSalariosIntegrantes();

    mostrarEdad('promedio', calcularPromedio(numeros));
    mostrarEdad('menor', calcularMenor(numeros));
    mostrarEdad('mayor', calcularMayor(numeros));
    
    mostrarSalario('promedio', calcularPromedio(salarios));
    mostrarSalario('menor', calcularMenor(salarios));
    mostrarSalario('mayor', calcularMayor(salarios));
    
    mostrarResultados();
    
    event.preventDefault();
    
};




// #########    Funciones de Reseteo    ######### //

function resetear() {
    borrarIntegrantesAnteriores();
    ocultarBotonCalculo();
    ocultarResultado();
    mostrarBotonSiguientePaso();
}

function borrarIntegrantesAnteriores() {
    const $integrantes = document.querySelectorAll('#integrantes .integrante')
    for (i=0 ; i<$integrantes.length ; i++) {
        $integrantes[i].remove();
  
    };
    DOM.integrante = [];
    DOM.preguntaTrabajo = [];

}

function eliminaInputSueldo (indice) {
    document.querySelector('.salario.salario' + (indice + 1)).remove()
    
}


// #########    Obtener datos ingresados por el usuario    ######### //

function obtenerEdadesIntegrantes() {
    const $integrantes = document.querySelectorAll('.integrante input.input');
    const edades = [] ;
    for(i=0 ; i < $integrantes.length ; i++) {
        edades.push(Number($integrantes[i].value));
    }
    return edades;
}

function obtenerSalariosIntegrantes() {
    const $salarios = document.querySelectorAll('.integrante .salario');
    const salarios = [] ;
    for(i=0 ; i < $salarios.length ; i++) {
        salario = formatoDinero(Number($salarios[i].value))
        salarios.push(salario);
    }
    return salarios;

}

function formatoDinero (numero) {
    return numero.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
    



// #########    Inyectar valores en el Análisis   ######### //

function mostrarEdad(tipo, valor) {
    //concateno # + el tipo + sufijo -edad / document.querySelector('#mayor-edad').textcontent
    document.querySelector(`#${tipo}-edad`).textContent = valor
}
function mostrarSalario(tipo, valor) {
    //concateno # + el tipo + sufijo -edad / document.querySelector('#mayor-edad').textcontent
    document.querySelector(`#${tipo}-salario`).textContent = valor
}



// #########    Mostrar / Ocultar elementos del DOM    ######### //

function ocultarBotonSiguientePaso () {
    if (DOM.cantidadFamiliares.value >= 1) {
        DOM.siguientePasoBtn.className = 'oculto';
        DOM.cantidadFamiliares.disabled = 'disabled';

    }else {
        mostrarBotonSiguientePaso();
    }
}

function mostrarBotonSiguientePaso () {
    DOM.siguientePasoBtn.className = '';
    DOM.cantidadFamiliares.disabled = "";

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


// #########    Validaciones  ######### //
function validarCantidadFamiliares (cantidadFamiliares) {
    if (cantidadFamiliares == '') {
        return 'Debe ingresar la cantidad de familiares';
    }else if (!(Number.isInteger(cantidadFamiliares))) {
        return 'No podés tener fracciones de familiar';
    }else if (cantidadFamiliares <= 0) {
        return 'Cantidad de familiares no válida'
    }else {
        return ''
    }
}

function validarEdad () {

}

function validarSalario () {

}

function mostrarError (err) {
    console.log(err)
}
 

// #########    Event Listeners  ######### //
DOM.siguientePasoBtn.onclick = segundoPaso;

DOM.calcularBtn.onclick = calcularEdadesYSalarios;

DOM.resetearBtn.onclick = resetear;



