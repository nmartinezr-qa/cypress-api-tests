import { expect } from 'chai';
import { User } from '../types/user';

describe('Actualizar usuario y restaurar valores', () => {
  let userId  : string = "d96c17c4-b890-45d5-b5d9-32ca90a29d25";
  const apiUrl = `http://localhost:3000/users/${userId}`; // Ajusta la URL según tu API
  let defaultUserData: User;

  before(() => {
    // Obtener los valores originales antes de modificar
    cy.request('GET', apiUrl).then((response) => {
      expect(response.status).to.eq(200);
      defaultUserData = response.body;
    });
  });

  it('Debe actualizar los datos del usuario y verificar los cambios', () => {
    const updatedUser = {
      ...defaultUserData,
      nombre: 'Nuevo Nombre',
      email: 'nuevo@email.com'
    };

    // Actualizar usuario
    cy.request('PUT', apiUrl, updatedUser).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.nombre).to.eq(updatedUser.nombre);
      expect(response.body.email).to.eq(updatedUser.email);
    });

    // Verificar que los datos se actualizaron correctamente
    cy.request('GET', apiUrl).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.nombre).to.eq(updatedUser.nombre);
      expect(response.body.email).to.eq(updatedUser.email);
    });
  });

  after(() => {
    // Restaurar los valores originales después de la prueba
    cy.request('PUT', apiUrl, defaultUserData).then((response) => {
      expect(response.status).to.eq(200);
    });

    // Verificar que los datos volvieron a su estado original
    cy.request('GET', apiUrl).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.nombre).to.eq(defaultUserData.usuername);
      expect(response.body.email).to.eq(defaultUserData.email);
      expect(response.body.password).to.eq(defaultUserData.password);
    });
  });
});