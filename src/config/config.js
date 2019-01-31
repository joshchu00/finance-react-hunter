const env = process.env.NODE_ENV;

const config = {
  environment: process.env.ENVIRONMENT || 'prod', // 'dev', 'test', 'stg', 'prod'
  hunter: {
    port: process.env.HUNTER_PORT || '50080',
  },
  shielder: {
    scheme: process.env.SHIELDER_SCHEME || 'http',
    host: process.env.SHIELDER_HOST || '192.168.33.10',
    port: process.env.SHIELDER_PORT || '58080',
  },
};

export default config;
