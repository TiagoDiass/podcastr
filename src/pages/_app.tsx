import styled, { ThemeProvider } from 'styled-components';
import Head from 'next/head';

import GlobalStyles from 'styles/global';
import { Header, Player } from 'components';
import { PlayerContextProvider } from 'contexts/Player.context';
import { useState } from 'react';
import themes from 'styles/themes';

const AppWrapper = styled.div`
  display: flex;
  main {
    flex: 1;
  }
`;

export default function App({ Component, pageProps }) {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  const theme = themes[currentTheme];

  function changeTheme() {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  return (
    <>
      <Head>
        <title>Podcaster</title>
      </Head>
      <ThemeProvider theme={theme}>
        <PlayerContextProvider>
          <AppWrapper>
            <GlobalStyles />
            <main>
              <Header onThemeChange={changeTheme} />
              <Component {...pageProps} />
            </main>

            <Player />
          </AppWrapper>
        </PlayerContextProvider>
      </ThemeProvider>
    </>
  );
}
