import '@scss/index.scss';

import type { AppProps } from 'next/app';
import { NextHead } from '@components/NextHead';
import { BodyScripts } from '@components/BodyScripts';
import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { getCookie } from '@utils';
import { COOKIE } from '@src/constants';

type TCookiesContext = Record<'hasCookiesAccess', string | void> &
  Record<'setHasCookiesAccess', Dispatch<SetStateAction<string | void>>>;

export const CookiesContext = createContext({} as TCookiesContext);

function App(props: AppProps) {
  const { Component, pageProps } = props;
  const { title, meta, ...restProps } = pageProps;
  const [hasCookiesAccess, setHasCookiesAccess] = useState(
    getCookie(COOKIE.COOKIES_ACCESS)
  );

  return (
    <>
      <CookiesContext.Provider
        value={{ hasCookiesAccess, setHasCookiesAccess }}
      >
        <NextHead title={title} meta={meta} />
        <Component {...restProps} />
      </CookiesContext.Provider>
      <BodyScripts />
    </>
  );
}

export default App;
