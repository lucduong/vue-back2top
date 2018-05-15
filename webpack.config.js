const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const {
  VueLoaderPlugin
} = require('vue-loader');

var config = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname + '/dist/'),
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            sass: ExtractTextPlugin.extract({
              fallback: "vue-style-loader",
              use: [{
                loader: "css-loader"
              }]
            })
          }
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  optimization: {
    minimize: true
  }
};


module.exports = [
  merge(config, {
    entry: path.resolve(__dirname + '/src/plugin.js'),
    output: {
      filename: 'vue-back2top.min.js',
      libraryTarget: 'window',
      library: 'VueBack2Top',
    }
  }),
  merge(config, {
    entry: path.resolve(__dirname + '/src/index.vue'),
    output: {
      filename: 'vue-back2top.js',
      libraryTarget: 'umd',
      library: 'vue-back2top',
      umdNamedDefine: true
    }
  })
];
