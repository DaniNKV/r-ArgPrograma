
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
    analisisSalario: document.querySelector('#analisis-salario'),
    resultado : document.querySelector('.resultado'),

    //Errores
    errores : document.getElementById('errores')
}



// #########    INTERACCIÓN PRINCIPAL  ######### //

function segundoPaso (event) {
    const cantidadIntegrantes = Number(DOM.cantidadFamiliares.value.trim());
    const validacionCantidad = validarCantidadFamiliares(cantidadIntegrantes)

    if (validacionCantidad == '') {
        crearIntegrantes(cantidadIntegrantes);
        ocultarBotonSiguientePaso();
    }else {
        crearNotificacionError(validacionCantidad);
        DOM.cantidadFamiliares.value = ''

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

    DOM.integrantesDiv.appendChild(div)
    div.appendChild(label);
    div.appendChild(input);

    DOM.integrante.push(div)

    input.oninput = (e) => {
        validarEnVivo(validarEdad(e.target.value), e.target)
    }
}


// Sección SALARIO
function creaPreguntaTrabajo(indice) {
    const 
        labelTrabajo = document.createElement('label'),
        preguntaTrabajo = document.createElement('input'),
        spanTrabajo = document.createElement('span'),
        p = document.createElement('P');

    // Elementos del switch 
    labelTrabajo.className = 'switch';
    p.innerText = "Trabaja?"
    preguntaTrabajo.type = 'checkbox';
    preguntaTrabajo.className = 'input-trabajo';
    spanTrabajo.className = 'slider round';
   
    DOM.preguntaTrabajo.push(preguntaTrabajo);
    
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
    
    DOM.integrante[indice].appendChild(inputSueldo);

    inputSueldo.oninput = (e) => {
        validarEnVivo(validarSalario(e.target.value), e.target)
        console.log((validarSalario(e.target.value)))
    }
    
}



// Calcular con las edades y salarios ingresados
function calcularEdadesYSalarios (event) {
    const edades = obtenerEdadesIntegrantes();
    const salarios = obtenerSalariosIntegrantes();

    mostrarEdad('promedio', calcularPromedio(edades));
    mostrarEdad('menor', calcularMenor(edades));
    mostrarEdad('mayor', calcularMayor(edades));
    
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
        edades.push(Number($integrantes[i].value.trim()));
    }
    return edades;
}

function obtenerSalariosIntegrantes() {
    const $salarios = document.querySelectorAll('.integrante .salario');
    const salarios = [] ;

    $salarios.forEach(salario => {
        const sueldo = Number(salario.value);
        const salarioValidado = validarSalario(sueldo);
        if (salarioValidado == '') {
            salarios.push(sueldo)
        }
    });
    return salarios;

}



// #########    Inyectar valores en el Análisis   ######### //

function mostrarEdad(tipo, valor) {
    //concateno # + el tipo + sufijo -edad / document.querySelector('#mayor-edad').textcontent
    document.querySelector(`#${tipo}-edad`).textContent = valor
}
function mostrarSalario(tipo, valor) {
    //concateno # + el tipo + sufijo -edad / document.querySelector('#mayor-edad').textcontent
    document.querySelector(`#${tipo}-salario`).textContent = formatoDinero(valor)
}

function formatoDinero (numero) {
    return numero.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
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
    DOM.resultado.classList.remove('oculto');
    DOM.analisisEdad.className = '';
    DOM.analisisSalario.className = '';

}

function ocultarResultado() {
    DOM.resultado.classList.add('oculto');
    DOM.analisisEdad.className = 'oculto';
    DOM.analisisSalario.className = 'oculto';
}


// #########    Validaciones  ######### //

//Validaciones individuales
function validarCantidadFamiliares (cantidadFamiliares) {
    const esEntero = Number.isInteger(cantidadFamiliares)
    if (cantidadFamiliares == '') {
        return 'Debe ingresar la cantidad de familiares';
    }else if (!esEntero) {
        return 'No podés tener fracciones de familiar';
    }else if (cantidadFamiliares <= 0) {
        return 'Cantidad de familiares no válida'
    }else {
        return ''
    }
}

function validarEdad (numero) {
    const edadIntegrante = Number(numero)
    const esEntero = Number.isInteger(edadIntegrante)
    if(edadIntegrante < 0 || edadIntegrante > 150) {
      return 'La edad no puede ser menor a 0 o mayor a 150'
    }else if (!esEntero) {
        return 'La edad no puede ser fraccionaria'
    }else if (edadIntegrante == ''){
        return 'Debe ingresar la edad'
    }else {
        return ''
    }
}

function validarSalario (numero) {
    const salario = Number(numero);
    if (salario < 0) {
        return 'El salario no puede ser negativo' 
    }else if (salario == '' || NaN) {
        return 'El salario debe ser un número'
    }else if (salario <= 1000) {
        return 'El salario anual debe ser mayor que 1.000'
    }else {
        return ''
    }
}

// Funciones generales de validación
function validarEnVivo (campoValidado, elemento) {
    if (campoValidado == '') {
        elemento.style.borderColor = 'var(--clr-verde)';
    }else {
        elemento.style.borderColor = 'var(--clr-rojo)';
    }
}

function crearNotificacionError(error) {
    const existeErrorEl = document.querySelector('#errores .notificacion-error')
    if(!existeErrorEl) {
        const notif = document.createElement('DIV');
        notif.classList.add('notificacion-error');    
        notif.innerText = error;
    
        DOM.errores.appendChild(notif);
    
        setTimeout(() => {
            notif.remove()
        }, 4000)

    }
}

function resaltarError () {

}

// #########    Event Listeners  ######### //
DOM.siguientePasoBtn.onclick = segundoPaso;

DOM.calcularBtn.onclick = calcularEdadesYSalarios;

DOM.resetearBtn.onclick = resetear;



