describe('Home page', () => {
  let episodes = [];

  before(function () {
    cy.fixture('episodes').then(function (data) {
      episodes = data;
    });
  });

  beforeEach(() => {
    cy.viewport(1530, 670);
    cy.visit('/');
  });

  it('should load with correct initial state', () => {
    /**
     * The correct initial state(in this case that the app was builded with server.json data) is:
     * 1 - a list with 2 elements which are the latest episodes
     * 2 - a table with 10 rows which are the allEpisodes prop
     * 3 - player with the empty text and buttons disabled
     * 4 - the tag <audio> shouldn't exist in the page
     */

    cy.findAllByRole('listitem').should('have.length', 2);
    cy.findAllByRole('listitem').each((episode, index) => {
      const episodeWrapped = cy.wrap(episode);
      episodeWrapped.findByRole('link', { name: `${episodes[index].title}` }).should('exist');
    });

    // cy.findAllByRole('img').each((element, index) => {
    //   cy.wrap(element).should('exist')
    // })
  });
});
