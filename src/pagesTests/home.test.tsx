jest.mock('next/image', () => () => <></>);
import { render, screen } from '@testing-library/react';
import { Episode } from '@types';
import Home from 'pages';

type CreateEpisodeParams = {
  id: string;
  title: string;
  description: string;
};

const createEpisode = (partialEpisodeData: CreateEpisodeParams): Episode => ({
  ...partialEpisodeData,
  members: 'Membro 1, Membro 2, Membro 3',
  publishedAt: '8 jan 21',
  thumbnail: '',
  url: '',
  duration: 3600,
  durationString: '01:00:00',
});

describe('Home page', () => {
  it('should render the latest episodes correctly', () => {
    const latestEpisodes = [
      createEpisode({
        id: 'podcast-1',
        title: 'Podcast 1',
        description: 'Descrição mockada 1',
      }),
      createEpisode({
        id: 'podcast-2',
        title: 'Podcast 2',
        description: 'Descrição mockada 2',
      }),
    ];

    render(<Home latestEpisodes={latestEpisodes} allEpisodes={[]} />);

    expect(screen.getByRole('list').children).toHaveLength(2);
    expect(screen.queryByRole('link', { name: /podcast 1/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /podcast 2/i })).toBeInTheDocument();
  });

  it('should render a table with the prop allEpisodes correctly', () => {
    const allEpisodes = [1, 2, 3, 4].map(i =>
      createEpisode({
        id: `podcast-${i}`,
        title: `Podcast ${i}`,
        description: `Descrição mockada ${i}`,
      })
    );

    render(<Home latestEpisodes={[]} allEpisodes={allEpisodes} />);

    const allEpisodesTableElement = screen.getByRole('table');

    expect(allEpisodesTableElement).toBeInTheDocument();
    expect(allEpisodesTableElement.querySelector('tbody').children).toHaveLength(4);
  });
});
