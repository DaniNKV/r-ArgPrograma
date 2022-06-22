/// <reference types="Cypress" />

describe('Test', () => {
  before(() => {
    cy.visit('http://127.0.0.1:8080')
  })
  
  describe('Ingresa cantidad de familiares', () => {
    it('Error al clickear sin ingresar cantidad', () =>{
      cy.contains('Siguiente Paso').click()
      cy.get('#erroresPop').should('not.be.empty')
    })
    it('Completa con la cantidad de familiares y continua', () => {
      cy.get('#cantidad-familiares').click().type('2')
      cy.get('#siguiente-paso').click()
      cy.get('#erroresPop').should('be.empty')
    })
  })

  describe('Genera inputs correctamente', () => {
    it('Crea cantidad correcta de miembros', () => {
    cy.get('#integrantes').children().should('have.length', 2)

    })
		it('Funciona input para edad', () => {
			cy.get('#integrantes').each(($member) => {
				cy.get($member).within(() => {
					cy.get('input[type="number"]').as('edades')
					cy.get('input[type="checkbox"]')
				})
			})

			cy.get('@edades').eq(0).type('20')
			cy.get('@edades').eq(1).type('30')
		})

		it('Funciona toggle e input para salario', () => {
			cy.get('span[class="slider round"]').each(($toggle) => {
				cy.get($toggle).click()
			})

			cy.get('input[class^="salario"]').as('salarios').should('have.length', 2)

			cy.get('@salarios').eq(0).type('2000')
			cy.get('@salarios').eq(1).type('4000')

		})

	})

	describe('Muestra resultados', () => {
		it('Calcula resultados', () => {
			cy.get('#boton-calcular').click()
			cy.get('.resultado').should('exist')
			cy.get('#analisis-edad').should('exist')
			cy.get('#analisis-salario').should('exist')

		})
		it('Resultados de edades correctos', () => {
			cy.get('#menor-edad').contains('20')
			cy.get('#mayor-edad').contains('30')
			cy.get('#promedio-edad').contains('25')
		})
		it('Resultados de salarios correctos', () => {
			cy.get('#menor-salario').contains('2,000')
			cy.get('#mayor-salario').contains('4,000')
			cy.get('#promedio-salario').contains('3,000')
		})
	})
})




/*
describe('Mi primer test', () => {
  it('No hace mucho la verdad!', () => {
    expect(true).to.equal(true)
  })
})
*/
