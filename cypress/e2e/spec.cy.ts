/// <reference types="cypress" />

describe('Test Login', () => {
	it('Check on incorrect email or password', () => {
		cy.intercept('POST', 'http://localhost:4000/api/auth/login').as('login');

		cy.visit('http://localhost:3000/login');
		cy.get('[data-cy="email-input"]').type('notregisteredEmail@gmail.com');
		cy.get('[data-cy="password-input"]').type('incorrect password');
		cy.get('[data-cy="login-button"]').click();

		cy.wait('@login');
		cy.get('.toast-cy').contains('Incorrect email or password').should('exist');
	});

	it('Check redirect to sign up button', () => {
		cy.visit('http://localhost:3000/login');
		cy.get('[data-cy="go-to-signup"]').click();

		cy.location('pathname').should('eq', '/signup');
	});

	it('Check on successfull login', () => {
		cy.visit('http://localhost:3000/login');
		cy.get('[data-cy="email-input"]').type('email1@gmail.com');
		cy.get('[data-cy="password-input"]').type('password');
		cy.get('[data-cy="login-button"]').click();

		cy.location('pathname').should('eq', '/');
	});
});
