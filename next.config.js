const withTM = require('next-transpile-modules')([
  '@mui/material',
  '@mui/system',
  '@mui/icons-material',
]); // pass the modules you would like to see transpiled

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
  env: {
    NX_STATE_TYPE: 'context',
    NX_FILESTACK_KEY: 'Ach6MsgoQHGK6tCaq5uJgz',
    NX_LAYOUT: 'default',
    NX_MULTILINGUAL: 'true',
    NX_PRIMARY_COLOR: '#0A8FDC',
    NX_SECONDARY_COLOR: '#F04F47',
    NX_THEME_MODE: 'light',
    NX_NAV_STYLE: 'default',
    NX_LAYOUT_TYPE: 'full-width',
    BASE_URL: process.env.BASE_URL,
    REACT_APP_SSO_CLIENT_ID: 'f807eefabfff434bbfdae0580897a04e',
    REACT_APP_SSO_APP_CODE: 'VARS_SHOP',
    REACT_APP_SSO_SERVER_URL:
      'https://10-79-60-2.nip.io:8582/vid/web/signin/otp',
  },
});
