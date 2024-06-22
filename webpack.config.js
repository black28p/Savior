const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  return {
    entry: {
      main: './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].bundle.js',
      chunkFilename: isProduction ? '[name].[contenthash].chunk.js' : '[name].chunk.js',
      publicPath: isProduction ? '/Savior/' : '/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'react': path.resolve(__dirname, 'node_modules/react'),
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        chunks: ['main'],
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public/404.html', to: '404.html' },
        ],
      }),
      isProduction && new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      }),
      new webpack.HotModuleReplacementPlugin(),
    ].filter(Boolean),
    devServer: {
      historyApiFallback: true,
      hot: true,
      open: true,
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: false,
      },
    },
  };
};
