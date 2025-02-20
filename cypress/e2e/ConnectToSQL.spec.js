/// <reference types="cypress" />
describe('Connect to SQL', () => {
    it("Connect to SQL", function () {

        cy.sqlServer('SELECT * FROM Employees').then((result) => {
            expect(result.recordset.length).to.be.greaterThan(0); // Verifica que haya registros
            console.log(result.recordset); // Imprime los resultados en la consola
        });

    });
});