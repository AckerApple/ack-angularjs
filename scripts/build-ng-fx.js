var jspmResolve = require('jspm-resolve')
var path = require('path')
var fs = require('fs')
var ngFxPath = require.resolve('ng-fx')
var outPath = path.join(__dirname,'../','src','ng-fx-build.js')

ngFxPath = path.join(ngFxPath, '../', '../', 'dist','ng-fx.min.js')

var read = fs.readFileSync(ngFxPath)

var write = 'import angular from "angular";\n'
write += 'var exports = {};\n' + read

fs.writeFileSync(outPath, write)
