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
  entry: "./entry.js",
  output: {
    path: path.join(__dirname,'test'),
    filename: "ack-angular.js"
    //,publicPath:"test/"
  },
  module: {loaders:loaders}
}

var dist = {
  entry: "./entry.js",
  output: {
    path: path.join(__dirname,'dist'),
    filename: "ack-angular.js"
    //,publicPath:"dist/"
  },
  module: {loaders:loaders}
}

var package = {
  entry: "./entry.js",
  output: {
    path: path.join(__dirname),
    filename: "ack-angular.js"
    //,publicPath:"dist/"
  },
  module: {loaders:loaders}
}

var distMin = {
  entry: "./entry.js",
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

module.exports = [test,dist,distMin,package];