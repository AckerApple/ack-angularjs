//import angular from 'angular'
import ack from 'ack-x/dist/ack-x-min'
import whiteOutModalTemplate from './white-out-modal.pug'
import AckApi from './ack-api.service'
import AckOffline from './ack-offline.service'

import ngFx from './ng-fx-build'
import 'angular-animate'

//version: 1.5.2
export default angular.module('ack-angular', ['ngAnimate','ng-fx'])
.service('ack', function(){return ack})
.service('AckOffline', AckOffline)
.service('AckApi', AckApi)

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

.directive('shakeOn', function($timeout) {
  return {
    restrict:'A',
    scope:{},
    bindToController:{
      shakeOn:'=?', shakeForMs:'=?', shakeType:'=?', shakeThen:'&', shakeController:'=?'
    },
    controller:shakeOn,
    controllerAs:'shakeOnController',
    link: function($scope, element, attrs) {
      function onTrue(){
        element.addClass('shake-constant')
        element.addClass($scope.shakeOnController.shakeType)

        $timeout(function() {
          $scope.shakeOnController.shakeThen()
          //$scope.shakeOnController.shakeOn = false
          element.removeClass('shake-constant')
          element.removeClass($scope.shakeOnController.shakeType)
          $scope.$apply()
        }, $scope.shakeOnController.shakeForMs);
      }

      function onChange(value) {
        if(value) {
          onTrue()
        }else{
          element.removeClass('shake-constant')
          element.removeClass($scope.shakeOnController.shakeType)
        }
      }

      function watch(){
        return $scope.shakeOnController.shakeOn
      }

      $scope.$watch(watch, onChange);
    }
  };
})

.directive('shakeModel', function($timeout) {
  return {
    restrict:'A',
    scope:{},
    bindToController:{
      shakeModel:'=?', shakeForMs:'=?', shakeType:'=?', shakeController:'=?'
    },
    controller:shakeOn,
    controllerAs:'shakeModelController',
    link: function($scope, element, attrs) {
      $scope.shakeModelController.shakeForMs = $scope.shakeModelController.shakeForMs || 2000
      $scope.shakeModelController.shakeType = $scope.shakeModelController.shakeType || 'shake-slow'

      function onTrue(){
        element.addClass('shake-constant')
        element.addClass($scope.shakeModelController.shakeType)

        $timeout(function() {
          $scope.shakeModelController.shakeModel = false
          element.removeClass('shake-constant')
          element.removeClass($scope.shakeModelController.shakeType)
          $scope.$apply()
        }, $scope.shakeModelController.shakeForMs);
      }

      function onChange(value) {
        if(value) {
          onTrue()
        }else{
          element.removeClass('shake-constant')
          element.removeClass($scope.shakeModelController.shakeType)
        }
      }

      function watch(){
        return $scope.shakeModelController.shakeModel
      }

      $scope.$watch(watch, onChange);
    }
  };
})

.directive('selectOn', function($timeout) {
  return {
    scope:{},
    bindToController:{
      selectOn:'&', selectOnDelay:'=?', selectThen:'&'
    },
    controller:function(){},
    controllerAs:'selectOnController',
    link: function($scope, element, attrs) {
      $scope.selectOnController.selectOnDelay = $scope.selectOnController.selectOnDelay || 0
      $scope.$watch(function(){
        return $scope.selectOnController.selectOn()
      }, function(value) {
        if(value === true) {
          $timeout(function() {
            element[0].select();
            $scope.selectOnController.selectThen();
          },$scope.selectOnController.selectOnDelay);
        }
      });
    }
  };
})

.directive('focusOn', function($timeout) {
  return {
    scope:{},
    bindToController:{
      focusOn:'&', focusOnDelay:'=?', focusThen:'&'
    },
    controller:function(){},
    controllerAs:'focusOnController',
    link: function($scope, element, attrs) {
      $scope.focusOnController.focusOnDelay = $scope.focusOnController.focusOnDelay || 0
      $scope.$watch(function(){
        return $scope.focusOnController.focusOn()
      }, function(value) {
        if(value === true) {
          $timeout(function() {
            element[0].focus();
            $scope.focusOnController.focusThen();
          },$scope.focusOnController.focusOnDelay);
        }
      });
    }
  };
})

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
    scope:{},
    bindToController:{onEnterKey:'&'},//onEnterKey({event}) ... event.preventDefault()
    controller:function(){},
    controllerAs:'onEnterKeyController',
    link: function($scope, jElm) {
      jElm[0].onkeydown = function(event){
        var yesNo = [13,10].indexOf(event.which||event.keyCode)>=0
        if(yesNo){
          $scope.onEnterKeyController.onEnterKey({event:event})
          $scope.$apply()
        }
      }
    }
  }
})

/** Disallow keyboard access to the backspace key */
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
    ,template:whiteOutModalTemplate
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
}).name

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

function trustAsHtml($sce){
  return function(text){
    if(!text || !text.toLowerCase)return '';
    return $sce.trustAsHtml(text);
  };
}
trustAsHtml.$inject = ['$sce']


function shakeOn(){
  this.shakeForMs = this.shakeForMs || 2000
  this.shakeType = this.shakeType || 'shake-slow'
  this.shakeController = this
  this.shakeTypes = ['shake-hard','shake-slow','shake-little','shake-horizontal','shake-vertical','shake-rotate','shake-opacity','shake-crazy']
}