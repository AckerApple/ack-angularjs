"use strict"

module.exports = injector

/**
  Greatly reduces steps required to properly satisfy angular dependency injections

  Example:
    var inject = injector(MyClass, ['$scope','$http']);
    function MyClass(){
      inject(this, arguments)
      console.log(this.$scope, this.$http)
    }
*/
function injector(jsClass, depArray){
  jsClass.$inject = depArray
  return function(ths, args){
    for(var x=depArray.length-1; x >= 0; --x){
      var name = depArray[x]
      if(args[x]){
        ths[name] = args[x]
      }
    }
  }
}
