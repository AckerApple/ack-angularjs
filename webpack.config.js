var path = require('path')
var webpack = require('webpack')

var loaders = [
  { test: /\.jade$/, loader: "jade-loader",exclude:/node_modules/ },
  { test: /\.css$/, loader: "style-loader!css-loader",exclude:/node_modules/ }/*,
  { test: /\.json$/, loader: "json-loader" },

  { test: /\.png$/, loader: "url-loader?limit=300000"},
  { test: /\.jpg$/, loader: "file-loader" },

  { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
  { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
  */
]

var test = {
  entry: "./webpack/entry-test.js",
  devtool:"#source-map",
  output: {
    path: path.join(__dirname,'test'),
    filename: "test.js"
    //,publicPath:"test/"
  },
  module: {loaders:loaders}
}

var dist = {
  entry: "./webpack/entry.js",
  devtool:"#source-map",
  output: {
    path: path.join(__dirname,'dist'),
    filename: "ack-angular.js"
    //,publicPath:"dist/"
  },
  module: {loaders:loaders}
}

var distWithFx = {
  entry: "./webpack/entry-with-fx.js",
  devtool:"#source-map",
  output: {
    path: path.join(__dirname,'dist'),
    filename: "ack-angular-with-fx.js"
    //,publicPath:"dist/"
  },
  module: {loaders:loaders}
}

var distWithFxMin = {
  entry: "./webpack/entry-with-fx.js",
  devtool:"#source-map",
  output: {
    path: path.join(__dirname,'dist'),
    filename: "ack-angular-with-fx-min.js"
    //,publicPath:"dist/"
  },
  module: {loaders:loaders},
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
}
/*
var package = {
  entry: "./webpack/entry.js",
  output: {
    path: path.join(__dirname),
    filename: "ack-angular.js"
    //,publicPath:"dist/"
  },
  module: {loaders:loaders}
}
*/
var distMin = {
  entry: "./webpack/entry.js",
  devtool:"#source-map",
  output: {
    path: path.join(__dirname,'dist'),
    filename: "ack-angular-min.js"
    //,publicPath:"dist/"
  },
  module: {loaders:loaders},
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
}

module.exports = [test,dist,distMin,distWithFx,distWithFxMin];//,package