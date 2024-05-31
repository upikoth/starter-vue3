// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
	it('visits the app root url', () => {
		cy.intercept('GET', '/environment.json?*', { fixture: 'environment.json', statusCode: 200 })

		cy.visit('/')

		cy.contains('.text-h6', 'Вход в личный кабинет')
	})
})
