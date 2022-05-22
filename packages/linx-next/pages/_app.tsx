import { AppProps } from 'next/app';
import Head from 'next/head';
import { NextPage } from 'next/types';
import { ReactElement, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import '../styles/global.scss';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const theme = {
  white: '#F9F9F9',
  primary: '#00B9AE',
  highlight: '#21242D',
  background: '#16181E',
};
function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Head>
        <title>Lynx - link sharing platform</title>
      </Head>
      <ThemeProvider theme={theme}>
        <main className="app">{getLayout(<Component {...pageProps} />)}</main>
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
