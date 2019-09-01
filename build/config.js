const path = require('path');

const rootDir = path.dirname(__dirname);
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  paths: {
    root: rootDir,
    output: path.resolve(rootDir, 'dist'),
    publicPath: '/',
    sources: path.resolve(rootDir, 'src'),
    tests: path.resolve(rootDir, 'test'),
    tslint: path.resolve(rootDir, 'tslint.json'),
    tsconfig: path.resolve(rootDir, 'tsconfig.json'),
  },
  filename: '[name].[chunkhash].js',
  isProduction: isProduction,
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  sockPort: process.env.PORT || 3000,
  https: process.env.HTTPS ? process.env.HTTPS : false,
  devServer:
    process.env.WEBPACK_DEV_SERVER ||
    !!process.argv.find((v) => v.indexOf('webpack-dev-server') !== -1),
};

if (config.devServer) {
  config.filename = '[name].[hash:8].js';
}

module.exports = config;
