
  
  const $calcularSalarioMensual = document.querySelector('#calcular');
  $calcularSalarioMensual.onclick = function() {
    console.log('click')
    const salarioAnual = Number(document.querySelector('#salario-anual').value)
    const salarioMensual = calcularSalarioMensual(salarioAnual);
    console.log(salarioMensual)
    document.querySelector('#salario-mensual').innerText = salarioMensual;
    return false;
  }


function calcularSalarioMensual(salarioAnual) {
  return salarioAnual / 12 ;
}