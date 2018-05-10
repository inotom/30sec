/** @prettier */

const DIST_DIR = 'dist';
const PORT = 3000;
const APP_TITLE = '30sec';
const A_DAY = 60 * 60 * 24;

const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const autoprefixer = require('autoprefixer');
const HTMLPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
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
    new WebpackPwaManifest({
      name: APP_TITLE,
      short_name: APP_TITLE, // eslint-disable-line camelcase
      icons: [
        {
          src: path.resolve(__dirname, 'src', 'img', 'app-icon.png'),
          sizes: [96, 128, 192, 256, 384, 512]
        }
      ],
      orientation: 'portrait-primary',
      display: 'standalone',
      start_url: 'https://inotom.github.io/30sec/' // eslint-disable-line camelcase
    }),
    new webpack.BannerPlugin(
      `${pkg.name} v${pkg.version} ${pkg.author} | ${pkg.license}`
    ),
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
