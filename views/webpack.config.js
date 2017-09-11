const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV } = process.env;
const SOURCE_PATH = path.join(__dirname, './src');
const PUBLIC_PATH = '/';

module.exports = () => {
  const plugins = [
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new webpack.HotModuleReplacementPlugin(),
  ];

  if (NODE_ENV === 'production') {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({ minimize: true })
    );
  }

  return {
    context: SOURCE_PATH,
    entry: {
      main: './index.js',
      vendor: ['react'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      publicPath: PUBLIC_PATH,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
          ],
        },
      ],
    },
    plugins,

    devServer: {
      contentBase: './src',
      port: 9000,
      hot: true,
    },
  };
};
