describe('Mi primer test con TypeScript', () => {
    it('Visita la página de ejemplo', () => {
      cy.visit('https://example.com');
      cy.contains('Example Domain');
    });
  });