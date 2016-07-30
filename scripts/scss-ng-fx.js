var path = require('path')
var ackSass = require('ack-sass')

var filePath = path.join(__dirname,'scss','ng-fx','ng-fx.scss')
var outFilePath = path.join(__dirname,'../','scss','ng-fx.scss')

console.log('compiling ng-fx sass')

module.exports = ackSass.compileFile(filePath, outFilePath, {sourceMap:false})
.then(()=>console.log('compiling ng-fx completed'))
.catch(err=>console.log(err))