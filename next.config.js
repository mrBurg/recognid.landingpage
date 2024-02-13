module.exports = {
  reactStrictMode: true,
  env: {
    ENVIRONMENT: process.env.ENVIRONMENT,
    PROJECT_HOST: process.env.PROJECT_HOST,
    API_HOST: process.env.API_HOST,
    API_PORT: process.env.API_PORT,
    API: process.env.API,
  },

  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
    domains: [
      {
        domain: 'https://recognid.com',
        defaultLocale: 'en-US',
      },
    ],
    localeDetection: false,
  },

  assetPrefix: '/landing',
  rewrites() {
    return [{ source: '/landing/_next/:path*', destination: '/_next/:path*' }];
  },
};
