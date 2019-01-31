const env = process.env.NODE_ENV;

const config = {
  environment: process.env.ENVIRONMENT || 'prod', // 'dev', 'test', 'stg', 'prod'
  hunter: {
    port: process.env.HUNTER_PORT || '50080',
  },
  porter: {
    v1: {
      url: process.env.PORTER_V1_URL || 'http://192.168.33.10:51011',
    },
  },
};

export default config;
