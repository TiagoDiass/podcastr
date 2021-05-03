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
    cy.viewport(1530, 730);
    cy.visit(`/episodes/${episodes[1].id}`);
  });

  it('should render correctly', () => {
    cy.findByRole('heading', { name: episodes[1].title }).should('exist');
    cy.findByRole('button', { name: /tocar episódio/i }).should('exist');
    cy.findByRole('button', { name: /voltar/i }).should('exist');
  });

  it('should redirect user to the home page when clicks on logo', () => {
    cy.findByRole('img', { name: /podcastr/i }).click();
    cy.url().should('equal', `${baseUrl}/`);
  });

  it('should redirect user to the home page when clicks on back button', () => {
    cy.findByRole('button', { name: /voltar/i }).click();
    cy.url().should('equal', `${baseUrl}/`);
  });
});
