"use strict"

var ack = require('ack-x/index-browser')

//version: 1.2.1
angular.module('ack-angular',['ngAnimate','ng-fx'])
.service('ack', function(){return ack})
.filter('aMethod',a('method'))
.filter('aFunction',a('method'))//alias
.filter('aDate',a('date'))
.filter('aTime',a('time'))
.filter('ack', function(){
  return invokeRotator(ack)
})
.filter('capitalize', capitalize)
.filter('capitalizeWords', capitalizeWords)
.directive('modelDisplay', function() {
  return {
    restrict:'A',
    require: 'ngModel',
    scope: {
      modelDisplay: "@"//will be evaled
    },
    link: function($scope, element, attrs, ngModelController) {
      ngModelController.$parsers.push(function(data) {
        return $scope.$parent.$eval( $scope.modelDisplay )
      });

      ngModelController.$formatters.push(function(data) {
        return $scope.$parent.$eval( $scope.modelDisplay )
      });
    }
  }
})
.directive('onEnterKey', function() {
  return {
    restrict:'A',
    scope:{onEnterKey:'&'},//onEnterKey({event}) ... event.preventDefault()
    link: function($scope, jElm) {
      jElm[0].onkeydown = function(event){
        var yesNo = [13,10].indexOf(event.which||event.keyCode)>=0
        if(yesNo){
          $scope.onEnterKey({event:event})
          $scope.$apply()
        }
      }
    }
  }
})
.directive('preventBackKey', function() {
  return {
    restrict:'AE',
    link: function($scope, jElm) {
      jElm[0].onkeydown = function(event){
        var yesNo = [8].indexOf(event.which||event.keyCode)<0
        if(!yesNo && event.preventDefault){
          event.preventDefault()
        }
        return yesNo
      }
    }
  }
})
.directive('preventEnterKey', function() {
  return {
    restrict:'AE',
    link: function($scope, jElm) {
      jElm[0].onkeydown = function(event){
        var yesNo = [13,10].indexOf(event.which||event.keyCode)<0
        if(!yesNo && event.preventDefault){
          event.preventDefault()
        }
        return yesNo
      }
    }
  }
})
.directive('whiteOutModal',function(){//white-out-modal
  return {
    restrict:'E'
    ,scope:{show:'=', size:'=?'}
    ,transclude:true
    ,template:require('./white-out-modal.jade')
    ,bindToController:true
    ,controllerAs:'wom'
    ,controller:function(){}
    ,link:function($scope, jElm, attrs){
      var handler = function(event){
        //already showing
        var jTar = jElm.children().eq(0)
        var eTar = event.srcElement || event.toElement || event.target
        if($scope.wom.show && eTar==jTar[0]){
          $scope.wom.show = null
          $scope.$apply()
          jTar.off('click', handler)
        }
      }

      var addHandler = function(){
        jElm.children().eq(0).on('click', handler)
      }

      $scope.$watch('wom.show',function(show){
        if(show){
          setTimeout(addHandler, 301)//delay needed to prevent immediate close
        }
      })
    }
  }
})

function a(name){
  return ['ack',function(ack){
    return invokeRotator( ack[name] )
  }]
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
