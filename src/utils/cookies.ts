import _ from 'lodash';
import { TJSON } from '@interfaces';
import { isBrowser } from './environment';

type TCookieData = { path: string; expires: number };

export function setCookie(
  name: string,
  value: any,
  cookieData?: TCookieData | string | number
): void {
  const date = new Date();
  const data = `${name}=${value}`;
  let cookiePath = 'path=/';
  let dateExpires = '';
  let cookie = {
    path: '',
    expires: 0,
  };

  if (cookieData) {
    switch (true) {
      case _.isString(cookieData):
        cookiePath = `path=${cookieData}`;

        break;
      case _.isNumber(cookieData):
        date.setTime(date.getTime() + +cookieData * 24 * 60 * 60 * 1000);

        dateExpires = `expires=${date.toUTCString()}`;
        break;
      case _.isPlainObject(cookieData):
        cookie = cookieData as TCookieData;

        if (cookie.path) {
          cookiePath = cookie.path;
        }

        if (cookie.expires) {
          date.setTime(date.getTime() + cookie.expires * 24 * 60 * 60 * 1000);

          dateExpires = `expires=${date.toUTCString()}`;
        }
        break;
    }
  }

  document.cookie = `${data};${cookiePath};${dateExpires}`;
}

export function getCookie(name: string): string | void {
  const cookies = {} as TJSON;

  if (isBrowser) {
    const cookiesData = decodeURIComponent(document.cookie).split('; ');

    _.each(cookiesData, (part: string): void => {
      const [name, data] = part.split('=');

      cookies[name] = data;
    });

    if (Object.hasOwnProperty.call(cookies, name)) {
      return cookies[name] as string;
    }
  }

  return '';
}

export function delCookie(name: string): void {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}

export function clearCookie(): void {
  const cookies = document.cookie.split(';');

  _.each(cookies, (cookie) => {
    const [name] = cookie.split('=');

    delCookie(name);
  });
}
