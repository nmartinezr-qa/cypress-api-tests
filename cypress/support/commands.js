// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('LoginAPI', () => {
    return cy.request({
        method: 'POST',
        url: 'https://rahulshettyacademy.com/api/ecom/auth/login',
        body: {
            userEmail: "kapok.zenith512@eagereverest.com",
            userPassword: "TqVPJUuSR#3m8U&#TAnL"
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
        Cypress.env('token', response.body.token);
    });
});


//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })