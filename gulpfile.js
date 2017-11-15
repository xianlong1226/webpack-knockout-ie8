var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var CommandTask = require('gulp-command-task');
var webpack = require('webpack');

var WebpackDevConfig = require('./webpack.dev.config.js');
var WebpackProdConfig = require('./webpack.prod.config.js');

gulp.task('default', ['debug:inline']);

//开发环境：启动服务器（inline模式）
gulp.task('debug:inline', function () {
  var cmdTask = new CommandTask('webpack-dev-server -d --inline --color --config ./webpack.dev.config.js', '.')
  cmdTask.tuneOutput('none');
  cmdTask.start()
})

// 开发环境：启动服务器（iframe模式）
gulp.task('debug:iframe', function () {
  var WebpackDevServer = require('webpack-dev-server');
  var config = WebpackDevConfig;
  new WebpackDevServer(webpack(config), config.devServer)
    .listen(config.devServer.port, '0.0.0.0', function (err) {
      if (err) {
        throw new gutil.PluginError('webpack-dev-server', err);
      }
      gutil.log('[webpack-dev-server]', 'http://localhost:' + config.devServer.port + '/webpack-dev-server/[your-page-name]');
    });
});

// 生产环境： 使用webpack编译
gulp.task('prod:build', ['clean'], function (callback) {
  var config = WebpackProdConfig;
  webpack(config, function (err, stats) {
    if (err) {
      throw new gutil.PluginError('prod: build-webpack', err);
    }
    gutil.log('[prod: build-webpack]', stats.toString({
      colors: true
    }));
    callback();
  });
});

// 清空上次编译结果
gulp.task('clean', function () {
  var config = WebpackProdConfig;
  return gulp.src([
    config.output.path + '/*.html',
    config.output.path + '/assets/'
  ]).pipe(clean({force: true}));
});
