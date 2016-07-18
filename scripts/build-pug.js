var ackPug = require("ack-pug-bundler")
var path = require("path")
var folderPath = path.join(__dirname,"../","src")

//pug files written with ecma6 export syntax
ackPug.crawlPath(folderPath, null, {outType:'ecma6'})

console.log('[ack-pug-bundler]:watching', folderPath)