const { VueLoaderPlugin } = require('vue-loader');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sass = require('sass');
const fibers = require('fibers');
const config = require('./config');

module.exports = {
  mode: config.isProduction ? 'production' : 'development',
  entry: {
    main: './src/main.ts',
  },
  target: 'web',
  output: {
    filename: config.filename,
    path: config.paths.output,
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      '~': config.paths.sources,
      '@': config.paths.sources,
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  devtool: 'source-map',
  devServer: {
    open: false,
    inline: true,
    overlay: true,
    hot: true,
    host: config.host,
    port: config.port,
    disableHostCheck: true,
    clientLogLevel: 'info',
    sockPort: config.sockPort,
    publicPath: config.paths.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
  performance: {
    // Webpack is making some presumptions, so lets stop it
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.(s?c|sa)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              sassOptions: {
                fiber: fibers,
              }
            },
          },
        ],
      },
      {
        test: /\.[tj]s$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: [config.paths.sources, config.paths.tests],
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true,
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: ['babel-loader'],
            ts: ['ts-loader!tslint-loader'],
          },
        },
      },
    ],
  },
  plugins: [
    new NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: config.paths.tsconfig,
      tslint: config.paths.tslint,
      vue: true,
      async: false,
    }),
  ],
};
