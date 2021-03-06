var path = require('path');
var webpack = require('webpack');
var serverConfig = require('./webpack.config.server')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var clients = require('./pages').getClient();

module.exports = [{
  name: 'client side render',
  entry: clients,
  output: {
    path: path.join(__dirname, 'www', 'static/dist'),
    filename: "[name].bundle.js",
    publicPath: '/static/dist/'
  },
  progress: true,
  module: {
    loaders: [
        {
            test: /\.json$/,
            loaders: ['json-loader']
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!css-path-loader!sass-loader')
        },
        {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!css-path-loader!less-loader')
        },
        {
            test: /\.js$/,
            loaders: ['babel', 'html-path-loader']
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
              'file?hash=sha512&digest=hex&name=[hash].[ext]',
              'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
        },
        {
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
            loaders: [
              'file?hash=sha512&digest=hex&limit=3000&name=font/[hash:8].[name].[ext]'
        ]
        }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("[name].css", {
      allChunks: true
    }),
    new webpack.ProvidePlugin({
     $: "jquery",
     jQuery: "jquery",
     "window.jQuery": "jquery"
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //  minimize: true
    // }),
],
node: {
    child_process: 'empty',
},
resolve: {
  root: [
    path.resolve('./front/'),
    path.resolve('./src/'),
    path.resolve('./node_modules/')
  ]
}
}, serverConfig]
