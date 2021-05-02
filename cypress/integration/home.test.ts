describe('Home page', () => {
  beforeEach(() => {
    cy.viewport(1530, 670);
    cy.visit('/');
  });

  it('should go the home', () => {
    cy.findByRole('img', { name: /podcastr/i }).should('exist');
  });
});
