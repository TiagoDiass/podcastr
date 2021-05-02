jest.mock('next/image', () => () => <></>);
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EpisodePage from 'pages/episodes/[slug]';
import { Episode } from '@types';
import { PlayerContext, PlayerContextData } from 'contexts/Player.context';

const makeSut = (episode: Episode) => {
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
      <EpisodePage episode={episode} />
    </PlayerContext.Provider>
  );

  return {
    mockContextValue,
  };
};

describe('Episode page', () => {
  it('should call play from context when user clicks on play button', () => {
    const episode: Episode = {
      id: 'podcast 1',
      title: 'Podcast 1',
      description: 'Descrição mockada do podcast 1',
      members: 'Membro 1, Membro 2, Membro 3',
      publishedAt: '8 jan 21',
      thumbnail: '',
      url: '',
      duration: 3600,
      durationString: '01:00:00',
    };

    const { mockContextValue } = makeSut(episode);

    userEvent.click(
      screen.getByRole('img', {
        name: /tocar episódio/i,
      })
    );

    expect(mockContextValue.play).toHaveBeenCalledWith(episode);
  });
});
