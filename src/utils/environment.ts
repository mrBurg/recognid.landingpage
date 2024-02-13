import { ENVIRONMENT } from '@src/constants';
export const isDev = ENVIRONMENT === 'development';
export const isTest = ENVIRONMENT == 'test';
export const isProd = ENVIRONMENT == 'production';
export const env = (() => {
  switch (true) {
    case isTest:
      return 'test';
    case isProd:
      return 'prod';
  }
})();

//export const isBrowser: boolean = process.browser;
export const isBrowser: boolean = typeof window !== String(void 0);
