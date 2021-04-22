export const appConfig = {
  primaryColor: 'rgba(241,80,36,1)',
  secondaryColor: 'white',
  textColor: 'black',
  loginTextColor: 'white',
  headerColor: '#DEDBD7',
  headerLogoUrl:
    'https://le-de.cdn-website.com/035329bdfa684613b56908a723e38cdf/dms3rep/multi/opt/Plathin-Kroneld_logoLARGER-720w.png',
  defaultLocale: 'en',
  apiPath: 'https://asia-south1-plathinkroneld.cloudfunctions.net/api', // P&K API Path
  identityServerBaseUrl: 'https://asia-south1-plathinkroneld.cloudfunctions.net',
  infoColor: '#DEDBD7',
  timeoutSetting: 500,
  fontFamily: 'Poppins-Regular',
  identityConfig: {
    client_id: 'client_id',
    client_secret: 'client_secret',
    grant_type: 'client_credentials',
    scope: 'API',
    authority: 'https://asia-south1-plathinkroneld.cloudfunctions.net',
  },
};
