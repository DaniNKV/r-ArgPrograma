//TAREA: En otro archivo distinto,
// Por cada clase de r/argentina programa existente, vamos a pedir:
// horas, minutos y segundos de cada video. Ej. Si un video dura
// 2 horas, 38 minutos y 20 segundos, vamos a rellenar 3 campos de texto con
// cada dato.
// al apretar el botón "Calcular tiempo total", debe mostrar en un
// <strong> pre-creado el tiempo total de los videos.

let horasParciales = 0;
let minutosParciales = 0;
let segundosParciales = 0;

let horasResultado = 0;
let minutosResultado = 0;
let segundosResultado = 0;

function calcularTiempoTotal (horas,minutos,segundos) {

    horasParciales += horas;
    minutosParciales += minutos;
    segundosParciales += segundos;
}

function calcularResultado (horasParciales,minutosParciales,segundosParciales) {
    
    horasResultado = Math.floor(horasParciales + (minutosParciales / 60));
    minutosResultado = Math.floor(minutosParciales % 60 + segundosParciales / 60);
    segundosResultado = Math.floor(segundosParciales % 60 )
}

const $botonCalcular = document.querySelector('#calcular');

$botonCalcular.onclick = function(e) {
    const horas = parseInt(document.querySelector('#horas').value);
    const minutos = parseInt(document.querySelector('#minutos').value);
    const segundos = parseInt(document.querySelector('#segundos').value);
    const elementoResultado = document.querySelector('#duracion-total')
    const resultado = document.querySelector('#resultado')

    calcularTiempoTotal(horas,minutos,segundos);
    calcularResultado(horasParciales,minutosParciales,segundosParciales);

    resultado.innerText = `${horasResultado} horas, ${minutosResultado} minutos y ${segundosResultado} segundos`;
    elementoResultado.classList.remove('invisible')


    return false;

}
    

