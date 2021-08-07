
// #########    Elementos del DOM    ######### //
let DOM = {
    container: document.querySelector('.container'),
    
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
    erroresPop : document.getElementById('erroresPop'),
    erroresDiv : document.querySelector('.errores')
}



// #########    INTERACCIÓN PRINCIPAL  ######### //

function segundoPaso (event) {
    const cantidadIntegrantes = Number(DOM.cantidadFamiliares.value.trim());
    const validacionCantidad = validarCantidadFamiliares(cantidadIntegrantes)

    if (validacionCantidad == '') {
        crearIntegrantes(cantidadIntegrantes);
        ocultarBotonSiguientePaso();
        DOM.calcularBtn.focus();
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
    }
    
}



// Calcular con las edades y salarios ingresados
function manejarErrores (event) {
    limpiarErrores();

    const edades = obtenerEdadesIntegrantes(),
          salarios = obtenerSalariosIntegrantes();

    const erroresEdad = agruparErrores(edades, 'edad');
    const hayErroresEdad = erroresEdad.length > 0;
    const erroresSalario = agruparErrores(salarios, 'salario');
    const hayErroresSalario = erroresSalario.length > 0;
    
    if(hayErroresEdad || hayErroresSalario) {
        ocultarResultados()
        erroresEdad.forEach(error => imprimirErrorDOM(error.mensaje, error.index))
        erroresSalario.forEach(error => imprimirErrorDOM(error.mensaje, error.index)) ? salarios.length > 0 : ''
    } else {
        calcularTodo(edades, salarios)
    }
    console.log(erroresEdad, erroresSalario)
    

    

    event.preventDefault();
}

function calcularTodo(edades, salarios) {;
    calcularEdades(edades);
    if(salarios.length > 0) {
        calcularSalarios(salarios);
    }
    
    mostrarResultados();
}
function agruparErrores(array, campoParaValidar) {
    let errores = [];

    array.forEach((item, idx) => {
        // Elegir qué campo se analiza
        if(campoParaValidar === 'edad') {
            error = validarEdad(item);
        }else if (campoParaValidar === 'salario') {
            error = validarSalario(item);
        }
        
        if (error !== '') {
            const // Formato del error
                mensaje = error.msj,
                tipo = error.tipo,
                index = `${idx + 1}`;

            if (errores.length === 0) {
                errores.push({ tipo, index, mensaje });
            } 
            else {
                errores.forEach(errorActual => {
                   // Si existe un error del mismo tipo, solo agrega el index
                    if(errorActual.tipo === tipo) {
                        errorActual.index += `, ${index}`;
                    // Si no existe, lo crea
                    }else {
                        errores.push({ tipo, index, mensaje });
                    }
                })
            }
        }
    });
    return errores;
}



function calcularEdades (edades) {
    mostrarEdad('promedio', calcularPromedio(edades));
    mostrarEdad('menor', calcularMenor(edades));
    mostrarEdad('mayor', calcularMayor(edades));
}

function calcularSalarios (salarios) { 
    mostrarSalario('promedio', calcularPromedio(salarios));
    mostrarSalario('menor', calcularMenor(salarios));
    mostrarSalario('mayor', calcularMayor(salarios));
}


function imprimirErrorDOM(errorMsj, errorIdx) {
    const 
        $div = document.createElement('DIV'),
        $p = document.createElement('P');

    $p.innerHTML = 
    `${errorMsj} en los siguientes integrantes: #  <span class="error-span">${errorIdx}</span>`

    DOM.erroresDiv.appendChild($div);
    $div.appendChild($p);    
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

    $salarios.forEach( (salario, idx) => {
        const integranteTrabaja = DOM.preguntaTrabajo[idx].checked;
        if(integranteTrabaja){
            salarios.push(Number(salario.value))
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
    

// #########    Funciones de Reseteo    ######### //

function resetear() {
    limpiarErrores();
    borrarInputsAnteriores();
    borrarIntegrantesAnteriores();
    ocultarBotonCalculo();
    ocultarResultados();
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

function limpiarErrores() {
    erroresEdad = [];
    erroresSalario = [];
    DOM.erroresDiv.innerHTML = '';
}


function borrarInputsAnteriores() {
    document.querySelectorAll('.strong').forEach(element => element.innerHTML = '')
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

function ocultarResultados() {
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
    }else if (cantidadFamiliares >= 20) {
        return 'La cantidad de familiares debe ser menor a 20 miembros'
    }else {
        return ''
    }
}

function validarEdad (numero) {
    const edadIntegrante = Number(numero)
    const esEntero = Number.isInteger(edadIntegrante)
   
    if(edadIntegrante < 0 || edadIntegrante > 150) {
        return {
            msj: 'La edad no puede ser menor a 0 o mayor a 150',
            tipo: 1
        };
   
    }else if (!esEntero) {
        return {
            msj: 'La edad no puede ser fraccionaria',
            tipo: 2
        };
    
    }else if (edadIntegrante == ''){
        return {
            msj: 'Debe ingresar la edad numérica',
            tipo: 3 
        };
   
    }else {
        return ''
    }

}

function validarSalario (numero) {
    const salario = Number(numero);
   
    if (salario < 0) {
        return {
            msj: 'El salario no puede ser negativo',
            tipo: 1
        }; 
    
    }else if (salario == '' || salario == NaN) {
        return {
            msj: 'El salario debe ser un número',
            tipo: 2
        };
    
    }else if (salario <= 1000) {
        return {
            msj: 'El salario debe ser mayor que 1.000',
            tipo: 3
        };
    
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

function crearNotificacionError(errorMsj) {
    const existeErrorEl = document.querySelector('#erroresPop .notificacion-error')
    if(!existeErrorEl) {
        const notif = document.createElement('DIV');
        notif.classList.add('notificacion-error');    
        notif.innerText = errorMsj;
    
        DOM.erroresPop.appendChild(notif);
    
        setTimeout(() => {
            notif.remove()
        }, 4000)
    }
}


// #########    Event Listeners  ######### //
DOM.siguientePasoBtn.onclick = segundoPaso;

DOM.calcularBtn.onclick = manejarErrores;

DOM.resetearBtn.onclick = resetear;



