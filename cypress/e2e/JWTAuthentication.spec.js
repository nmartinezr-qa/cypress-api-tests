describe('JWT Authentication', () => {
  const neatcsv = require('neat-csv');

  it("Usar JWT en otra petición", async function () {
    cy.LoginAPI().then(() => {
      cy.visit("https://rahulshettyacademy.com/client", {
        onBeforeLoad: (win) => {
          win.localStorage.setItem('token', Cypress.env('token'));
        }
      });
    });
    let productName;
    cy.get('.card-body b').eq(1).then(($el) => {
      productName = $el.text();
    });
    cy.get('.card-body button:last-of-type').eq(1).click();
    cy.get('button[routerlink*="/cart"]').click();
    cy.contains('Checkout').click();
    cy.get('.form-group input').type("ind");
    cy.get('.ta-results button').each(($el, index, $list) => {
      cy.log($el.text());
      if ($el.text() === " India") {
        cy.log("Clickin element: " + $el.text());
        cy.wrap($el).click();
      }
    });
    cy.contains('Place Order').click({ force: true });
    cy.wait(4000);
    cy.get('.order-summary button').eq(0).click();
    cy.readFile(Cypress.config("fileServerFolder") + "\\cypress\\downloads\\order-invoice_kapok.zenith512.csv")
      .then(async function (text) {
        const csv = await neatcsv(text);
        expect(csv[0]["Product Name"]).to.equal(productName);
      }
      );

  });

});