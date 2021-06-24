function calcularPromedio (array) {
    let suma = 0;
    let promedio = 0;
    for(i=0 ; i < array.length ; i++) {
        suma += array[i]; 
    }
    promedio = suma / array.length ;
    return promedio;
}
function calcularMenor (array) {
    let menor = array[0];
    for(i=0 ; i < array.length ; i++) {
        if (array[i] < menor) {
            menor = array[i]
        }
    }
    return menor;
}
function calcularMayor (array) {
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