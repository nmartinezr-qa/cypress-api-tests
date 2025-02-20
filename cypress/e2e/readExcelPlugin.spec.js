/// <reference types="cypress" />


describe('Read Excel file', () => {
    it('Read Excel file', () => {
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
                cy.wrap($el).click();
            }
        });
        cy.contains('Place Order').click({ force: true });
        cy.wait(4000);
        cy.get('.order-summary button').contains("Excel").click();

        const filePath = Cypress.config("fileServerFolder") + "\\cypress\\downloads\\order-invoice_kapok.zenith512.xlsx";

        // Read Excel file and convert it to JSON so we can assert the data and compare it with the product name
        cy.task('excelToJsonConverter', filePath).then((result) => {
            expect(result.data[1].B).to.equal(productName);
        });

        // Read Excel file and assert the data but it doesn't validate the content position
        cy.readFile(filePath).then((fileContent) => {
            expect(fileContent).to.include(productName);
        });


    });
});