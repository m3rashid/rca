import 'antd/dist/reset.css';
import 'rca/styles/globals.css';
import router from 'next/router';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import AppContainer from 'rca/components/root';
import Head from 'next/head';
import Loading from 'rca/components/loading';
import { RecoilRoot } from 'recoil';

const App = ({ Component, pageProps }: AppProps) => {
  const [loading, setloading] = useState(false);
  router.events.on('routeChangeStart', () => setloading(true));
  router.events.on('routeChangeComplete', () => setloading(false));

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <SessionProvider>
        <RecoilRoot>
          <AppContainer>
            {loading ? (
              <Loading loading={loading} />
            ) : (
              <Component {...pageProps} />
            )}
          </AppContainer>
        </RecoilRoot>
      </SessionProvider>
    </>
  );
};

export default App;
