//version: 1.0.0
angular.module('ackAngular',[])
.directive('whiteOutModal',function(){//white-out-modal
  var closeIcon = '<div style="position:relative;opacity:.4;" onmouseover="this.style.opacity=.7" onmouseout="this.style.opacity=.4"><div ng-click="wom.show=null" style="cursor:pointer;font-size:190%;position:absolute;top:0;right:0;margin-right:18px;margin-top:10px;line-height:1;">x</div></div>'
  var table = closeIcon+'<table style="height:100%;" border="0" align="center" ng-style="{width:wom.size==\'full\'?\'100%\':null}"><tr ng-hide="wom.size==\'full\'"><td ng-click="wom.show=null"></td></tr><tr><td ng-transclude></td></tr><tr ng-hide="wom.size==\'full\'"><td ng-click="wom.show=null"></td></tr></table>'
  var template = '<div class="animate-fade" ng-show="wom.show" style="position:fixed;top:0;left:0;z-index:20;height:100%;width:100%;background-color:rgba(255,255,255,.95);overflow:auto;">'+table+'</div>'
  return {
    restrict:'E'
    ,scope:{
      show:'=', size:'='
    }
    ,transclude:true
    ,template:template
    ,bindToController:true
    ,controllerAs:'wom'
    ,controller:function(){}
    ,link:function($scope, jElm, attrs){
      var handler = function(event){
        //already showing
        if($scope.wom.show && event.srcElement==jElm[0].childNodes[0]){
          $scope.wom.show = null
          $scope.$apply()
          jElm.off('click', handler)
        }
      }

      var addHandler = function(){
        jElm.on('click', handler)
      }

      $scope.$watch('wom.show',function(show){
        if(show){
          setTimeout(addHandler, 301)//delay needed to prevent immediate close
        }
      })
    }
  }
})
