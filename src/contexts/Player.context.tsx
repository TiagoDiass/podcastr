import { Episode } from '@types';
import { createContext, ReactNode, useContext, useState } from 'react';

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;

  isPlaying: boolean;
  play: (episode: Episode) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;

  isLooping: boolean;
  toggleLoop: () => void;

  isShuffling: boolean;
  toggleShuffle: () => void;

  playList: (list: Episode[], index: number) => void;
  playNextEpisode: () => void;
  playPreviousEpisode: () => void;
  hasNext: boolean;
  hasPrevious: boolean;

  clearPlayerState: () => void;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode;
};

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  // function that will be called on the episode page because there is only one episode
  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  // function that will be called on the home page because there is a list of episodes
  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  const hasPrevious = !isShuffling && currentEpisodeIndex > 0;
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

  function playNextEpisode() {
    const nextEpisodeIndex = currentEpisodeIndex + 1;

    if (hasNext && isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(nextEpisodeIndex);
    }
  }

  function playPreviousEpisode() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,

        isPlaying,
        play,
        togglePlay,
        setPlayingState,

        isLooping,
        toggleLoop,

        isShuffling,
        toggleShuffle,

        playList,
        playNextEpisode,
        playPreviousEpisode,
        hasNext,
        hasPrevious,

        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayerContext = () => useContext(PlayerContext);
