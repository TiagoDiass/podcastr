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

  playList: (list: Episode[], index: number) => void;
  playNextEpisode: () => void;
  playPreviousEpisode: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
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

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = currentEpisodeIndex + 1 < episodeList.length;

  function playNextEpisode() {
    const nextEpisodeIndex = currentEpisodeIndex + 1;

    if (hasNext) {
      setCurrentEpisodeIndex(nextEpisodeIndex);
    }
  }

  function playPreviousEpisode() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
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

        playList,
        playNextEpisode,
        playPreviousEpisode,
        hasNext,
        hasPrevious,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayerContext = () => useContext(PlayerContext);
