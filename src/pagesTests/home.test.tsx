jest.mock('next/image', () => () => <></>);
jest.mock('rc-slider/assets/index.css');
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Episode } from '@types';
import { PlayerContext, PlayerContextData } from 'contexts/Player.context';
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

type MakeSutParams = {
  latestEpisodes?: Episode[];
  allEpisodes?: Episode[];
};

const makeSut = ({ latestEpisodes = [], allEpisodes = [] }: MakeSutParams) => {
  const mockContextValue: PlayerContextData = {
    episodeList: [],
    currentEpisodeIndex: 0,

    isPlaying: false,
    play: jest.fn(),
    togglePlay: jest.fn(),
    setPlayingState: jest.fn(),

    isLooping: false,
    toggleLoop: jest.fn(),

    isShuffling: false,
    toggleShuffle: jest.fn(),

    playList: jest.fn(),
    playNextEpisode: jest.fn(),
    playPreviousEpisode: jest.fn(),
    hasNext: true,
    hasPrevious: false,

    clearPlayerState: jest.fn(),
  };

  render(
    <PlayerContext.Provider value={mockContextValue}>
      <Home latestEpisodes={latestEpisodes} allEpisodes={allEpisodes} />
    </PlayerContext.Provider>
  );

  return {
    mockContextValue,
  };
};

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

  it('should call playList from context when user clicks on the play button in one of the latest episodes', () => {
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

    const { mockContextValue } = makeSut({ latestEpisodes });

    const episodesItems = screen.getAllByRole('listitem');

    userEvent.click(episodesItems[1].querySelector('button[title="Tocar episódio"]'));
    expect(mockContextValue.playList).toHaveBeenCalledWith(latestEpisodes, 1);

    userEvent.click(episodesItems[0].querySelector('button[title="Tocar episódio"]'));
    expect(mockContextValue.playList).toHaveBeenCalledWith(latestEpisodes, 0);
  });

  it('should call playList from context when user clicks on the play button in one of the all episodes', () => {
    const allEpisodes = [3, 4, 5, 6].map(i =>
      createEpisode({
        id: `podcast-${i}`,
        title: `Podcast ${i}`,
        description: `Descrição mockada ${i}`,
      })
    );

    const latestEpisodes = [1, 2].map(i =>
      createEpisode({
        id: `podcast-${i}`,
        title: `Podcast ${i}`,
        description: `Descrição mockada ${i}`,
      })
    );

    const allEpisodesList = [...latestEpisodes, ...allEpisodes];

    const { mockContextValue } = makeSut({ allEpisodes, latestEpisodes });

    const episodesTable = screen.getByRole('table');
    const episodesItems = episodesTable.querySelector('tbody').children;

    userEvent.click(episodesItems[3].querySelector('button[title="Tocar episódio"]'));
    expect(mockContextValue.playList).toHaveBeenCalledWith(allEpisodesList, 5);
  });
});
