/** @prettier */

const DIST_DIR = 'docs';
const PORT = 3000;
const APP_TITLE = '30sec';
const A_DAY = 60 * 60 * 24;

const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const autoprefixer = require('autoprefixer');
const HTMLPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const IS_DEVS = process.env.NODE_ENV === 'development';

const plugins = [
  new HTMLPlugin({
    title: APP_TITLE,
    color: '#b6fbfb',
    filename: 'index.html',
    template: 'src/html/index.html'
  })
];

if (!IS_DEVS) {
  plugins.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 8,
        output: {
          comments: 'some'
        }
      }
    }),
    new webpack.BannerPlugin(
      `${pkg.name} v${pkg.version} ${pkg.author} | ${pkg.license}`
    ),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src', 'img'),
        to: path.resolve(__dirname, DIST_DIR, 'img')
      },
      {
        from: path.resolve(__dirname, 'src', 'json', 'manifest.json'),
        to: path.resolve(__dirname, DIST_DIR)
      }
    ]),
    new WorkboxPlugin.GenerateSW({
      runtimeCaching: [
        {
          urlPattern: '/30sec/',
          handler: 'cacheFirst',
          options: {
            cacheName: 'top-page-cache',
            expiration: {
              maxAgeSeconds: A_DAY * 14
            }
          }
        },
        {
          urlPattern: /\/30sec\/js\/.+/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'scripts-cache',
            expiration: {
              maxAgeSeconds: A_DAY * 14
            }
          }
        },
        {
          urlPattern: /\.(png|jpe?g|svg)/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'assets',
            expiration: {
              maxAgeSeconds: A_DAY * 14
            }
          }
        }
      ]
    })
  );
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    'js/main': './src/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, DIST_DIR),
    filename: '[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              url: false,
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64]',
              sourceMap: IS_DEVS
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({ browsers: ['> 5% in JP', 'last 2 versions'] })
              ],
              sourceMap: IS_DEVS ? 'inline' : false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              data: `$env: ${process.env.NODE_ENV};`,
              outputStyle: 'compressed',
              sourceMap: IS_DEVS
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  devServer: {
    contentBase: path.resolve(__dirname, DIST_DIR),
    port: PORT
  },
  devtool: IS_DEVS ? 'source-map' : false,
  optimization: {
    minimize: false
  },
  plugins: plugins
};
