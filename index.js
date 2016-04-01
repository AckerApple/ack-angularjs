//version: 1.0.4
angular.module('ackAngular',['ngAnimate'])
.service('ack', function(){return ack})
.filter('ack', function(){
  return function(v,type){
    return ack[type](v)
  }
})
.directive('whiteOutModal',function(){//white-out-modal
  return {
    restrict:'E'
    ,scope:{
      show:'=', size:'='
    }
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

var ack = require('ack-x')