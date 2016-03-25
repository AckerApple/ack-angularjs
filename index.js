//version: 1.0.0
angular.module('ackAngular',[])
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
        if($scope.wom.show && event.srcElement==jElm[0].childNodes[0]){
          $scope.wom.show = null
          $scope.$apply()
          jElm.children().eq(0).off('click', handler)
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
