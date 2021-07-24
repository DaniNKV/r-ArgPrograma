
// ######## ELEMENTOS DOM ######### //

let localStorageIndex = localStorage.length;

let DOM = {
    form : document.querySelector('#carta-a-santa'),
    errores : document.querySelector('#errores'), 
    actitud : document.querySelector('.attitude'),
    santaGift : document.querySelector('.santa-gift-text'),
    giftImg : document.querySelector('.santa-gift')
}

// Comportamiento al azar
const comportamiento = {
  1: "muy bueno",
  2: "bueno",
  3: "malo"
}



// ######## VALIDACION FORMULARIO ######### //

if (DOM.form) {
  DOM.form.onsubmit = validarFormulario;
}
function validarFormulario (event){
    event.preventDefault();
    
    validarCadaCampo();
    
    const errores = {
      nombre: errorNombre,
      ciudad: errorCiudad,
      'descripcion-regalo': errorDescripcionRegalo,
    };

    const esExito = manejarErrores(errores) === 0;
    
    if (esExito) {
      guardarEnLocalStorage();
      redireccionar();
    }

}
function validarCadaCampo () {
  const nombre = DOM.form.nombre.value;
  const ciudad = DOM.form.ciudad.value;
  const descripcionRegalo = DOM.form['descripcion-regalo'].value;

  return errorNombre = validarNombre(nombre),
         errorCiudad = validarCiudad(ciudad),
         errorDescripcionRegalo = validarDescripcionRegalo(descripcionRegalo);
}


// ######## GESTIÓN DE ERRORES  ######### //

function manejarErrores(errores) {
  const keys = Object.keys(errores);
  let cantidadErrores = 0

  keys.forEach(key => {
    const error = errores[key];
    const existeElemento = document.querySelector('.error__'+[key]) !==null ;
    
    if (error && !existeElemento) {
      cantidadErrores++;
      creaError(key, error);
    }
    else if (!error && existeElemento) {
      eliminaError(key);
    }
    else if (error && existeElemento) {
      cantidadErrores++
      muestraError(key);
    }  
    else {
      ocultaError(key);
    }

  })
  return cantidadErrores;

}
function creaError (key, error) {
  DOM.form[key].className = "error" 
  const $error = document.createElement('li')
  $error.className = 'error__'+[key];
  $error.innerText = error;
  DOM.errores.appendChild($error);
}
function eliminaError (key) {
  const elementoParaBorrar = document.querySelector('.error__'+[key]);
  DOM.errores.removeChild(elementoParaBorrar);
  DOM.form[key].className = "";
}
function muestraError (key) {
  DOM.form[key].className = "error" ;
}
function ocultaError (key) {
  DOM.form[key].className = "";

}


// ######## VALIDACIONES INDIVIDUALES ######### //

function validarNombre (nombre) {
    const contieneSoloLetras = /^[a-z]+$/i.test(nombre);
    
    if (nombre.length === 0) {
      return ('El nombre debe tener más de un carácter')
    }
    if (nombre.length >= 50) {
      return ('El nombre debe tener menos de 50 carácteres')
    }
    if (contieneSoloLetras === false) {
      return ('El nombre debe contener solo letras');}
    else {
      return "";
    }
}
function validarCiudad (ciudad){
    if (ciudad.length === 0) {
        return ('Campo Ciudad no debe estar vacio')
    }
    return "";   
}
function validarDescripcionRegalo(descripcionRegalo) {
    const contieneSoloLetrasYNumeros = /^[A-z0-9\s]+$/i.test(descripcionRegalo);
    if (descripcionRegalo.length === 0 ) {
      return ('La descripcion no puede estar vacia');
    }
    else if (descripcionRegalo.length >= 100) {
      return ('La descripción debe tener menos de 100 carácteres');
    }
    else if (contieneSoloLetrasYNumeros === false) {
      return ('La descripcion solo admite numeros y letras');
    }
    else {
      return "";
    }
}


// ######## SIGUIENTE PASO SI NO HAY ERRORES ######### //

function redireccionar() {
  DOM.form.className = 'oculto';
  document.querySelector('#exito').className = '';
  setTimeout(function(){
    window.location.href = 'wishlist.html';
  }, 5000);
}


// ######## GUARDAR INFO EN LOCAL STORAGE ######### //

function guardarEnLocalStorage () {
  
  const User = {
    nombre: document.getElementById('nombre').value,
    ciudad: document.getElementById('ciudad').value,
    descripcionRegalo: document.getElementById('descripcion').value,
  }

  let key = 'user' + (localStorageIndex + 1); 

  localStorage.setItem(
    key, 
    JSON.stringify({
      nombre: User.nombre,
      descripcion: User.descripcionRegalo,
    }
  ));
    
  localStorageIndex++;
}
function mostrarDeseos () {
    let $wishList = document.querySelector('#wish-list');
    
    Object
      .keys(localStorage)
      .forEach( userKey => {
        const $li = document.createElement('LI');
        const data = JSON.parse(localStorage.getItem(userKey))
        
        $li.appendChild(document.createTextNode(data.descripcion));

      $wishList.appendChild($li);
    });

}


// ######## ENVIAR REGALO AL USUARIO ######### //

function CreaNumeroRandom (limite) {
  //Crea un numero random entero del 0 al limite
  numeroRandom = Math.floor(Math.random() * limite) + 1;

  return numeroRandom
}
function llenarContenido () {
  mostrarComportamientoRandom();
  mostrarRegalo();
}


function mostrarComportamientoRandom() {
  const cantidadComportamientos = Object.keys(comportamiento).length;
  numeroRandom = CreaNumeroRandom(cantidadComportamientos);
  
  const comportamientoRandom = comportamiento[numeroRandom];
  DOM.actitud.innerText = comportamientoRandom;

}

// Inyectar datos del regalo en el HTML

function mostrarRegalo() {
  if (DOM.actitud.innerText === 'malo') {
    DOM.santaGift.innerText = 'No tienes regalo este año :(';
    const $p = document.querySelector('.gift-section .frase');
    $p.style.display = 'none';

  }else {
    const nroRandom = CreaNumeroRandom(localStorageIndex-1);
    const regalo = JSON.parse(localStorage.getItem('user'+(nroRandom)));
    const regaloElegido = regalo.descripcion
  
    DOM.santaGift.innerText = regaloElegido

    establecerRegalo(regaloElegido);
  }

}

function establecerRegalo(regalo) {
  const regaloElegido = 
      regalo
      .trim()
      .replace(/\s/,'-')
      .toLowerCase();

  buscarRegalo(regaloElegido);
}

async function buscarRegalo (regalo) {
  response = await fetch(`https://api.unsplash.com/photos?per_page=2&query=${regalo}`, {
    headers: {
      Authorization: 'Client-ID nFqIGneTClhsupgxyQ1eq5BrZXpyeGGbkl0owLiVS1U'
    }},
  )
  data = await response.json();
  regaloImage = data[0].urls.regular
  mostrarRegaloEnDOM(regaloImage)
}


function mostrarRegaloEnDOM (regalo) {
  DOM.giftImg.src = regalo
}
