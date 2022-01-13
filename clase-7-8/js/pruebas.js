function probarValidar() {
    probarValidarNombre();
    probarValidarCiudad();
    probarValidarDescripcionRegalo();
}




function probarValidarNombre() {
  console.assert(
      validarNombre('Daniel') === 
      '',
      'Validar Nombre falló con un nombre válido',
     );
  console.assert(
      validarNombre('') === 
      'El nombre debe tener más de un carácter',
      'Validar Nombre no validó que el nombre no sea vacío',
    );

  console.assert(
      validarNombre(
          '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111') ===
      'El nombre debe tener menos de 50 carácteres',
      'Validar Nombre no validó que el nombre sea menor a 50 caracteres',
    );
    console.assert (
        validarNombre('231241') === 
        'El nombre debe contener solo letras',
        'Validar Nombre no validó que este campo solo contenga letras',
    );


} // Funcion Validar Nombre

probarValidarNombre();

function probarValidarCiudad() {
    console.assert(
        validarCiudad('') === 
        'Campo Ciudad no debe estar vacio',
        'Validar Ciudad no validó que haya seleccionado una ciudad',
    );
    console.assert(
        validarCiudad('Buenos aires') === '',
        "Validar Ciudad falló con una ciudad válida"
    )
}// Funcion Validar Ciudad

probarValidarCiudad();

const texto100 = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptates neque quasi nobis tenetur, veniam voluptatum, eveniet tempora quam soluta architecto rerum reprehenderit amet non. Ipsam cum magnam non magni, vel optio vitae alias ullam inventore obcaecati quos voluptas doloribus iusto ad consectetur. Impedit, labore sunt aliquid id numquam ea tempore ipsum dolorem, ex quasi officiis? Omnis possimus, dicta adipisci alias ea dolorum amet incidunt nam. Iure beatae ad numquam veritatis officia pariatur voluptatem sunt molestiae quis modi rem praesentium inventore debitis unde vel placeat neque odio, ipsum quia laudantium enim nulla suscipit. Consequuntur cumque dolorem iusto cum necessitatibus voluptates velit";

function probarValidarDescripcionRegalo () {
    console.assert (
        validarDescripcionRegalo('') ===
        'La descripcion no puede estar vacia',
        'Validar Descripcion no validó que se haya escrito algo',
    );
    
    console.assert(
        validarDescripcionRegalo(texto100) === 
        'La descripción debe tener menos de 100 carácteres',
        
        'Validar Descripcion no valido que se hayan escrito menos de 100 carácteres'
    );
    
    console.assert(
        validarDescripcionRegalo('Regalo') === '',
        "Validar Descripcion no valido una descripcion valida"
    )
    console.assert(
        validarDescripcionRegalo(',.,.,.') === 'La descripcion solo admite numeros y letras',
        "Validar Descripcion no valido que fuesen numeros y letras"
    )
}// Funcion Validar Descripcion

probarValidarDescripcionRegalo();




