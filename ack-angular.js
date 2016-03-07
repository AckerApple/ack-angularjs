angular.module('ackAngular',[])
.directive('whiteOutModal',function(){//white-out-modal
  var closeIcon = '<div style="position:relative;opacity:.4;" onmouseover="this.style.opacity=.7" onmouseout="this.style.opacity=.4"><div ng-click="show=false" style="cursor:pointer;font-size:190%;position:absolute;top:0;right:0;margin-right:18px;margin-top:10px;line-height:1;">x</div></div>'
  var table = closeIcon+'<table style="height:100%;" border="0" align="center"><tr><td ng-click="show=false"></td></tr><tr><td ng-transclude></td></tr><tr><td ng-click="show=false"></td></tr></table>'
  var template = '<div ng-show="show" style="position:fixed;top:0;left:0;z-index:10;height:100%;width:100%;background-color:rgba(255,255,255,.95);overflow:auto;">'+table+'</div>'
  return {
    restrict:'E'
    ,scope:{show:'='}
    ,transclude:true
    ,template:template
    ,link:function($scope, jElm, attrs){
      var handler = function(event){
        if($scope.show && event.srcElement==jElm[0].childNodes[0]){
          $scope.show = false
          $scope.$apply()
        }
      }

      var addHandler = function(){
        jElm.on('click', handler)
      }

      $scope.$watch('show',function(show){
        if(show){
          setTimeout(addHandler, 301)//delay needed to prevent immediate close
        }else{
          jElm.off('click', handler)
        }
      })
    }
  }
})
