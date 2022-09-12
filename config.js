module.exports = {
  SANDBOX: {
    clientId: process.env.CLIENT_ID_SANDBOX,
    clientSecret: process.env.CLIENT_SECRET_SANDBOX,
    devid: process.env.DEV_ID_SANDBOX,
    redirectUri: process.env.REDIRECT_URI_SANDBOX,
    baseUrl: 'api.sandbox.ebay.com',
  },
  PRODUCTION: {
    clientId: process.env.CLIENT_ID_PRODUCTION,
    clientSecret: process.env.CLIENT_SECRET_PRODUCTION,
    devid: process.env.DEV_ID_PRODUCTION,
    redirectUri: process.env.REDIRECT_URI_PRODUCTION,
    baseUrl: 'api.ebay.com',
  },
};
