import whiteOutModalTemplate from './white-out-modal.pug.js'

export default angular.module('ack-ng-directives', [])

/** needed when type="date" and ng-model is mocking up the model value because its trying to format it */
.directive('ngModelFormatIgnore', function() {
  return {
    restrict:'A',
    require: 'ngModel',
    link: function(scope, element, attr, ngModelCtrl) {
      ngModelCtrl.$formatters.length = 0;
      ngModelCtrl.$parsers.length = 0;
    }
  }
})

/** runs shake instructions when condition returns a truthy value */
.directive('shakeOn', shakeOnDirective)
/** runs shake instructions when model changes to a truthy value */
.directive('shakeModel', shakeModel)
.directive('selectOn', selectOn)
.directive('focusOn', focusOn)
.component('interpolate', {
  bindings:{
    as:'=?', string:'=?', scope:'=?', afterBuild:'&'
  },
  controller:InterpolateString
  //,template:'<span ng-bind-html="$ctrl.rendered"></span>'
})

/** adds form element onchange listener via addEventListener('change') that calls formChanged scope argument */
.directive('formChanged',function(){
  return {
    restrict:'A'
    ,scope:{formChanged:'&'}
    ,controller:['$element','$scope',function($element, $scope){
      this.$onInit = ()=>{
        $element[0].addEventListener('change',()=>{
          $scope.formChanged({form:$element[0]})
          $scope.$parent.$digest()
        })
      }
    }]
  }
})

.directive('inputChanged', function() {
  return {
    restrict:'A',
    link: function($scope, jElm, attrs) {
      jElm[0].addEventListener('change',function(event){
        $scope.$eval(attrs.inputChanged,{input:this, value:this.value})
      })
    }
  }
})


/** used on an input that has ng-model to display a different value */
.directive('modelDisplay', modelDisplay)

