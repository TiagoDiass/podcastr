describe('Episode page', () => {
  const baseUrl: string = Cypress.config().baseUrl;

  type Episode = {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    members: string;
    duration: number;
    durationString: string;
    url: string;
    publishedAt: string;
  };

  let episodes: Episode[] = [];

  before(function () {
    cy.fixture('episodes').then(data => {
      episodes = data;
    });
  });

  beforeEach(() => {
    cy.viewport(1530, 950);
    cy.visit(`/episodes/${episodes[1].id}`);
  });

  it('should render correctly', () => {
    cy.findByRole('heading', { name: episodes[1].title }).should('exist');
    cy.findByRole('button', { name: /tocar episódio/i }).should('exist');
    cy.findByRole('button', { name: /voltar/i }).should('exist');
  });

  it('should redirect user to home page when clicks on logo', () => {
    cy.findByRole('img', { name: /podcastr/i }).click();
    cy.url().should('equal', `${baseUrl}/`);
  });

  it('should redirect user to home page when clicks on back button', () => {
    cy.findByRole('button', { name: /voltar/i }).click();
    cy.url().should('equal', `${baseUrl}/`);
  });

  it('should play the episode when user clicks on the play button', () => {
    // ensure player is empty
    cy.get('aside').within(() => {
      cy.findByText(/selecione um podcast para ouvir/i).should('exist');
      cy.findAllByRole('button').should('have.length', 5);
      cy.findAllByRole('button').should('be.disabled');
    });

    // click on play button
    cy.findByRole('button', { name: /tocar episódio/i }).click();

    // ensure player is correct
    cy.get('aside').within(() => {
      cy.get('div>strong').should('contain.text', episodes[1].title);
      cy.findAllByRole('button').should('be.enabled');
      cy.findByRole('button', { name: /tocar/i }).should('not.exist');
      cy.findByRole('button', { name: /pausar/i }).should('exist');
    });
  });
});
