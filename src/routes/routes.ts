import _ from 'lodash';

import { TJSON } from '@interfaces';
import { TRouter } from './@types';

//ссылки на страницы сайта
const routeMap = new Map([
  ['HOME', '/'],

  ['INDUSTRIES', 'industries'],
  ['SOLUTIONS', 'solutions'],
  ['ABOUT_US', 'recognition'],
  ['BOOK_DEMO', 'form'],

  ['NOT_FOUND', '/404'],
]);

export const URLS = {
  ..._.reduce(
    [...routeMap],
    (result: TJSON, value) => {
      result[value[0]] = value[1];

      return result;
    },
    {}
  ),
} as Record<string, string>;

export const mainMenu: TRouter[] = [
  {
    href: URLS.INDUSTRIES,
    title: 'Industries',
    index: 1,
  },
  {
    href: URLS.SOLUTIONS,
    title: 'Solutions',
    index: 0,
  },
  {
    href: URLS.ABOUT_US,
    title: 'About us',
  },
  {
    href: URLS.BOOK_DEMO,
    title: 'Book a Demo',
  },
];

export enum METHOD {
  GET = 'get',
  POST = 'post',
}

//ссылки для вызова сервисов
export enum URIS {
  L10N_VALUE = '/l10n/value', //under construction
  L10N_LIST = '/l10n/list', //under construction

  QUESTION = '/landing/question',

  GOOGLE_TAG_MANAGER = '/operation/config/field?key=googletagmanager&key=id',
}
