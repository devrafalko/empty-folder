const path = require('path');
const merge = require('webpack-merge').merge;
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const common = {
  entry: {
    index:'./index.js'
  },
  output: {
    filename: 'empty-folder.node.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  target:'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

const prod = {
  mode: 'production',
  watch: false,
  stats:false,
  optimization: {
    minimizer: [new TerserPlugin()]
  }
};

const dev = {
  mode: 'development',
  watch: true,
  stats:{
    version: false,
    colors: true,
    warnings: false,
    assets: true,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    depth: false,
    entrypoints: false,
    errors: true,
    errorDetails: true,
    hash: false,
    modules: false,
    providedExports: false,
    publicPath: false,
    timings: true,
    usedExports: false
  }
};

module.exports = (env) => merge(common, env.prod ? prod : dev);