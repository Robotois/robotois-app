const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'src/dist'),
    hot: true,
  },
  entry: ['babel-polyfill', './src/client.js'],
  target: 'electron-renderer',
  output: {
    path: path.resolve(__dirname, 'src/dist'),
    filename: 'bundle.js',
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   title: 'Robotois UI',
    //   template: path.resolve(__dirname, 'src/dist/index.html'),
    //   inject: 'body',
    // }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
        }],
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
    ],
  },
};
