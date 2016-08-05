var path = require('path')
var ackSass = require('ack-sass')

var filePath = path.join(__dirname,'../','scss','styles.scss')
var outFilePath0 = path.join(__dirname,'../','www','styles.css')
var outFilePath1 = path.join(__dirname,'../','dist','styles.css')

var sassJspm = require('sass-jspm-importer')

var options={
  importer:[sassJspm.importer],
  functions:[sassJspm.resolve_function('/lib/')]//for sass-jspm-importer
}

console.log('compiling sass')

require('./scss-csshake')
.then(()=>require('./scss-ack-css-boot'))
.then(()=>ackSass.compileFile(filePath, outFilePath0, options))
.then(()=>ackSass.compileFile(filePath, outFilePath1, options))
.then(()=>console.log('compiling completed'))
.catch(err=>console.log(err))