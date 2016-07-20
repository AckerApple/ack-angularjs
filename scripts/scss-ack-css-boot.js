var path = require('path')
var ackSass = require('ack-sass')

var filePath = path.join(__dirname,'scss','ack-css-boot','ack-css-boot.scss')
var outFilePath = path.join(__dirname,'../','scss','ack-css-boot.scss')

console.log('compiling ack-css-boot sass')

module.exports = ackSass.compileFile(filePath, outFilePath, {sourceMap:false})
.then(()=>console.log('compiling ack-css-boot completed'))
.catch(err=>console.log(err))