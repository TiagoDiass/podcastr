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
    expect(screen.getAllByRole('button')).toHaveLength(5);
    expect(screen.getByRole('button', { name: /embaralhar/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /tocar anterior/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Tocar' })).toBeDisabled();
    expect(screen.getByRole('button', { name: /tocar próxima/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /repetir/i })).toBeDisabled();
  });

  describe('Play / Pause button', () => {
    it('should show a pause button and call togglePlay() when user clicks on it', () => {
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

    it('should show a play button and call togglePlay() when user clicks on it', () => {
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

  describe('Shuffle button', () => {
    it('should disable the shuffle button if there is only one episode', () => {
      const mockContextValue: PlayerContextData = {
        ...baseMockContext,
        episodeList: [
          createEpisode({
            id: `podcast-1`,
            title: `Podcast 1`,
            description: `Descrição do podcast 1`,
          }),
        ],
      };

      render(
        <PlayerContext.Provider value={mockContextValue}>
          <Player />
        </PlayerContext.Provider>
      );

      expect(screen.getByRole('button', { name: /embaralhar/i })).toBeDisabled();
    });

    it('should enable the shuffle button if there is more than one episode', () => {
      const mockContextValue: PlayerContextData = {
        ...baseMockContext,
        episodeList: [1, 2].map(i =>
          createEpisode({
            id: `podcast-${i}`,
            title: `Podcast ${i}`,
            description: `Descrição do podcast ${i}`,
          })
        ),
      };

      render(
        <PlayerContext.Provider value={mockContextValue}>
          <Player />
        </PlayerContext.Provider>
      );

      expect(screen.getByRole('button', { name: /embaralhar/i })).toBeEnabled();
    });

    it('should call toggleShuffle() from context if user clicks on shuffle button', () => {
      const mockContextValue: PlayerContextData = {
        ...baseMockContext,
        episodeList: [1, 2].map(i =>
          createEpisode({
            id: `podcast-${i}`,
            title: `Podcast ${i}`,
            description: `Descrição do podcast ${i}`,
          })
        ),
      };

      render(
        <PlayerContext.Provider value={mockContextValue}>
          <Player />
        </PlayerContext.Provider>
      );

      userEvent.click(screen.getByRole('button', { name: /embaralhar/i }));
      expect(mockContextValue.toggleShuffle).toHaveBeenCalled();
    });
  });

  describe('PlayPrevious button', () => {
    it('should disable the playPrevious button if there is no episode before the current', () => {
      const mockContextValue: PlayerContextData = {
        ...baseMockContext,
        episodeList: [
          createEpisode({
            id: `podcast-1`,
            title: `Podcast 1`,
            description: `Descrição do podcast 1`,
          }),
        ],
        hasPrevious: false,
      };

      render(
        <PlayerContext.Provider value={mockContextValue}>
          <Player />
        </PlayerContext.Provider>
      );

      expect(screen.getByRole('button', { name: /tocar anterior/i })).toBeDisabled();
    });

    it('should enable the playPrevious button if there is an episode before the current', () => {
      const mockContextValue: PlayerContextData = {
        ...baseMockContext,
        episodeList: [
          createEpisode({
            id: `podcast-1`,
            title: `Podcast 1`,
            description: `Descrição do podcast 1`,
          }),
        ],
        hasPrevious: true,
      };

      render(
        <PlayerContext.Provider value={mockContextValue}>
          <Player />
        </PlayerContext.Provider>
      );

      expect(screen.getByRole('button', { name: /tocar anterior/i })).toBeEnabled();
    });

    it('should call playPreviousEpisode() from context when user clicks on the playPrevious button', () => {
      const mockContextValue: PlayerContextData = {
        ...baseMockContext,
        episodeList: [
          createEpisode({
            id: `podcast-1`,
            title: `Podcast 1`,
            description: `Descrição do podcast 1`,
          }),
        ],
        hasPrevious: true,
      };

      render(
        <PlayerContext.Provider value={mockContextValue}>
          <Player />
        </PlayerContext.Provider>
      );

      userEvent.click(screen.getByRole('button', { name: /tocar anterior/i }));
      expect(mockContextValue.playPreviousEpisode).toHaveBeenCalled();
    });
  });

  describe('PlayNext button', () => {
    it('should disable the playNext button if there is no episode after the current', () => {
      const mockContextValue: PlayerContextData = {
        ...baseMockContext,
        episodeList: [
          createEpisode({
            id: `podcast-1`,
            title: `Podcast 1`,
            description: `Descrição do podcast 1`,
          }),
        ],
        hasNext: false,
      };

      render(
        <PlayerContext.Provider value={mockContextValue}>
          <Player />
        </PlayerContext.Provider>
      );

      expect(screen.getByRole('button', { name: /tocar próxima/i })).toBeDisabled();
    });

    it('should enable the playNext button if there is an episode after the current', () => {
      const mockContextValue: PlayerContextData = {
        ...baseMockContext,
        episodeList: [
          createEpisode({
            id: `podcast-1`,
            title: `Podcast 1`,
            description: `Descrição do podcast 1`,
          }),
        ],
        hasNext: true,
      };

      render(
        <PlayerContext.Provider value={mockContextValue}>
          <Player />
        </PlayerContext.Provider>
      );

      expect(screen.getByRole('button', { name: /tocar próxima/i })).toBeEnabled();
    });

    it('should call playNextEpisode() from context when user clicks on the playNext button', () => {
      const mockContextValue: PlayerContextData = {
        ...baseMockContext,
        episodeList: [
          createEpisode({
            id: `podcast-1`,
            title: `Podcast 1`,
            description: `Descrição do podcast 1`,
          }),
        ],
        hasNext: true,
      };

      render(
        <PlayerContext.Provider value={mockContextValue}>
          <Player />
        </PlayerContext.Provider>
      );

      userEvent.click(screen.getByRole('button', { name: /tocar próxima/i }));
      expect(mockContextValue.playNextEpisode).toHaveBeenCalled();
    });
  });

  describe('Repeat / Loop button', () => {
    it('should disable the repeat button if there is no episode', () => {
      const mockContextValue: PlayerContextData = {
        ...baseMockContext,
        episodeList: [],
      };

      render(
        <PlayerContext.Provider value={mockContextValue}>
          <Player />
        </PlayerContext.Provider>
      );

      expect(screen.getByRole('button', { name: /repetir/i })).toBeDisabled();
    });

    it('should enable the repeat button if there is an episode', () => {
      const mockContextValue: PlayerContextData = {
        ...baseMockContext,
        episodeList: [
          createEpisode({
            id: `podcast-1`,
            title: `Podcast 1`,
            description: `Descrição do podcast 1`,
          }),
        ],
      };

      render(
        <PlayerContext.Provider value={mockContextValue}>
          <Player />
        </PlayerContext.Provider>
      );

      expect(screen.getByRole('button', { name: /repetir/i })).toBeEnabled();
    });

    it('should call toggleLoop() from context if user clicks on the repeat button', () => {
      const mockContextValue: PlayerContextData = {
        ...baseMockContext,
        episodeList: [
          createEpisode({
            id: `podcast-1`,
            title: `Podcast 1`,
            description: `Descrição do podcast 1`,
          }),
        ],
      };

      render(
        <PlayerContext.Provider value={mockContextValue}>
          <Player />
        </PlayerContext.Provider>
      );

      userEvent.click(screen.getByRole('button', { name: /repetir/i }));
      expect(mockContextValue.toggleLoop).toHaveBeenCalled();
    });
  });
});
