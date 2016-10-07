/**
  Greatly reduces steps required to properly satisfy angular dependency injections

  Example:
    var inject = injector(MyClass, ['$scope','$http']);
    function MyClass(){
      inject(arguments, this)
      console.log(this.$scope, this.$http)
    }
*/
export default function injector(jsClass, depArray){
  jsClass.$inject = depArray
  return jsClass.inject = function(args, thIs){
    thIs = thIs || {}
    for(var x=depArray.length-1; x >= 0; --x){
      if(args[x])thIs[ depArray[x] ] = args[x]
    }
    return thIs
  }
}
