// Tarea 1:
// Preguntarle al usuario su nombre.
// Si el nombre del usuario es el mismo que  el  de ustedes
// Imprimir "Hola, Tocayo! Yo también me llamo " y su nombre.
// Elijan otro nombre, puede ser de un pariente, amigo, conocido.
// Si el nombe del usuario es el mismo que el que nombre que eligieron
// Imprimir "Hola " y el nombre, " te llamás igual que mi ..."
// Si no, simplemente imprimir "Hola " + nombre!

//Resolucion 1:
/*
const = MI_NOMBRE = ""
const = NOMBRE_USUARIO = prompt ("Escriba su nombre" || "" ).toLowerCase() ;


if (MI_NOMBRE == NOMBRE_USUARIO) {
    alert(`Hola, Tocayo! Yo también me llamo ${nombre_Usuario}`);
}  else if (nombre_Usuario == "Jorge") {
    alert(`Hey! Mi tío se llama ${nombre_Usuario}`);
}  else (nombre_Usuario.trim().length === 0) {
    alert(`Hola ${nombre_Usuario}`);
}
*/


//Tarea 2:
// Preguntar la edad del usuario
// Hacerle saber si tiene más, menos ó la misma edad que nosotros.
/*
let edad_Usuario = prompt(Number("Ingrese su edad: "))

function comparacion_Edad (edad_Usuario) {
    if (edad_Usuario = 23) {
        alert("Tienes mi edad!");
    }
    else if (edad_Usuario < 23){
        alert("Eres mas peke que yo");
    }
    else if (edad_Usuario > 23){
        alert("Eres grande, muy grande")
    }
    else
        alert("numeros papi, numeros, es tu edad gordi")
    };
    
alert(comparacion_Edad(edad_Usuario)) 
*/
// peeeeero la mejor forma es usar las const 



//Tarea 3:
// Preguntarle al usuario si tiene documento, y que conteste con "si" o "no".
// Si dice si, preguntarle la edad.
// Si la edad es mayor a 18, dejarlo entrar al bar.
// Si la edad es menor a 18, no dejarlo entrar al bar.
// Si no tiene documento, no dejarlo entrar al bar.
// Si no entendemos la respuesta, le decimos que no entendimos la respuesta.
// Punto bonus: SI, NO, Si, No, si, no.
/*
function patovica (documento, edad) {
   
    documento = prompt("Tiene documento? Si / No : ")
    edad = prompt("Que edad tenes?")
  
   if (documento == "Si") and (edad >= 18) {
        alert("Adelante, caballero");
    }
    else 
        alert("No puedes pasar")
}

console.log(patovica(documento,edad))
/*
const EDAD_MINIMA_PARA_ENTRAR= 18

const usuarioTieneDocumento = (prompt("Tiene documento? Si/No : ") || '' ).toLowerCase();
if (documento = "Si") {
    edad = Number(prompt("Que edad tiene?").trim())
    if (edad >= EDAD_MINIMA_PARA_ENTRAR ) {
        alert ("Bienvenido al Bar")
    }
    else if (edad < EDAD_MINIMA_PARA_ENTRAR ) {
        alert ("No puedes pasar, a tu casa, novato")
    }
    else 
        alert ("No te entiendo")
    }
else
    alert ("Sin documento no pasas") */
