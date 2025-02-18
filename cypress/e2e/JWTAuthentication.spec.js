describe('JWT Authentication', () => {

  it("Usar JWT en otra petición", function () {
    cy.LoginAPI().then(() => {
      cy.visit("https://rahulshettyacademy.com/client", {
        onBeforeLoad: (win) => {
          win.localStorage.setItem('token', Cypress.env('token'));
        }
      });
    });
  });


});