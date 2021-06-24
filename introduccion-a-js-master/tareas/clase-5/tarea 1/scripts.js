
function calcularSalarioMensual(salarioAnual) {
    return salarioAnual / 12 ;
  }
  
  const $calcularSalarioMensual = document.querySelector('#calcular').value;
  
  $calcularSalarioMensual.onclick = function() {
    const salarioAnual = number(document.querySelector('#salario-anual').value)
    const salarioMensual = calcularSalarioMensual(salarioAnual);
    document.querySelector('#salario-mensual').value = salarioMensual;
    console.log(salarioMensual);
    return false;
  }