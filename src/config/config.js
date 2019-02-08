const env = process.env.NODE_ENV;

const config = {
  environment: process.env.ENVIRONMENT || 'prod', // 'dev', 'test', 'stg', 'prod'
  hunter: {
    port: process.env.HUNTER_PORT || '50080',
  },
  shielder: {
    proxy: {
      scheme: process.env.SHIELDER_PROXY_SCHEME || 'http',
      host: process.env.SHIELDER_PROXY_HOST || '192.168.33.10',
      port: process.env.SHIELDER_PROXY_PORT || '58080',
    },
  },
};

export default config;
