import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Lexend:wght@300;500;600&display=swap'
            rel='stylesheet'
          />

          <link rel='icon' href='/favicon.png' type='image/png' />

          <meta property='og:image' content='/thumbnaill.png' />

          <meta
            name='description'
            content='Podcastr | Os melhores podcasts de tecnologia para você ouvir!'
          />

          <meta
            property='og:title'
            content='Podcastr | Os melhores podcasts de tecnologia para você ouvir!'
          />

          <meta
            property='og:description'
            content='Podcastr é um website onde você pode ouvir os melhores e mais diversos podcasts sobre tecnologia.'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