/** used on an input that has ng-model to display a different value */
.directive('modelFilter', function($filter) {
  return {
    restrict:'A',
    require: 'ngModel',
    scope: {
      modelFilter: "@"
    },
    link: function($scope, element, attrs, ngModelController) {
      var filterDef = attrs.modelFilter.split(':')

      filterDef = filterDef.map(item=>{
        return item.replace(/(^('|")|('|")$)/g,'')
      })

      ngModelController.$parsers.push(function(data) {
        return $filter.apply($filter,filterDef)(data)
      })

      ngModelController.$formatters.push(function(data) {
        return $filter.apply($filter,filterDef)(data)
      })
    }
  }
})

.directive('modelInputFilter', function($filter) {
  return {
    restrict:'A',
    require: 'ngModel',
    controller:function(){},
    controllerAs:'modelInputFilter',
    bindToController: {
      modelInputFilter: "@"
    },
    link: function($scope, element, attrs, ngModelController) {
      const action = function(){
        element[0].value = $filter(attrs.modelInputFilter)(element[0].value)
      }

      ngModelController.$parsers.push(function(data) {
        if(document.activeElement!=element[0])setTimeout(action, 1)
        return data
      })

      ngModelController.$formatters.push(function(data) {
        if(document.activeElement!=element[0])setTimeout(action, 1)
        return data
      })

      element[0].addEventListener('change', action)
      $scope.$on('$destroy',()=>element[0].removeEventListener('change', action))
    }
  }
})
/** onEnterKey - on-enter-key attribute will be evaluated when element event onkeydown fires with enter-key */
.directive('onEnterKey', function() {
  return {
    restrict:'A',
    //scope:{},
    //bindToController:{onEnterKey:'&'},//onEnterKey({event}) ... event.preventDefault()
    //controller:function(){},
    //controllerAs:'onEnterKeyController',
    link: function($scope, jElm, attrs) {
      jElm[0].onkeydown = function(event){
        var yesNo = [13,10].indexOf(event.which||event.keyCode)>=0
        if(yesNo){
          $scope.$eval(attrs.onEnterKey,{event:event})
          //$scope.onEnterKey({event:event})
          //$scope.onEnterKeyController.onEnterKey({event:event})
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
    ,scope:{
      show:'=',
      size:'=?',
      backgroundColor:'=?'//rgba(255,255,255,.95)
    }
    ,transclude:true
    ,template:whiteOutModalTemplate
    ,bindToController:true
    ,controllerAs:'wom'
    ,controller:function(){
      this.backgroundColor = this.backgroundColor || 'rgba(255,255,255,.95)'
    }
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
.directive('screenScrollHeightModel',function(){
  return {
    restrict:'A'
    ,bindToController:{
      screenScrollHeightModel:'=?'
    }
    ,controllerAs:'ScreenScrollHeightModel'
    ,controller:ScreenScrollHeightModel
  }
})
.directive('screenHeightExcessModel',function(){
  return {
    restrict:'A'
    ,bindToController:{
      screenHeightExcessModel:'=?'
    }
    ,controllerAs:'ScreenHeightExcessModel'
    ,controller:ScreenHeightExcessModel
  }
})
.directive('screenHeightModel',function(){
  return {
    restrict:'A'
    ,bindToController:{
      screenHeightModel:'=?'
    }
    ,controllerAs:'ScreenHeightModel'
    ,controller:ScreenHeightModel
  }
})
.directive('screenWidthModel',function(){
  return {
    restrict:'A'
    ,bindToController:{
      screenWidthModel:'=?'
    }
    ,controllerAs:'ScreenWidthModel'
    ,controller:ScreenWidthModel
  }
})
.directive("onScreenScroll", function(){
  return {
    restrict:'A',
    bindToController:{
      onScreenScroll:'&'//{x,y}
      ,initScreenScroll:'='//Number. Causes onScreenScroll to be called on $scope init. Specify milisecs to wait before calling onScreenScroll after $scope init.
    },
    controllerAs:'OnScreenScroll',
    controller:OnScreenScroll
  }
})
.directive("screenScrollModelY", function(){
  return {
    restrict:'A',
    bindToController:{
      screenScrollModelY:'=?'
    },
    controllerAs:'ScreenScrollModelY',
    controller:ScreenScrollModelY
  }
})
.component('userInactiveTrigger', {
  bindings:{
    inactiveSeconds:'=',
    warnSeconds:'=',
    onReactive:'&'
  },
  template:'state:{{ $ctrl.state.active }}-{{ $ctrl.state.warning }}',
  controller:UserInactiveTrigger
})
.name


function UserInactiveTrigger(ActivityMonitor, $scope){
  let isActive = true
  let isWarned = false

  ActivityMonitor.options.disableOnInactive = false
  
  const applyOptions=()=>{  
    ActivityMonitor.options.inactive = this.inactiveSeconds
    ActivityMonitor.options.warning = this.warnSeconds
  }
  
  function onActivity(){}
  
  function activityMonitor(){}
  
  const reactiveMonitor = function(){
    this.onReactive()
    isActive = true
    isWarned = false
    onActivity = activityMonitor
    $scope.$parent.$digest()
  }.bind(this)

  function every(){
    onActivity()
  }

  const onInactive = ()=>{
    isActive = false
    $scope.$parent.$digest()
    applyOptions()
    onActivity = reactiveMonitor
  }
  
  function onWarn(){
    isWarned = true
    $scope.$digest()
  }

  this.state = ActivityMonitor.user
  applyOptions()

  ActivityMonitor.on('keepAlive', every)
  ActivityMonitor.on('inactive', onInactive)
  ActivityMonitor.on('warning', onWarn)

  $scope.$on('$destroy',()=>{
    ActivityMonitor.off('keepAlive', onKeepAlive)
    ActivityMonitor.off('inactive', onInactive)
    ActivityMonitor.off('warning', onWarn)          

    if(ActivityMonitor.disable){
      ActivityMonitor.disable()
    }
  })
}
UserInactiveTrigger.$inject = ['ActivityMonitor','$scope','$timeout']




function OnScreenScroll($scope, $window, $timeout){
  var onScroll = function() {
    this.onScreenScroll({x:$window.pageXOffset, y:$window.pageYOffset})
    $scope.$digest()
  }.bind(this)

  function cleanUp() {
    angular.element($window).off("scroll", onScroll)
  }

  angular.element($window).on("scroll", onScroll)
  $scope.$on('$destroy', cleanUp)

  if(this.initScreenScroll!=null && !isNaN(Number(this.initScreenScroll))){
    $timeout(()=>this.onScreenScroll({x:$window.pageXOffset, y:$window.pageYOffset}), Number(this.initScreenScroll))
  }
}
OnScreenScroll.$inject = ['$scope','$window', '$timeout']

function ScreenHeightExcessModel($scope, $window, $document){
  var apply = function(){
    this.screenHeightExcessModel = $document[0].body.scrollHeight - $window.innerHeight
    if(this.screenHeightExcessModel<0)this.screenHeightExcessModel=0
  }.bind(this)

  function on() {
    apply()
    $scope.$digest()
  }

  function cleanUp() {
    angular.element($window).off("scroll", on)
    angular.element($window).off("resize", on)
  }

  angular.element($window).on("scroll", on)
  angular.element($window).on("resize", on)
  $scope.$on('$destroy', cleanUp)
  
  this.$onInit = apply
}
ScreenHeightExcessModel.$inject = ['$scope','$window','$document']

function ScreenScrollHeightModel($scope, $window, $document){
  var apply = function(){
    this.screenScrollHeightModel = $document[0].body.scrollHeight
  }.bind(this)

  function onResize() {
    apply()
    $scope.$digest()
  }

  function cleanUp() {
    angular.element($window).off("scroll", onResize)
    angular.element($window).off("resize", onResize)
  }

  angular.element($window).on("scroll", onResize)
  angular.element($window).on("resize", onResize)
  $scope.$on('$destroy', cleanUp)
  
  this.$onInit = apply
}
ScreenScrollHeightModel.$inject = ['$scope','$window','$document']

function ScreenScrollModelY($scope, $window){
  var onScroll = function(){
    this.screenScrollModelY = $window.pageYOffset
    $scope.$digest()
  }.bind(this)

  function cleanUp() {
    angular.element($window).off("scroll", onScroll)
  }

  angular.element($window).on("scroll", onScroll)
  $scope.$on('$destroy', cleanUp)
  
  this.$onInit = function(){
    this.screenScrollModelY = $window.pageYOffset
  }
}
ScreenScrollModelY.prototype.$onInit = function(){
  this.screenScrollModelY = $window.pageYOffset
}
ScreenScrollModelY.$inject = ['$scope','$window']

function shakeOn(){
  this.shakeForMs = this.shakeForMs || 2000
  this.shakeType = this.shakeType || 'shake-slow'
  this.shakeController = this
  this.shakeTypes = ['shake-hard','shake-slow','shake-little','shake-horizontal','shake-vertical','shake-rotate','shake-opacity','shake-crazy']
}

function ScreenWidthModel($window, $scope){
  this.$onInit = function(){
    this.screenWidthModel = $window.innerWidth
  }

  const onResize = function(){
    if(this.screenWidthModel !== $window.innerWidth){
      this.screenWidthModel = $window.innerWidth
      $scope.$digest()
    }
  }.bind(this)

  function cleanUp() {
    angular.element($window).off('resize', onResize)
  }

  angular.element($window).on('resize', onResize)
  $scope.$on('$destroy', cleanUp)

}
ScreenWidthModel.$inject = ['$window', '$scope']

function ScreenHeightModel($window, $scope){
  this.$onInit = function(){
    this.screenHeightModel = $window.innerHeight
  }

  const onResize = function(){
    if(this.screenHeightModel !== $window.innerHeight){
      this.screenHeightModel = $window.innerHeight
      $scope.$digest()
    }
  }.bind(this)

  function cleanUp() {
    angular.element($window).off('resize', onResize)
  }

  angular.element($window).on('resize', onResize)
  $scope.$on('$destroy', cleanUp)

}
ScreenHeightModel.$inject = ['$window', '$scope']

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

/** runs shake instructions when condition returns a truthy value */
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

/** runs shake instructions when model changes to a truthy value */
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

function modelDisplay() {
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
}

function InterpolateString($interpolate, $sce, $element, $compile, $scope){
  this.build = function(string){
    this.string = string
    $element[0].innerHTML='<span>'+string+'</span>'//we compile from an element within an element
    $compile($element[0].childNodes[0])(this.scope || $scope.$parent)
    this.afterBuild()
  }

  this.run = function(changes){
    if(!changes.string || changes.string.currentValue==changes.string.previousValue){
      return
    }
    var string = changes.string.currentValue
    this.build(string)
  }

  this.$onInit = function(){
    this.as = this.as || this
    var string = this.string ? this.string : ''
    this.build(string)
  }
  this.$onChanges = this.run.bind(this)
}
InterpolateString.$inject = ['$interpolate', '$sce', '$element', '$compile', '$scope']