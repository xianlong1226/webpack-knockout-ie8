var config = require('./webpack.base.config.js');
config.devServer = {
  host: '0.0.0.0',
  port: 8082,
  publicPath: '/',
  stats: {
    colors: true
  },
  proxy: require('./locals').proxy,
  inline: true,
  disableHostCheck: true
};
config.progress = true;
config.colors = true;
config.devtool = 'cheap-module-eval-source-map';
config.debug = true;

module.exports = config;