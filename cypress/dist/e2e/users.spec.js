"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
describe('Actualizar usuario y restaurar valores', () => {
    let userId = "d96c17c4-b890-45d5-b5d9-32ca90a29d25";
    const apiUrl = `http://localhost:3000/users/${userId}`; // Ajusta la URL según tu API
    let defaultUserData;
    before(() => {
        // Obtener los valores originales antes de modificar
        cy.request('GET', apiUrl).then((response) => {
            (0, chai_1.expect)(response.status).to.eq(200);
            defaultUserData = response.body;
            cy.log("Default data: " + JSON.stringify(defaultUserData));
        });
    });
    it('Debe actualizar los datos del usuario y verificar los cambios', () => {
        const updatedUser = Object.assign(Object.assign({}, defaultUserData), { username: 'Nuevo Nombre', email: 'nuevo@email.com' });
        // Actualizar usuario
        cy.request('PUT', apiUrl, updatedUser).then((response) => {
            cy.log("API URL: " + apiUrl);
            cy.log("Updating user data");
            cy.log("Default data: " + JSON.stringify(updatedUser));
            (0, chai_1.expect)(response.status).to.eq(200);
            (0, chai_1.expect)(response.body.username).to.eq(updatedUser.username);
            (0, chai_1.expect)(response.body.email).to.eq(updatedUser.email);
        });
        // Verificar que los datos se actualizaron correctamente
        cy.request('GET', apiUrl).then((response) => {
            cy.log("Default data: " + JSON.stringify(defaultUserData));
            (0, chai_1.expect)(response.status).to.eq(200);
            (0, chai_1.expect)(response.body.username).to.eq(updatedUser.username);
            (0, chai_1.expect)(response.body.email).to.eq(updatedUser.email);
        });
    });
    after(() => {
        // Restaurar los valores originales después de la prueba
        cy.request('PUT', apiUrl, defaultUserData).then((response) => {
            (0, chai_1.expect)(response.status).to.eq(200);
        });
        // Verificar que los datos volvieron a su estado original
        cy.request('GET', apiUrl).then((response) => {
            cy.log("Default data: " + JSON.stringify(defaultUserData));
            (0, chai_1.expect)(response.status).to.eq(200);
            (0, chai_1.expect)(response.body.username).to.eq(defaultUserData.username);
            (0, chai_1.expect)(response.body.email).to.eq(defaultUserData.email);
            (0, chai_1.expect)(response.body.password).to.eq(defaultUserData.password);
        });
    });
});
