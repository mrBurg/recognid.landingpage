import React, { useCallback, useContext, useEffect, useState } from 'react';

import { CookiesContext } from '@root/pages/_app';
import { COOKIE } from '@src/constants';

import { getCookie, setCookie } from '@utils';
import { WithDangerousHTML } from '@src/hocs/WithDangerousHTML';
import { ButtonWidget } from '@src/widgets/ButtonWidget';

import { TCookiesProps } from './@types';
import style from './Cookies.module.scss';

const CookiesComponent = (props: TCookiesProps) => {
  const { text, buttonAll, buttonNecessary } = props;
  const { setHasCookiesAccess } = useContext(CookiesContext);
  const [isRender, setIsRender] = useState(false);

  const hasCookies =
    getCookie(COOKIE.COOKIES_ACCESS) || getCookie(COOKIE.COOKIES_NECESSARY);

  const acceptAll = useCallback(() => {
    setCookie(COOKIE.COOKIES_ACCESS, 1, 365);
    setHasCookiesAccess(getCookie(COOKIE.COOKIES_ACCESS));
    // setIsRender(false);
  }, [setHasCookiesAccess]);

  const acceptNecessary = useCallback(() => {
    setCookie(COOKIE.COOKIES_NECESSARY, 1);
    // setHasCookiesAccess(getCookie(COOKIE.COOKIES_ACCESS));
    setIsRender(false);
  }, []);

  useEffect(() => {
    setIsRender(!hasCookies);
  }, [hasCookies]);

  /**
   * RENDER
   */

  if (isRender) {
    return (
      <div className={style.cookiesWrap}>
        <div className={style.cookies}>
          <WithDangerousHTML>
            <div className={style.textWrap}>{text}</div>
          </WithDangerousHTML>
          <div className={style.buttonsWrap}>
            <ButtonWidget
              id={`Cookies-button-acceptAll`}
              className={style.button}
              onClick={acceptAll}
              aria-label="Confirm all cookies"
              title={buttonAll}
            />
            <ButtonWidget
              id={`Cookies-button-acceptNecessary`}
              className={style.button}
              onClick={acceptNecessary}
              aria-label="Confirm necessary cookies"
              title={buttonNecessary}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const Cookies = CookiesComponent;
