// ######## ELEMENTOS DOM ######### //
let DOM = {
    form: document.querySelector('#carta-a-santa'),
    errores: document.querySelector('#errores'), 
}


// ######## VALIDACION FORMULARIO ######### //
DOM.form.onsubmit = validarFormulario;

function validarFormulario (event){
    const nombre = DOM.form.nombre.value;
    const ciudad = DOM.form.ciudad.value;
    const descripcionRegalo = DOM.form['descripcion-regalo'].value;

    const errorNombre = validarNombre(nombre);
    const errorCiudad = validarCiudad(ciudad);
    const errorDescripcionRegalo = validarDescripcionRegalo(descripcionRegalo);
    
    const errores = {
      nombre: errorNombre,
      ciudad: errorCiudad,
      'descripcion-regalo': errorDescripcionRegalo,
    };

    const esExito = manejarErrores(errores) === 0;
    
    if (esExito) {
      redireccionar();
    }
    event.preventDefault();
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
    const contieneLetrasYNumeros = /^[a-z0-9]+$/i.test(descripcionRegalo);
    if (descripcionRegalo.length === 0 ) {
      return ('La descripcion no puede estar vacia');
    }
    else if (descripcionRegalo.length >= 100) {
      return ('La descripción debe tener menos de 100 carácteres');
    }
    else if (contieneLetrasYNumeros === false) {
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
