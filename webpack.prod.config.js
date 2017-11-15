var webpack = require('webpack');
var path = require('path');

var config = require('./webpack.base.config.js');
config.resolve.alias['configurations'] = path.resolve('./configurations/production');
config.devtool = 'source-map';
config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  mangle: true,
  comments: false,
  compress: {
    warnings: false
  }
}));
config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
}));
config.plugins.push(new webpack.optimize.DedupePlugin());

module.exports = config;