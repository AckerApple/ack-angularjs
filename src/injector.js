"use strict"

module.exports = injector

/**
  Greatly reduces steps required to properly satisfy angular dependency injections

  Example:
    var inject = injector(MyClass, ['$scope','$http']);
    function MyClass(){
      inject(arguments, this)
      console.log(this.$scope, this.$http)
    }
*/
function injector(jsClass, depArray){
  jsClass.$inject = depArray
  return function(args, ths){
    ths = ths || {}
    for(var x=depArray.length-1; x >= 0; --x){
      if(args[x])ths[ depArray[x] ] = args[x]
    }
    return ths
  }
}
