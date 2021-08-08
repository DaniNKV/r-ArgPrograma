// Comportamiento al azar
const comportamiento = {
    muyBueno: "muy bueno",
    bueno: "bueno",
    malo: "malo"
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
  if (DOM.actitud.innerText === comportamiento.malo) {
    DOM.santaGift.innerText = 'No tienes regalo este año :(';
    const $p = document.querySelector('.gift-section .frase');
    $p.style.display = 'none';

  }else {
    const nroRandom = CrearNumeroRandom(localStorageIndex-1);
    const regalo = JSON.parse(localStorage.getItem('user'+(nroRandom)));
    const regaloElegido = regalo.descripcion
  
    DOM.santaGift.innerText = regaloElegido

    establecerRegalo(regaloElegido);
  }

}


// ######## Funciones Auxiliares ######### //
function crearNumeroRandom (limite) {
  //Crea un numero random entero del 0 al limite
  numeroRandom = Math.floor(Math.random() * limite) + 1;

  return numeroRandom
}

function establecerRegalo(regalo) {
  const regaloElegido = 
      regalo
      .trim()
      .replace(/\s/,'-')
      .toLowerCase();

  buscarRegalo(regaloElegido);
}

function mostrarRegaloEnDOM (regalo) {
  DOM.giftImg.src = regalo
}
