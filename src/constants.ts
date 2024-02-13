export const ENVIRONMENT = process.env.ENVIRONMENT || '';
export const API_HOST = process.env.API_HOST || '';
export const API_PORT = process.env.API_PORT || '';
export const API = process.env.API || '';

export enum LOGO_TYPE {
  WHITE = '',
  PINK = '-pink',
}

export enum EVENT {
  CHANGE_COMPLETE = 'routeChangeComplete',
  SCROLL = 'scroll',
  RESIZE = 'resize',
  CLICK = 'click',
  CLOSE_IFRAME = 'close-iframe',
}

export enum BUTTON_TYPE {
  BUTTON = 'button',
  SUBMIT = 'submit',
}

export enum LINK_TYPE {
  BUTTON = 'button',
  LINK = 'link',
}

export enum HEADERS {
  // AUTHORIZATION = 'Authorization',
  COOKIE = 'Cookie',
  // SESSIONID = 'SESSIONID',
  CONTENT_TYPE = 'Content-Type',
  SITE_URL = 'SITE_URL',
}

export enum RESPONSE_STATUS {
  OK = 200, //'ok',
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
  //ERROR = 'error',
}

export enum COOKIE {
  COOKIES_ACCESS = 'cookies_access',
  COOKIES_NECESSARY = 'cookies_necessary',
}
