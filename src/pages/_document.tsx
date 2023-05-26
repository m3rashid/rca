import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta
          property='twitter:image'
          content='https://www.shiblirca.in/logo.png'
        />
        <meta
          property='twitter:card'
          content='https://www.shiblirca.in/logo.png'
        />
        <meta property='og:image' content='https://www.shiblirca.in/logo.png' />
        <meta
          property='twitter:title'
          content='Shibli RCA - Residential Coaching Academy'
        />
        <meta
          property='og:title'
          content='Shibli RCA - Residential Coaching Academy'
        />
        <meta
          property='description'
          content='The Shibli Residential Coaching Academy is a community led
            initiative under the overall supervision of Azamgarh foundation. We
            at Shibli RCA, aims provide free residential coaching academy for
            the civil services aspirants belonging to the economically weaker
            sections among Muslim minority community.'
        />
        <meta
          property='twitter:description'
          content='The Shibli Residential Coaching Academy is a community led
            initiative under the overall supervision of Azamgarh foundation. We
            at Shibli RCA, aims provide free residential coaching academy for
            the civil services aspirants belonging to the economically weaker
            sections among Muslim minority community.'
        />
        <meta
          property='og:description'
          content='The Shibli Residential Coaching Academy is a community led
            initiative under the overall supervision of Azamgarh foundation. We
            at Shibli RCA, aims provide free residential coaching academy for
            the civil services aspirants belonging to the economically weaker
            sections among Muslim minority community.'
        />
        <meta property='og:url' content='https://shiblirca.in' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
