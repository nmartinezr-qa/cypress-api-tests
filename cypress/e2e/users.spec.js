describe('Actualizar usuario y restaurar valores', () => {
  let userId  ="f96641d4-4919-4181-95ed-11684bc82443";
  const apiUrl = `http://localhost:3000/users/${userId}`; // Ajusta la URL según tu API
  let defaultUserData;
  
  before(() => {
    // Obtener los valores originales antes de modificar
    cy.request('GET', apiUrl).then((response) => {
      expect(response.status).to.eq(200);
      defaultUserData = response.body;
      cy.log("Default data: " + JSON.stringify(defaultUserData));
    });
  });

  it('Debe actualizar los datos del usuario y verificar los cambios', () => {
    const updatedUser = {
      ...defaultUserData,
      username: 'Nuevo Nombre',
      email: 'nuevo@email.com'
    };

    // Actualizar usuario
    cy.request('PUT', apiUrl, updatedUser).then((response) => {
      cy.log("Updated data: " + JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      expect(response.body.username).to.eq(updatedUser.username);
      expect(response.body.email).to.eq(updatedUser.email);
    });

    // Verificar que los datos se actualizaron correctamente
    cy.request('GET', apiUrl).then((response) => {
      cy.log("Updated data: " + JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      expect(response.body.username).to.eq(updatedUser.username);
      expect(response.body.email).to.eq(updatedUser.email);
    });
  });

  after(() => {
    // Restaurar los valores originales después de la prueba
    cy.request('PUT', apiUrl, defaultUserData).then((response) => {
      cy.log("Reverting user data");  
      cy.log("Default data: " + JSON.stringify(response.body));
      expect(response.status).to.eq(200);
    });

    // Verificar que los datos volvieron a su estado original
    cy.request('GET', apiUrl).then((response) => {
      cy.log("Default data: " + JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      expect(response.body.username).to.eq(defaultUserData.username);
      expect(response.body.email).to.eq(defaultUserData.email);
      expect(response.body.password).to.eq(defaultUserData.password);
    });
  });
});