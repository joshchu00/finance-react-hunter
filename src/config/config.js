const env = process.env.NODE_ENV;

const config = {
  environment: process.env.ENVIRONMENT || 'prod', // 'dev', 'test', 'stg', 'prod'
  hunter: {
    port: process.env.HUNTER_PORT || '50080',
  },
  porter: {
    v1: {
      scheme: process.env.PORTER_V1_SCHEME || 'http',
      host: process.env.PORTER_V1_HOST || '192.168.33.10',
      port: process.env.PORTER_V1_PORT || '51011',
    },
  },
};

export default config;
