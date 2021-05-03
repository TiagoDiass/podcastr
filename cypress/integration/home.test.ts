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

describe('Home page', () => {
  let episodes: Episode[] = [];

  before(function () {
    cy.fixture('episodes').then(data => {
      episodes = data;
    });
  });

  beforeEach(() => {
    cy.viewport(1530, 670);
    cy.visit('/');
  });

  it('should start with correct initial state', () => {
    /**
     * The correct initial state(in this case that the app was builded with server.json data) is:
     * 1 - a list with 2 elements which are the latest episodes
     * 2 - a table with 10 rows which are the allEpisodes prop
     * 3 - player with the empty text and buttons disabled
     * 4 - the tag <audio> shouldn't exist in the page
     */

    // 1 - a list with 2 elements which are the latest episodes
    cy.findAllByRole('listitem').should('have.length', 2);
    cy.findAllByRole('listitem').each((episode, index) => {
      const episodeWrapper = () => cy.wrap(episode);

      episodeWrapper().findByRole('link', { name: episodes[index].title }).should('exist');

      episodeWrapper().findByRole('img', { name: episodes[index].title }).should('exist');

      episodeWrapper()
        .findByRole('button', { name: /tocar episódio/i })
        .should('exist');
    });

    // 2 - a table with 10 rows which are the allEpisodes prop
    cy.findByRole('table').find('tbody tr').should('have.length', 8);
    cy.findByRole('table')
      .find('tbody tr')
      .each((episode, index) => {
        const episodeWrapper = () => cy.wrap(episode);
        const currentEpisodeIndex = index + 2; // index + 2 because the first 2 episodes go to the latest episodes section

        episodeWrapper().findByRole('img', { name: episodes[currentEpisodeIndex].title });
        episodeWrapper().findByRole('link', { name: episodes[currentEpisodeIndex].title });
        episodeWrapper().findByRole('button', { name: /tocar episódio/i });
      });

    // 3 - player with the empty text and buttons disabled
    cy.get('aside').within(() => {
      cy.findByText(/selecione um podcast para ouvir/i).should('exist');
      cy.findAllByRole('button').should('have.length', 5);
      cy.findAllByRole('button').should('be.disabled');
    });

    // 4 - the tag <audio> shouldn't exist in the page
    cy.get('audio').should('not.exist');
  });
});
