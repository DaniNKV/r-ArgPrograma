// ######## VALIDACION FORMULARIO ######### //
const $form = document.querySelector('#carta-a-santa');
$form.onsubmit = validarFormulario;

function validarFormulario (event){
    const $form = document.querySelector('#carta-a-santa');
    
    const nombre = $form.nombre.value;
    const ciudad = $form.ciudad.value;
    const descripcionRegalo = $form['descripcion-regalo'].value;

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
      $form.className = 'oculto';
      document.querySelector('#exito').className = '';
      setTimeout(function(){
        window.location.href = 'wishlist.html';
      }, 5000);
    }
    event.preventDefault();
}

function manejarErrores(errores) {
  const keys = Object.keys(errores);
  const $errores = document.querySelector('#errores') 
  let cantidadErrores = 0

  keys.forEach(key => {
    const error = errores[key];
    const existeElemento = document.querySelector('.error__'+[key]) !==null ;
    
    if (error && !existeElemento) {
      cantidadErrores++;
      $form[key].className = "error" 
      const $error = document.createElement('li')
      $error.className = 'error__'+[key];
      $error.innerText = error;
      $errores.appendChild($error);
    }
    else if (!error && existeElemento) {
      const elementoParaBorrar = document.querySelector('.error__'+[key]);
      $errores.removeChild(elementoParaBorrar);
      $form[key].className = "";
    }
    else if (error && existeElemento) {
      cantidadErrores++
      $form[key].className = "error" ;
    }  
    else {
      $form[key].className = "";
    }

  })
  return cantidadErrores;

}


// ######## VALIDACION INDIVIDUAL ######### //

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
