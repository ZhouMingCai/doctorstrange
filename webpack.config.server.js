var path = require('path');
var webpack = require('webpack');

var servers = require('./pages').getServer();


module.exports = {
  name: 'server side render',
  entry: servers,
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'share'),
    filename: "[name].bundle.js",
    libraryTarget: "commonjs2",
    chunkFilename: '[name].[id].bundle.js',
    publicPath: '/static/dist/'
  },
  externals: /^[a-z\-0-9\/]+$/,
  module: {
    loaders: [
        {
            test: /\.json$/,
            loaders: ['json-loader']
        },
      {
        test: /\.(css|less|scss|sass)$/,
        loaders: ['ignore-stylesheet']
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
      new webpack.ProvidePlugin({
       $: "jquery",
       jQuery: "jquery",
       "window.jQuery": "jquery"
      }),
    //   new webpack.optimize.UglifyJsPlugin({
    //    minimize: true
    //   }),
],
node: {
    child_process: 'empty'
},
resolve: {
  root: [
    path.resolve('./front/'),
    path.resolve('./src/'),
    path.resolve('./node_modules/')
  ]
}
}
