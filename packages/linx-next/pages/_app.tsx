import { AppProps } from 'next/app';
import { NextPage } from 'next/types';
import { ReactElement, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import AuthGate from '../auth/AuthGate';
import { UserProvider } from '../context/user.context';
import '../styles/global.scss';

type NextPageWithLayout = NextPage & {
  //Gets per page computed layout
  getLayout?: (page: ReactElement) => ReactNode;
  //Determines if page is auth protected
  requireAuth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  hasAuthCookies: boolean;
};
const theme = {
  white: '#F9F9F9',
  primary: '#00B9AE',
  background: '#16181E',
  backgroundSecondary: '#21242D',
};
function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <main className="app">
          {Component.requireAuth ? (
            <AuthGate>{getLayout(<Component {...pageProps} />)}</AuthGate>
          ) : (
            getLayout(<Component {...pageProps} />)
          )}
        </main>
      </ThemeProvider>
    </UserProvider>
  );
}

export default CustomApp;
