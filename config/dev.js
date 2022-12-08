const proxy = require('./proxy-config').default;

module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  defineConstants: {},
  mini: {},
  h5: {
    devServer: {
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      port: 9087,
      allowedHosts: 'all',
      proxy,
    },
  },
};
