import Player from './Player';
import { render, screen } from '@testing-library/react';
import { PlayerContext, PlayerContextData } from 'contexts/Player.context';

describe('Player component', () => {
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
});
