describe('Test', () => {
  before(() => {
    cy.visit('http://127.0.0.1:8080')
  })
  
  describe('Ingresa cantidad de familiares', () => {
    it('Clickea sin ingresar cantidad', () =>{
      cy.contains('Siguiente Paso').click()
      cy.get('#erroresPop').should('not.be.empty')
    })
    it('Completa el formulario y continua', () => {
      cy.get('#cantidad-familiares').click().type('2')
      cy.get('#siguiente-paso').click()
    })
  })

  describe('Completa edades', () => {
    
  })
})
/*
describe('Mi primer test', () => {
  it('No hace mucho la verdad!', () => {
    expect(true).to.equal(true)
  })
})
*/