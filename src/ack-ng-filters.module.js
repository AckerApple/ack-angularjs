import ack from 'ack-x/index-browser'

export default angular.module('ack-ng-filters', [])
.filter('confirm', function(){
  return function(x){
      return confirm(x)
  }
})

.filter('typeof', function(){
  return function(x){
      return typeof(x)
  }
})

.filter('keys', function(){
  return function(x){
      if(x){
        return Object.keys(x)
      }
  }
})

.filter('yesNo', function(){
  return function(input){
    if(input==null)return input
    return input ? 'yes' : 'no';
  }
})

.filter('aMethod',a('method'))
.filter('aFunction',a('method'))//alias
.filter('aDate',a('date'))
.filter('aTime',a('time'))
.filter('ack', function(){
  return invokeRotator(ack)
})
.filter('capitalize', capitalize)//first letter capitalization
.filter('capitalizeWords', capitalizeWords)
.filter('trustAsHtml', trustAsHtml)//requires use of ng-bind-html
.filter('trustAsHTML', trustAsHtml)//requires use of ng-bind-html
.name

function a(name){
  function method(){
    return invokeRotator( ack[name] )
  }
  //method.$inject = ['ack']
  return method
}

function invokeRotator(invoke){
  return function(v,call0,call1,call2){
    var newkey, subargs, key, item, rtn = invoke(v)

    //loop extra arguments as property collectors
    for(var x=1; x < arguments.length; ++x){
      key = arguments[x]
      subargs = []

      //array where 1st arg is method and subs are positional arguments
      if(key.constructor==Array){
        newkey = key.shift()
        subargs = key
        key = newkey
      }

      item = rtn[key]

      if(item && item.constructor==Function){
        rtn = item.apply(rtn,subargs)
      }else{
        rtn = item
      }
    }

    return rtn
  }
}

/** each sentence word is capitalized */
function capitalize() {
  return function(input) {
    input = capitalizeOne(input)
    var reg = /[.?!][\s\r\t]+\w/g
    return (!!input) ? input.replace(reg, capitalizeAfterSentence) : ''
  }
}

function capitalizeAfterSentence(input){
  var reg = /[\s\r\t]\w/g
  return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0) + txt.charAt(1).toUpperCase() + txt.substr(2).toLowerCase()}) : ''
}

function capitalizeOne(input) {
  var reg = /[^\W_]+[^\s-]*/
  return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()}) : ''
}

function capitalizeWords() {
  return function(input) {
    var reg = /[^\W_]+[^\s-]* */g
    return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()}) : ''
  }
}

function trustAsHtml($sce){
  return function(text){
    if(!text || !text.toLowerCase)return '';
    return $sce.trustAsHtml(text);
  };
}
trustAsHtml.$inject = ['$sce']