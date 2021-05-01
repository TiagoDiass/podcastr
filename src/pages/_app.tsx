import styled from 'styled-components';
import Head from 'next/head';
import { useState } from 'react';

import GlobalStyles from 'styles/global';
import { Header, Player } from 'components';
import PlayerContext from 'contexts/Player.context';
import { Episode } from '@types';

const AppWrapper = styled.div`
  display: flex;
  main {
    flex: 1;
  }
`;

export default function App({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  return (
    <>
      <Head>
        <title>Podcaster</title>
      </Head>
      <PlayerContext.Provider
        value={{ episodeList, currentEpisodeIndex, play, isPlaying, togglePlay, setPlayingState }}
      >
        <AppWrapper>
          <GlobalStyles />
          <main>
            <Header />
            <Component {...pageProps} />
          </main>

          <Player />
        </AppWrapper>
      </PlayerContext.Provider>
    </>
  );
}
