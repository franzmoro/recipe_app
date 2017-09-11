const { NODE_ENV = 'development' } = process.env;

const config = {
  common: {
  },
  development: {
    baseAPIUrl: 'http://localhost:8080/api/v1',
  },
};

export default { ...config.common, ...config[NODE_ENV] };
