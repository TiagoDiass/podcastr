jest.mock('next/image', () => () => <></>);

import Player from './Player';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PlayerContext, PlayerContextData } from 'contexts/Player.context';
import { Episode } from '@types';

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

describe('Player component', () => {
  beforeAll(() => {
    HTMLAudioElement.prototype.play = jest.fn();
    HTMLAudioElement.prototype.pause = jest.fn();
  });

  const baseMockContext: PlayerContextData = {
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

  it('should render the initial state correctly', () => {
    const mockContextValue = baseMockContext;

    render(
      <PlayerContext.Provider value={mockContextValue}>
        <Player />
      </PlayerContext.Provider>
    );

    expect(screen.getByText(/selecione um podcast para ouvir/i)).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(5);
    expect(buttons[0]).toBeDisabled(); // shuffle
    expect(buttons[1]).toBeDisabled(); // previous
    expect(buttons[2]).toBeDisabled(); // play
    expect(buttons[3]).toBeDisabled(); // next
    expect(buttons[4]).toBeDisabled(); // repeat
  });

  it('should show a pause button and call togglePlay when user clicks on it', () => {
    const mockContextValue: PlayerContextData = {
      ...baseMockContext,
      episodeList: [
        createEpisode({
          id: 'podcast-1',
          title: 'Podcast 1',
          description: 'Descrição do podcast 1',
        }),
      ],
      isPlaying: true,
    };

    render(
      <PlayerContext.Provider value={mockContextValue}>
        <Player />
      </PlayerContext.Provider>
    );

    userEvent.click(screen.getByAltText(/pausar/i));
    expect(mockContextValue.togglePlay).toHaveBeenCalled();
    expect(HTMLAudioElement.prototype.play).toHaveBeenCalled();
  });

  it('should show a play button and call togglePlay when user clicks on it', () => {
    const mockContextValue: PlayerContextData = {
      ...baseMockContext,
      episodeList: [
        createEpisode({
          id: 'podcast-1',
          title: 'Podcast 1',
          description: 'Descrição do podcast 1',
        }),
      ],
      isPlaying: false,
    };

    render(
      <PlayerContext.Provider value={mockContextValue}>
        <Player />
      </PlayerContext.Provider>
    );

    userEvent.click(screen.getByAltText('Tocar'));
    expect(mockContextValue.togglePlay).toHaveBeenCalled();
    expect(HTMLAudioElement.prototype.pause).toHaveBeenCalled();
  });
});
