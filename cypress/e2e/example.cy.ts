// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
	it('visits the app root url', () => {
		cy.intercept('GET', '/api/v1/session', { fixture: 'example.json', statusCode: 401 })
		cy.visit('/')
		cy.contains('.text-h6', 'Вход в личный кабинет')
	})
})
