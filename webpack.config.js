const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    main: './src/index.js'
  },
  output: {
    pathinfo: true,
    path: __dirname + '/public',
    filename: 'tictactoe.js'
  },
  resolve: {
    modulesDirectories: [ 'node_modules' ],
    extensions: [ '', '.js', '.jsx', '.css' ]
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.(css)$/,
        loader: ExtractTextPlugin.extract('css-loader?modules&localIdentName=tictactoe_[local]&sourceMap!postcss?sourceMap=inline')
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({ 'React': 'react' }),
    new ExtractTextPlugin('tictactoe.css')
  ],
  devtool: 'source-map'
};
