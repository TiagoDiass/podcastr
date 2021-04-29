import { Header, Player } from 'components';
import GlobalStyles from 'styles/global';
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
  main {
    flex: 1;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <AppWrapper>
      <GlobalStyles />
      <main>
        <Header />
        <Component {...pageProps} />
      </main>

      <Player />
    </AppWrapper>
  );
}
