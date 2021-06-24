//TAREA: En otro archivo html (no Index) y otro archivo js (no tarea-clase-5.js),
// creá un formulario que capture el primer nombre, segundo nombre, apellido/s y edad del usuario
// también vamos a crear un <h1> que diga Bienvenido!
// vas a crear un botón de acción que una vez que lo apretás, va a
// mostrar toda la información junta en un campo de texto
// Y va a cambiar el <h1> para decir "Bienvenido, nombreDeUsuario"!




function bienvenidaNombre(nombreUsuario) {
    const nuevoH1 = document.querySelector('#title')
    nuevoH1.textContent = `Bienvenidx ${nombreUsuario}`;
}
/*
function bienvenidaDatos(dato) {
    const form = document.querySelector('#form')
    const nuevoUl = document.createElement('ul');
    const nuevoLi = document.createElement('li');
    form.appendChild(nuevoUl);
    nuevoUl.appendChild(nuevoLi);
    nuevoLi.textContent = dato;
}
*/
const $bienvenida = document.querySelector('#enviar');

$bienvenida.onclick = function(e) {
    
    const nombreUsuario = document.querySelector('#primer-nombre').value;
    const datos = document.querySelectorAll('.input');
    
    bienvenidaNombre(nombreUsuario);
    
    datos.forEach(function (datos) {
        const form = document.querySelector('#form')
        const nuevoUl = document.createElement('ul');
        const nuevoLi = document.createElement('li');
        form.appendChild(nuevoUl);
        nuevoUl.appendChild(nuevoLi);
        nuevoLi.textContent = datos.value;
    })
    return false;

}




















/*
function bienvenidaNombre (nombreUsuario) {
    const nuevoH1 = document.querySelector('#title');
    nuevoH1.textContent = `Bienvenidx ${nombreUsuario}`;
}
function bienvenidaDatos (datos) {
    const campoTexto = document.createElement('textarea');
    form.appendChild('campoTexto');
    campoTexto.textContent($datos) ;

}

const $bienvenida = document.querySelector('#enviar')

$bienvenida.onclick = function(e) {
    
    const nombreUsuario = document.querySelector('#primerNombre').value;
    const $datos = document.querySelectorAll('.table');
    
    bienvenidaNombre(nombreUsuario);
    bienvenidaDatos($datos.value);
    
    return false;
}

*/
