import whiteOutModalTemplate from './white-out-modal.pug'

export default angular.module('ack-ng-directives', [])
.directive('screenWidthModel',function(){
  return {
    restrict:'A'
    ,scope:{
      screenWidthModel:'=?'
    }
    ,bindToController:true
    ,controllerAs:'screenWidthModel'
    ,controller:ScreenWidthModel
  }
})

.directive('shakeOn', shakeOnDirective)
.directive('shakeModel', shakeModel)
.directive('selectOn', selectOn)
.directive('focusOn', focusOn)

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

function shakeOn(){
  this.shakeForMs = this.shakeForMs || 2000
  this.shakeType = this.shakeType || 'shake-slow'
  this.shakeController = this
  this.shakeTypes = ['shake-hard','shake-slow','shake-little','shake-horizontal','shake-vertical','shake-rotate','shake-opacity','shake-crazy']
}

function ScreenWidthModel($window, $scope){
  this.screenWidthModel = $window.innerWidth

  const onResize = function(){
    if(this.screenWidthModel !== $window.innerWidth){
      this.screenWidthModel = $window.innerWidth
      $scope.$parent.$digest()
    }
  }.bind(this)

  function cleanUp() {
    angular.element($window).off('resize', onResize)
  }

  angular.element($window).on('resize', onResize)
  $scope.$on('$destroy', cleanUp)

}
ScreenWidthModel.$inject = ['$window', '$scope']

function selectOn($timeout) {
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
}
selectOn.$inject = ['$timeout']

function shakeOnDirective($timeout) {
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
}
shakeOnDirective.$inject=['$timeout']

function shakeModel($timeout) {
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
}
shakeModel.$inject = ['$timeout']

function focusOn($timeout) {
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
}
focusOn.$inject = ['$timeout']