const { NODE_ENV = 'dev' } = process.env;

const config = {
  common: {
    development: {
      baseAPIURL: 'http://localhost:8080/api/v1',
    },
  },
};

export default { ...config.common, ...config[NODE_ENV] };
