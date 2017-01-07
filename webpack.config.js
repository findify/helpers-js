'use strict';

var webpack = require('webpack');

var env = process.env.NODE_ENV;
var config = {
  module: {
    loaders: [{
      test: /\.ts$/,
      loader: 'babel-loader!ts-loader',
    }],
  },
  output: {
    library: 'FindifyHelpers',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      'process.env.FINDIFY_ENV': JSON.stringify('production'),
    }),
  ],
  resolve: {
    extensions: ['', '.ts', '.js'],
  },
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;
