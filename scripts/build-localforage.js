var path = require('path')
var fs = require('fs')
var localForagePath = require.resolve('localforage')
var outPath = path.join(__dirname,'../','src','localforage-build.js')

localForagePath = path.join(localForagePath, '../', '../', 'dist','localforage.js')

var write = fs.readFileSync(localForagePath)
/*
var write = 'import angular from "angular";\n'
write += 'var exports = {};\n' + read
*/
fs.writeFileSync(outPath, write)
console.log('done creating localforage', outPath)