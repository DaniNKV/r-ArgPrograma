//TAREA: En otro archivo distinto,
// Crear una lista de <ol> y <li> que contengan sólo números.
// Convertir esos números a un array y:
// 1. calcular el promedio y mostrarlo en un <em> pre-creado con el texto "El promedio es..."
// 2. obtener el número más pequeño y mostrarlo en un <em> pre-creado con el texto "El número más pequeño es..."
// 3. obtener el número más grande y mostrarlo en un <em> pre-creado con el texto "El número más grande es..."
// 4. obtener el número que más se repite y mostrarlo en un <em> pre-creado con el texto "El número más frecuente es..."

//Agregar nuevos numeros

const $botonAgregar = document.querySelector('#botonAgregar')

$botonAgregar.onclick = function(e) {
    const $numero = document.querySelector('#numero');
    const ul = document.querySelector('#lista');
    const li = document.createElement('li')
    if ($numero.value.trim() === '') {
        e.preventDefault();
        return
    }
    ul.appendChild(li);
    li.classList.add('list-group-item')
    li.textContent = $numero.value;

    document.getElementById("agregarNumeros").reset();
    return false;
    
}

//Funciones de calculo

function calcularPromedio (array) {
    let suma = 0;
    let promedio = 0;
    for(i=0 ; i < array.length ; i++) {
        suma += array[i]; 
    }
    promedio = suma / array.length ;
    return promedio;
}
function calcularPequeño (array) {
    let menor = array[0];
    for(i=0 ; i < array.length ; i++) {
        if (array[i] < menor) {
            menor = array[i]
        }
    }
    return menor;
}
function calcularGrande (array) {
    let mayor = array[0];
    for(i=0 ; i <array.length ; i++) {
        if (array[i] > mayor) {
            mayor = array[i]
        }
    }
    return mayor;
}
function calcularFrecuente (array) {
    let frecuente = 0;
    for (i=0 ; i < array.length ; i++){
        for (j=0 ; j < array.length ; j++){
            if (array[i] === array[j]){
                frecuente = array[i]
            }
        }
    return frecuente;
    }
   
}

// Calcular procedimiento

const $botonCalcular = document.querySelector('#botonCalcular');


$botonCalcular.onclick = function(e){
    const listaNode = document.querySelectorAll('li');
    const listaArray = [];

    for(i=0 ; i < listaNode.length ; i++) {
        listaArray.push(Number(listaNode[i].innerText));
    }

    const $promedio = calcularPromedio(listaArray);
    const $pequeño = calcularPequeño(listaArray);
    const $grande = calcularGrande(listaArray);
    const $frecuente = calcularFrecuente(listaArray);

    document.querySelector('#promedio').textContent = $promedio;
    document.querySelector('#masPequeño').textContent = $pequeño;
    document.querySelector('#masGrande').textContent = $grande;
    document.querySelector('#masFrecuente').textContent = $frecuente;

    return false;
}



 

