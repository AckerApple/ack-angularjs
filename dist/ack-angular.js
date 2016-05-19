/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(36);
	__webpack_require__(40);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(2);
	module.exports = 'ack-angular';

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"
	
	var ack = __webpack_require__(3)
	
	__webpack_require__(30)
	__webpack_require__(31)
	
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
	.filter('trustAsHtml', trustAsHtml)//requires use of ng-bind-html
	.filter('trustAsHTML', trustAsHtml)//requires use of ng-bind-html
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
	    ,template:__webpack_require__(33)
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
	
	function trustAsHtml($sce){
	  return function(text){
	    if(!text || !text.toLowerCase)return '';
	    return $sce.trustAsHtml(text);
	  };
	}
	trustAsHtml.$inject = ['$sce']
	
	module.exports = 'ack-angular'

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var ack = __webpack_require__(4)
	
	ack.error = __webpack_require__(12)
	ack.number = __webpack_require__(13)
	ack.string = __webpack_require__(14)
	ack.binary = __webpack_require__(19)
	ack.base64 = __webpack_require__(20)
	ack.object = __webpack_require__(21)
	ack.method = __webpack_require__(22)
	ack.array = __webpack_require__(23)
	ack.queryObject = __webpack_require__(24)
	ack.week = __webpack_require__(25)
	ack.month = __webpack_require__(26)
	ack.year = __webpack_require__(28)
	ack.date = __webpack_require__(27)
	ack.time = __webpack_require__(29)
	/*
	ack.function = require('./js/method')
	*/
	ack['function'] = __webpack_require__(22);
	
	module.exports = ack

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var jc = __webpack_require__(5),//old old old library for Classes and Accessors
			ackInjector = __webpack_require__(6),
			partyModules = {
				ackP:__webpack_require__(7), debug:__webpack_require__(8)
			}
	
	/** calling ack() as function, will return a module to work with almost any object */
	function ack($var){
		return new ackExpose($var)
	}
	
	ack.Expose = ackExpose//Outsider's referense to expose factory
	
	/* MODULES */
		ack.modules = new ackInjector(ack)
	
		ack['class'] = function(cl, extendOrAccessors, accessors){
			return new jc(cl, extendOrAccessors, accessors)
		}
	
		ack.accessors = function($scope){
			return new jc.Vm($scope)
		}
	
		ack.injector = function($scope){
			return new ackInjector($scope)
		}
	
		ack.promise = function(var0, var1, var2, var3){
			var promise = partyModules.ackP.start()
			return promise.set.apply(promise,arguments)
		}
	
		ack.Promise = function(resolver){
			return new partyModules.ackP(resolver)
		}
	
		var indexSelector = __webpack_require__(11)
		ack.indexSelector = function(){
			var $scope = {}
			if(arguments.length){
				$scope.indexes = arguments[0]
			}
			return new indexSelector($scope)
		}
	
		/** Organized debug logging. See npm debug for more information */
		var ackDebugMap = {}//create storage of all loggers created
		ack.debug = function debug(name, log0, log1, log2){
			var logger = partyModules.debug(name)
			ack.debug.map[name] = logger//store memory of logger for meta referencing
	
			if(arguments.length>1){//logging intended to go with
				var args = Array.prototype.slice.call(arguments)
				args.shift()//remove first
				logger.apply(logger,args)
			}
	
			logger.debug = function(subname, log0, log1, log2){
				arguments[0] = name+':'+subname
				return ack.debug.apply(ack, arguments)
			}
			logger.sublog = logger.debug
	
			return logger
		}
		ack.debug.map = ackDebugMap//latch onto storage
	/* END MODULES */
	
	ack.throwBy = function(ob, msg){
		if(ob){
			throw(ob)
		}else if(msg){
			throw new Error(msg)
		}else{
			throw new Error('An unexpected error has occured')
		}
	}
	
	ack.logArrayTo = function(array, logTo){
		logTo.apply(logTo, array)
	}
	
	ack.logError = function(err, msg, logTo){
		logTo = logTo || console.log
	
		var drray=[]
	
		if(msg==null && err && err.stack){//?no message
			msg = msg || err.stack.replace(/(\n|\t|\r)/g,'').split(/\s+at\s+/).shift()//error stack as message
		}
	
		if(msg!=null)drray.push(msg)
		if(err!=null)drray.push(err)
	
		ack.logErrorArray(drray, logTo)
	}
	
	
	
	
	
	
	
	function ackExpose($var){
		this.$var = $var
		return this
	}
	
	ackExpose.prototype.error = function(){return ack.error(this.$var)}
	ackExpose.prototype.number = function(){return ack.number(this.$var)}
	ackExpose.prototype.string = function(){return ack.string(this.$var)}
	ackExpose.prototype.binary = function(){return ack.binary(this.$var)}
	ackExpose.prototype.base64 = function(){return ack.base64(this.$var)}
	ackExpose.prototype.object = function(){return ack.object(this.$var)}
	ackExpose.prototype.method = function(){return ack.method(this.$var)}
	ackExpose.prototype['function'] = function(){return ack['function'](this.$var)}
	ackExpose.prototype.array = function(){return ack.array(this.$var)}
	ackExpose.prototype.queryObject = function(){return ack.queryObject(this.$var)}
	ackExpose.prototype.week = function(){return ack.week(this.$var)}
	ackExpose.prototype.month = function(){return ack.month(this.$var)}
	ackExpose.prototype.year = function(){return ack.year(this.$var)}
	ackExpose.prototype.date = function(){return ack.date(this.$var)}
	ackExpose.prototype.time = function(){return ack.time(this.$var)}
	
	
	ackExpose.prototype.getSimpleClone = function(){
		var target = {}
		for (var i in this.$var){
			target[i] = this.$var[i]
		}
		return target;
	}
	
	//get at raw variable within target variable
	ackExpose.prototype.get = function(name,def){
		if(!name)return this.$var
	
		if(this.$var && this.$var[name]!=null)//try exact match first
			return this.$var[name]
	
		//case insensative search
		var lcase = name.toLowerCase()
		for(var key in this.$var){
			if(lcase == key.toLowerCase())
				return this.$var[key]
		}
	
		return def
	}
	
	//$var[name] returned as ack Object. When null, null returned
	ackExpose.prototype.byName = function(name){
		var v = this.get(name)
		if(v!=null)return ack(v)
	}
	
	ackExpose.prototype['throw'] = function(msg, logTo){
		ack.logError(this.$var, msg, logTo)
		ack.throwBy(this.$var, msg)
		return this
	}
	
	ackExpose.prototype.dump = function(){
		return JSON.stringify(this.$var)
	}
	
	/** negative numbers will be 0  */
	ackExpose.prototype.getBit = function(){
		var b = this.getBoolean()
		if(b && b.constructor==Number && b < 0){
			b=0
		}
		return b ? 1 : 0;
	}
	
	//!NON PROTOTYPED
	ackExpose.prototype.nullsToEmptyString = function(){
		for(var key in this.$var){
			if(this.$var[key]==null){
				this.$var[key]='';
			}
		}
		return this
	}
	
	/** reduces variable to a true/false */
	ackExpose.prototype.getBoolean = function(){
	  if(this.$var==null || !this.$var.constructor)return false
	
	  var a = this.$var
	
	  if(a.constructor==String){
		a = a.toLowerCase()//makes TRUE:true and yes/no true
		if(a==='y' || a==='yes'){
			return true
		}
		if(a==='no' || a==='n'){
			return false
		}
	
	    try{
	      a = JSON.parse(a)
	    }catch(e){
	      return null
	    }
	  }
	
	  if(a!=null && (a.constructor==Number || a.constructor==Boolean)){
		return a
	  }
	
	  return null
	}
	
	ackExpose.prototype.isBooleanLike = function(){
	  if(this.$var==null || !this.$var.constructor)return false
	  return this.getBoolean()!==null
	}
	
	
	module.exports = ack

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";
	
	//Entry point to accessors framework
	//argMap : 0:'init-function or accessor-map', 1:'extend-from or accessor-map', 2:'accessor-map'
	//accessor-map: if-string:'property-name' if-array:array-of-accessor-maps if-object:{keyname:defaultMethod || keyName:property-map || keyName:simple-value-default}
	//per-accessor-property-map:{preset:function-to-examine-a-set-call-to-return-what-to-actually-set, typeset:set-variable-must-be-constructor-of, default:funcForValue-or-value}
	function jC(initOrStruct, parentOrStruct, struct){
		initOrStruct = jC.$(initOrStruct, parentOrStruct, struct)
		var f = function f(){//function to add more accessor definitions
			initOrStruct.jC.prop.apply(initOrStruct.jC,arguments);
			return f
		}
		return f
	}
	
	//function controller for entry point
	jC.$ = function(initOrStruct, parentOrStruct, struct){
		//arg0 is struct
		if(initOrStruct!=null && !jC.isF(initOrStruct)){
			struct=initOrStruct;
			initOrStruct=null
		}
	
		//arg1 is struct
		if(parentOrStruct!=null && !jC.isF(parentOrStruct)){
			struct=parentOrStruct;
			parentOrStruct=null
		}
	
		if(initOrStruct==null)//provide constructor
			initOrStruct = function($scope){
				return jC.F.prototype.init.call(this,$scope)
			}//DONT function initOrStruct(){} AND DONT var initOrStruct = function initOrStruct(){} for IE8
	
		if(parentOrStruct==null)//provide parent constructor
			parentOrStruct = function(){/*jC*/}//DONT function parentOrStruct(){} AND DONT var parentOrStruct = function parentOrStruct(){} for IE8
	
		initOrStruct.jC = new jC.F(initOrStruct,parentOrStruct, struct)//return has jC reference
	
		return initOrStruct
	}
	
	//very specific and tuned function to set variables using setMethods
	jC.setByAccessor = function(nameOrInitStruct,value){//params data then sets a "set" method and calls it
		if(typeof(nameOrInitStruct)=='string'){
			if(this['set'+nameOrInitStruct]){//exact key case found
				this['set'+nameOrInitStruct].call(this,value)
				return this
			}
	
			/* look at all keys for set function */
				var lCaseKey = nameOrInitStruct.toLowerCase()
				var mySetKey = 'set'+lCaseKey
				for(var key in this)
					if(key.length==mySetKey.length && key.toLowerCase() == mySetKey){
						this[key].call(this,value)
						return this
					}
	
				//may require updating as they use implied scope (perhaps 3rd argument is $scope)
				jC.F.paramdata.call(this)
				this.data[nameOrInitStruct] = value
				//this.data[lCaseKey] = value
			/* end */
		}else
			jC.each(nameOrInitStruct,jC.setByAccessor,this)//arg1 is object||array
	
		return this
	}
	
	
	//Accessors building framework
	jC.F = function(C, parent , prop){//what is called to add accessors but ONCE AN OBJECT it becomes is the init and ONLY HAS 1 argument
		this.init.call(this)
		.setC(C)//set base Class aka main init method
		.setParent(parent)//inheritance
	
		//C.prototype = new parent//creates data scope and such cause it invokes init function
		for(var x in parent.prototype)C.prototype[x] = parent.prototype[x]
	
		//deprecate these, don't add methods to an object
		/*
		C.prototype.set = function(){//deprecated. Use self destructing init method
			console.log('jC: this.set is deprecated. Use self destructing method this.init or if you need this.set, have your class extend jC.Vm',arguments.callee.caller)
			return jC.setByAccessor.apply(this,arguments)
		}
		*/
	
		C.prototype.init = jC.F.prototype.init
		this.prop(prop)
	
		return this
	}
	
	jC.F.prototype.init = function($scope){//main function that creates data scope
		this.data = $scope==null ? {}:$scope
		jC.setByAccessor.call(this, $scope)//convert keys to case
		this.init = null;delete this.init//self destruct init method
		return this
	}
	
	jC.F.paramdata = function(){
		if(this.data==null)this.data={};return this
	}
	
	//assumptions: .data exists && keyName will be found in lowercase
	jC.F.set = function(nameOrInitStruct,value){
		if(typeof(nameOrInitStruct)=='string'){//is arg1 name
			jC.F.paramdata.call(this)//ensure this.data is defined
			var keyName = nameOrInitStruct//nameOrInitStruct.toLowerCase()
			this.data[keyName] = value
		}else{
			jC.each(nameOrInitStruct, jC.F.set, this)//arg1 is object||array
		}
		return this
	}
	
	jC.F.get = function(name,def,stick,nullop){//!!!!TODO:This should no longer param and just get the value regardless of null or anything else
		return jC.F.param.call(this,name,def,stick,nullop)
	}
	
	jC.F.param = function(name,def,stick,nullop){
		this.data = this.data!=null ? this.data : {}//param data scope
		if(typeof(this.data[name])=='undefined')
			var r = nullop ? nullop.call(this,def,stick) : jC.F.runNullOp.call(this,name,def,stick)
		else{
			var r = this.data[name]
		}
	
		return r
	}
	
	//returns set closured function
	jC.F.getSet = function(name,options){
		var useArray = []
			,keyName = options && options.as ? options.as : name
			,fireSet = function(v){
				jC.F.set.call(this,keyName,v);return this
			}
	
		if(options){
			if(options.typeset){
				useArray.push(function(v){
					if(v && v.constructor === options.typeset)
						return v
	
					var etn = jC.getMethodName(options.typeset)
						,oName = jC.getConName(this)
						,oOwnName = jC.getMethodName(options.original.owner)
						,msg = 'Invalid Constructor Passed to set'+options.original.name+'().'
					msg += ' ExpectTypeName:'+etn+'. GotTypeName:'+jC.getConName(v)+'. OwnerName:'+oName+'.'//details
					if(oName != oOwnName)//?original owner has changed?
						msg += ' OriginalOwnerName:'+oOwnName
					console.error(msg);
					return v
				})
			}
	
			if(options.preset)
				useArray.push(function(v){
					return options.preset.apply(this,arguments)
				})
	
			//options last action
			if(useArray.length)
				fireSet = function(v){
					for(var x=0; x < useArray.length; ++x)
						v = useArray[x].call(this,v)
	
					jC.F.set.call(this,keyName,v);return this
				}
		}
	
	
		return fireSet
	}
	
	//returns a get closured function
	jC.F.getGet = function(name, defOrDefFunc){
		var nullop = jC.F.getNullOp(name, defOrDefFunc)
		return function(def,stick){//!!!TODO:This function shouldn't try to param, just get
			var r = jC.F.get.call(this, name, def, stick, nullop);
			return r
		}
	}
	
	//returns function to call when no default avail
	jC.F.getNullOp = function(name, defOrDefFunc){
		return function(def,stick){
			return jC.F.runNullOp.call(this,name,def,stick,defOrDefFunc)
		}
	}
	
	//if name-value undefined, return value based on defaulting defintiion
	jC.F.runNullOp = function(name,def,stick,dM){
		if(dM==null)
			var dm=function(){}//make dm reliable as always something
		else if(jC.isF(dM))
			var dm = dM//dm is already function
		else
			var dm = function(){return dM}//dm will return a static value
	
		var r = def==null ? dm.call(this) : def
	
		if((stick==null || stick) && (r!=null || this.data[name]!=null)){
			jC.setByAccessor.call(this,name,r)//call this['set'+name] incase it has a preset
			//this.data[name.toLowerCase()] = r//this wont call this['set'+name]
		}
	
		return r
	}
	
	jC.F.prototype.set = jC.F.set//?deprecated
	jC.F.prototype.get = jC.F.get
	jC.F.prototype.param = jC.F.param
	jC.F.prototype.setC = jC.F.getSet('c')
	jC.F.prototype.getC = jC.F.getGet('c')
	jC.F.prototype.setParent = jC.F.getSet('parent')
	jC.F.prototype.getParent = jC.F.getGet('parent')
	
	jC.F.prototype.setter = function(name,config){
		var isSubDef = config && config.constructor==Object && config.constructor!=Array,
			method = jC.F.getSet(name, config),
			Cls = this.getC()
	
	
		name = name.substring(0, 1).toUpperCase()+name.substring(1, name.length)//first letter must be capital
		Cls.prototype['set'+name] = method
	
		if(isSubDef && config.setAka)
			Cls.prototype[config.setAka] = method
	
		return this
	}
	
	jC.F.prototype.getter = function(name, defOrDefFunc){
		var isSubDef = defOrDefFunc!=null && defOrDefFunc.constructor==Object && defOrDefFunc.constructor!=Array
			,def
	
		if(isSubDef){
			if(defOrDefFunc['default'] != null)
				def = defOrDefFunc['default']
		}else
			def = defOrDefFunc
	
		var keyName = defOrDefFunc && defOrDefFunc.as ? defOrDefFunc.as : name
			,method = jC.F.getGet(keyName, def)//sequence sensative
			,Cls=this.getC()
	
		name = name.substring(0, 1).toUpperCase()+name.substring(1, name.length)//first letter must be capital
		Cls.prototype['get'+name] = method
	
		if(isSubDef && defOrDefFunc.getAka)
			Cls.prototype[defOrDefFunc.getAka] = method
	
		return this
	}
	
	jC.F.prototype.prop = function(naOrStOrAr, defOrDefFunc){
		switch(typeof(naOrStOrAr)){
			case 'string'://create a setter/getter just based on name alond
				defOrDefFunc = defOrDefFunc==null ? {} : defOrDefFunc
	
				var typ = typeof(defOrDefFunc), typArray = ['number','boolean','string'];
				for(var x=typArray.length-1; x >= 0; --x){
					if(typArray[x] == typ){
						defOrDefFunc = {
							'default':defOrDefFunc,
							original:{owner:this.getC(), name:naOrStOrAr}//record Object metadata
						}
						break
					}
				}
				//below breaks in ie8
				//if(typArray.indexOf(typ) < 0)//ensure Object/Array/Function
				//	defOrDefFunc.original = {owner:this.getC(), name:naOrStOrAr}//record Object metadata
	
				return this.getter(naOrStOrAr, defOrDefFunc).setter(naOrStOrAr, defOrDefFunc)//name
			case 'undefined':
			case 'function':
				return this
		}
	
		if(naOrStOrAr.constructor == Array){//array of definitions
			for(var x=naOrStOrAr.length-1; x >= 0; --x)
				this.prop(naOrStOrAr[x])
		}else
			jC.each(naOrStOrAr,this.prop,this)
	
		return this
	}
	
	
	
	
	if(jC.name && jC.name==='jC')//device supports function.name
		jC.getMethodName = function(method){
			return method.name
		}
	else
		jC.getMethodName = function(method){
			var funcNameRegex = /function (.{1,})\(/;
			var results = (funcNameRegex).exec(method.toString())
			return (results && results.length > 1) ? results[1] : ""
		}
	
	if({}.constructor.name)//device supports new Function().constructor.name
		jC.getConName = function(obj){
			return obj.constructor.name
		}
	else
		jC.getConName = function(obj){
			return jC.getMethodName((obj).constructor)
		}
	
	jC.isF = function(f){
		return typeof(f)=='function'
	}
	
	jC.clear = function(s){
		for(var x in s)delete s[x]
	}
	
	
	//loops arrays(value,index,context) or objects(name,value,context)
	jC.each = function(a,meth,context){
		if(!a)return;//null abort
		if(a.constructor==Array){
			var m=(context==null) ? meth : function(v,i){meth.call(context,v,i)}
			for(var x=0;x<a.length;++x)m(a[x],x)
		}else{
			var m=(context==null) ? meth : function(n,v){meth.call(context,n,v)}
			for(var n in a)m(n,a[n])
		}return a
	}
	
	
	
	
	
	
	
	
	//ValueMemory: Object for case-insensitive name/value pair management
	jC.Vm = function Vm(a){
		return this.init.apply(this,arguments)
	}
	jC(jC.Vm)//?maybe deprecated with no get/set/param methods
	
	jC.Vm.prototype.set = jC.setByAccessor
	jC.Vm.prototype.get = function(name){
		var r = jC.F.get.apply(this,arguments)
		if(r!=null)return r
	
		var eName = this.defined(name)
		return this.data[eName]
	
	}
	
	/** if name is defined, returns actual case sensative name */
	jC.Vm.prototype.defined = function(name){
		if(this.data[name]!=null)return name
	
		//get by lowercase keyname match
		var n = name.toLowerCase()
		for(var x in this.data){
			if(x.toLowerCase()==n){
				return x
			}
		}
	}
	/** deprecated name alias */
	jC.Vm.prototype.getExactName = jC.Vm.prototype.defined
	
	jC.Vm.prototype.param = function(name,def){
		var r = this.get(name)
		if(r!=null)return r
		return jC.F.param.apply(this,arguments)
	}
	
	//removes all case-insensative matching keys
	jC.Vm.prototype.remove = function(name){
		var n = name.toLowerCase()
		for(var x in this.data){
			if(x.toLowerCase()==n){
				this.data[x] = null;delete this.data[x];
			}
		}
		return this
	}
	
	jC.Vm.prototype.clearVars = function(){
		jC.clear(this.data);return this
	}
	
	jC.Vm.prototype.setNewData=function(value){
		this.clearVars()
		jC.F.set.call(this,value);return this
	}
	
	
	
	
	
	
	
	
	
	
	if(true){
		module.exports=jC
		module.exports.__dirname = __dirname
	}
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	var ackInjector = function ackInjector($scope, $storage){
	  this.$storage = $storage || {}
	  this.$scope = $scope || this
	  return this
	}
	
	ackInjector.prototype.define = function(name, $module, initInjectArray){
	  var $this = this
	  var method = function(){
	    return $this.LoadModule(name, $module, arguments, initInjectArray)
	  }
	
	  this.$scope[name] = method//this.functionName . example: ack.mail()
	  return this
	}
	
	ackInjector.prototype.definePath = function(name,path,initInjectArray){
	  var $this = this
	  var fetcher = function(){
	    var $module = $this.getModule(name, path)
	    return $this.LoadModule(name, $module, arguments, initInjectArray)
	  }
	
	  this.$scope[name] = fetcher//this.functionName . example: ack.mail()
	  return this
	}
	
	ackInjector.prototype.LoadModule = function(name, $module, $args, injectArray){
	  if($module.constructor!=Function){
	    return $module
	  }
	
	  if(!injectArray){
	    var r = $module.apply($module, $args)//no dependencies
	    return r
	  }
	
	  var isInjectInit = typeof(injectArray)=='function',
	    init = isInjectInit ? injectArray : injectArray[injectArray.length-1],
	    args = []
	
	  if(!isInjectInit){
	    var tar
	    for(var i=0; i < injectArray.length-1; ++i){//all but last, last was init
	      switch(injectArray[i].toLowerCase()){
	        case '$arg0':
	          tar = $args[0]
	          break;
	
	        case '$injector':
	          tar = this.$scope//this
	          break;
	
	        case '$module':
	          tar = $module
	          break;
	
	        case '$args':
	          tar = Array.prototype.slice.call($args)
	          break;
	
	
	        default:
	          if(this.$scope[injectArray[i]]!=null){
	            tar = this.$scope[injectArray[i]]
	          }else if(this.$storage[injectArray[i]] != null){
	            tar = this.$storage[injectArray[i]]
	          }
	      }
	      args.push(tar)
	    }
	  }
	
	  args = args.concat(Array.prototype.slice.call($args))
	
	  if(typeof(init)=='string'){//last arg is module to return
	    switch(init){
	      case '$module':
	        return $module.apply($module, args)
	        break;
	
	      default:
	        throw 'should not get here. Last argument of injector was not a function NOR "$module"';
	        return $module.apply(this.$scope[init], args)
	    }
	  }
	  return init.apply(init, args)
	}
	
	ackInjector.prototype.getModule = function(name,path){
	  if(this.$storage[name])return this.$storage[name]
	  throw new Error('Module not defined ('+name+'). Valid modules: "'+ Object.keys(this.$storage).join(',')+'"')
	}
	
	ackInjector.prototype.newModule = function(name,path,arg){
	  var Module = this.getModule(name,path)
	  return new Module(arg)
	}
	
	
	module.exports = ackInjector

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var isPromiseLike = function isPromiseLike(potentialPromise, notThisPromise){
	  return potentialPromise && potentialPromise.then && potentialPromise!=notThisPromise
	}
	
	function objectKeys(ob){
	  var x,array = []
	  for(x in ob)array.push(x)
	  return array
	}
	
	/** constructor. Invoke by new ackPromise()
	  @resolver - function(resolve,reject){}
	*/
	function ackPromise(resolver){
	  return new ackP()
	  .next(function(next){
	    resolver(next, next.throw)
	  })
	}
	
	/** all arguments are used to jump start a thenable promise */
	ackPromise.resolve = function(v0,v1,v2,v3){
	  var promise = new ackP()
	  promise = promise.set.apply(promise,arguments)
	  return promise
	}
	
	ackPromise.start = function(){
	  return new ackP()
	}
	
	
	ackPromise.method = function(method){
	  return function(){
	    var Promise = new ackPromise.start()
	    return Promise.set.apply(Promise, arguments).then(method)
	  }
	}
	
	ackPromise.getErrorType = function(error){
	  var isNamed = error.name && error.name.toLowerCase!=null
	  var isCode = error.code && error.code.toLowerCase!=null
	
	  if(isCode && error.name=='Error'){
	    return error.code
	  }
	
	  if(isNamed){
	    return error.name
	  }
	}
	
	ackPromise.isErrorType = function(error, type){
	  if(error==null)return false
	
	  if(error.constructor && type == error.constructor)
	    return true
	
	  var eName = ackPromise.getErrorType(error)
	  if(eName && eName.toLowerCase()==type.toLowerCase()){
	    return true
	  }
	
	  return false
	}
	
	ackPromise.callback4callback = function(method, promise, bind){
	  return function(){
	    var args = Array.prototype.slice.call(arguments)
	    var next = args.pop()
	    var processor = ackPromise.getNextCallback(next, promise)
	
	    if(method.length){
	      args[method.length-1] = processor
	    }else{
	      args.push(processor)
	    }
	
	    method.apply(bind||this,args)
	  }
	}
	
	ackPromise.createIf = function(promise, condition, $scope, onTrue, isTruthMode){
	  isTruthMode = isTruthMode==null ? true : isTruthMode
	  var isMethod = condition && condition.constructor && condition.constructor==Function
	
	  if(isMethod){
	    var processCondition = function(args, next, scope){
	      next.call(scope, condition.apply(scope,args))
	    }
	  }else{
	    var processCondition = function(args, next, scope){
	      var result = args[0]===condition
	      next.call(scope, result)
	    }
	  }
	
	  var ifMethod = function(){
	    var args = Array.prototype.slice.call(arguments)
	    var next = args.pop()//last argument will be next method to call
	
	    processCondition(args, function(result){
	      var isVal = (isTruthMode && result==true) || (!isTruthMode && result==false)
	      if(isVal){
	        onTrue.call(this, args, next)//onTrue.call(this, args, next)
	      }else{
	        next.apply(next, args)//pass along args cause i didn't run
	      }
	    }, this)
	  }
	
	  return promise.next(ifMethod, $scope)
	}
	
	ackPromise.getNextCallback = function(next, promise){
	  return function(){
	    if(arguments[0]!=null){//1st arg is error!
	      return promise['throw'].call(promise, arguments[0])
	    }
	    var args = Array.prototype.slice.call(arguments)
	    args.shift()//remove error
	    next.apply(next, args)
	  }
	}
	
	
	
	
	
	
	
	
	
	
	function ackP(){
	  this._promise0 = true//bluebird compatibility
	  this.data = {waiting:0}
	  return this.processor()//fire
	}
	
	
	ackP.prototype.processor = function(){
	  this.values = Array.prototype.slice.call(arguments)
	  if(!this.data || !this.data.task){
	    return// this
	  }
	
	  var $scope={
	    args:Array.prototype.slice.call(arguments)//args that can be manipulated
	  }
	
	  var thisTask = this.data.task
	  var context = thisTask.context || this.data.context || this.nextContext || this//never use outside arguments.context as context can be changed by bind()
	  this.data.waiting=1//indicate in-process
	
	  /* async callback method */
	    var $this = this
	    if(thisTask.isAsync===true){//if callback required, how is it defined. Pipe=last-arg-as-callback
	      var nPos = thisTask.method.length===0 ? -1 : thisTask.method.length-1
	
	      var oneTimeCall = false
	      var oneTimeMethod = function(){
	        var args = Array.prototype.slice.call(arguments)
	        var then = function(){
	          if($this.inpass){
	            --$this.inpass.count
	
	            if($this.inpass.count>0){
	              return// $this
	            }
	            return $this.inpass.lastProm.runNextPromise()
	          }
	          return $this.runNextPromise()
	        }
	
	        if(arguments.length && isPromiseLike(arguments[0], $this)){//result is promise
	          $this.runSubPromise(arguments[0], thisTask, args).then(then)
	        }else{
	          if(thisTask && !thisTask.isPass){
	            $this.values = args
	          }
	          then()
	        }
	
	      }
	
	      oneTimeMethod['throw'] = function(){
	        return $this['throw'].apply($this, arguments)
	      }
	
	      if(nPos>=0)
	        $scope.args[nPos] = oneTimeMethod//last argument will be next call
	      else
	        $scope.args.push(oneTimeMethod)//last argument will be next call
	    }
	  /* end: async callback method */
	
	  if(thisTask.isPass===true){
	    if(thisTask.isAsync===true){
	      if(!this.inpass){
	        this.inpass={count:1}
	      }else{
	        ++this.inpass.count
	      }
	    }
	
	    if(this.inpass)this.inpass.lastProm = this
	  }
	
	  try{
	    var result = thisTask.method.apply(context, $scope.args)//args from last next call are directly fed in
	  }catch(e){
	    if(e.constructor==String){
	      var eName = e
	      e = new Error(e)
	      e.name = eName
	    }
	
	    if(!e.code && e.message){
	      e.code = e.message
	    }
	
	    //try to indicate which method has failed
	    try{
	      e.method = thisTask.method//maybe read-only and so may error
	    }catch(e){}
	
	    this['throw'].call(this, e)
	    return// this
	  }
	
	  if(thisTask.isPass===true){
	    return this.runNextPromise()
	  }
	
	  if(thisTask.isAsync===true)return;
	
	  if(isPromiseLike(result, this)){//result is promise
	    return this.runSubPromise(result, thisTask)
	    .then(function(){
	      $this.runNextPromise()
	    })
	  }
	
	  if(!this.data){
	    return// this
	  }
	
	  if(this.inpass!=null){//pass over
	    this.inpass.count = null
	    this.inpass.lastProm = null
	    this.inpass = null
	  }
	
	  if(result==this || result==null && typeof(result)==='undefined'){
	    this.values = null//if we are not passing previous result, then lets set
	  }else{
	    this.values = [result]//if we are not passing previous result, then lets set
	  }
	
	  if(this.data.getNextPromise!=null){//we need to trigger our next task
	    return this.runNextPromise()
	  }
	
	  this.data.waiting=0//no longer waiting for another task. This is key for a then being added to a fully exectured chain
	
	  this.clearMem()
	
	  return// this
	}
	
	ackP.prototype.runSubPromise = function(result, thisTask){
	  var $this = this,
	      closingTask = function(){
	        if(thisTask && !thisTask.isPass){
	          $this.values = Array.prototype.slice.call(arguments)
	        }
	      }
	
	  result = result.then(closingTask)
	  ['catch'](function(e){
	    //e = e.cause || e//bluebird may have wrapped the true error
	    $this['throw'].call($this, e)//result promise catcher
	  })
	
	  return result
	}
	
	ackP.prototype.runNextPromise = function(){
	  if(this._rejected){
	    return
	  }
	  if(this.values && this.values.length){
	    return this.runNextPromiseWithValueArray(this.values)
	  }
	  return this.runNextPromiseWithValueArray()
	  //this.values = null//intended to clear memory
	}
	
	ackP.prototype.runNextPromiseWithValueArray = function(valueArray){
	  if(!this.data){
	    return// this
	  }
	  var np = this.data.getNextPromise ? this.data.getNextPromise() : null
	  if(!np){
	    this.data.waiting = 0;return// this
	  }
	
	  if(
	      this.inpass && this.inpass.count
	  &&  np.data && np.data.task && !np.data.task.isPass
	  ){
	    return// np
	  }
	  //np.paramData()
	  //var shares
	  np.data.waiting = -1
	  np.nextContext = np.nextContext || this.nextContext// || this.data.context
	  np.data.context = np.data.context || this.nextContext// || this.data.context
	  np.inpass = this.inpass
	  this.clearMem()
	  this.nextContext = null//clear mem
	
	  var r = np.processor.apply(np, valueArray)
	  return r
	
	}
	
	ackP.prototype.runCatch = function(err, catcher){
	  var caught = catcher.call(this.nextContext || this, err)
	  if(isPromiseLike(caught)){
	    var $this = this
	    return caught.then(function(){
	      $this.runNextPromiseWithValueArray( Array.prototype.slice.call(arguments) )
	    })
	  }
	
	  var argArray=[]
	  if(caught!==null){
	    argArray.push(caught)
	  }
	  this.values = argArray
	  var r = this.runNextPromiseWithValueArray(argArray)
	  this.clearMem()
	  return r
	}
	
	ackP.prototype.getLastPromise = function(){
	  if(!this.data || !this.data.getNextPromise){
	    return this
	  }
	  return this.data.getNextPromise().getLastPromise()
	}
	
	ackP.prototype['catch'] = function(typeOrMethod, method){
	  var newProm = this.next(function(){
	    var args = Array.prototype.slice.call(arguments)
	    var next = args.pop()
	    next.apply(this, args)
	  })
	
	  newProm._rejected = null
	
	  this.catchers = this.catchers || {}
	  if(method){
	    switch(typeof(typeOrMethod)){
	      case 'string':
	        var type = typeOrMethod.toLowerCase()
	        this.catchers['catch'+type] = method;
	        if(this._rejected && !this._rejectedCaught && ackPromise.isErrorType(this._rejected, type)){//error already happend
	          this._rejectedCaught = true
	          this.runCatch(this._rejected, method)//method.call(this, this._rejected)
	        }
	        break;
	      //case 'function':break;
	      default:{
	        this.catchers.catch_type_array = this.catchers.catch_type_array || []
	        this.catchers.catch_type_array.push({method:method, type:typeOrMethod})
	        if(this._rejected && !this._rejectedCaught && ackPromise.isErrorType(this._rejected, typeOrMethod)){
	          this._rejectedCaught = true
	          this.runCatch(this._rejected, method)//method.call(this, this._rejected)
	        }
	      }
	    }
	  }else{
	    method = typeOrMethod
	    this.catchers.catchAll = typeOrMethod
	    if(this._rejected && !this._rejectedCaught){
	      this._rejectedCaught = true
	      this.runCatch(this._rejected, method)//method.call(this, this._rejected)
	    }
	  }
	
	  if(this._rejected && !this._rejectedCaught){
	    newProm._rejected = this._rejected
	    if(nativePromiseThen)this.then = ackP.rejectedThen
	  }
	
	  return newProm
	}
	/** alias for compatibility with earlier ECMAScript version */
	ackP.prototype.caught = ackP.prototype['catch']
	
	/**
	  @condition - if condition is not a method, then value must strictly match condition. If condition is method, condition only must return truthy
	*/
	ackP.prototype['if'] = function(condition,method,scope){
	  return ackPromise.createIf(this, condition, scope, function(args, next){
	    var mr = method.apply(this, args)
	    next.call(next, mr)
	  })
	}
	
	ackP.prototype.ifNot = function(condition,method,scope){
	  var processor = function(args, next){
	    var mr = method.apply(this, args)
	    next.call(next, mr)
	  }
	  return ackPromise.createIf(this, condition, scope, processor, false)
	}
	
	ackP.prototype.ifNext = function(condition,method,scope){
	  var processor = function(args,next){
	    if(method.length){
	      args[method.length-1] = next
	    }else{
	      args.push(next)
	    }
	
	    method.apply(this,args)
	  }
	  return ackPromise.createIf(this, condition, scope, processor)
	}
	
	ackP.prototype.ifCallback = function(condition,method,scope){
	  return ackPromise.createIf(this, condition, scope, function(args,next){
	    var cb = ackPromise.getNextCallback(next, this)
	
	    if(method.length)
	      args[method.length-1] = cb
	    else
	      args.push(cb)
	
	    method.apply(this,args)
	  })
	}
	
	ackP.prototype.getNewData = function(){
	  return {waiting:0}
	}
	
	ackP.prototype.paramData = function(){
	  this.data = this.data || this.getNewData();return this
	}
	
	ackP.prototype.setNextPromise = function(np){
	    this.data.getNextPromise = function(){
	      return np
	    }
	    np.nextContext = this.nextContext
	    if(this._rejected){
	      np._rejected = this._rejected
	      if(nativePromiseThen)np.then = ackP.rejectedThen
	    }
	
	    return np
	}
	
	ackP.prototype.add = function(options){
	  if(options.method==null){
	    this['throw'].call(this,'promise task undefined')
	    var e = new Error('promise task undefined')
	    e.name = 'promise task undefined'
	    throw e
	  }
	
	  this.paramData()
	//???
	  if( isPromiseLike(options.method) ){
	  var nextp = options.method
	  options.method = function(){
	    return nextp
	  }
	    var newp = ackPromise.start().add(options)//.bind(this.data.context)
	    return this.setNextPromise( newp )//options.method
	  }
	
	  if(this.data.getNextPromise){
	    return this.data.getNextPromise().add(options)
	  }else if(this.data.task){
	    var np = ackPromise.start()//.paramData()
	    this.setNextPromise(np)
	    np.data.waiting = 1
	    np.add(options)
	
	    if(this.data.waiting==0){
	      this.runNextPromise()
	    }
	
	    return np
	  }
	
	  this.data.task = options//first added task
	  //this.data.context = this.nextContext
	
	  if(this.data.waiting===0){//?already done process, put back into process
	    this.processor.apply(this, this.values)
	  }
	
	  return this
	}
	
	//async-method whose input is passed exactly as output AFTER the last-method(callback) is called
	ackP.prototype.pass = function(method,scope){
	  //this.checkPassMode()
	  return this.add({method:method, context:scope, isPass:true, isAsync:true})
	}
	
	function getMethodNameList(ob){
	  var array = []
	  for(var x in ob){
	    if(ob[x] && ob[x].constructor && ob[x].constructor == Function){
	      array.push(x)
	    }
	  }
	  return array.join(',')
	}
	
	/** (name, args0, arg1, arg2) */
	ackP.prototype.call = function(name){
	  var args = Array.prototype.slice.call(arguments)
	  args.shift()//remove name argument
	  return this.then(function(){
	    if(arguments.length && arguments[0][name]){
	      return arguments[0][name].apply(arguments[0], args)
	    }
	    var msg = 'promise.call "'+name+'" is not a function.'
	    if(arguments.length){
	      msg += ' Function list: '+getMethodNameList(arguments[0])
	    }
	    var e = new Error(msg)
	    e.name='not-a-function'
	    throw e
	  })
	}
	
	/** (name, args0, arg1, arg2) */
	ackP.prototype.bindCall = function(name){
	  var args = Array.prototype.slice.call(arguments)
	  args.shift()//remove name argument
	  return this.then(function(){
	    if(this[name]){
	      return this[name].apply(this, args)
	    }
	    var msg = 'promise.bindCall "'+name+'" is not a function.'
	    msg += ' Function list: '+getMethodNameList(this)
	    var e = new Error(msg)
	    e.name='not-a-function'
	    throw e
	  })
	}
	
	/** promise result will become "this" context */
	ackP.prototype.bindResult = function(){
	  return this.then(function(v){
	    this.bind(v)
	    return ackPromise.start().set( Array.prototype.slice.call(arguments) ).spread()
	  })
	}
	
	ackP.prototype.bind = function($this){
	  if( $this!=this && isPromiseLike($this) ){
	    var passon = {}
	    return this.then(function(){
	      passon.result = Array.prototype.slice.call(arguments)
	    })
	    .then($this)
	    .bindResult()
	    .set(passon).get('result').spread()
	  }
	
	  this.paramData()
	  if(!this.data.task){
	    this.data.context = $this
	  }
	  this.nextContext = $this
	  return this
	}
	
	ackP.prototype.singleGet = function(name){
	  if(!isNaN(name) && name < 0){//negative number array index? array[-1] = array[array.length-1]
	    return this.then(function(v){
	      if(v && v.constructor==Array){
	        return v[ v.length + name ]
	      }
	      return v[name]
	    })
	  }
	
	  return this.then(function(v){
	    return v[name]
	  })
	}
	
	ackP.prototype.get = function(){
	  var args = Array.prototype.slice.call(arguments)
	  var promise = this
	  for(var aIndex=0; aIndex < args.length; ++aIndex){
	    promise = promise.singleGet(args[aIndex])
	  }
	  return promise
	}
	
	ackP.prototype.set = function(){
	  var args = Array.prototype.slice.call(arguments)
	  return this.next(function(next){
	    next.apply(next, args)
	  })
	}
	ackP.prototype.return = ackP.prototype.set//respect the bluebird alias
	ackP.prototype.resolve = ackP.prototype.set//alias for other promise libaries
	
	ackP.prototype.delay = function(t){
	  return this.next(function(){
	    var args = Array.prototype.slice.call(arguments),
	      next = args.pop()
	    setTimeout(function(){
	      next.apply(next, args)
	    }, t)
	  })
	}
	
	//sync-method whose input is passed exactly as output to the next method in chain
	ackP.prototype.past = function(method,scope){
	  return this.add({method:method, context:scope, isPass:true, isAsync:false})
	}
	ackP.prototype.tap = ackP.prototype.past//respect the bluebird
	
	/** when this thenable is run, the first argument is this promise in it's current state */
	ackP.prototype.inspect = function(method,scope){
	  var inspect = function(){
	    var args = Array.prototype.slice.call(arguments)
	    args.unshift(this)
	    method.apply(scope||this, args)
	  }
	
	  return this.add({method:inspect, context:this, isPass:true, isAsync:false})
	}
	ackP.prototype.tap = ackP.prototype.past//respect the bluebird
	
	//async-method
	ackP.prototype.next = function(method,scope){
	  return this.add({method:method, context:scope, isAsync:true})
	}
	
	ackP.prototype.then = function(method,scope){
	
	  return this.add({method:method, context:scope, isAsync:false})
	}
	ackP.prototype.method = ackP.prototype.then//respect the blue bird
	
	/** this function will be made into ackP.prototype.then WHEN a promise error occurs. It makes catching errors flow properly between ecma6 promises and ackP */
	ackP.rejectedThen = function(method,scope){
	  /* !extremely important! - This connects ackP promises with native promises */
	  if(this._rejected && method.toString()==nativePromiseThen.toString() ){
	    throw err//This will reject to the native promise. I have already been rejected and a native promise is trying to chain onto me
	  }
	
	  return this.add({method:method, context:scope, isAsync:false})
	}
	
	ackP.prototype.spread = function(method,scope){
	  if(!method){
	    return this.add({method:function(a,next){next.apply(next,a)}, context:this, isAsync:true})
	  }else{
	    return this.add({method:function(a){
	      return method.apply(this, a)}, context:scope, isAsync:false
	    })
	  }
	}
	
	ackP.prototype.spreadCallback = function(method,scope){
	  return this.callback(function(){
	    var args = Array.prototype.slice.call(arguments)
	    var callback = args[args.length-1]
	    if(args.length){
	      switch(args[0].constructor){
	        case String: case Boolean: case Object:
	          args = [args[0]]
	          break;
	        case Array:
	          args = args[0]
	          break;
	
	        default:args=[]
	      }
	
	      args.push(callback)
	    }
	    method.apply(this, args)
	  }, scope)
	}
	
	//async-method aka promisify
	ackP.prototype.callback = function(method,scope){
	  var fireMethod = function(){
	    var bind = scope||this
	    var prom = ackPromise.start()
	    prom.set.apply(prom,arguments).spread()
	    var myMethod = ackPromise.callback4callback(method, prom, bind)
	    return prom
	    .next(function(){
	      return myMethod.apply(bind, arguments)
	    })
	    return prom
	  }
	  return this.add({method:fireMethod, scope:scope, isAsync:false})
	}
	
	ackP.prototype.clearMem = function(){
	  this.data = null;
	  return this
	}
	
	ackP.prototype.seekPromiseCatcher = function(allowSelf){
	  if(this.catchers && allowSelf==null){
	    return this
	  }
	
	  if(this.data && this.data.getNextPromise){
	    return this.data.getNextPromise().seekPromiseCatcher()
	  }
	}
	
	ackP.prototype.throwPromiseCatcher = function(e, promiseCatcher){
	  if(promiseCatcher.catchers.catch_type_array){
	    for(var i=0; i < promiseCatcher.catchers.catch_type_array.length; ++i){
	      if(promiseCatcher.catchers.catch_type_array[i].type == e.constructor){
	        this._rejectedCaught = true
	        //var r = promiseCatcher.catchers.catch_type_array[i].method.call(this,e)
	        var catcher = promiseCatcher.catchers.catch_type_array[i].method
	        promiseCatcher.runCatch(e, catcher)
	        return this
	      }
	    }
	  }
	
	  /* error string type catchers */
	    if(e && e.name && e.name.toLowerCase){
	      var eName = e.name.toLowerCase()
	      if(promiseCatcher.catchers['catch'+eName]){
	        this._rejectedCaught = true
	        //var r = promiseCatcher.catchers['catch'+eName].call(this,e)
	        var catcher = promiseCatcher.catchers['catch'+eName]
	        promiseCatcher.runCatch(e, catcher)
	        return this//r
	      }
	    }
	
	    if(e && e.code && e.code.toLowerCase){
	      var eName = e.code.toLowerCase()
	      if(promiseCatcher.catchers['catch'+eName]){
	        this._rejectedCaught = true
	        //var r = promiseCatcher.catchers['catch'+eName].call(this,e)
	        var catcher = promiseCatcher.catchers['catch'+eName]
	        promiseCatcher.runCatch(e, catcher)
	        return this//r
	      }
	    }
	
	    if(e && e.message && e.message.toLowerCase){
	      var eName = e.message.toLowerCase()
	      if(promiseCatcher.catchers['catch'+eName]){
	        this._rejectedCaught = true
	        //var r = promiseCatcher.catchers['catch'+eName].call(this,e)
	        var catcher = promiseCatcher.catchers['catch'+eName]
	        promiseCatcher.runCatch(e, catcher)
	        return this//r
	      }
	    }
	  /* end: error string type catchers */
	
	  if(promiseCatcher.catchers.catchAll){
	    this._rejectedCaught = true
	    //var r = promiseCatcher.catchers.catchAll.call(this,e)
	    var catcher = promiseCatcher.catchers.catchAll
	    promiseCatcher.runCatch(e, catcher)
	    return this//r
	  }
	
	  var promiseCatcher = promiseCatcher.seekPromiseCatcher(false)//the current promise catcher we have didn't work out
	  if(promiseCatcher){
	    return this.throwPromiseCatcher(e, promiseCatcher)
	  }
	}
	
	ackP.prototype['throw'] = function(err){
	  if(err && err.constructor==String){
	    var s = err
	    err = new Error(err)
	    err.name = s
	  }
	
	  this._rejected = err
	  this._rejectedCaught = false
	  if(nativePromiseThen)this.then = ackP.rejectedThen
	
	  var $this = this
	  var promiseCatcher = this.seekPromiseCatcher()
	
	  if(promiseCatcher){
	    return this.throwPromiseCatcher(err, promiseCatcher)
	  }
	
	  if(this.data && this.data.getNextPromise){
	    var np = this.data.getNextPromise()
	    return np['throw'].call(np, err)//cascade error reporting
	  }
	
	  //throw err
	  //return err
	}
	
	ackP.prototype.all = function(){
	  var args = Array.prototype.slice.call(arguments);
	  //create handler function
	  args.push(function(){
	    if(arguments.length){
	      var args = Array.prototype.slice.call(arguments)
	      return args
	    }
	  })
	  return this.join.apply(this, args)
	}
	
	//expected every argument but last is a running promise. Last argument is callback. Example: join(firePromiseA(),firePromiseB(),function(A,B){return 22}).then(function(r22){})
	//if only one argument, then it is a single promise whos result will be passed along
	ackP.prototype.join = function(/* promiseArrayOrPromise, promiseArrayOrPromise, joinMethod */){
	  var joinPromise, next, $this = this
	
	  var resultArray = []
	      ,count = 0
	      ,argSlice = Array.prototype.slice.call(arguments)//mutatable arguments
	      ,isArg0Array = argSlice.length && argSlice[0] && argSlice[0].constructor==Array
	      ,promiseArray = isArg0Array ? arguments[0] : argSlice
	
	  if(argSlice[argSlice.length-1] && argSlice[argSlice.length-1].constructor == Function){
	    var controller = argSlice.pop()//last arg is controller
	    //function that is called when this function counts all promises completed
	    var done = function(){
	      var controlResult = ackPromise.start().set(resultArray).spread(controller, $this)
	      controlResult.then(function(){
	        next.apply(next, Array.prototype.slice.call(arguments))
	        //$this.values = Array.prototype.slice.call(arguments)
	        //$this.runNextPromise()
	      })
	    }
	  }else{
	    var done = function(){
	      next.apply(next, [resultArray])
	    }
	  }
	
	  var nextMethod = function(){//we will call $this instead of a next method
	    next = Array.prototype.slice.call(arguments).pop()//last argument is next method
	    if(!promiseArray.length){
	      return done()
	    }
	
	    var processResult = function(i, v){
	      resultArray[i] = v
	      ++count//count a finishing promise
	      if(count==promiseArray.length){//all promises have been accounted for
	        done()
	      }
	    }
	
	    var catcher = function(e){
	      next['throw'](e)
	    }
	
	    promiseArray.forEach(function(v,i){
	      if(isPromiseLike(v)){
	        v.then(function(v){
	          processResult(i,v)
	        })['catch'](catcher)
	      }else{
	        processResult(i,v)
	      }
	    })
	  }
	
	  return $this.next(nextMethod)
	}
	
	/**
	  (array|callback, callback, options)
	  @options {concurrency}
	*/
	ackP.prototype.map = function(){
	  var args = Array.prototype.slice.call(arguments)
	
	  if(typeof(args[args.length-1])==='object'){//last is option
	    var options = args.pop()
	  }else{
	    var options = {concurrency:0}//infinite
	  }
	
	  var conc = options.concurrency==null||isNaN(options.concurrency) ? 0 : options.concurrency
	  var controller = args.pop()//last is controller
	  var newArray = []
	
	  var per = function(v,i,len){
	    return ackPromise.start().then(function(){
	      var r = controller.call(this, v, i, len)
	      if(r && r.then){//fire controller's promise
	        return r.then(function(newItem){
	          newArray[i] = newItem
	        })
	      }else{
	        newArray[i] = r
	      }
	    }, this)
	  }
	
	  var loopArray = function(arrOrOb, callback){
	    if(!arrOrOb){
	      return callback(null);
	    }
	
	    var v, wait=0,counter=0;
	    if(arrOrOb.constructor===Array){
	      var len = arrOrOb.length
	      if(!len){
	        callback(null,[])
	      }
	
	      var next = function(nx, i, $this){
	        if(i==len){
	          return;//no more loop
	        }
	
	        var prom = per.call($this, arrOrOb[i], i, len)
	        .then(function(){
	          ++counter
	          if(counter==len){//fullment by equal array.length
	            callback(null,newArray)
	          }
	        })['catch'](callback)
	
	        if(conc>0){
	          var rotation = (i+1) % conc
	          if(rotation==0){
	            return prom.then(function(){
	              nx(nx,i+1,$this)
	            })
	          }
	          ++wait;
	          return nx(nx,i+1,$this).then(function(){
	            --wait;
	            if(wait==0){
	              nx(nx,i+1,$this)
	            }
	          })
	        }
	
	          return prom.then(function(){
	            nx(nx, i+1, $this)
	          })
	      }
	
	      next(next, 0, this)
	
	      return;
	    }
	
	    //loop objects
	    var len = objectKeys(arrOrOb).length
	    if(!len)callback(null,{})
	    for(var x in arrOrOb){
	      v = arrOrOb[x];
	
	      per.call(this, v, x, len)
	      .then(function(){
	        ++counter
	        if(counter==len){//fullment by equal array len
	          callback(null,newArray)
	        }
	      })['catch'](callback)
	    }
	  }
	
	  if(args[0] && args[0].constructor!==Function){//we have array
	    return this.callback(function(callback){
	      loopArray.call(this, args[0], callback)
	    })
	  }
	
	  return this.callback(function(array,callback){
	    loopArray.call(this, array, callback)
	  })
	}
	
	/** always returns original array */
	ackP.prototype.each = function(func){
	  return this.then(function(a){
	    var prom = ackPromise.start()
	    for(var i=0; i < a.length; ++i){
	      prom = prom.set(a[i],i,a).then(func)
	    }
	
	    return prom.set.apply(prom, arguments)
	  })
	}
	
	//bluebird compatibility
	ackP.prototype._then = function(didFulfill,didReject,didProgress,receiver,internalData){
	  return this.add({method:function(){
	    didFulfill.apply(receiver, arguments)//success
	  }, isAsync:false})
	  .catch(function(){
	    didReject.apply(receiver,arguments)//reject
	  })
	}
	
	
	
	
	if(true){
	  module.exports = ackPromise
	  //module.exports.__dirname = __dirname
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// Used to resolve the internal `[[Class]]` of values
	var toString = Object.prototype.toString;
	
	// Used to resolve the decompiled source of functions
	var fnToString = Function.prototype.toString;
	
	// Used to detect host constructors (Safari > 4; really typed array specific)
	var reHostCtor = /^\[object .+?Constructor\]$/;
	
	// Compile a regexp using a common native method as a template.
	// We chose `Object#toString` because there's a good chance it is not being mucked with.
	var reNative = RegExp('^' +
	  // Coerce `Object#toString` to a string
	  String(toString)
	  // Escape any special regexp characters
	  .replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&')
	  // Replace mentions of `toString` with `.*?` to keep the template generic.
	  // Replace thing like `for ...` to support environments like Rhino which add extra info
	  // such as method arity.
	  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	function isNative(value) {
	  var type = typeof value;
	  return type == 'function'
	    // Use `Function#toString` to bypass the value's own `toString` method
	    // and avoid being faked out.
	    ? reNative.test(fnToString.call(value))
	    // Fallback to a host object check because some environments will represent
	    // things like typed arrays as DOM methods which may not conform to the
	    // normal native pattern.
	    : (value && type == 'object' && reHostCtor.test(toString.call(value))) || false;
	}
	
	var nativePromiseThen;
	var isNativePromised = typeof(Promise)!='undefined' && Promise && Promise.resolve
	if(isNativePromised){
	  Promise.resolve().then(function(){
	    var testerP = {}
	
	    testerP.then = function(nativeThen){
	      nativePromiseThen = nativeThen
	    }
	    return testerP
	  })
	  .then(function(){})//triggers native promise to invoke my promise
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(9);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(10);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = Array.prototype.slice.call(arguments);
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	//Helps in the goal of selecting and defining states of properties on indexable data (object & arrays). The indexable data is not to be polluted by the defined properties (data and states seperate)
	function IndexSelector($scope){
	  this.data = $scope||{}
	
	  this.data.indexes = this.data.indexes || []//any object will do
	  this.data.selected = this.data.selected || []
	  this.data.states = this.data.states || []
	  return this
	}
	
	IndexSelector.prototype.isIndexSelected = function(index){
	  for(var i=this.data.states.length-1; i >= 0; --i){
	    if(this.data.states[i].index==index)return true
	  }
	  return false
	}
	
	IndexSelector.prototype.selectByIndex = function(index){
	  var selected = this.data.indexes[index]
	  if(selected){
	    this.data.states.push(this.newStateByIndex(index))
	    this.data.selected.push(selected)
	  }
	  return this
	}
	
	IndexSelector.prototype.deselectByIndex = function(index){
	  var i,state
	  for(i=this.data.states.length-1; i >= 0; --i){
	    var state = this.data.states[i]
	    if(state.index==index){
	      this.data.selected.splice(i, 1)
	      this.data.states.splice(i, 1)
	      break
	    }
	  }
	  return this
	}
	
	IndexSelector.prototype.deselectState = function(state){
	  this.deselectByIndex(state.index);return this
	}
	
	IndexSelector.prototype.deselectAll = function(){
	    this.data.selected.length=0
	    this.data.states.length=0
	  return this
	}
	
	IndexSelector.prototype.selectAll = function(){
	  if(!this.data.indexes)return this
	
	  for(var i=0; i < this.data.indexes.length; ++i){
	    this.selectByIndex(i)
	  }
	
	  return this
	}
	
	//getter/setter. Getter for determining if selected. Setter to set if selected or not
	IndexSelector.prototype.selectorByIndex = function(index){
	  var $this = this
	  return function(yesNo){
	      if(yesNo!=null){
	        yesNo ? $this.selectByIndex(index) : $this.deselectByIndex(index)
	        return yesNo
	      }
	
	      return $this.isIndexSelected(index)
	    }
	}
	
	IndexSelector.prototype.newStateByIndex = function(index){
	  var state={
	    data:this.data.indexes[index],
	    state:{},
	    index:index
	  }
	
	  return state
	}
	
	IndexSelector.prototype.selectStateByIndex = function(index){
	  var i = this.data.states.length
	  this.selectByIndex(index)
	  return this.data.states[i].state
	}
	
	IndexSelector.prototype.deselectOldest = function(){
	  this.data.selected.splice(0, 1)
	  this.data.states.splice(0, 1)
	  return this
	}
	
	IndexSelector.prototype.getOldestIndex = function(){
	  if(this.data.states.length)return this.data.states[0].index
	}
	
	//when IndexSelector has been init with selectives but no states, blank states can be built
	IndexSelector.prototype.pairSelectedToState = function(){
	  for(var i=0; i < this.data.states.length; ++i){
	    var state = this.data.states[i]
	    this.data.selected[i] = this.data.selected[i] || this.data.indexes[state.index]
	  }
	  return this
	}
	
	//when IndexSelector has been init with selectives but no states, blank states can be built
	IndexSelector.prototype.pairStateToSelected = function(){
	  for(var i=0; i < this.data.selected.length; ++i){
	    var selected = this.data.selected[i]
	    this.data.states[i] = this.data.states[i] || this.newStateByIndex(i)
	  }
	  return this
	}
	
	
	module.exports = IndexSelector

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(errorObject){
	  return new jError(errorObject)
	}
	
	var jError = function jError(errorObject){
	  this.types = jError.types
	  this.errorObject = errorObject;return this;
	}
	
	jError.prototype.getKeys = function(){
	  return Object.getOwnPropertyNames(this.errorObject)
	}
	
	/** converts error.stack into array via stack.split(' at ') */
	jError.prototype.getStackArray = function(amount){
	  if(this.stackArray){
	    return this.stackArray
	  }
	
	  if(this.errorObject.stack){
	    if(this.errorObject.stack.split){
	      this.stackArray = this.errorObject.stack.split(' at ');
	    }else if(this.errorObject.stack.splice){//?already an array?
	      this.stackArray = this.errorObject.stack;
	    }
	    return this.stackArray;
	  }
	
	  return []
	}
	
	jError.prototype.getTraceArray = function(amount){
	  var stackArray = [];
	  stackArray.push.apply(stackArray, this.getStackArray())
	  stackArray.shift();
	
	  if(amount){
	    stackArray.splice(amount, stackArray.length)
	  }
	
	  return stackArray
	}
	
	jError.prototype.getFirstTrace = function(amount){
	  var stackArray = this.getStackArray()
	  if(!stackArray)return;
	
	  amount = amount || 1
	
	  if(stackArray.length==1){
	    var rtn = [stackArray[0]]
	  }else{
	    var rtn = []
	    for(var i=1; i <= stackArray.length && i <= amount; ++i){
	      rtn.push( stackArray[i] )
	    }
	  }
	
	  return rtn.join(' at ')
	}
	
	jError.prototype.setStackArray = function(stackArray){
	  this.errorObject.stack = stackArray.join(' at ')
	  this.stackArray = stackArray
	  return this
	}
	
	/** analyzes stack to remove 1st trace (leaves error message in stack). Essentially calls .splice(1,1) on stack array  */
	jError.prototype.cutFirstTrace = function(){
	  var stackArray = this.getStackArray()
	  if(stackArray && stackArray.length > 1){
	    stackArray.splice(1,1)
	    this.setStackArray( stackArray )
	  }
	
	  return this
	}
	
	jError.prototype.getLineNum = function(){
	  var string = this.getFirstTrace().split(':')[1]
	  return Number(string)
	}
	
	jError.prototype.getFilePath = function(){
	  var trace = this.getFirstTrace()
	  return trace.split(':')[0].split('(').pop()
	}
	
	jError.prototype.getName = function(){
	  if(this.errorObject.name)return this.errorObject.name
	  return this.getFailingObjectName()
	}
	
	jError.prototype.getFailingObjectName = function(){
	  var trace = this.getFirstTrace()
	  return trace.split(/\(|@/)[0].trim()
	}
	
	jError.prototype.getMessage = function(){
	  if(this.errorObject.message)return this.errorObject.message
	
	  var fTrace = this.getFirstTrace()
	  if(fTrace){
	    var fSpaceArray = fTrace.split(' ')
	    if(fSpaceArray.length){
	      return fSpaceArray.splice(0, 1)[0]
	    }
	  }
	
	  if(this.errorObject.constructor == String){
	    return this.errorObject
	  }
	}
	
	jError.prototype.getType = function(){
	  var isNamed = this.errorObject.name && this.errorObject.name.toLowerCase!=null
	  var isCode = this.errorObject.code && this.errorObject.code.toLowerCase!=null
	
	  if(isCode && this.errorObject.name=='Error'){
	    return this.errorObject.code
	  }
	
	  if(isNamed){
	    return this.errorObject.name
	  }
	}
	
	jError.prototype.isType = function(type){
	  if(this.errorObject==null)return false
	
	  if(this.errorObject.constructor && type == this.errorObject.constructor){
	    return true
	  }
	
	  var eName = this.getType()
	  if(eName && eName.toLowerCase()==type.toLowerCase()){
	    return true
	  }
	
	  if(type.constructor==String){
	    if(this.errorObject.constructor==String){
	      return this.errorObject.toLowerCase() === type.toLowerCase()
	    }
	
	    var mess = this.getMessage()
	    if(mess && type.toLowerCase()==mess.toLowerCase()){
	      return true
	    }
	  }
	
	  return false
	}
	
	
	
	jError.types = {}
	
	jError.types.NotFound = function(message){
	  Error.captureStackTrace(this, this.constructor);
	  this.name = this.constructor.name;
	  this.status = 404;
	  this.code = "not_found";
	  this.message = message || "Could Not Find Requested Resource";
	}
	jError.types.NotFound.prototype = Object.create(Error.prototype)
	jError.types.notFound = function(message){
	  return new jError.types.NotFound(message)
	}
	
	jError.types.LocalNetworkRequired = function(message){
	  Error.captureStackTrace(this, this.constructor);
	  this.name = this.constructor.name;
	  this.status = 403;
	  this.code = "local_network_required";
	  this.message = message || "Local Network Connection Required";
	}
	jError.types.LocalNetworkRequired.prototype = Object.create(Error.prototype)
	jError.types.localNetworkRequired = function(message){
	  return new jError.types.LocalNetworkRequired(message)
	}
	
	jError.types.Unauthorized = function(message){
	  Error.captureStackTrace(this, this.constructor);
	  this.name = this.constructor.name;
	  this.status = 401;
	  this.code = "credentials_required";
	  this.message = message || "No authorization token was found";
	}
	jError.types.Unauthorized.prototype = Object.create(Error.prototype)
	jError.types.unauthorized = function(message){
	  return new jError.types.Unauthorized(message)
	}
	
	jError.types.BadRequest = function(message){
	  Error.captureStackTrace(this, this.constructor);
	  this.name = this.constructor.name;
	  this.status = 400;
	  this.code = "bad_request";
	  this.message = message || "Bad Request";
	}
	jError.types.BadRequest.prototype = Object.create(Error.prototype)
	jError.types.badRequest = function(message){
	  return new jError.types.BadRequest(message)
	}
	
	jError.types.MethodNotAllowed = function(message){
	  Error.captureStackTrace(this, this.constructor);
	  this.name = this.constructor.name;
	  this.status = 405;
	  this.code = "method_not_allowed";
	  this.message = message || "Method Not Allowed";
	}
	jError.types.MethodNotAllowed.prototype = Object.create(Error.prototype)
	jError.types.methodNotAllowed = function(message){
	  return new jError.types.MethodNotAllowed(message)
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	var jXNumber = function jXNumber(number){
		this.number = number
		return this
	}
	
	jXNumber.prototype.decimalFormat = function(p){
	  p = p==null ? 2 : p
	  var m=Math.pow(10,p)
	    ,n=this.number
	  return (Math.round(n*m)/m).toFixed(p)
	}
	
	/**
	  @options - {}
	  @options.date - default=new Date()
	*/
	jXNumber.prototype.asMinutesToDateTime = function(options){
	  options = options || {}
	  var minute = this.number
	  var iDate = options.date || new Date()
	  var date = new Date(iDate.getFullYear(), iDate.getMonth(), iDate.getDate(), 0, minute)
	
	  return date
	}
	
	/**
	  @options = {}
	  @options.timeDelim - default=':'
	  @optiosn.dayPeriodDelim - default=' '
	*/
	jXNumber.prototype.asMinutesToTime = function(options){
	  options = options || {}
	  options.timeDelim = options.timeDelim || ':'
	  options.dayPeriodDelim = options.dayPeriodDelim || ' '
	  var d = this.asMinutesToDateTime(options)
	  var hour = d.getHours()
	  var tt = 'AM'
	  var mins = d.getMinutes()
	
	  if(hour > 12){
	    tt = 'PM'
	    hour = hour - 12
	  }
	
	  mins = mins.toString().length == 1 ? '0'+mins : mins
	
	  return hour +options.timeDelim+ mins +options.dayPeriodDelim+ tt;
	}
	
	
	var rtn = function(path){return new jXNumber(path)}
	if(typeof(module)!='undefined' && module.exports){
		rtn.Class = jXNumber
		module.exports = rtn
	}else if(typeof(jX)!='undefined'){
		jX.modules.define('number', rtn)
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {"use strict";
	var ExString = function ExString(string){
		this.string = string
		return this
	}
	
	ExString._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
	
	ExString.prototype.isEmail = function(){
		return this.string.search(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)>=0
	}
	
	//Node.js doesnt have .repeat as of 2/11/15
	ExString.prototype.repeat = function(num){
		var x,s = ''
		for(x=0; x < num; ++x)s = s + this.string
		return s
	}
	
	//grouptype = sequence || struct
	ExString.prototype.htmlFormat = function(){
		var v = this.string
		v=v.replace(/</g,'&lt;').replace(/>/g,'&gt;')
		return v
	}
	
	ExString.prototype.toBase64 = function(){
		var e = this._utf8_encode();
		var t="";var n,r,i,s,o,u,a;var f=0;
		while(f<e.length){
			n=e.charCodeAt(f++);r=e.charCodeAt(f++);
			i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;
			if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}
			t=t+ExString._keyStr.charAt(s)+ExString._keyStr.charAt(o)+ExString._keyStr.charAt(u)+ExString._keyStr.charAt(a)
		}
		return t
	}
	
	ExString.prototype._utf8_encode = function(){
		var e = this.string.replace ? this.string : this.string.toString()
		e=e.replace(/\r\n/g,"\n");var t="";
		for(var n=0;n<e.length;n++){
			var r=e.charCodeAt(n);
			if(r<128){
				t+=String.fromCharCode(r)
			}else if(r>127&&r<2048){
				t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)
			}else{
				t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)
			}
		}
		return t
	}
	/*
	ExString.prototype.isBinary = function(){
		return /^[01]+$/.test(this.string)
	}
	*/
	//NODE ONLY
	if(typeof(Buffer) != 'undefined'){
		ExString.prototype.toHex = function(encType){
			encType = encType || 'hex'
			return new Buffer(this.string,encType).toString('hex')
		}
	
		ExString.prototype.toBinary = function(encType){
			encType = encType || 'binary'
			return new Buffer(this.string,encType)
		}
	}
	
	var rtn = function(path){
		return new ExString(path)
	}
	rtn.Class = ExString
	module.exports = rtn
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15).Buffer))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(16)
	var ieee754 = __webpack_require__(17)
	var isArray = __webpack_require__(18)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation
	
	var rootParent = {}
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	function typedArraySupport () {
	  function Bar () {}
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    arr.constructor = Bar
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Bar && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }
	
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    this.length = 0
	    this.parent = undefined
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }
	
	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }
	
	  // Unusual.
	  return fromObject(this, arg)
	}
	
	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'
	
	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)
	
	  that.write(string, encoding)
	  return that
	}
	
	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)
	
	  if (isArray(object)) return fromArray(that, object)
	
	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }
	
	  if (object.length) return fromArrayLike(that, object)
	
	  return fromJsonObject(that, object)
	}
	
	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}
	
	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0
	
	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)
	
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	} else {
	  // pre-set for values that may exist in the future
	  Buffer.prototype.length = undefined
	  Buffer.prototype.parent = undefined
	}
	
	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }
	
	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent
	
	  return that
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)
	
	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break
	
	    ++i
	  }
	
	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')
	
	  if (list.length === 0) {
	    return new Buffer(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }
	
	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}
	
	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0
	
	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'binary':
	        return binarySlice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0
	
	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1
	
	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)
	
	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }
	
	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}
	
	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'binary':
	        return binaryWrite(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  if (newBuf.length) newBuf.parent = this.parent || this
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }
	
	  return len
	}
	
	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length
	
	  if (end < start) throw new RangeError('end < start')
	
	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return
	
	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')
	
	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var BP = Buffer.prototype
	
	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true
	
	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set
	
	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set
	
	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer
	
	  return arr
	}
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15).Buffer, (function() { return this; }())))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	
	;(function (exports) {
		'use strict';
	
	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array
	
		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)
	
		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}
	
		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr
	
			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}
	
			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0
	
			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)
	
			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length
	
			var L = 0
	
			function push (v) {
				arr[L++] = v
			}
	
			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}
	
			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}
	
			return arr
		}
	
		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length
	
			function encode (num) {
				return lookup.charAt(num)
			}
	
			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}
	
			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}
	
			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}
	
			return output
		}
	
		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 17 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 18 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	var jXBinary = function jXBinary(binary){
		this.binary = binary
		return this
	}
	
	jXBinary.prototype.is = function(){
		return /^[01]+$/.test(this.binary)
	}
	
	
	var rtn = function(path){return new jXBinary(path)}
	if(typeof(module)!='undefined' && module.exports){
		rtn.Class = jXBinary
		module.exports = rtn
	}else if(typeof(jX)!='undefined'){
		jX.modules.define('binary', rtn)
	}


/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	var jXBase64 = function jXBase64(base64){
		this.base64 = base64
		return this
	}
	
	jXBase64._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
	
	jXBase64.prototype.toString = function(e){
		var e = this.base64.replace(/[^A-Za-z0-9\+\/\=]/g,"");
		var t="";var n,r,i;var s,o,u,a;var f=0;
		while(f<e.length){
			s=jXBase64._keyStr.indexOf(e.charAt(f++));
			o=jXBase64._keyStr.indexOf(e.charAt(f++));
			u=jXBase64._keyStr.indexOf(e.charAt(f++));
			a=jXBase64._keyStr.indexOf(e.charAt(f++));
			n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;
			t=t+String.fromCharCode(n);
			if(u!=64){t=t+String.fromCharCode(r)}
			if(a!=64){t=t+String.fromCharCode(i)}
		}
		t = this._utf8_decode(t);
		return t
	}
	
	jXBase64.prototype._utf8_decode = function(e){
		var t="";var n=0;var r=0,c2=0;
		while(n<e.length){
			r=e.charCodeAt(n);
			if(r<128){
				t+=String.fromCharCode(r);n++
			}else if(r>191&&r<224){
				c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2
			}else{
				c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);
				t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3
			}
		}
		return t
	}
	
	var rtn = function(path){return new jXBase64(path)}
	if(typeof(module)!='undefined' && module.exports){
		rtn.Class = jXBase64
		module.exports = rtn
	}else if(typeof(jX)!='undefined'){
		jX.modules.define('base64', rtn)
	}


/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	var jXObject = function jXObject(object){
		this.object = object
		return this
	}
	
	jXObject.prototype.isCyclic = function() {
		var seenObjects = [];
	
		function detect (obj) {
			if (obj && typeof obj === 'object') {
				if (seenObjects.indexOf(obj) !== -1) {
					return true;
				}
				seenObjects.push(obj);
				for(var key in obj) {
					if(obj.hasOwnProperty(key) && detect(obj[key])) {
				//console.log(obj, 'cycle at ' + key);
						return true;
					}
				}
			}
			return false;
		}
	
		return detect(this.object);
	}
	
	jXObject.prototype.toCookieString = function(){
		var cookies = this.object
		var cookieNameArray = Object.keys(cookies)
		if(cookieNameArray.length){
			var cookieString = '';
			cookieNameArray.forEach(function(name,i){
				cookieString += '; '+name+'='+cookies[name]
			})
			cookieString = cookieString.substring(2, cookieString.length)//remove "; "
			return cookieString
		}
		return ''
	}
	
	
	var rtn = function(path){return new jXObject(path)}
	if(typeof(module)!='undefined' && module.exports){
		rtn.Class = jXObject
		module.exports = rtn
	}else if(typeof(jX)!='undefined'){
		jX.modules.define('object', rtn)
	}


/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	var jXMethod = function jXMethod(method, name){
		this.method = method;this.name = name
		return this
	}
	
	jXMethod.prototype.runInMs = function(ms){
		setTimeout(this.method, ms);return this
	}
	
	if(jXMethod.name && jXMethod.name==='jXMethod'){//device supports function.name
		jXMethod.prototype.getName = function(){
			return this.name || (this.method.name.length ? this.method.name : null)
		}
	}else{
		jXMethod.prototype.getName = function(){
			var funcNameRegex = /function\s+(.{1,})\(/;
			var results = (funcNameRegex).exec(this.method.toString())
			return this.name || ((results && results.length > 1) ? results[1] : null)
		}
	}
	
	jXMethod.prototype.getArgNameArray = function(){
		var string = this.getDefinition()
		var argDef = /\(.+\)/.exec(string)[0]
		argDef = argDef.substring(1, argDef.length)//remove (
		argDef = argDef.substring(0, argDef.length-1)//remove )
		argDef = argDef.replace(/\s|\t|\r|\n/g,'')
		return argDef.split(',')
	}
	
	jXMethod.prototype.getDefinition = function(){
		var funcNameRegex = /(.*function[^\)]+\))/;
		var results = (funcNameRegex).exec(this.method.toString())
		return (results && results.length > 1) ? results[1] : null
	}
	
	/** This is an option enhanced version of expectOne */
	jXMethod.prototype.expect = function(nameOrMap, value, requiredOrType, type){
		if(nameOrMap && nameOrMap.constructor==String){
			return this.expectOne(nameOrMap, value, requiredOrType, type)
		}
	
		for(var key in nameOrMap){
			var define = nameOrMap[key]
			var val = define && (define.val!==null || define.value!==null)
			if(val){
				val = define.val || define.value
				this.expectOne(key, val, define.required, define.type)
			}else{
				this.expectOne(key, define, true)
			}
		}
	
		return this
	}
	
	/**
		argument-name, argument-value, required, constructor
		@requiredOrType - true/false or constructor validation. When constructor validatation, required is true. When undefined, required is true
	*/
	jXMethod.prototype.expectOne = function(name, value, requiredOrType, type){
		var isReqDefined = requiredOrType!=null && requiredOrType.constructor==Boolean
		var isRequired = isReqDefined ? requiredOrType : true
		type = type || (isReqDefined ? null : requiredOrType)
	
		if(isRequired && value==null){
			var methodName = this.getName()
			var methodMsg = methodName ? 'The function '+methodName+' recieved an invalid argument. ' : ''
			var argTypeMsg = methodMsg+'Argument '+name+' is required. '
			var err = new Error(argTypeMsg+' Function definition: '+this.getDefinition())
			err.invalidArg = {errorType:'undefined', name:name}
			throw err
		}
	
		if(type){
			if(value!=null && value.constructor!=type){
				var methodName = this.getName()
				var methodMsg = methodName ? 'The function '+methodName+' recieved an invalid argument. ' : ''
				var argTypeMsg = methodMsg+'Argument '+name+' is not of type '+type.name+'. '
				var err = new Error(argTypeMsg+'Received type: '+value.constructor.name+'. Function definition: '+this.getDefinition())
				err.invalidArg = {errorType:'type', name:name}
				throw err
			}
		}
		return this
	}
	
	/** for processing current arguments */
	jXMethod.prototype.arguments = function(args){
		return new jXArgs(this, args)
	}
	
	var rtn = function(path){
		return new jXMethod(path)
	}
	if(typeof(module)!='undefined' && module.exports){
		rtn.Class = jXMethod
		module.exports = rtn
	}else if(typeof(jX)!='undefined'){
		jX.modules.define('method', rtn)
	}
	
	
	
	
	
	var jXArgs = function(jXMethod, args){
		this.args=args;this.jXMethod=jXMethod;return this
	}
	


/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	var jXArray = function jXArray(array){
		this.array = array
		return this
	}
	
	/**
		Intended for high performance by looping an array only once but performing multiple actions.
		Run multiple functions for each iteration of an array.
	
		Example: array.each(countTeacher, countChild) instead of two loops array.each(countTeacher) + array.each(countChild)
	*/
	jXArray.prototype.each = function(method0, method1, method2, method3){
		if(!this.array)return this;
		for(var x=0; x < this.array.length; ++x){
			for(var a=0; a < arguments.length; ++a){
				arguments[a].call(null, this.array[x], x, this.array.length)
			}
			this.array[x]
		}
		return this;
	}
	
	jXArray.prototype.distinct = function(method){
		if(!this.array)return this;
	
		var distincts = []
		method = method || function(v){return v}
	
		for(var x=0; x < this.array.length; ++x){
			var a0 = this.array[x]
			var isDef = false
			for(var xd=distincts.length-1; xd >= 0; --xd){
				var item = distincts[xd]
				if(method(a0)==method(item)){
					isDef = true
					break;
				}
			}
			if(!isDef)distincts.push(a0)
		}
		this.array = distincts
		return this
	}
	
	//pivets array of objects to object of arrays
	jXArray.prototype.objectify = function(){
		if(!this.array.length)return {}
	
		var x,n,s,r={}
	
		s = this.array[0]
		for(n in s){
			r[n] = []
		}
	
		for(x=this.array.length-1; x >= 0; --x){
			s = this.array[x]
			for(n in s){
				r[n].unshift(s[n])
			}
		}
		return r
	}
	
	//append an array's items onto the end of this array
	jXArray.prototype.appendArray = function(){
		//each argument maybe another array
		for(var argIn=0; argIn < arguments.length; ++argIn){
			var array = arguments[argIn]
			for(var aI=0; aI < array.length; ++aI){
				this.array.push(array[aI])
			}
		}
	
		return this
	}
	jXArray.prototype.union = jXArray.prototype.appendArray
	
	//prepend an array's items onto the front of this array
	jXArray.prototype.prependArray = function(){
		//each argument maybe another array
		for(var argIn=0; argIn < arguments.length; ++argIn){
			var array = arguments[argIn]
			for(var aI=array.length-1; aI >= 0; --aI){
				this.array.unshift(array[aI])
			}
		}
	
		return this
	}
	
	jXArray.prototype.sum = function(method){
		var n=0,a = this.array
		method = method || function(v,i){return v}
		for(var i=a.length-1; i >= 0; --i){
			n = n + Number(method(a[i],i))
		}
		return n
	}
	
	//grouptype = sequence || struct. WHEN isIndexValue=true THEN return array contains back reference to orginal array index
	jXArray.prototype.group = function(method, isIndexValue, grouptype){
		method = method ? method : function(v){return v}
		grouptype = grouptype ? grouptype : 'sequence'
		isIndexValue = isIndexValue==null ? 0 : isIndexValue
	
		var array = this.array
	
		if(grouptype == 'struct'){
			var struct = {};
			for(var x=0; x < array.length; ++x){
				var a = array[x]
				var v = method(a);
				if(struct[v]==null)struct[v]=[];
				struct[v].push(isIndexValue ? x : a);
			}
			return struct;
		}
	
		var rArray = [[]];
		var cVal = 0;
		for(var x=0; x < array.length; ++x){
			var a = array[x];
			var v = method(a);
			if(cVal != v && x > 1)rArray.push([]);
			cVal=v;
			rArray[rArray.length-1].push(isIndexValue ? x : a);
		}
	
		return rArray;
	}
	
	var rtn = function(path){return new jXArray(path)}
	if(typeof(module)!='undefined' && module.exports){
		rtn.Class = jXArray
		module.exports = rtn
	}else if(typeof(jX)!='undefined'){
		jX.modules.define('array', rtn)
	}


/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	var jXQueryObject = function jXQueryObject(object){
		this.queryObject = object
		return this
	}
	
	jXQueryObject.prototype.getNameArray = function(){
		return Object.keys(this.queryObject)
	}
	
	//{delimiter,isNameFirstRow,textQualifier,titleArray}
	jXQueryObject.prototype.toCsv = function(delimOrOptions, textQualifier, titleArray){
		return this.Csv.apply(this,arguments).output()
	}
	
	jXQueryObject.prototype.Csv = function(delimOrOptions, textQualifier, titleArray){
		if(typeof(delimOrOptions)=='string')
			delimOrOptions = {delimiter:delimOrOptions}
		else if(delimOrOptions==null)
			delimOrOptions = {}
	
		if(textQualifier)delimOrOptions.textQualifier=textQualifier
		if(titleArray)delimOrOptions.titleArray=titleArray
	
		return new jXQueryObjectCsv(this.queryObject, delimOrOptions)
	}
	
	
	
	
	
	
	
	
	//{delimiter,isNameFirstRow,textQualifier,titleArray}
	function jXQueryObjectCsv(queryObject,$scope){
		this.data = $scope || {}
		this.data.isNameFirstRow = this.data.isNameFirstRow==null ? true : this.data.isNameFirstRow
		this.data.delimiter = this.data.delimiter || ','
		this.data.queryObject = queryObject || this.data.queryObject || {}
		return this
	}
	
	jXQueryObjectCsv.prototype.getTitleArray = function(){
		if(this.data.titleArray)return this.data.titleArray
		if(this.data.isNameFirstRow)return Object.keys(this.data.queryObject)
	}
	
	jXQueryObjectCsv.prototype.output = function(){
		return this.toArray().join( this.data.lineDelim || '\r\n' )
	}
	
	jXQueryObjectCsv.prototype.toArray = function(){
		//textQualifier = textQualifier || '"'
		var columnLoop, columnCount, tempContent, newValue, newTitle,
			returnText = [],
			titleArray = this.getTitleArray(),
			nameArray = titleArray
	
		var options = this.data
		if(options.textQualifier && options.textQualifier.length){
			var nr = new RegExp('/'+options.textQualifier+'/', 'gi')
			var getCsvValueOf = function(val){
				if(val==null)return ''
				val = val.toString().replace(nr, options.textQualifier+options.textQualifier)
				val = options.textQualifier + val + options.textQualifier;
				return val
			}
		}else
			var getCsvValueOf = function(val){
				return val
			}
	
			/* figure headers */
				var tempContent=[]
	
				for(columnLoop=0; columnLoop < titleArray.length; ++columnLoop){
					if(typeof(titleArray[columnLoop])=='object'){
						newTitle =  titleArray[columnLoop][1]
						titleArray[columnLoop] = newTitle
						nameArray[columnLoop] = titleArray[columnLoop][0]
					}else{
						newTitle = titleArray[columnLoop]
					}
					newValue = getCsvValueOf(newTitle)
					tempContent.push(newValue)
				}
			/* end: figure headers */
	
			if(this.data.isNameFirstRow){
				tempContent = tempContent.join(this.data.delimiter)
				if(tempContent){
	        returnText.push(tempContent);
	      }
			}
	
			/* build CSV content */
	//console.log('nameArray[0]', nameArray[0], nameArray, this.data.isNameFirstRow, this.data.queryObject)
	
			var rowLoop,
				columnName,
	      firstColumn=this.data.queryObject[ nameArray[0] ]
	
	    if(firstColumn){//when no data provided, firstColumn is null
				var len = firstColumn.length;//get array len from first column
	  		for(rowLoop=0; rowLoop < len; ++rowLoop){
	  			tempContent	= [];
	  			columnCount = nameArray.length;
	  			for(columnLoop=0; columnLoop < columnCount; ++columnLoop){
	  				columnName = nameArray[columnLoop];
	  				newValue = this.data.queryObject[columnName][rowLoop]
	  				newValue = getCsvValueOf(newValue);
	  				//if(isBinary(newValue))newValue = toString(newValue);
	  				tempContent.push(newValue)
	  			}
	  			tempContent = tempContent.join(this.data.delimiter)
	  			returnText.push(tempContent)
	  		}
	    }
		/* end */
	
		return returnText
	}
	
	
	
	
	
	
	
	var rtn = function(path){return new jXQueryObject(path)}
	if(typeof(module)!='undefined' && module.exports){
		rtn.Class = jXQueryObject
		module.exports = rtn
	}else if(typeof(jX)!='undefined'){
		jX.modules.define('queryObject',rtn)
	}


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var jc = __webpack_require__(5)
		,xMonth = __webpack_require__(26)
		,ExDate = __webpack_require__(27)
	
	
	var Week = function Week(num){
		if(num!=null)this.setStartDate(num)
		return this
	}
	
	jc(Week, xMonth.Class)
	
	Week.prototype.getEndDate = function(){
		if(this.endDate)return this.endDate
		this.endDate = new Date(this.getStartDate().getDate() + 6)
		return this.endDate
	}
	
	Week.prototype.setEndDate = function(date){
		if(!ExDate(date).isDate() && !isNaN(date))//just the month number?
			endDate = ExDate(new Date()).setMonth(date).getLastDateOfMonth()
		else
			this.endDate = date
	
		return this
	}
	
	Week.prototype.setStartDate = function(date){
		if(!isNaN(date) && date.constructor != Date)//just the month number?
			this.date = ExDate(new Date()).gotoWeek(date).date
		else
			this.date = date
		return this
	}
	
	Week.prototype.getStartDate = function(){
		if(!this.date)
			this.date = ExDate(new Date()).getDateWeekStart()
		return this.date
	}
	
	var rtn = function(path){return new Week(path)}
	rtn.Class = Week
	module.exports = rtn

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xDate = __webpack_require__(27)
	
	var xMonth = function xMonth(num){
		if(num!=null){
			this.setStartDate(num)
		}
		return this
	}
	
	xMonth.monthLcaseNameArray = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
	
	xMonth.getMonthIndexByString = function(mon){
		return xMonth.monthLcaseNameArray.indexOf(mon.toLowerCase())
	}
	
	xMonth.prototype.setStartDate = function(date){
		var jDate = xDate()
		if(!jDate.isDate(date)){
			var num = Number(date)
	
			if(!isNaN(num)){//just the month number?
				date = xDate().now().setDate(1).setMonth(date).date
			}else{
				var i = xMonth.getMonthIndexByString(date)
				date = xDate(new Date()).setDate(1).setMonth(i+1).date
			}
		}
		this.date = date
		return this
	}
	
	xMonth.prototype.StartDate = function(isClone){
		var startDate = !isClone ?  this.getStartDate() : this.getStartDate()
		return xDate(startDate)
	}
	
	xMonth.prototype.xDate = function(){
		return xDate(this.getStartDate())
	}
	
	xMonth.prototype.getStartDate = function(){
		if(this.date)return this.date
		this.date = new Date(new Date().setDate(1))
		return this
	}
	
	xMonth.prototype.setEndDate = function(date){
		if(!xDate(v).isDate() && !isNaN(v))//just the month number?
			this.endDate = xDate(new Date()).setMonth(date).getLastDateOfMonth()
		else
			this.endDate = date
	
		return this
	}
	
	xMonth.prototype.getEndDate = function(){
		if(this.endDate)return this.endDate
		var d = '12/31/'+this.getYear()
		this.endDate = new Date(d)
		return this.endDate
	}
	
	
	
	var rtn = function(num){
		return new xMonth(num)
	}
	rtn.Class = xMonth
	module.exports = rtn

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";
	
	/* everything operates on a scale of 1-12 NOT 0-11 OR 1-31 NOT 0-30 ... Weeks are 1-53 */
	function ackDate(date){
	  this.date = ackDate.toDate(date)
	  return this
	}
	
	ackDate.suffixByNumber = function(i){
	  var j = i % 10,
	      k = i % 100;
	  if (j == 1 && k != 11) {
	      return i + "st";
	  }
	  if (j == 2 && k != 12) {
	      return i + "nd";
	  }
	  if (j == 3 && k != 13) {
	      return i + "rd";
	  }
	  return i + "th";
	}
	
	ackDate.dateAddDay = function(d, amount){
	  amount = amount==null ? 1 : amount
	    var dat = new Date(d);
	    dat.setDate(dat.getDate() + amount);
	    return dat;
	}
	
	ackDate.startOfDateDay = function(date){
	  date = new Date(new Date(date).setHours(0))
	  date = new Date(date.setMinutes(0))
	  date = new Date(date.setSeconds(0))
	  return new Date(date.setMilliseconds(0))
	}
	
	ackDate.endOfDateDay = function(date){
	  date = new Date(new Date(date).setHours(23))
	  date = new Date(date.setMinutes(59))
	  date = new Date(date.setSeconds(59))
	  return new Date(date.setMilliseconds(999))
	}
	
	ackDate.dateObjectBy = function(date){
	  if(date){
	    if(date.constructor == ackDate)
	      return date.date
	
	    if(date.constructor == Date)
	      return date
	
	    //if(['string','number'].indexOf(typeof(date)))
	    return new Date(date)//convert string to date object
	  }
	
	  return date || new Date()
	}
	
	ackDate.toDate = function(date){
	  return date!=null ? ackDate.dateObjectBy(date) : null
	}
	
	//NON PROTOTYPE METHODS
	ackDate.twoDigit = function(n){
	  return ('0'+n).slice(-2)
	}
	
	ackDate.isDate = function(date){
	  var isRawDate = date.constructor==Date&&!isNaN(date.getTime())
	  if(isRawDate)return true
	
	  if(date.search)//string
	    return date.search(/^([0]?[1-9]|[1][0-2])[./-]([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0-9]{4}|[0-9]{2})$/) >= 0
	
	  return false
	}
	
	ackDate.yearByDate = function(d){
	  return d.getFullYear()
	}
	
	ackDate.getMonthIndexByString = function(mon){
	  return ackDate.monthLcaseNameArray.indexOf(mon.toLowerCase())
	}
	
	ackDate.monthNameArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	ackDate.monthLcaseNameArray = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
	ackDate.monthAbbrArray = ['Jan','Feb','Mar','Apr','Ma','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
	ackDate.dayNameArray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
	ackDate.dayAbbrArray = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
	
	
	ackDate.dateYearDiff = function(d0, d1){
	  return Math.abs(d0.getFullYear() - d1.getFullYear())
	}
	
	/*
	  PROTOTYPES
	*/
	
	ackDate.prototype.now = function(){
	  this.date = new Date();return this;
	}
	
	ackDate.prototype.param = function(){
	  this.date = this.date||new Date();return this;
	}
	
	var stdTimezoneOffset = function() {
	  var d = new Date()
	  var jan = new Date(d.getFullYear(), 0, 1);
	  var jul = new Date(d.getFullYear(), 6, 1);
	  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
	}()
	ackDate.prototype.isDaylightSavings = function(){
	  if(!this.date)return;
	  return this.date.getTimezoneOffset() < stdTimezoneOffset;
	}
	
	//returns years.months (32.11 is 32 years and 11 months && 32.1 is 32 years 1 month)
	ackDate.prototype.getAgeDisplay = function(){
	  var d = this.date
	    ,toDate = new Date()
	    ,local = {}
	
	  local.isValBirthdate = d!=null && ackDate.isDate(d);
	
	  if(!local.isValBirthdate)return 0;
	
	
	  local.isBorn = d < toDate
	  if(local.isBorn){
	    local.lesserDate = d
	    local.greaterDate = toDate
	  }else{
	    local.lesserDate = toDate
	    local.greaterDate = d
	  }
	
	  local.cYear = ackDate.yearByDate(local.greaterDate)
	  local.lastBirthdate = ackDate.dateAddDay(local.lesserDate, -365)
	  local.years = ackDate.dateYearDiff(local.lesserDate, local.greaterDate)
	  local.months = ackDate.dateMonthDiff(local.lastBirthdate, local.greaterDate)
	
	  if(local.months >= 12)
	    local.months = local.months % 12
	
	  local.format = 1;
	  if(local.months >= 10)
	    local.format = 2
	
	  var rtnNum = local.years +'.'+ local.months
	
	  local.result = (function(n,p){var m=Math.pow(10,p);return (Math.round(n*m)/m).toFixed(p)})(rtnNum,local.format)
	
	  if(!local.isBorn)local.result = -local.result;
	
	  return local.result;
	}
	
	ackDate.prototype.gt = function(date){
	  date = ackDate.dateObjectBy(date)
	  return this.date > date
	}
	
	ackDate.prototype.lt = function(date){
	  date = ackDate.dateObjectBy(date)
	  return this.date < date
	}
	
	ackDate.prototype['new'] = function(){
	  return new ackDate( new Date(this.date) )
	}
	
	ackDate.prototype.isDate = function(date){
	  return ackDate.isDate(date||this.date)
	}
	
	//return natural Date object
	ackDate.prototype.getDate = function(){
	  return this.date.getDate()
	}
	
	//sets day of month
	ackDate.prototype.setDate = function(n){
	  var d = this.date
	  d = d.setDate(n)
	  this.date = new Date(d)
	  return this
	}
	ackDate.prototype.setDayOfMonth = ackDate.prototype.setDate
	
	
	/* YEARS */
	ackDate.prototype.Year = function(){
	  return ack.year(this.date)
	}
	
	ackDate.prototype.year = function(){
	  return ackDate.yearByDate(this.date)
	}
	ackDate.prototype.getYear = ackDate.prototype.year
	
	ackDate.prototype.setYear = function(n){
	  this.date.setYear(n)
	  return this
	}
	
	ackDate.prototype.dayOfYear = function(){
	  var d = this.date
	  return Math.ceil((d - new Date(d.getFullYear(), 0, 1)) / 86400000)
	}
	
	ackDate.prototype.getNextYear = function(y){
	  y = y==null ? 1 : Number(y)
	  return this.year()+y
	}
	ackDate.prototype.nextYear = function(y){
	  this.setYear( this.getNextYear(y) )
	  return this
	}
	ackDate.prototype.getPriorYear = function(y){
	  y = y==null ? 1 : Number(y)
	  return this.year()-Math.abs(y)
	}
	ackDate.prototype.priorYear = function(y){
	  this.setYear( this.getPriorYear(y) )
	  return this
	}
	ackDate.prototype.addYear = ackDate.prototype.nextYear;
	
	ackDate.prototype.dateYearDiff = function(date){
	  date = ackDate.toDate(date)
	  return ackDate.dateYearDiff(date, this.date)
	}
	
	
	
	
	/* MONTHS */
	
	/** 1st 2nd 3rd of the month */
	ackDate.prototype.getMonthAbbr = function(){
	  return ackDate.monthAbbrArray[this.date.getMonth()]
	}
	
	ackDate.prototype.getMonthDateProperNumber = function(){
	  return ackDate.suffixByNumber( this.date.getDate() )
	}
	
	ackDate.prototype.fullWeeksLeftInMonth = function(){
	  var eDate = this.getLastDateOfMonth()
	  var diff = this.dateDayDiff(eDate)
	  return Math.floor( diff / 7 )
	}
	
	ackDate.prototype.weekInMonth = function(){
	  var firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
	  return Math.ceil((this.date.getDate() + firstDay)/7)
	}
	
	ackDate.prototype.getMonthDayCount = function() {
	    return new Date(this.year(), this.month(), 0).getDate();
	}
	
	ackDate.prototype.getMonthName = function(){
	  return ackDate.monthNameArray[ this.month()-1 ]
	}
	
	ackDate.prototype.getMonthNameArray = function(){
	  return ackDate.monthNameArray
	}
	
	
	ackDate.prototype.dateMonthDiff = function(date){
	  return ackDate.dateMonthDiff(this.date, date)
	}
	
	ackDate.dateMonthDiff = function(date0, date1){
	  date0 = new Date(date0);date1 = new Date(date1)
	  return Math.abs( (date1.getMonth()+12*date1.getFullYear())-(date0.getMonth()+12*date0.getFullYear()) )
	}
	
	ackDate.prototype.month = function(){
	  return this.date.getMonth()+1
	}
	ackDate.prototype.getMonth = ackDate.prototype.month
	
	ackDate.prototype.priorMonth = function(amount){
	  amount = amount || 1
	  return this.nextMonth(-Math.abs(amount))
	}
	
	ackDate.prototype.nextMonth = function(amount){
	  amount = amount || 1
	  this.date = new Date(this.date.setMonth(this.date.getMonth()+amount))
	  return this
	}
	
	ackDate.prototype.getLastDateOfMonth = function(){
	  var nd = new Date(this.date)
	    ,EDate = new ackDate(nd)
	  return EDate.nextMonth().gotoFirstDayOfMonth().prevDay().date
	}
	
	ackDate.prototype.setMonth = function(n){
	  var d = this.date.setMonth(n-1)
	  this.date = new Date(d)
	  return this
	}
	
	ackDate.prototype.gotoFirstDayOfMonth = function(){
	  this.prevDay( this.date.getDate()-1 );return this
	}
	
	
	
	/* DAYS */
	
	/** always absolute number */
	ackDate.prototype.dateDayDiff = function(date){
	  //return Math.abs(parseInt((this.date - ackDate.toDate(date))/(24*3600*1000)))
	  return Math.abs( Math.floor(( this.date - ackDate.toDate(date) ) / 86400000) )
	}
	
	ackDate.prototype.daysInMonth = function(){
	  return new Date(this.year(), this.month(), 0).getDate()
	}
	
	ackDate.prototype.addDays = function(amount){
	  var nd = ackDate.dateAddDay(this.date,amount)
	  this.date = new Date(nd)
	  return this
	}
	ackDate.prototype.nextDay = ackDate.prototype.addDays//multi alias
	
	ackDate.prototype.prevDay = function(amount){
	  amount = amount==null ? 1 : amount
	  var d = new Date(this.date)
	    ,d = d.setDate(d.getDate()-amount)
	  this.date = new Date(d)
	  return this
	}
	ackDate.prototype.priorDay = ackDate.prototype.prevDay//aka for naming consistency
	
	
	
	
	
	/* WEEKS */
	
	ackDate.prototype.isWeekend = function(){
	  return [1,7].indexOf( this.dayOfWeek() ) >= 0
	}
	
	/** getWeekInYear */
	ackDate.prototype.week = function(){
	  var d = new Date(this.date)//could be number
	  var onejan = new Date(d.getFullYear(),0,1)
	  var nowDate = new Date(d)
	  return Math.ceil((((nowDate - onejan) / 86400000) + onejan.getDay()+1)/7)
	}
	ackDate.prototype.getWeek = ackDate.prototype.week
	
	ackDate.prototype.dayOfWeek = function(){
	  var d = this.date
	  return d.getDay()+1
	}
	
	ackDate.prototype.gotoSunday = function(){
	  this.prevDay( this.dayOfWeek()-1 );return this
	}
	ackDate.prototype.gotoFirstDayOfWeek = ackDate.prototype.gotoSunday
	
	ackDate.prototype.gotoMonday = function(){
	  this.gotoFirstDayOfWeek().nextDay();return this
	}
	ackDate.prototype.gotoMondayOfWeek = ackDate.prototype.gotoMonday
	
	ackDate.prototype.gotoFriday = function(){
	  this.gotoFirstDayOfWeek().nextDay(5);return this
	}
	ackDate.prototype.gotoFridayOfWeek = ackDate.prototype.gotoFriday
	
	ackDate.prototype.gotoWeek = function(week){
	  var thisWk = this.week()
	  this.nextWeek( week - thisWk )
	  return this
	}
	
	ackDate.prototype.priorWeek = function(amount){
	  amount = amount==null ? 1 : amount
	  return this.nextWeek(-Math.abs(amount))
	}
	
	ackDate.prototype.nextWeek = function(amount){
	  amount = amount==null ? 1 : amount
	  this.nextDay(amount * 7)
	  return this
	}
	
	ackDate.prototype.getDateWeekStart = function(){
	  var date = this.date
	    ,dw = this.dayOfWeek()-1;
	  return new Date(date.setDate(date.getDate()-dw))
	}
	
	ackDate.prototype.getDateWeekStop = function(){
	  var date = this.getDateWeekStart()
	  date = date.setDate( date.getDate()+6 )
	  return ackDate.endOfDateDay(date)
	}
	
	/** goto end of day. Just sets time to 23:59:59.999 */
	ackDate.prototype.gotoEod = function(date){
	  this.date = ackDate.endOfDateDay(date||this.date);return this
	}
	ackDate.prototype.gotoEndOfDate = ackDate.prototype.gotoEod
	
	/** goto start of day. Just sets time to 0:0:0.0 */
	ackDate.prototype.gotoSod = function(date){
	  this.date = ackDate.startOfDateDay(date||this.date);return this
	}
	ackDate.prototype.gotoStartOfDate = ackDate.prototype.gotoSod
	
	
	ackDate.prototype.FirstWeekday = function(){
	  var amount = -this.dayOfWeek()+2
	    ,nd = this.date
	    ,nd = new Date(nd)//clone
	    ,Nd = new ackDate(nd).nextDay(amount)
	  return Nd
	}
	
	ackDate.prototype.getDateOfFirstWeekday = function(){
	  return new Date( this.FirstWeekday().date )
	}
	
	/** method(weekNum, ackDate) */
	ackDate.prototype.eachWeekInYear = function(method){
	  var num = this.getWeeksInYear()
	    ,year = this.year()
	
	  for(var x=1; x <= num; ++x){
	    var ExD = new ackDate(this.date).setYear(year).gotoWeek(x)
	    ExD.gotoFirstDayOfWeek()
	    method(x,ExD)
	  }
	  return this
	}
	
	ackDate.prototype.eachWeekWithMondayInYear = function(method){
	  this.eachWeekInYear(function(num, ackDate){
	    method(num, ackDate.gotoMondayOfWeek())
	  })
	  return this
	}
	
	/** returns array of date exposed objects representing each week in a year */
	ackDate.prototype.getWeeksWithMondayInYearExposedArray = function(){
	  var rtnArray = []
	  this.eachWeekWithMondayInYear(function(weekNum, ackDate){
	    rtnArray.push(ackDate)
	  })
	  return rtnArray
	}
	
	/** returns array of date objects representing each week in a year */
	ackDate.prototype.getWeeksWithMondayInYearArray = function(){
	  var rtnArray = []
	  this.eachWeekWithMondayInYear(function(weekNum, ackDate){
	    rtnArray.push(ackDate.date)
	  })
	  return rtnArray
	}
	
	ackDate.prototype.getWeeksInYear = function(y){
	  y = y ? y : this.year()
	  var d, isLeap;
	
	  d = new Date(y, 0, 1);
	  isLeap = new Date(y, 1, 29).getMonth() === 1;
	
	  //check for a Jan 1 that's a Thursday or a leap year that has a
	  //Wednesday jan 1. Otherwise it's 52
	  return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52
	}
	
	
	
	/* ! TIME METHODS ! */
	
	ackDate.prototype.setTimeByString = function(string){
	  if(!this.date || !string)return this
	
	  if(string.split){
	    var parsed = eackDate.parseTimeString(string)
	    this.date = this.date.setHours(parsed.hour);
	    this.date = new Date(this.date)
	    this.date = this.date.setMinutes(parsed.minute);
	    this.date = new Date(this.date)
	  }
	
	  return this;
	}
	
	/** alters this.date and return this */
	ackDate.prototype.addHours = function(n){
	  if(this.date)this.date.setHours( this.date.getHours()+n );
	  return this
	}
	
	/** alters this.date and return this */
	ackDate.prototype.addMinutes = function(n){
	  if(this.date)this.date = new Date(this.date.getTime() + n*60000)
	  return this
	}
	
	ackDate.prototype.minuteOfDay = function(){
	  return (60 * this.date.getHours()) + this.date.getMinutes()
	}
	
	/** alters this.date and return this */
	ackDate.prototype.addSeconds = function(n){
	  return this.addMilliseconds(n*1000)
	}
	
	/** alters this.date and return this */
	ackDate.prototype.addMilliseconds = function(n){
	  if(this.date)this.date = new Date(this.date.getTime() + n)
	  return this
	}
	
	/** returns no negative numbers */
	ackDate.prototype.dateHourDiff = function(date){
	  return Math.abs(this.date - ackDate.dateObjectBy(date||new Date())) / 36e5;
	}
	ackDate.prototype.dateHoursDiff = ackDate.prototype.dateHourDiff//alias
	
	/** Does not return negative numbers.
	  @date - not required, default = new Date()
	  @decimals - not required, default = false (no decimals causes decimal rounding)
	*/
	ackDate.prototype.dateSecondDiff = function(date, decimals){
	  date = ackDate.dateObjectBy(date||new Date())
	  var dif = this.date.getTime() - date.getTime()
	  var Seconds_from_T1_to_T2 = dif / 1000;
	  var rtn = Math.abs(Seconds_from_T1_to_T2)
	
	  if(decimals){
	    decimals = Number(decimals) && !isNaN(decimals) ? decimals:2;
	    rtn = toDecimal(rtn,decimals)
	  }else{
	    rtn = Math.round(rtn)
	  }
	
	  return rtn
	}
	ackDate.prototype.dateSecondsDiff = ackDate.prototype.dateSecondDiff//alias
	
	//no negative numbers
	ackDate.prototype.dateMinuteDiff = function(date){
	  date = ackDate.toDate(date||new Date())
	  var hourDiff = date - this.date; //in ms
	  var secDiff = hourDiff / 1000; //in s
	  var minDiff = hourDiff / 60 / 1000; //in minutes
	  var hDiff = hourDiff / 3600 / 1000; //in hours
	  var hours = Math.floor(hDiff);
	  var mins = minDiff - 60 * hours
	  return Math.round( Math.abs( hours * 60 + mins ), 0);
	}
	ackDate.prototype.dateMinutesDiff = ackDate.prototype.dateMinuteDiff//alias
	
	
	
	/* FORMATTING */
	ackDate.prototype.getDayName = function(){
	  if(!this.date)return ''
	  return ackDate.dayNameArray[ this.date.getDay() ]
	}
	
	ackDate.prototype.getDayAbbr = function(){
	  if(!this.date)return ''
	  return ackDate.dayAbbrArray[ this.date.getDay() ]
	}
	
	/** Febuary 24th 2016 */
	ackDate.prototype.mmmmdyyyy = function(){
	  if(!this.date)return ''
	  return this.getMonthName()+' '+this.getMonthDateProperNumber() +' '+ this.date.getFullYear()
	}
	
	/** 01:20.220 */
	ackDate.prototype.hhmmssl = function(timeSep, milsecSep){
	  if(!this.date)return ''
	  timeSep = timeSep || ':'
	  milsecSep = milsecSep || '.'
	  var d = this.date
	    ,h=d.getHours()
	    ,m=d.getMinutes()
	  m=m<10?'0'+m:m
	  h = ('0'+h).slice(-2)
	  var s = ('0'+d.getSeconds()).slice(-2)
	  return h+timeSep+m+timeSep+s+milsecSep+d.getMilliseconds()
	}
	
	ackDate.prototype.hhmmsl = function(timeSep, milsecSep){
	  if(!this.date)return ''
	  var  d = this.date,
	      timeSep = timeSep || ':',
	      milsecSep = milsecSep || '.',
	      h=d.getHours(),
	      m=d.getMinutes();
	  m=m<10?'0'+m:m
	  h = ('0'+h).slice(-2)
	  return h+timeSep+m+timeSep+d.getSeconds()+milsecSep+d.getMilliseconds()
	}
	
	ackDate.prototype.hmmtt = function(){
	  if(!this.date)return ''
	  var d = this.date
	    ,h=d.getHours()
	    ,t='AM'
	    ,m=d.getMinutes();
	
	  m=m<10?'0'+m:m;
	  h=h>=12?(t='PM',h-12||12):h==0?12:h
	  return h+':'+m+' '+t
	}
	
	ackDate.prototype.mmddyyyyhhmmtt = function(dateSep, spaceSep, timeSep, ttSep){
	  if(!this.date)return ''
	  spaceSep = spaceSep==null?' ':spaceSep;
	  return this.mmddyyyy(dateSep)+ spaceSep + this.hhmmtt(timeSep, ttSep)
	}
	
	ackDate.prototype.hhmmtt = function(timeSep, ttSep){
	  if(!this.date)return ''
	  var d = this.date,
	      timeSep = timeSep || ':',
	      ttSep = ttSep==null?' ':ttSep,
	      h=d.getHours(),
	      t='AM',
	      m=d.getMinutes();
	
	  m=m<10?'0'+m:m;
	  h=h>=12?(t='PM',h-12||12):h==0?12:h
	  return ('0'+h).slice(-2) +timeSep+ m+ttSep+t
	}
	
	//yyyy-mm-dd hh:nn:ss:l
	ackDate.prototype.storageFormat = function(dateSep, spaceSep, timeSep, milsecSep){
	  if(!this.date)return '';
	  dateSep = dateSep || '-'
	  spaceSep = spaceSep || ' '
	  return this.date.getFullYear() + dateSep + this.mmdd(dateSep) + spaceSep + this.hhmmssl(timeSep, milsecSep)
	}
	
	ackDate.prototype.yyyymmdd = function(sep){
	  if(!this.date)return '';
	  sep = sep==null ? '' : sep
	  return this.year() + sep + this.mmdd(sep)
	}
	
	ackDate.prototype.mmddyyyy = function(sep){
	  if(!this.date)return '';
	  sep = sep==null ? '/' : sep
	  var d = this.date
	  return this.mmdd(sep)+ sep +d.getFullYear()
	}
	
	ackDate.prototype.mdyyyy = function(sep){
	  if(!this.date)return '';
	  sep = sep==null ? '/' : sep
	  var d = this.date
	  return this.md(sep)+ sep +d.getFullYear()
	}
	
	ackDate.prototype.mdyy = function(sep){
	  if(!this.date)return '';
	  sep = sep==null ? '/' : sep
	  var d = this.date
	  return this.md(sep)+ sep +this.yy()
	}
	
	ackDate.prototype.mmddyy = function(sep){
	  if(!this.date)return '';
	  var r = this.mmddyyyy()
	  return r.substring(0,r.length-4)+r.substring(r.length-2,r.length)
	}
	
	ackDate.prototype.yy = function(){
	  if(!this.date)return '';
	  return this.date.getFullYear().toString().substring(2,4)
	}
	
	ackDate.prototype.mmdd = function(sep){
	  if(!this.date)return '';
	  sep = sep==null ? '/' : sep
	  var d = this.date
	  return ackDate.twoDigit(d.getMonth()+1)+ sep + ackDate.twoDigit(d.getDate())
	}
	
	ackDate.prototype.md = function(sep){
	  if(!this.date)return '';
	  sep = sep==null ? '/' : sep
	  var d = this.date
	  return (d.getMonth()+1)+ sep + d.getDate()
	}
	
	
	var eackDate = function(date){
	  return new ackDate(date)
	}
	
	eackDate.parseTimeString = function (date){
	  var dDate = new Date(date);
	  if(dDate!='Invalid Date'){
	    return {hour:dDate.getHours(), minute:dDate.getMinutes()};
	  }
	
	  var hour, minute, tt;
	  var tArray = date.split(':');
	  var hour = tArray[0];
	
	  if(tArray.length > 1){
	    minute = tArray[1];
	    minute = minute.split(' ');
	    if(minute.length > 1){
	      tt = minute[1];
	      var isPm = tt.toLowerCase()=='pm'
	      if(hour<=11 && isPm){
	        hour = Number(hour) + 12;
	      }else if(hour==12 && !isPm){
	        hour = 0
	      }
	    }
	
	    minute = Number(minute[0]);
	  }
	
	  return {hour:hour, minute:minute}
	}
	
	
	function toDecimal(n,p){var m=Math.pow(10,p);return (Math.round(n*m)/m).toFixed(p)}
	
	eackDate.Class = ackDate
	module.exports = eackDate

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xDate = __webpack_require__(27)
	
	var ackYear = function ackYear(yyyy){
		if(yyyy!=null)this.setStartDate(yyyy)
		return this
	}
	
	ackYear.prototype.setStartDate = function(date){
		var isObject = typeof(date) == 'object',
			isYearString = !isObject && !isNaN(Number(date)),
			isYear = isYearString || (!xDate(date).isDate() && !isNaN(date))
	
		if(isYear){//just the year number?
			date = new Date(new Date('1/1/2011').setYear(date))
		}
	
		this.date = date
		return this
	}
	
	ackYear.prototype.getStartDate = function(){
		if(this.date)return this.date
		var d = '1/1/'+xDate(new Date()).year()
		this.date = new Date(d)
		return this.date
	}
	
	ackYear.prototype.setEndDate = function(date){
		if(!xDate(date).isDate() && !isNaN(date))//just the year number?
			this.date = new Date('12/31/'+date)
		else
			this.date = date
		return this
	}
	
	ackYear.prototype.getEndDate = function(){
		if(this.endDate)return this.endDate
		var d = '12/31/'+this.getYear()
		this.endDate = new Date(d)
		return this.endDate
	}
	
	ackYear.prototype.StartDate = function(isClone){
		var startDate = !isClone ?  this.getStartDate() : this.getStartDate()
		return xDate(startDate)
	}
	
	ackYear.prototype.xDate = function(){
		return xDate(this.getStartDate())
	}
	
	ackYear.prototype.month = function(){
		return this.StartDate().month()
	}
	ackYear.prototype.getMonth = ackYear.prototype.month//deprecated
	
	ackYear.prototype.week = function(){
		return this.StartDate().week()
	}
	ackYear.prototype.getWeek = ackYear.prototype.week//deprecated
	
	//?deprecated (duplicate of Date class)
	ackYear.prototype.getYear = function(){
		var d = this.getStartDate()
		return xDate(d).year()
	}
	ackYear.prototype.year = ackYear.prototype.getYear
	
	//gets startdate and changes the year
	ackYear.prototype.setYear = function(yyyy){
		var ExYy = xDate(yyyy)
		if(isNaN(yyyy) && ExYy.isDate())
			yyyy = ExYy.year()
	
		var date = this.getStartDate()
		date = new Date( date.setYear(yyyy) )
		this.setStartDate(date)
	
		return this
	}
	
	ackYear.prototype.getDateOfLastWeekday = function(){
		var d = getStartDate()
			,addAmount = -xDate(d).dayOfWeek()+6
			,dateA = new Date( d.setDate(d.getDate()+addAmount) )
	
		dateA = new Date(dateA.setHours(23))
		dateA = new Date(dateA.setMinutes(59))
		dateA = new Date(dateA.setSeconds(59))
	
		return dateA
	}
	
	
	
	
	
	
	var rtn = function(path){
		return new ackYear(path)
	}
	rtn.Class = ackYear
	module.exports = rtn

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var ackDate = __webpack_require__(27)
	
	function ackTime(date){
	  this.date = ackTime.toDate(date)
	  return this
	}
	
	ackTime.dateObjectBy = function(date){
	  if(date){
	    if(date.constructor == ackTime){
	      return date.date
	    }
	
	    if(date.constructor == Date)
	      return date
	
	    if(date.split){
	      return stringToDate(date)
	    }
	
	    return new Date(date)//convert string to date object
	  }
	
	  return date || new Date()
	}
	
	ackTime.toDate = function(date){
	  return date!=null ? ackTime.dateObjectBy(date) : null
	}
	
	function stringToDate(date){
	  var dDate = new Date(date);
	  if(dDate!='Invalid Date'){
	    return date
	  }
	
		var parsed = ackDate.parseTimeString(date);
		var newDate = new Date().setHours(parsed.hour);
		newDate = new Date(newDate).setMinutes(parsed.minute)
		return new Date(newDate)
	}
	
	var eackTime = function(date){
	  var date = new ackTime(date).date
	  return ackDate(date)
	}
	
	eackTime.Class = ackTime
	module.exports = eackTime

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["ngFx"] = factory();
		else
			root["ngFx"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	
	
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		var _animations = __webpack_require__(1);
	
		var _utils = __webpack_require__(80);
	
		angular.module('ng-fx', [_animations.animations, _utils.utils]);
	
		exports['default'] = 'ng-fx';
		module.exports = exports['default'];
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		var _view = __webpack_require__(2);
	
		var _element = __webpack_require__(7);
	
		var animations = angular.module('ngFx.animations', [_element.element, _view.view]).name;
	
		exports.animations = animations;
	
	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		__webpack_require__(3);
	
		var viewModule = angular.module('ngFx.animations.view', []);
	
		var view = viewModule.name;
	
		exports.view = view;
	
	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {
	
		// style-loader: Adds some css to the DOM by adding a <style> tag
	
		// load the styles
		var content = __webpack_require__(4);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(6)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./view.styl", function() {
					var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./view.styl");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}
	
	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {
	
		exports = module.exports = __webpack_require__(5)();
		exports.push([module.id, ".fx-view-container {\n  position: relative;\n  min-height: 1px;\n}\n.fx-view {\n  position: absolute;\n  width: 100%;\n  z-index: 10;\n  left: 0;\n  right: 0;\n}\n", ""]);
	
	/***/ },
	/* 5 */
	/***/ function(module, exports) {
	
		/*
			MIT License http://www.opensource.org/licenses/mit-license.php
			Author Tobias Koppers @sokra
		*/
		// css base code, injected by the css-loader
		module.exports = function() {
			var list = [];
	
			// return the list of modules as css string
			list.toString = function toString() {
				var result = [];
				for(var i = 0; i < this.length; i++) {
					var item = this[i];
					if(item[2]) {
						result.push("@media " + item[2] + "{" + item[1] + "}");
					} else {
						result.push(item[1]);
					}
				}
				return result.join("");
			};
	
			// import a list of modules into the list
			list.i = function(modules, mediaQuery) {
				if(typeof modules === "string")
					modules = [[null, modules, ""]];
				var alreadyImportedModules = {};
				for(var i = 0; i < this.length; i++) {
					var id = this[i][0];
					if(typeof id === "number")
						alreadyImportedModules[id] = true;
				}
				for(i = 0; i < modules.length; i++) {
					var item = modules[i];
					// skip already imported module
					// this implementation is not 100% perfect for weird media query combinations
					//  when a module is imported multiple times with different media queries.
					//  I hope this will never occur (Hey this way we have smaller bundles)
					if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
						if(mediaQuery && !item[2]) {
							item[2] = mediaQuery;
						} else if(mediaQuery) {
							item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
						}
						list.push(item);
					}
				}
			};
			return list;
		};
	
	
	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {
	
		/*
			MIT License http://www.opensource.org/licenses/mit-license.php
			Author Tobias Koppers @sokra
		*/
		var stylesInDom = {},
			memoize = function(fn) {
				var memo;
				return function () {
					if (typeof memo === "undefined") memo = fn.apply(this, arguments);
					return memo;
				};
			},
			isOldIE = memoize(function() {
				return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
			}),
			getHeadElement = memoize(function () {
				return document.head || document.getElementsByTagName("head")[0];
			}),
			singletonElement = null,
			singletonCounter = 0;
	
		module.exports = function(list, options) {
			if(false) {
				if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
			}
	
			options = options || {};
			// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
			// tags it will allow on a page
			if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
			var styles = listToStyles(list);
			addStylesToDom(styles, options);
	
			return function update(newList) {
				var mayRemove = [];
				for(var i = 0; i < styles.length; i++) {
					var item = styles[i];
					var domStyle = stylesInDom[item.id];
					domStyle.refs--;
					mayRemove.push(domStyle);
				}
				if(newList) {
					var newStyles = listToStyles(newList);
					addStylesToDom(newStyles, options);
				}
				for(var i = 0; i < mayRemove.length; i++) {
					var domStyle = mayRemove[i];
					if(domStyle.refs === 0) {
						for(var j = 0; j < domStyle.parts.length; j++)
							domStyle.parts[j]();
						delete stylesInDom[domStyle.id];
					}
				}
			};
		}
	
		function addStylesToDom(styles, options) {
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				if(domStyle) {
					domStyle.refs++;
					for(var j = 0; j < domStyle.parts.length; j++) {
						domStyle.parts[j](item.parts[j]);
					}
					for(; j < item.parts.length; j++) {
						domStyle.parts.push(addStyle(item.parts[j], options));
					}
				} else {
					var parts = [];
					for(var j = 0; j < item.parts.length; j++) {
						parts.push(addStyle(item.parts[j], options));
					}
					stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
				}
			}
		}
	
		function listToStyles(list) {
			var styles = [];
			var newStyles = {};
			for(var i = 0; i < list.length; i++) {
				var item = list[i];
				var id = item[0];
				var css = item[1];
				var media = item[2];
				var sourceMap = item[3];
				var part = {css: css, media: media, sourceMap: sourceMap};
				if(!newStyles[id])
					styles.push(newStyles[id] = {id: id, parts: [part]});
				else
					newStyles[id].parts.push(part);
			}
			return styles;
		}
	
		function createStyleElement() {
			var styleElement = document.createElement("style");
			var head = getHeadElement();
			styleElement.type = "text/css";
			head.appendChild(styleElement);
			return styleElement;
		}
	
		function createLinkElement() {
			var linkElement = document.createElement("link");
			var head = getHeadElement();
			linkElement.rel = "stylesheet";
			head.appendChild(linkElement);
			return linkElement;
		}
	
		function addStyle(obj, options) {
			var styleElement, update, remove;
	
			if (options.singleton) {
				var styleIndex = singletonCounter++;
				styleElement = singletonElement || (singletonElement = createStyleElement());
				update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
				remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
			} else if(obj.sourceMap &&
				typeof URL === "function" &&
				typeof URL.createObjectURL === "function" &&
				typeof URL.revokeObjectURL === "function" &&
				typeof Blob === "function" &&
				typeof btoa === "function") {
				styleElement = createLinkElement();
				update = updateLink.bind(null, styleElement);
				remove = function() {
					styleElement.parentNode.removeChild(styleElement);
					if(styleElement.href)
						URL.revokeObjectURL(styleElement.href);
				};
			} else {
				styleElement = createStyleElement();
				update = applyToTag.bind(null, styleElement);
				remove = function() {
					styleElement.parentNode.removeChild(styleElement);
				};
			}
	
			update(obj);
	
			return function updateStyle(newObj) {
				if(newObj) {
					if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
						return;
					update(obj = newObj);
				} else {
					remove();
				}
			};
		}
	
		var replaceText = (function () {
			var textStore = [];
	
			return function (index, replacement) {
				textStore[index] = replacement;
				return textStore.filter(Boolean).join('\n');
			};
		})();
	
		function applyToSingletonTag(styleElement, index, remove, obj) {
			var css = remove ? "" : obj.css;
	
			if (styleElement.styleSheet) {
				styleElement.styleSheet.cssText = replaceText(index, css);
			} else {
				var cssNode = document.createTextNode(css);
				var childNodes = styleElement.childNodes;
				if (childNodes[index]) styleElement.removeChild(childNodes[index]);
				if (childNodes.length) {
					styleElement.insertBefore(cssNode, childNodes[index]);
				} else {
					styleElement.appendChild(cssNode);
				}
			}
		}
	
		function applyToTag(styleElement, obj) {
			var css = obj.css;
			var media = obj.media;
			var sourceMap = obj.sourceMap;
	
			if(media) {
				styleElement.setAttribute("media", media)
			}
	
			if(styleElement.styleSheet) {
				styleElement.styleSheet.cssText = css;
			} else {
				while(styleElement.firstChild) {
					styleElement.removeChild(styleElement.firstChild);
				}
				styleElement.appendChild(document.createTextNode(css));
			}
		}
	
		function updateLink(linkElement, obj) {
			var css = obj.css;
			var media = obj.media;
			var sourceMap = obj.sourceMap;
	
			if(sourceMap) {
				// http://stackoverflow.com/a/26603875
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
			}
	
			var blob = new Blob([css], { type: "text/css" });
	
			var oldSrc = linkElement.href;
	
			linkElement.href = URL.createObjectURL(blob);
	
			if(oldSrc)
				URL.revokeObjectURL(oldSrc);
		}
	
	
	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		var _bounceBounce = __webpack_require__(8);
	
		var _fadeFade = __webpack_require__(16);
	
		var _zoomZoom = __webpack_require__(61);
	
		var _lightSpeedLightSpeed = __webpack_require__(69);
	
		var _rotateRotate = __webpack_require__(73);
	
		var elementModule = angular.module('ngFx.animations.element', []);
	
		/**
		 * register all animations to angular using
		 * the `module.animation()` method
		 */
		[_bounceBounce.bounces, _fadeFade.fades, _zoomZoom.zooms, _lightSpeedLightSpeed.lightSpeeds, _rotateRotate.rotates].forEach(function (animation) {
		  animation.forEach(function (variant) {
		    elementModule.animation(variant.classname, variant.creator);
		  });
		});
	
		var element = elementModule.name;
	
		exports.element = element;
	
	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		__webpack_require__(9);
	
		var _bounceNormal = __webpack_require__(11);
	
		var _bounceDown = __webpack_require__(12);
	
		var _bounceLeft = __webpack_require__(13);
	
		var _bounceRight = __webpack_require__(14);
	
		var _bounceUp = __webpack_require__(15);
	
		var bounces = [_bounceNormal.bounceNormal, _bounceDown.bounceDown, _bounceLeft.bounceLeft, _bounceRight.bounceRight, _bounceUp.bounceUp];
		exports.bounces = bounces;
	
	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {
	
		// style-loader: Adds some css to the DOM by adding a <style> tag
	
		// load the styles
		var content = __webpack_require__(10);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(6)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./bounce.styl", function() {
					var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./bounce.styl");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}
	
	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {
	
		exports = module.exports = __webpack_require__(5)();
		exports.push([module.id, "/**\n * Bounces\n */\n/*******************************************/\n/******************************************/\n/*****************************************/\n/*******************************************/\n@-moz-keyframes bounceNormalIn {\n  0% {\n    opacity: 0;\n    transform: scale(0.3);\n  }\n  33% {\n    opacity: 1;\n    transform: scale(1.05);\n  }\n  66% {\n    transform: scale(0.9);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n@-webkit-keyframes bounceNormalIn {\n  0% {\n    opacity: 0;\n    transform: scale(0.3);\n  }\n  33% {\n    opacity: 1;\n    transform: scale(1.05);\n  }\n  66% {\n    transform: scale(0.9);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n@-o-keyframes bounceNormalIn {\n  0% {\n    opacity: 0;\n    transform: scale(0.3);\n  }\n  33% {\n    opacity: 1;\n    transform: scale(1.05);\n  }\n  66% {\n    transform: scale(0.9);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n@keyframes bounceNormalIn {\n  0% {\n    opacity: 0;\n    transform: scale(0.3);\n  }\n  33% {\n    opacity: 1;\n    transform: scale(1.05);\n  }\n  66% {\n    transform: scale(0.9);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n@-moz-keyframes bounceNormalOut {\n  100% {\n    opacity: 0;\n    transform: scale(0.3);\n  }\n  66% {\n    transform: scale(1.05);\n  }\n  33% {\n    transform: scale(0.9);\n  }\n  0% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes bounceNormalOut {\n  100% {\n    opacity: 0;\n    transform: scale(0.3);\n  }\n  66% {\n    transform: scale(1.05);\n  }\n  33% {\n    transform: scale(0.9);\n  }\n  0% {\n    opacity: 1;\n  }\n}\n@-o-keyframes bounceNormalOut {\n  100% {\n    opacity: 0;\n    transform: scale(0.3);\n  }\n  66% {\n    transform: scale(1.05);\n  }\n  33% {\n    transform: scale(0.9);\n  }\n  0% {\n    opacity: 1;\n  }\n}\n@keyframes bounceNormalOut {\n  100% {\n    opacity: 0;\n    transform: scale(0.3);\n  }\n  66% {\n    transform: scale(1.05);\n  }\n  33% {\n    transform: scale(0.9);\n  }\n  0% {\n    opacity: 1;\n  }\n}\n@-moz-keyframes bounceDownIn {\n  0%, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0);\n  }\n  75% {\n    transform: translate3d(0, -10px, 0);\n  }\n  90% {\n    transform: translate3d(0, 5px, 0);\n  }\n  100% {\n    transform: none;\n  }\n}\n@-webkit-keyframes bounceDownIn {\n  0%, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0);\n  }\n  75% {\n    transform: translate3d(0, -10px, 0);\n  }\n  90% {\n    transform: translate3d(0, 5px, 0);\n  }\n  100% {\n    transform: none;\n  }\n}\n@-o-keyframes bounceDownIn {\n  0%, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0);\n  }\n  75% {\n    transform: translate3d(0, -10px, 0);\n  }\n  90% {\n    transform: translate3d(0, 5px, 0);\n  }\n  100% {\n    transform: none;\n  }\n}\n@keyframes bounceDownIn {\n  0%, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0);\n  }\n  75% {\n    transform: translate3d(0, -10px, 0);\n  }\n  90% {\n    transform: translate3d(0, 5px, 0);\n  }\n  100% {\n    transform: none;\n  }\n}\n@-moz-keyframes bounceDownOut {\n  20% {\n    transform: translate3d(0, 10px, 0);\n  }\n  40%, 45% {\n    opacity: 1;\n    transform: translate3d(0, -20px, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0);\n  }\n}\n@-webkit-keyframes bounceDownOut {\n  20% {\n    transform: translate3d(0, 10px, 0);\n  }\n  40%, 45% {\n    opacity: 1;\n    transform: translate3d(0, -20px, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0);\n  }\n}\n@-o-keyframes bounceDownOut {\n  20% {\n    transform: translate3d(0, 10px, 0);\n  }\n  40%, 45% {\n    opacity: 1;\n    transform: translate3d(0, -20px, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0);\n  }\n}\n@keyframes bounceDownOut {\n  20% {\n    transform: translate3d(0, 10px, 0);\n  }\n  40%, 45% {\n    opacity: 1;\n    transform: translate3d(0, -20px, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0);\n  }\n}\n@-moz-keyframes bounceLeftIn {\n  from, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n  0% {\n    opacity: 0;\n    transform: translate3d(-3000px, 0, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: translate3d(25px, 0, 0);\n  }\n  75% {\n    transform: translate3d(-10px, 0, 0);\n  }\n  90% {\n    transform: translate3d(5px, 0, 0);\n  }\n  100% {\n    transform: none;\n  }\n}\n@-webkit-keyframes bounceLeftIn {\n  from, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n  0% {\n    opacity: 0;\n    transform: translate3d(-3000px, 0, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: translate3d(25px, 0, 0);\n  }\n  75% {\n    transform: translate3d(-10px, 0, 0);\n  }\n  90% {\n    transform: translate3d(5px, 0, 0);\n  }\n  100% {\n    transform: none;\n  }\n}\n@-o-keyframes bounceLeftIn {\n  from, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n  0% {\n    opacity: 0;\n    transform: translate3d(-3000px, 0, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: translate3d(25px, 0, 0);\n  }\n  75% {\n    transform: translate3d(-10px, 0, 0);\n  }\n  90% {\n    transform: translate3d(5px, 0, 0);\n  }\n  100% {\n    transform: none;\n  }\n}\n@keyframes bounceLeftIn {\n  from, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n  0% {\n    opacity: 0;\n    transform: translate3d(-3000px, 0, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: translate3d(25px, 0, 0);\n  }\n  75% {\n    transform: translate3d(-10px, 0, 0);\n  }\n  90% {\n    transform: translate3d(5px, 0, 0);\n  }\n  100% {\n    transform: none;\n  }\n}\n@-moz-keyframes bounceLeftOut {\n  20% {\n    opacity: 1;\n    transform: translate3d(20px, 0, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0);\n  }\n}\n@-webkit-keyframes bounceLeftOut {\n  20% {\n    opacity: 1;\n    transform: translate3d(20px, 0, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0);\n  }\n}\n@-o-keyframes bounceLeftOut {\n  20% {\n    opacity: 1;\n    transform: translate3d(20px, 0, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0);\n  }\n}\n@keyframes bounceLeftOut {\n  20% {\n    opacity: 1;\n    transform: translate3d(20px, 0, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0);\n  }\n}\n@-moz-keyframes bounceRightOut {\n  20% {\n    opacity: 1;\n    transform: translate3d(-20px, 0, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0);\n  }\n}\n@-webkit-keyframes bounceRightOut {\n  20% {\n    opacity: 1;\n    transform: translate3d(-20px, 0, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0);\n  }\n}\n@-o-keyframes bounceRightOut {\n  20% {\n    opacity: 1;\n    transform: translate3d(-20px, 0, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0);\n  }\n}\n@keyframes bounceRightOut {\n  20% {\n    opacity: 1;\n    transform: translate3d(-20px, 0, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0);\n  }\n}\n@-moz-keyframes bounceRightIn {\n  from, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n  from {\n    opacity: 0;\n    transform: translate3d(3000px, 0, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: translate3d(-25px, 0, 0);\n  }\n  75% {\n    transform: translate3d(10px, 0, 0);\n  }\n  90% {\n    transform: translate3d(-5px, 0, 0);\n  }\n  100% {\n    transform: none;\n  }\n}\n@-webkit-keyframes bounceRightIn {\n  from, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n  from {\n    opacity: 0;\n    transform: translate3d(3000px, 0, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: translate3d(-25px, 0, 0);\n  }\n  75% {\n    transform: translate3d(10px, 0, 0);\n  }\n  90% {\n    transform: translate3d(-5px, 0, 0);\n  }\n  100% {\n    transform: none;\n  }\n}\n@-o-keyframes bounceRightIn {\n  from, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n  from {\n    opacity: 0;\n    transform: translate3d(3000px, 0, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: translate3d(-25px, 0, 0);\n  }\n  75% {\n    transform: translate3d(10px, 0, 0);\n  }\n  90% {\n    transform: translate3d(-5px, 0, 0);\n  }\n  100% {\n    transform: none;\n  }\n}\n@keyframes bounceRightIn {\n  from, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n  from {\n    opacity: 0;\n    transform: translate3d(3000px, 0, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: translate3d(-25px, 0, 0);\n  }\n  75% {\n    transform: translate3d(10px, 0, 0);\n  }\n  90% {\n    transform: translate3d(-5px, 0, 0);\n  }\n  100% {\n    transform: none;\n  }\n}\n@-moz-keyframes bounceUpIn {\n  from, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n  from {\n    opacity: 0;\n    transform: translate3d(0, 3000px, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: translate3d(0, -20px, 0);\n  }\n  75% {\n    transform: translate3d(0, 10px, 0);\n  }\n  90% {\n    transform: translate3d(0, -5px, 0);\n  }\n  100% {\n    transform: translate3d(0, 0, 0);\n  }\n}\n@-webkit-keyframes bounceUpIn {\n  from, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n  from {\n    opacity: 0;\n    transform: translate3d(0, 3000px, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: translate3d(0, -20px, 0);\n  }\n  75% {\n    transform: translate3d(0, 10px, 0);\n  }\n  90% {\n    transform: translate3d(0, -5px, 0);\n  }\n  100% {\n    transform: translate3d(0, 0, 0);\n  }\n}\n@-o-keyframes bounceUpIn {\n  from, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n  from {\n    opacity: 0;\n    transform: translate3d(0, 3000px, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: translate3d(0, -20px, 0);\n  }\n  75% {\n    transform: translate3d(0, 10px, 0);\n  }\n  90% {\n    transform: translate3d(0, -5px, 0);\n  }\n  100% {\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes bounceUpIn {\n  from, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n  from {\n    opacity: 0;\n    transform: translate3d(0, 3000px, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: translate3d(0, -20px, 0);\n  }\n  75% {\n    transform: translate3d(0, 10px, 0);\n  }\n  90% {\n    transform: translate3d(0, -5px, 0);\n  }\n  100% {\n    transform: translate3d(0, 0, 0);\n  }\n}\n@-moz-keyframes bounceUpOut {\n  20% {\n    transform: translate3d(0, -10px, 0);\n  }\n  40%, 45% {\n    opacity: 1;\n    transform: translate3d(0, 20px, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0);\n  }\n}\n@-webkit-keyframes bounceUpOut {\n  20% {\n    transform: translate3d(0, -10px, 0);\n  }\n  40%, 45% {\n    opacity: 1;\n    transform: translate3d(0, 20px, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0);\n  }\n}\n@-o-keyframes bounceUpOut {\n  20% {\n    transform: translate3d(0, -10px, 0);\n  }\n  40%, 45% {\n    opacity: 1;\n    transform: translate3d(0, 20px, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0);\n  }\n}\n@keyframes bounceUpOut {\n  20% {\n    transform: translate3d(0, -10px, 0);\n  }\n  40%, 45% {\n    opacity: 1;\n    transform: translate3d(0, 20px, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0);\n  }\n}\n", ""]);
	
	/***/ },
	/* 11 */
	/***/ function(module, exports) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s bounceNormalIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s bounceNormalOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-bounce-normal';
		var bounceNormal = { creator: creator, classname: classname };
	
		exports.bounceNormal = bounceNormal;
	
	/***/ },
	/* 12 */
	/***/ function(module, exports) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s bounceDownIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s bounceDownOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-bounce-down';
		var bounceDown = { creator: creator, classname: classname };
	
		exports.bounceDown = bounceDown;
	
	/***/ },
	/* 13 */
	/***/ function(module, exports) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s bounceLeftIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s bounceLeftOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-bounce-left';
		var bounceLeft = { creator: creator, classname: classname };
		exports.bounceLeft = bounceLeft;
	
	/***/ },
	/* 14 */
	/***/ function(module, exports) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s bounceRightIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s bounceRightOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-bounce-right';
		var bounceRight = { creator: creator, classname: classname };
		exports.bounceRight = bounceRight;
	
	/***/ },
	/* 15 */
	/***/ function(module, exports) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s bounceUpIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s bounceUpOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-bounce-up';
		var bounceUp = { creator: creator, classname: classname };
		exports.bounceUp = bounceUp;
	
	/***/ },
	/* 16 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		__webpack_require__(17);
	
		var _fadeNormal = __webpack_require__(19);
	
		var _fadeDown = __webpack_require__(53);
	
		var _fadeDownBig = __webpack_require__(54);
	
		var _fadeLeft = __webpack_require__(55);
	
		var _fadeLeftBig = __webpack_require__(56);
	
		var _fadeRight = __webpack_require__(57);
	
		var _fadeRightBig = __webpack_require__(58);
	
		var _fadeUp = __webpack_require__(59);
	
		var _fadeUpBig = __webpack_require__(60);
	
		var fades = [_fadeNormal.fadeNormal, _fadeDown.fadeDown, _fadeDownBig.fadeDownBig, _fadeLeft.fadeLeft, _fadeLeftBig.fadeLeftBig, _fadeRight.fadeRight, _fadeRightBig.fadeRightBig, _fadeUp.fadeUp, _fadeUpBig.fadeUpBig];
		exports.fades = fades;
	
	/***/ },
	/* 17 */
	/***/ function(module, exports, __webpack_require__) {
	
		// style-loader: Adds some css to the DOM by adding a <style> tag
	
		// load the styles
		var content = __webpack_require__(18);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(6)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./fade.styl", function() {
					var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./fade.styl");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}
	
	/***/ },
	/* 18 */
	/***/ function(module, exports, __webpack_require__) {
	
		exports = module.exports = __webpack_require__(5)();
		exports.push([module.id, "/***********************************/\n/***************************************/\n/***********************************/\n/***********************************/\n/***************************************/\n/***************************************/\n/***************************************/\n/***************************************/\n@-moz-keyframes fadeNormalIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes fadeNormalIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@-o-keyframes fadeNormalIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes fadeNormalIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@-moz-keyframes fadeNormalOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n@-webkit-keyframes fadeNormalOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n@-o-keyframes fadeNormalOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n@keyframes fadeNormalOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n@-moz-keyframes fadeDownIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -100%, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-webkit-keyframes fadeDownIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -100%, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-o-keyframes fadeDownIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -100%, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes fadeDownIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -100%, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-moz-keyframes fadeDownOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, 100%, 0);\n  }\n}\n@-webkit-keyframes fadeDownOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, 100%, 0);\n  }\n}\n@-o-keyframes fadeDownOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, 100%, 0);\n  }\n}\n@keyframes fadeDownOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, 100%, 0);\n  }\n}\n@-moz-keyframes fadeDownBigIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-webkit-keyframes fadeDownBigIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-o-keyframes fadeDownBigIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes fadeDownBigIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-moz-keyframes fadeDownBigOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0);\n  }\n}\n@-webkit-keyframes fadeDownBigOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0);\n  }\n}\n@-o-keyframes fadeDownBigOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0);\n  }\n}\n@keyframes fadeDownBigOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0);\n  }\n}\n@-moz-keyframes fadeUpIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, 100%, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-webkit-keyframes fadeUpIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, 100%, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-o-keyframes fadeUpIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, 100%, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes fadeUpIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, 100%, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-moz-keyframes fadeUpOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, -100%, 0);\n  }\n}\n@-webkit-keyframes fadeUpOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, -100%, 0);\n  }\n}\n@-o-keyframes fadeUpOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, -100%, 0);\n  }\n}\n@keyframes fadeUpOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, -100%, 0);\n  }\n}\n@-moz-keyframes fadeUpBigIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-webkit-keyframes fadeUpBigIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-o-keyframes fadeUpBigIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes fadeUpBigIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-moz-keyframes fadeUpBigOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0);\n  }\n}\n@-webkit-keyframes fadeUpBigOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0);\n  }\n}\n@-o-keyframes fadeUpBigOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0);\n  }\n}\n@keyframes fadeUpBigOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0);\n  }\n}\n@-moz-keyframes fadeLeftIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(-100%, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-webkit-keyframes fadeLeftIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(-100%, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-o-keyframes fadeLeftIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(-100%, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes fadeLeftIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(-100%, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-moz-keyframes fadeLeftOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(100%, 0, 0);\n  }\n}\n@-webkit-keyframes fadeLeftOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(100%, 0, 0);\n  }\n}\n@-o-keyframes fadeLeftOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(100%, 0, 0);\n  }\n}\n@keyframes fadeLeftOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(100%, 0, 0);\n  }\n}\n@-moz-keyframes fadeLeftBigIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-webkit-keyframes fadeLeftBigIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-o-keyframes fadeLeftBigIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes fadeLeftBigIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-moz-keyframes fadeLeftBigOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0);\n  }\n}\n@-webkit-keyframes fadeLeftBigOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0);\n  }\n}\n@-o-keyframes fadeLeftBigOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0);\n  }\n}\n@keyframes fadeLeftBigOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0);\n  }\n}\n@-moz-keyframes fadeRightIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(100%, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-webkit-keyframes fadeRightIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(100%, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-o-keyframes fadeRightIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(100%, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes fadeRightIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(100%, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-moz-keyframes fadeRightOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(-100%, 0, 0);\n  }\n}\n@-webkit-keyframes fadeRightOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(-100%, 0, 0);\n  }\n}\n@-o-keyframes fadeRightOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(-100%, 0, 0);\n  }\n}\n@keyframes fadeRightOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(-100%, 0, 0);\n  }\n}\n@-moz-keyframes fadeRightBigIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-webkit-keyframes fadeRightBigIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-o-keyframes fadeRightBigIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes fadeRightBigIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n@-moz-keyframes fadeRightBigOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0);\n  }\n}\n@-webkit-keyframes fadeRightBigOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0);\n  }\n}\n@-o-keyframes fadeRightBigOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0);\n  }\n}\n@keyframes fadeRightBigOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0);\n  }\n}\n", ""]);
	
	/***/ },
	/* 19 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var _lodashObjectMerge = __webpack_require__(20);
	
		var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);
	
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s fadeNormalIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s fadeNormalOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-fade-normal';
		var fadeNormal = { creator: creator, classname: classname };
	
		exports.fadeNormal = fadeNormal;
	
	/***/ },
	/* 20 */
	/***/ function(module, exports, __webpack_require__) {
	
		var baseMerge = __webpack_require__(21),
		    createAssigner = __webpack_require__(48);
	
		/**
		 * Recursively merges own enumerable properties of the source object(s), that
		 * don't resolve to `undefined` into the destination object. Subsequent sources
		 * overwrite property assignments of previous sources. If `customizer` is
		 * provided it's invoked to produce the merged values of the destination and
		 * source properties. If `customizer` returns `undefined` merging is handled
		 * by the method instead. The `customizer` is bound to `thisArg` and invoked
		 * with five arguments: (objectValue, sourceValue, key, object, source).
		 *
		 * @static
		 * @memberOf _
		 * @category Object
		 * @param {Object} object The destination object.
		 * @param {...Object} [sources] The source objects.
		 * @param {Function} [customizer] The function to customize assigned values.
		 * @param {*} [thisArg] The `this` binding of `customizer`.
		 * @returns {Object} Returns `object`.
		 * @example
		 *
		 * var users = {
		 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
		 * };
		 *
		 * var ages = {
		 *   'data': [{ 'age': 36 }, { 'age': 40 }]
		 * };
		 *
		 * _.merge(users, ages);
		 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
		 *
		 * // using a customizer callback
		 * var object = {
		 *   'fruits': ['apple'],
		 *   'vegetables': ['beet']
		 * };
		 *
		 * var other = {
		 *   'fruits': ['banana'],
		 *   'vegetables': ['carrot']
		 * };
		 *
		 * _.merge(object, other, function(a, b) {
		 *   if (_.isArray(a)) {
		 *     return a.concat(b);
		 *   }
		 * });
		 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
		 */
		var merge = createAssigner(baseMerge);
	
		module.exports = merge;
	
	
	/***/ },
	/* 21 */
	/***/ function(module, exports, __webpack_require__) {
	
		var arrayEach = __webpack_require__(22),
		    baseMergeDeep = __webpack_require__(23),
		    isArray = __webpack_require__(31),
		    isArrayLike = __webpack_require__(26),
		    isObject = __webpack_require__(35),
		    isObjectLike = __webpack_require__(30),
		    isTypedArray = __webpack_require__(43),
		    keys = __webpack_require__(46);
	
		/**
		 * The base implementation of `_.merge` without support for argument juggling,
		 * multiple sources, and `this` binding `customizer` functions.
		 *
		 * @private
		 * @param {Object} object The destination object.
		 * @param {Object} source The source object.
		 * @param {Function} [customizer] The function to customize merged values.
		 * @param {Array} [stackA=[]] Tracks traversed source objects.
		 * @param {Array} [stackB=[]] Associates values with source counterparts.
		 * @returns {Object} Returns `object`.
		 */
		function baseMerge(object, source, customizer, stackA, stackB) {
		  if (!isObject(object)) {
		    return object;
		  }
		  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
		      props = isSrcArr ? undefined : keys(source);
	
		  arrayEach(props || source, function(srcValue, key) {
		    if (props) {
		      key = srcValue;
		      srcValue = source[key];
		    }
		    if (isObjectLike(srcValue)) {
		      stackA || (stackA = []);
		      stackB || (stackB = []);
		      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
		    }
		    else {
		      var value = object[key],
		          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
		          isCommon = result === undefined;
	
		      if (isCommon) {
		        result = srcValue;
		      }
		      if ((result !== undefined || (isSrcArr && !(key in object))) &&
		          (isCommon || (result === result ? (result !== value) : (value === value)))) {
		        object[key] = result;
		      }
		    }
		  });
		  return object;
		}
	
		module.exports = baseMerge;
	
	
	/***/ },
	/* 22 */
	/***/ function(module, exports) {
	
		/**
		 * A specialized version of `_.forEach` for arrays without support for callback
		 * shorthands and `this` binding.
		 *
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} iteratee The function invoked per iteration.
		 * @returns {Array} Returns `array`.
		 */
		function arrayEach(array, iteratee) {
		  var index = -1,
		      length = array.length;
	
		  while (++index < length) {
		    if (iteratee(array[index], index, array) === false) {
		      break;
		    }
		  }
		  return array;
		}
	
		module.exports = arrayEach;
	
	
	/***/ },
	/* 23 */
	/***/ function(module, exports, __webpack_require__) {
	
		var arrayCopy = __webpack_require__(24),
		    isArguments = __webpack_require__(25),
		    isArray = __webpack_require__(31),
		    isArrayLike = __webpack_require__(26),
		    isPlainObject = __webpack_require__(36),
		    isTypedArray = __webpack_require__(43),
		    toPlainObject = __webpack_require__(44);
	
		/**
		 * A specialized version of `baseMerge` for arrays and objects which performs
		 * deep merges and tracks traversed objects enabling objects with circular
		 * references to be merged.
		 *
		 * @private
		 * @param {Object} object The destination object.
		 * @param {Object} source The source object.
		 * @param {string} key The key of the value to merge.
		 * @param {Function} mergeFunc The function to merge values.
		 * @param {Function} [customizer] The function to customize merged values.
		 * @param {Array} [stackA=[]] Tracks traversed source objects.
		 * @param {Array} [stackB=[]] Associates values with source counterparts.
		 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
		 */
		function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
		  var length = stackA.length,
		      srcValue = source[key];
	
		  while (length--) {
		    if (stackA[length] == srcValue) {
		      object[key] = stackB[length];
		      return;
		    }
		  }
		  var value = object[key],
		      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
		      isCommon = result === undefined;
	
		  if (isCommon) {
		    result = srcValue;
		    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
		      result = isArray(value)
		        ? value
		        : (isArrayLike(value) ? arrayCopy(value) : []);
		    }
		    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
		      result = isArguments(value)
		        ? toPlainObject(value)
		        : (isPlainObject(value) ? value : {});
		    }
		    else {
		      isCommon = false;
		    }
		  }
		  // Add the source value to the stack of traversed objects and associate
		  // it with its merged value.
		  stackA.push(srcValue);
		  stackB.push(result);
	
		  if (isCommon) {
		    // Recursively merge objects and arrays (susceptible to call stack limits).
		    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
		  } else if (result === result ? (result !== value) : (value === value)) {
		    object[key] = result;
		  }
		}
	
		module.exports = baseMergeDeep;
	
	
	/***/ },
	/* 24 */
	/***/ function(module, exports) {
	
		/**
		 * Copies the values of `source` to `array`.
		 *
		 * @private
		 * @param {Array} source The array to copy values from.
		 * @param {Array} [array=[]] The array to copy values to.
		 * @returns {Array} Returns `array`.
		 */
		function arrayCopy(source, array) {
		  var index = -1,
		      length = source.length;
	
		  array || (array = Array(length));
		  while (++index < length) {
		    array[index] = source[index];
		  }
		  return array;
		}
	
		module.exports = arrayCopy;
	
	
	/***/ },
	/* 25 */
	/***/ function(module, exports, __webpack_require__) {
	
		var isArrayLike = __webpack_require__(26),
		    isObjectLike = __webpack_require__(30);
	
		/** Used for native method references. */
		var objectProto = Object.prototype;
	
		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;
	
		/** Native method references. */
		var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
		/**
		 * Checks if `value` is classified as an `arguments` object.
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
		 * @example
		 *
		 * _.isArguments(function() { return arguments; }());
		 * // => true
		 *
		 * _.isArguments([1, 2, 3]);
		 * // => false
		 */
		function isArguments(value) {
		  return isObjectLike(value) && isArrayLike(value) &&
		    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
		}
	
		module.exports = isArguments;
	
	
	/***/ },
	/* 26 */
	/***/ function(module, exports, __webpack_require__) {
	
		var getLength = __webpack_require__(27),
		    isLength = __webpack_require__(29);
	
		/**
		 * Checks if `value` is array-like.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
		 */
		function isArrayLike(value) {
		  return value != null && isLength(getLength(value));
		}
	
		module.exports = isArrayLike;
	
	
	/***/ },
	/* 27 */
	/***/ function(module, exports, __webpack_require__) {
	
		var baseProperty = __webpack_require__(28);
	
		/**
		 * Gets the "length" property value of `object`.
		 *
		 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
		 * that affects Safari on at least iOS 8.1-8.3 ARM64.
		 *
		 * @private
		 * @param {Object} object The object to query.
		 * @returns {*} Returns the "length" value.
		 */
		var getLength = baseProperty('length');
	
		module.exports = getLength;
	
	
	/***/ },
	/* 28 */
	/***/ function(module, exports) {
	
		/**
		 * The base implementation of `_.property` without support for deep paths.
		 *
		 * @private
		 * @param {string} key The key of the property to get.
		 * @returns {Function} Returns the new function.
		 */
		function baseProperty(key) {
		  return function(object) {
		    return object == null ? undefined : object[key];
		  };
		}
	
		module.exports = baseProperty;
	
	
	/***/ },
	/* 29 */
	/***/ function(module, exports) {
	
		/**
		 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
		 * of an array-like value.
		 */
		var MAX_SAFE_INTEGER = 9007199254740991;
	
		/**
		 * Checks if `value` is a valid array-like length.
		 *
		 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
		 */
		function isLength(value) {
		  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
		}
	
		module.exports = isLength;
	
	
	/***/ },
	/* 30 */
	/***/ function(module, exports) {
	
		/**
		 * Checks if `value` is object-like.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
		 */
		function isObjectLike(value) {
		  return !!value && typeof value == 'object';
		}
	
		module.exports = isObjectLike;
	
	
	/***/ },
	/* 31 */
	/***/ function(module, exports, __webpack_require__) {
	
		var getNative = __webpack_require__(32),
		    isLength = __webpack_require__(29),
		    isObjectLike = __webpack_require__(30);
	
		/** `Object#toString` result references. */
		var arrayTag = '[object Array]';
	
		/** Used for native method references. */
		var objectProto = Object.prototype;
	
		/**
		 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
		 * of values.
		 */
		var objToString = objectProto.toString;
	
		/* Native method references for those with the same name as other `lodash` methods. */
		var nativeIsArray = getNative(Array, 'isArray');
	
		/**
		 * Checks if `value` is classified as an `Array` object.
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
		 * @example
		 *
		 * _.isArray([1, 2, 3]);
		 * // => true
		 *
		 * _.isArray(function() { return arguments; }());
		 * // => false
		 */
		var isArray = nativeIsArray || function(value) {
		  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
		};
	
		module.exports = isArray;
	
	
	/***/ },
	/* 32 */
	/***/ function(module, exports, __webpack_require__) {
	
		var isNative = __webpack_require__(33);
	
		/**
		 * Gets the native function at `key` of `object`.
		 *
		 * @private
		 * @param {Object} object The object to query.
		 * @param {string} key The key of the method to get.
		 * @returns {*} Returns the function if it's native, else `undefined`.
		 */
		function getNative(object, key) {
		  var value = object == null ? undefined : object[key];
		  return isNative(value) ? value : undefined;
		}
	
		module.exports = getNative;
	
	
	/***/ },
	/* 33 */
	/***/ function(module, exports, __webpack_require__) {
	
		var isFunction = __webpack_require__(34),
		    isObjectLike = __webpack_require__(30);
	
		/** Used to detect host constructors (Safari > 5). */
		var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
		/** Used for native method references. */
		var objectProto = Object.prototype;
	
		/** Used to resolve the decompiled source of functions. */
		var fnToString = Function.prototype.toString;
	
		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;
	
		/** Used to detect if a method is native. */
		var reIsNative = RegExp('^' +
		  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
		  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
		);
	
		/**
		 * Checks if `value` is a native function.
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
		 * @example
		 *
		 * _.isNative(Array.prototype.push);
		 * // => true
		 *
		 * _.isNative(_);
		 * // => false
		 */
		function isNative(value) {
		  if (value == null) {
		    return false;
		  }
		  if (isFunction(value)) {
		    return reIsNative.test(fnToString.call(value));
		  }
		  return isObjectLike(value) && reIsHostCtor.test(value);
		}
	
		module.exports = isNative;
	
	
	/***/ },
	/* 34 */
	/***/ function(module, exports, __webpack_require__) {
	
		var isObject = __webpack_require__(35);
	
		/** `Object#toString` result references. */
		var funcTag = '[object Function]';
	
		/** Used for native method references. */
		var objectProto = Object.prototype;
	
		/**
		 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
		 * of values.
		 */
		var objToString = objectProto.toString;
	
		/**
		 * Checks if `value` is classified as a `Function` object.
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
		 * @example
		 *
		 * _.isFunction(_);
		 * // => true
		 *
		 * _.isFunction(/abc/);
		 * // => false
		 */
		function isFunction(value) {
		  // The use of `Object#toString` avoids issues with the `typeof` operator
		  // in older versions of Chrome and Safari which return 'function' for regexes
		  // and Safari 8 which returns 'object' for typed array constructors.
		  return isObject(value) && objToString.call(value) == funcTag;
		}
	
		module.exports = isFunction;
	
	
	/***/ },
	/* 35 */
	/***/ function(module, exports) {
	
		/**
		 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
		 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
		 * @example
		 *
		 * _.isObject({});
		 * // => true
		 *
		 * _.isObject([1, 2, 3]);
		 * // => true
		 *
		 * _.isObject(1);
		 * // => false
		 */
		function isObject(value) {
		  // Avoid a V8 JIT bug in Chrome 19-20.
		  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
		  var type = typeof value;
		  return !!value && (type == 'object' || type == 'function');
		}
	
		module.exports = isObject;
	
	
	/***/ },
	/* 36 */
	/***/ function(module, exports, __webpack_require__) {
	
		var baseForIn = __webpack_require__(37),
		    isArguments = __webpack_require__(25),
		    isObjectLike = __webpack_require__(30);
	
		/** `Object#toString` result references. */
		var objectTag = '[object Object]';
	
		/** Used for native method references. */
		var objectProto = Object.prototype;
	
		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;
	
		/**
		 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
		 * of values.
		 */
		var objToString = objectProto.toString;
	
		/**
		 * Checks if `value` is a plain object, that is, an object created by the
		 * `Object` constructor or one with a `[[Prototype]]` of `null`.
		 *
		 * **Note:** This method assumes objects created by the `Object` constructor
		 * have no inherited enumerable properties.
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
		 * @example
		 *
		 * function Foo() {
		 *   this.a = 1;
		 * }
		 *
		 * _.isPlainObject(new Foo);
		 * // => false
		 *
		 * _.isPlainObject([1, 2, 3]);
		 * // => false
		 *
		 * _.isPlainObject({ 'x': 0, 'y': 0 });
		 * // => true
		 *
		 * _.isPlainObject(Object.create(null));
		 * // => true
		 */
		function isPlainObject(value) {
		  var Ctor;
	
		  // Exit early for non `Object` objects.
		  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
		      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
		    return false;
		  }
		  // IE < 9 iterates inherited properties before own properties. If the first
		  // iterated property is an object's own property then there are no inherited
		  // enumerable properties.
		  var result;
		  // In most environments an object's own properties are iterated before
		  // its inherited properties. If the last iterated property is an object's
		  // own property then there are no inherited enumerable properties.
		  baseForIn(value, function(subValue, key) {
		    result = key;
		  });
		  return result === undefined || hasOwnProperty.call(value, result);
		}
	
		module.exports = isPlainObject;
	
	
	/***/ },
	/* 37 */
	/***/ function(module, exports, __webpack_require__) {
	
		var baseFor = __webpack_require__(38),
		    keysIn = __webpack_require__(41);
	
		/**
		 * The base implementation of `_.forIn` without support for callback
		 * shorthands and `this` binding.
		 *
		 * @private
		 * @param {Object} object The object to iterate over.
		 * @param {Function} iteratee The function invoked per iteration.
		 * @returns {Object} Returns `object`.
		 */
		function baseForIn(object, iteratee) {
		  return baseFor(object, iteratee, keysIn);
		}
	
		module.exports = baseForIn;
	
	
	/***/ },
	/* 38 */
	/***/ function(module, exports, __webpack_require__) {
	
		var createBaseFor = __webpack_require__(39);
	
		/**
		 * The base implementation of `baseForIn` and `baseForOwn` which iterates
		 * over `object` properties returned by `keysFunc` invoking `iteratee` for
		 * each property. Iteratee functions may exit iteration early by explicitly
		 * returning `false`.
		 *
		 * @private
		 * @param {Object} object The object to iterate over.
		 * @param {Function} iteratee The function invoked per iteration.
		 * @param {Function} keysFunc The function to get the keys of `object`.
		 * @returns {Object} Returns `object`.
		 */
		var baseFor = createBaseFor();
	
		module.exports = baseFor;
	
	
	/***/ },
	/* 39 */
	/***/ function(module, exports, __webpack_require__) {
	
		var toObject = __webpack_require__(40);
	
		/**
		 * Creates a base function for `_.forIn` or `_.forInRight`.
		 *
		 * @private
		 * @param {boolean} [fromRight] Specify iterating from right to left.
		 * @returns {Function} Returns the new base function.
		 */
		function createBaseFor(fromRight) {
		  return function(object, iteratee, keysFunc) {
		    var iterable = toObject(object),
		        props = keysFunc(object),
		        length = props.length,
		        index = fromRight ? length : -1;
	
		    while ((fromRight ? index-- : ++index < length)) {
		      var key = props[index];
		      if (iteratee(iterable[key], key, iterable) === false) {
		        break;
		      }
		    }
		    return object;
		  };
		}
	
		module.exports = createBaseFor;
	
	
	/***/ },
	/* 40 */
	/***/ function(module, exports, __webpack_require__) {
	
		var isObject = __webpack_require__(35);
	
		/**
		 * Converts `value` to an object if it's not one.
		 *
		 * @private
		 * @param {*} value The value to process.
		 * @returns {Object} Returns the object.
		 */
		function toObject(value) {
		  return isObject(value) ? value : Object(value);
		}
	
		module.exports = toObject;
	
	
	/***/ },
	/* 41 */
	/***/ function(module, exports, __webpack_require__) {
	
		var isArguments = __webpack_require__(25),
		    isArray = __webpack_require__(31),
		    isIndex = __webpack_require__(42),
		    isLength = __webpack_require__(29),
		    isObject = __webpack_require__(35);
	
		/** Used for native method references. */
		var objectProto = Object.prototype;
	
		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;
	
		/**
		 * Creates an array of the own and inherited enumerable property names of `object`.
		 *
		 * **Note:** Non-object values are coerced to objects.
		 *
		 * @static
		 * @memberOf _
		 * @category Object
		 * @param {Object} object The object to query.
		 * @returns {Array} Returns the array of property names.
		 * @example
		 *
		 * function Foo() {
		 *   this.a = 1;
		 *   this.b = 2;
		 * }
		 *
		 * Foo.prototype.c = 3;
		 *
		 * _.keysIn(new Foo);
		 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
		 */
		function keysIn(object) {
		  if (object == null) {
		    return [];
		  }
		  if (!isObject(object)) {
		    object = Object(object);
		  }
		  var length = object.length;
		  length = (length && isLength(length) &&
		    (isArray(object) || isArguments(object)) && length) || 0;
	
		  var Ctor = object.constructor,
		      index = -1,
		      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
		      result = Array(length),
		      skipIndexes = length > 0;
	
		  while (++index < length) {
		    result[index] = (index + '');
		  }
		  for (var key in object) {
		    if (!(skipIndexes && isIndex(key, length)) &&
		        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
		      result.push(key);
		    }
		  }
		  return result;
		}
	
		module.exports = keysIn;
	
	
	/***/ },
	/* 42 */
	/***/ function(module, exports) {
	
		/** Used to detect unsigned integer values. */
		var reIsUint = /^\d+$/;
	
		/**
		 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
		 * of an array-like value.
		 */
		var MAX_SAFE_INTEGER = 9007199254740991;
	
		/**
		 * Checks if `value` is a valid array-like index.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
		 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
		 */
		function isIndex(value, length) {
		  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
		  length = length == null ? MAX_SAFE_INTEGER : length;
		  return value > -1 && value % 1 == 0 && value < length;
		}
	
		module.exports = isIndex;
	
	
	/***/ },
	/* 43 */
	/***/ function(module, exports, __webpack_require__) {
	
		var isLength = __webpack_require__(29),
		    isObjectLike = __webpack_require__(30);
	
		/** `Object#toString` result references. */
		var argsTag = '[object Arguments]',
		    arrayTag = '[object Array]',
		    boolTag = '[object Boolean]',
		    dateTag = '[object Date]',
		    errorTag = '[object Error]',
		    funcTag = '[object Function]',
		    mapTag = '[object Map]',
		    numberTag = '[object Number]',
		    objectTag = '[object Object]',
		    regexpTag = '[object RegExp]',
		    setTag = '[object Set]',
		    stringTag = '[object String]',
		    weakMapTag = '[object WeakMap]';
	
		var arrayBufferTag = '[object ArrayBuffer]',
		    float32Tag = '[object Float32Array]',
		    float64Tag = '[object Float64Array]',
		    int8Tag = '[object Int8Array]',
		    int16Tag = '[object Int16Array]',
		    int32Tag = '[object Int32Array]',
		    uint8Tag = '[object Uint8Array]',
		    uint8ClampedTag = '[object Uint8ClampedArray]',
		    uint16Tag = '[object Uint16Array]',
		    uint32Tag = '[object Uint32Array]';
	
		/** Used to identify `toStringTag` values of typed arrays. */
		var typedArrayTags = {};
		typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
		typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
		typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
		typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
		typedArrayTags[uint32Tag] = true;
		typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
		typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
		typedArrayTags[dateTag] = typedArrayTags[errorTag] =
		typedArrayTags[funcTag] = typedArrayTags[mapTag] =
		typedArrayTags[numberTag] = typedArrayTags[objectTag] =
		typedArrayTags[regexpTag] = typedArrayTags[setTag] =
		typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
	
		/** Used for native method references. */
		var objectProto = Object.prototype;
	
		/**
		 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
		 * of values.
		 */
		var objToString = objectProto.toString;
	
		/**
		 * Checks if `value` is classified as a typed array.
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
		 * @example
		 *
		 * _.isTypedArray(new Uint8Array);
		 * // => true
		 *
		 * _.isTypedArray([]);
		 * // => false
		 */
		function isTypedArray(value) {
		  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
		}
	
		module.exports = isTypedArray;
	
	
	/***/ },
	/* 44 */
	/***/ function(module, exports, __webpack_require__) {
	
		var baseCopy = __webpack_require__(45),
		    keysIn = __webpack_require__(41);
	
		/**
		 * Converts `value` to a plain object flattening inherited enumerable
		 * properties of `value` to own properties of the plain object.
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to convert.
		 * @returns {Object} Returns the converted plain object.
		 * @example
		 *
		 * function Foo() {
		 *   this.b = 2;
		 * }
		 *
		 * Foo.prototype.c = 3;
		 *
		 * _.assign({ 'a': 1 }, new Foo);
		 * // => { 'a': 1, 'b': 2 }
		 *
		 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
		 * // => { 'a': 1, 'b': 2, 'c': 3 }
		 */
		function toPlainObject(value) {
		  return baseCopy(value, keysIn(value));
		}
	
		module.exports = toPlainObject;
	
	
	/***/ },
	/* 45 */
	/***/ function(module, exports) {
	
		/**
		 * Copies properties of `source` to `object`.
		 *
		 * @private
		 * @param {Object} source The object to copy properties from.
		 * @param {Array} props The property names to copy.
		 * @param {Object} [object={}] The object to copy properties to.
		 * @returns {Object} Returns `object`.
		 */
		function baseCopy(source, props, object) {
		  object || (object = {});
	
		  var index = -1,
		      length = props.length;
	
		  while (++index < length) {
		    var key = props[index];
		    object[key] = source[key];
		  }
		  return object;
		}
	
		module.exports = baseCopy;
	
	
	/***/ },
	/* 46 */
	/***/ function(module, exports, __webpack_require__) {
	
		var getNative = __webpack_require__(32),
		    isArrayLike = __webpack_require__(26),
		    isObject = __webpack_require__(35),
		    shimKeys = __webpack_require__(47);
	
		/* Native method references for those with the same name as other `lodash` methods. */
		var nativeKeys = getNative(Object, 'keys');
	
		/**
		 * Creates an array of the own enumerable property names of `object`.
		 *
		 * **Note:** Non-object values are coerced to objects. See the
		 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
		 * for more details.
		 *
		 * @static
		 * @memberOf _
		 * @category Object
		 * @param {Object} object The object to query.
		 * @returns {Array} Returns the array of property names.
		 * @example
		 *
		 * function Foo() {
		 *   this.a = 1;
		 *   this.b = 2;
		 * }
		 *
		 * Foo.prototype.c = 3;
		 *
		 * _.keys(new Foo);
		 * // => ['a', 'b'] (iteration order is not guaranteed)
		 *
		 * _.keys('hi');
		 * // => ['0', '1']
		 */
		var keys = !nativeKeys ? shimKeys : function(object) {
		  var Ctor = object == null ? undefined : object.constructor;
		  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
		      (typeof object != 'function' && isArrayLike(object))) {
		    return shimKeys(object);
		  }
		  return isObject(object) ? nativeKeys(object) : [];
		};
	
		module.exports = keys;
	
	
	/***/ },
	/* 47 */
	/***/ function(module, exports, __webpack_require__) {
	
		var isArguments = __webpack_require__(25),
		    isArray = __webpack_require__(31),
		    isIndex = __webpack_require__(42),
		    isLength = __webpack_require__(29),
		    keysIn = __webpack_require__(41);
	
		/** Used for native method references. */
		var objectProto = Object.prototype;
	
		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;
	
		/**
		 * A fallback implementation of `Object.keys` which creates an array of the
		 * own enumerable property names of `object`.
		 *
		 * @private
		 * @param {Object} object The object to query.
		 * @returns {Array} Returns the array of property names.
		 */
		function shimKeys(object) {
		  var props = keysIn(object),
		      propsLength = props.length,
		      length = propsLength && object.length;
	
		  var allowIndexes = !!length && isLength(length) &&
		    (isArray(object) || isArguments(object));
	
		  var index = -1,
		      result = [];
	
		  while (++index < propsLength) {
		    var key = props[index];
		    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
		      result.push(key);
		    }
		  }
		  return result;
		}
	
		module.exports = shimKeys;
	
	
	/***/ },
	/* 48 */
	/***/ function(module, exports, __webpack_require__) {
	
		var bindCallback = __webpack_require__(49),
		    isIterateeCall = __webpack_require__(51),
		    restParam = __webpack_require__(52);
	
		/**
		 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
		 *
		 * @private
		 * @param {Function} assigner The function to assign values.
		 * @returns {Function} Returns the new assigner function.
		 */
		function createAssigner(assigner) {
		  return restParam(function(object, sources) {
		    var index = -1,
		        length = object == null ? 0 : sources.length,
		        customizer = length > 2 ? sources[length - 2] : undefined,
		        guard = length > 2 ? sources[2] : undefined,
		        thisArg = length > 1 ? sources[length - 1] : undefined;
	
		    if (typeof customizer == 'function') {
		      customizer = bindCallback(customizer, thisArg, 5);
		      length -= 2;
		    } else {
		      customizer = typeof thisArg == 'function' ? thisArg : undefined;
		      length -= (customizer ? 1 : 0);
		    }
		    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
		      customizer = length < 3 ? undefined : customizer;
		      length = 1;
		    }
		    while (++index < length) {
		      var source = sources[index];
		      if (source) {
		        assigner(object, source, customizer);
		      }
		    }
		    return object;
		  });
		}
	
		module.exports = createAssigner;
	
	
	/***/ },
	/* 49 */
	/***/ function(module, exports, __webpack_require__) {
	
		var identity = __webpack_require__(50);
	
		/**
		 * A specialized version of `baseCallback` which only supports `this` binding
		 * and specifying the number of arguments to provide to `func`.
		 *
		 * @private
		 * @param {Function} func The function to bind.
		 * @param {*} thisArg The `this` binding of `func`.
		 * @param {number} [argCount] The number of arguments to provide to `func`.
		 * @returns {Function} Returns the callback.
		 */
		function bindCallback(func, thisArg, argCount) {
		  if (typeof func != 'function') {
		    return identity;
		  }
		  if (thisArg === undefined) {
		    return func;
		  }
		  switch (argCount) {
		    case 1: return function(value) {
		      return func.call(thisArg, value);
		    };
		    case 3: return function(value, index, collection) {
		      return func.call(thisArg, value, index, collection);
		    };
		    case 4: return function(accumulator, value, index, collection) {
		      return func.call(thisArg, accumulator, value, index, collection);
		    };
		    case 5: return function(value, other, key, object, source) {
		      return func.call(thisArg, value, other, key, object, source);
		    };
		  }
		  return function() {
		    return func.apply(thisArg, arguments);
		  };
		}
	
		module.exports = bindCallback;
	
	
	/***/ },
	/* 50 */
	/***/ function(module, exports) {
	
		/**
		 * This method returns the first argument provided to it.
		 *
		 * @static
		 * @memberOf _
		 * @category Utility
		 * @param {*} value Any value.
		 * @returns {*} Returns `value`.
		 * @example
		 *
		 * var object = { 'user': 'fred' };
		 *
		 * _.identity(object) === object;
		 * // => true
		 */
		function identity(value) {
		  return value;
		}
	
		module.exports = identity;
	
	
	/***/ },
	/* 51 */
	/***/ function(module, exports, __webpack_require__) {
	
		var isArrayLike = __webpack_require__(26),
		    isIndex = __webpack_require__(42),
		    isObject = __webpack_require__(35);
	
		/**
		 * Checks if the provided arguments are from an iteratee call.
		 *
		 * @private
		 * @param {*} value The potential iteratee value argument.
		 * @param {*} index The potential iteratee index or key argument.
		 * @param {*} object The potential iteratee object argument.
		 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
		 */
		function isIterateeCall(value, index, object) {
		  if (!isObject(object)) {
		    return false;
		  }
		  var type = typeof index;
		  if (type == 'number'
		      ? (isArrayLike(object) && isIndex(index, object.length))
		      : (type == 'string' && index in object)) {
		    var other = object[index];
		    return value === value ? (value === other) : (other !== other);
		  }
		  return false;
		}
	
		module.exports = isIterateeCall;
	
	
	/***/ },
	/* 52 */
	/***/ function(module, exports) {
	
		/** Used as the `TypeError` message for "Functions" methods. */
		var FUNC_ERROR_TEXT = 'Expected a function';
	
		/* Native method references for those with the same name as other `lodash` methods. */
		var nativeMax = Math.max;
	
		/**
		 * Creates a function that invokes `func` with the `this` binding of the
		 * created function and arguments from `start` and beyond provided as an array.
		 *
		 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
		 *
		 * @static
		 * @memberOf _
		 * @category Function
		 * @param {Function} func The function to apply a rest parameter to.
		 * @param {number} [start=func.length-1] The start position of the rest parameter.
		 * @returns {Function} Returns the new function.
		 * @example
		 *
		 * var say = _.restParam(function(what, names) {
		 *   return what + ' ' + _.initial(names).join(', ') +
		 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
		 * });
		 *
		 * say('hello', 'fred', 'barney', 'pebbles');
		 * // => 'hello fred, barney, & pebbles'
		 */
		function restParam(func, start) {
		  if (typeof func != 'function') {
		    throw new TypeError(FUNC_ERROR_TEXT);
		  }
		  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
		  return function() {
		    var args = arguments,
		        index = -1,
		        length = nativeMax(args.length - start, 0),
		        rest = Array(length);
	
		    while (++index < length) {
		      rest[index] = args[start + index];
		    }
		    switch (start) {
		      case 0: return func.call(this, rest);
		      case 1: return func.call(this, args[0], rest);
		      case 2: return func.call(this, args[0], args[1], rest);
		    }
		    var otherArgs = Array(start + 1);
		    index = -1;
		    while (++index < start) {
		      otherArgs[index] = args[index];
		    }
		    otherArgs[start] = rest;
		    return func.apply(this, otherArgs);
		  };
		}
	
		module.exports = restParam;
	
	
	/***/ },
	/* 53 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var _lodashObjectMerge = __webpack_require__(20);
	
		var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);
	
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s fadeDownIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s fadeDownOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-fade-down';
		var fadeDown = { creator: creator, classname: classname };
	
		exports.fadeDown = fadeDown;
	
	/***/ },
	/* 54 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var _lodashObjectMerge = __webpack_require__(20);
	
		var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);
	
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s fadeDownBigIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s fadeDownBigOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-fade-down-big';
		var fadeDownBig = { creator: creator, classname: classname };
	
		exports.fadeDownBig = fadeDownBig;
	
	/***/ },
	/* 55 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var _lodashObjectMerge = __webpack_require__(20);
	
		var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);
	
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s fadeLeftIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s fadeLeftOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-fade-left';
		var fadeLeft = { creator: creator, classname: classname };
	
		exports.fadeLeft = fadeLeft;
	
	/***/ },
	/* 56 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var _lodashObjectMerge = __webpack_require__(20);
	
		var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);
	
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s fadeLeftBigIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s fadeLeftBigOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-fade-left-big';
		var fadeLeftBig = { creator: creator, classname: classname };
	
		exports.fadeLeftBig = fadeLeftBig;
	
	/***/ },
	/* 57 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var _lodashObjectMerge = __webpack_require__(20);
	
		var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);
	
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s fadeRightIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s fadeRightOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-fade-right';
		var fadeRight = { creator: creator, classname: classname };
	
		exports.fadeRight = fadeRight;
	
	/***/ },
	/* 58 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var _lodashObjectMerge = __webpack_require__(20);
	
		var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);
	
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s fadeRightBigIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s fadeRightBigOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-fade-right-big';
		var fadeRightBig = { creator: creator, classname: classname };
	
		exports.fadeRightBig = fadeRightBig;
	
	/***/ },
	/* 59 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var _lodashObjectMerge = __webpack_require__(20);
	
		var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);
	
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s fadeUpIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s fadeUpOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-fade-up';
		var fadeUp = { creator: creator, classname: classname };
	
		exports.fadeUp = fadeUp;
	
	/***/ },
	/* 60 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var _lodashObjectMerge = __webpack_require__(20);
	
		var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);
	
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s fadeUpBigIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s fadeUpBigOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-fade-up-big';
		var fadeUpBig = { creator: creator, classname: classname };
	
		exports.fadeUpBig = fadeUpBig;
	
	/***/ },
	/* 61 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		__webpack_require__(62);
	
		var _zoomNormal = __webpack_require__(64);
	
		var _zoomDown = __webpack_require__(65);
	
		var _zoomUp = __webpack_require__(66);
	
		var _zoomRight = __webpack_require__(67);
	
		var _zoomLeft = __webpack_require__(68);
	
		var zooms = [_zoomNormal.zoomNormal, _zoomDown.zoomDown, _zoomUp.zoomUp, _zoomRight.zoomRight, _zoomLeft.zoomLeft];
		exports.zooms = zooms;
	
	/***/ },
	/* 62 */
	/***/ function(module, exports, __webpack_require__) {
	
		// style-loader: Adds some css to the DOM by adding a <style> tag
	
		// load the styles
		var content = __webpack_require__(63);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(6)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./zoom.styl", function() {
					var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./zoom.styl");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}
	
	/***/ },
	/* 63 */
	/***/ function(module, exports, __webpack_require__) {
	
		exports = module.exports = __webpack_require__(5)();
		exports.push([module.id, "/**\n * Zoom animations\n */\n/********************************************/\n/**************************************************/\n/*******************************************************/\n/*******************************************************/\n@-moz-keyframes zoomNormalIn {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes zoomNormalIn {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@-o-keyframes zoomNormalIn {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@keyframes zoomNormalIn {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@-moz-keyframes zoomNormalOut {\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@-webkit-keyframes zoomNormalOut {\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@-o-keyframes zoomNormalOut {\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes zoomNormalOut {\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@-moz-keyframes zoomDownIn {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n  }\n}\n@-webkit-keyframes zoomDownIn {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n  }\n}\n@-o-keyframes zoomDownIn {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n  }\n}\n@keyframes zoomDownIn {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n  }\n}\n@-moz-keyframes zoomDownOut {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n  100% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    transform-origin: center bottom;\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@-webkit-keyframes zoomDownOut {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n  100% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    transform-origin: center bottom;\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@-o-keyframes zoomDownOut {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n  100% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    transform-origin: center bottom;\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@keyframes zoomDownOut {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n  100% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    transform-origin: center bottom;\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@-moz-keyframes zoomUpIn {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@-webkit-keyframes zoomUpIn {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@-o-keyframes zoomUpIn {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@keyframes zoomUpIn {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@-moz-keyframes zoomUpOut {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n  100% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    transform-origin: center bottom;\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@-webkit-keyframes zoomUpOut {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n  100% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    transform-origin: center bottom;\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@-o-keyframes zoomUpOut {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n  100% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    transform-origin: center bottom;\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@keyframes zoomUpOut {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n  100% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    transform-origin: center bottom;\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@-moz-keyframes zoomRightIn {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@-webkit-keyframes zoomRightIn {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@-o-keyframes zoomRightIn {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@keyframes zoomRightIn {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@-moz-keyframes zoomRightOut {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(0.1) translate3d(2000px, 0, 0);\n    transform-origin: right center;\n  }\n}\n@-webkit-keyframes zoomRightOut {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(0.1) translate3d(2000px, 0, 0);\n    transform-origin: right center;\n  }\n}\n@-o-keyframes zoomRightOut {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(0.1) translate3d(2000px, 0, 0);\n    transform-origin: right center;\n  }\n}\n@keyframes zoomRightOut {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(0.1) translate3d(2000px, 0, 0);\n    transform-origin: right center;\n  }\n}\n@-moz-keyframes zoomLeftIn {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@-webkit-keyframes zoomLeftIn {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@-o-keyframes zoomLeftIn {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@keyframes zoomLeftIn {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@-moz-keyframes zoomLeftOut {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(0.1) translate3d(-2000px, 0, 0);\n    transform-origin: left center;\n  }\n}\n@-webkit-keyframes zoomLeftOut {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(0.1) translate3d(-2000px, 0, 0);\n    transform-origin: left center;\n  }\n}\n@-o-keyframes zoomLeftOut {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(0.1) translate3d(-2000px, 0, 0);\n    transform-origin: left center;\n  }\n}\n@keyframes zoomLeftOut {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(0.1) translate3d(-2000px, 0, 0);\n    transform-origin: left center;\n  }\n}\n", ""]);
	
	/***/ },
	/* 64 */
	/***/ function(module, exports) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s zoomNormalIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s zoomNormalOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-zoom-normal';
		var zoomNormal = { creator: creator, classname: classname };
	
		exports.zoomNormal = zoomNormal;
	
	/***/ },
	/* 65 */
	/***/ function(module, exports) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s zoomDownIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s zoomDownOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-zoom-down';
		var zoomDown = { creator: creator, classname: classname };
	
		exports.zoomDown = zoomDown;
	
	/***/ },
	/* 66 */
	/***/ function(module, exports) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s zoomUpIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s zoomUpOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-zoom-up';
		var zoomUp = { creator: creator, classname: classname };
	
		exports.zoomUp = zoomUp;
	
	/***/ },
	/* 67 */
	/***/ function(module, exports) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s zoomRightIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s zoomRightOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-zoom-right';
		var zoomRight = { creator: creator, classname: classname };
	
		exports.zoomRight = zoomRight;
	
	/***/ },
	/* 68 */
	/***/ function(module, exports) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s zoomLeftIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s zoomLeftOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-zoom-left';
		var zoomLeft = { creator: creator, classname: classname };
	
		exports.zoomLeft = zoomLeft;
	
	/***/ },
	/* 69 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		__webpack_require__(70);
	
		var _lightSpeedNormal = __webpack_require__(72);
	
		var lightSpeeds = [_lightSpeedNormal.lightSpeed];
		exports.lightSpeeds = lightSpeeds;
	
	/***/ },
	/* 70 */
	/***/ function(module, exports, __webpack_require__) {
	
		// style-loader: Adds some css to the DOM by adding a <style> tag
	
		// load the styles
		var content = __webpack_require__(71);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(6)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./lightSpeed.styl", function() {
					var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./lightSpeed.styl");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}
	
	/***/ },
	/* 71 */
	/***/ function(module, exports, __webpack_require__) {
	
		exports = module.exports = __webpack_require__(5)();
		exports.push([module.id, "@-moz-keyframes lightSpeedNormalIn {\n  from {\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\n    opacity: 0;\n  }\n  60% {\n    transform: skewX(20deg);\n    opacity: 1;\n  }\n  80% {\n    transform: skewX(-5deg);\n    opacity: 1;\n  }\n  to {\n    transform: none;\n    opacity: 1;\n  }\n}\n@-webkit-keyframes lightSpeedNormalIn {\n  from {\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\n    opacity: 0;\n  }\n  60% {\n    transform: skewX(20deg);\n    opacity: 1;\n  }\n  80% {\n    transform: skewX(-5deg);\n    opacity: 1;\n  }\n  to {\n    transform: none;\n    opacity: 1;\n  }\n}\n@-o-keyframes lightSpeedNormalIn {\n  from {\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\n    opacity: 0;\n  }\n  60% {\n    transform: skewX(20deg);\n    opacity: 1;\n  }\n  80% {\n    transform: skewX(-5deg);\n    opacity: 1;\n  }\n  to {\n    transform: none;\n    opacity: 1;\n  }\n}\n@keyframes lightSpeedNormalIn {\n  from {\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\n    opacity: 0;\n  }\n  60% {\n    transform: skewX(20deg);\n    opacity: 1;\n  }\n  80% {\n    transform: skewX(-5deg);\n    opacity: 1;\n  }\n  to {\n    transform: none;\n    opacity: 1;\n  }\n}\n@-moz-keyframes lightSpeedNormalOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    transform: translate3d(100%, 0, 0) skewX(30deg);\n    opacity: 0;\n  }\n}\n@-webkit-keyframes lightSpeedNormalOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    transform: translate3d(100%, 0, 0) skewX(30deg);\n    opacity: 0;\n  }\n}\n@-o-keyframes lightSpeedNormalOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    transform: translate3d(100%, 0, 0) skewX(30deg);\n    opacity: 0;\n  }\n}\n@keyframes lightSpeedNormalOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    transform: translate3d(100%, 0, 0) skewX(30deg);\n    opacity: 0;\n  }\n}\n", ""]);
	
	/***/ },
	/* 72 */
	/***/ function(module, exports) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s lightSpeedNormalIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s lightSpeedNormalOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-light-speed';
		var lightSpeed = { creator: creator, classname: classname };
	
		exports.lightSpeed = lightSpeed;
	
	/***/ },
	/* 73 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		__webpack_require__(74);
	
		var _rotateDownLeft = __webpack_require__(76);
	
		var _rotateDownRight = __webpack_require__(77);
	
		var _rotateUpLeft = __webpack_require__(78);
	
		var _rotateUpRight = __webpack_require__(79);
	
		var rotates = [_rotateDownLeft.rotateDownLeft, _rotateDownRight.rotateDownRight, _rotateUpLeft.rotateUpLeft, _rotateUpRight.rotateUpRight];
		exports.rotates = rotates;
	
	/***/ },
	/* 74 */
	/***/ function(module, exports, __webpack_require__) {
	
		// style-loader: Adds some css to the DOM by adding a <style> tag
	
		// load the styles
		var content = __webpack_require__(75);
		if(typeof content === 'string') content = [[module.id, content, '']];
		// add the styles to the DOM
		var update = __webpack_require__(6)(content, {});
		if(content.locals) module.exports = content.locals;
		// Hot Module Replacement
		if(false) {
			// When the styles change, update the <style> tags
			if(!content.locals) {
				module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./rotate.styl", function() {
					var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./rotate.styl");
					if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
					update(newContent);
				});
			}
			// When the module is disposed, remove the <style> tags
			module.hot.dispose(function() { update(); });
		}
	
	/***/ },
	/* 75 */
	/***/ function(module, exports, __webpack_require__) {
	
		exports = module.exports = __webpack_require__(5)();
		exports.push([module.id, "/**\n * ROTATES\n */\n@-moz-keyframes rotateDownLeftIn {\n  from {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n  to {\n    transform-origin: left bottom;\n    transform: none;\n    opacity: 1;\n  }\n}\n@-webkit-keyframes rotateDownLeftIn {\n  from {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n  to {\n    transform-origin: left bottom;\n    transform: none;\n    opacity: 1;\n  }\n}\n@-o-keyframes rotateDownLeftIn {\n  from {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n  to {\n    transform-origin: left bottom;\n    transform: none;\n    opacity: 1;\n  }\n}\n@keyframes rotateDownLeftIn {\n  from {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n  to {\n    transform-origin: left bottom;\n    transform: none;\n    opacity: 1;\n  }\n}\n@-moz-keyframes rotateDownLeftOut {\n  from {\n    transform-origin: left bottom;\n    opacity: 1;\n  }\n  to {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n}\n@-webkit-keyframes rotateDownLeftOut {\n  from {\n    transform-origin: left bottom;\n    opacity: 1;\n  }\n  to {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n}\n@-o-keyframes rotateDownLeftOut {\n  from {\n    transform-origin: left bottom;\n    opacity: 1;\n  }\n  to {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n}\n@keyframes rotateDownLeftOut {\n  from {\n    transform-origin: left bottom;\n    opacity: 1;\n  }\n  to {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n}\n@-moz-keyframes rotateDownRightIn {\n  from {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n  to {\n    transform-origin: right bottom;\n    transform: none;\n    opacity: 1;\n  }\n}\n@-webkit-keyframes rotateDownRightIn {\n  from {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n  to {\n    transform-origin: right bottom;\n    transform: none;\n    opacity: 1;\n  }\n}\n@-o-keyframes rotateDownRightIn {\n  from {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n  to {\n    transform-origin: right bottom;\n    transform: none;\n    opacity: 1;\n  }\n}\n@keyframes rotateDownRightIn {\n  from {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n  to {\n    transform-origin: right bottom;\n    transform: none;\n    opacity: 1;\n  }\n}\n@-moz-keyframes rotateDownRightOut {\n  from {\n    transform-origin: right bottom;\n    opacity: 1;\n  }\n  to {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n}\n@-webkit-keyframes rotateDownRightOut {\n  from {\n    transform-origin: right bottom;\n    opacity: 1;\n  }\n  to {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n}\n@-o-keyframes rotateDownRightOut {\n  from {\n    transform-origin: right bottom;\n    opacity: 1;\n  }\n  to {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n}\n@keyframes rotateDownRightOut {\n  from {\n    transform-origin: right bottom;\n    opacity: 1;\n  }\n  to {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n}\n@-moz-keyframes rotateUpLeftIn {\n  from {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n  to {\n    transform-origin: left bottom;\n    transform: none;\n    opacity: 1;\n  }\n}\n@-webkit-keyframes rotateUpLeftIn {\n  from {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n  to {\n    transform-origin: left bottom;\n    transform: none;\n    opacity: 1;\n  }\n}\n@-o-keyframes rotateUpLeftIn {\n  from {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n  to {\n    transform-origin: left bottom;\n    transform: none;\n    opacity: 1;\n  }\n}\n@keyframes rotateUpLeftIn {\n  from {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n  to {\n    transform-origin: left bottom;\n    transform: none;\n    opacity: 1;\n  }\n}\n@-moz-keyframes rotateUpLeftOut {\n  from {\n    transform-origin: left bottom;\n    opacity: 1;\n  }\n  to {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n}\n@-webkit-keyframes rotateUpLeftOut {\n  from {\n    transform-origin: left bottom;\n    opacity: 1;\n  }\n  to {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n}\n@-o-keyframes rotateUpLeftOut {\n  from {\n    transform-origin: left bottom;\n    opacity: 1;\n  }\n  to {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n}\n@keyframes rotateUpLeftOut {\n  from {\n    transform-origin: left bottom;\n    opacity: 1;\n  }\n  to {\n    transform-origin: left bottom;\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n}\n@-moz-keyframes rotateUpRightIn {\n  from {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, -90deg);\n    opacity: 0;\n  }\n  to {\n    transform-origin: right bottom;\n    transform: none;\n    opacity: 1;\n  }\n}\n@-webkit-keyframes rotateUpRightIn {\n  from {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, -90deg);\n    opacity: 0;\n  }\n  to {\n    transform-origin: right bottom;\n    transform: none;\n    opacity: 1;\n  }\n}\n@-o-keyframes rotateUpRightIn {\n  from {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, -90deg);\n    opacity: 0;\n  }\n  to {\n    transform-origin: right bottom;\n    transform: none;\n    opacity: 1;\n  }\n}\n@keyframes rotateUpRightIn {\n  from {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, -90deg);\n    opacity: 0;\n  }\n  to {\n    transform-origin: right bottom;\n    transform: none;\n    opacity: 1;\n  }\n}\n@-moz-keyframes rotateUpRightOut {\n  from {\n    transform-origin: right bottom;\n    opacity: 1;\n  }\n  to {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, 90deg);\n    opacity: 0;\n  }\n}\n@-webkit-keyframes rotateUpRightOut {\n  from {\n    transform-origin: right bottom;\n    opacity: 1;\n  }\n  to {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, 90deg);\n    opacity: 0;\n  }\n}\n@-o-keyframes rotateUpRightOut {\n  from {\n    transform-origin: right bottom;\n    opacity: 1;\n  }\n  to {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, 90deg);\n    opacity: 0;\n  }\n}\n@keyframes rotateUpRightOut {\n  from {\n    transform-origin: right bottom;\n    opacity: 1;\n  }\n  to {\n    transform-origin: right bottom;\n    transform: rotate3d(0, 0, 1, 90deg);\n    opacity: 0;\n  }\n}\n", ""]);
	
	/***/ },
	/* 76 */
	/***/ function(module, exports) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s rotateDownLeftIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s rotateDownLeftOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-rotate-down-left';
		var rotateDownLeft = { creator: creator, classname: classname };
	
		exports.rotateDownLeft = rotateDownLeft;
	
	/***/ },
	/* 77 */
	/***/ function(module, exports) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s rotateDownRightIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s rotateDownRightOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-rotate-down-right';
		var rotateDownRight = { creator: creator, classname: classname };
	
		exports.rotateDownRight = rotateDownRight;
	
	/***/ },
	/* 78 */
	/***/ function(module, exports) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s rotateUpLeftIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s rotateUpLeftOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-rotate-up-left';
		var rotateUpLeft = { creator: creator, classname: classname };
	
		exports.rotateUpLeft = rotateUpLeft;
	
	/***/ },
	/* 79 */
	/***/ function(module, exports) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		var creator = function creator($fxMakeAnimation) {
	
		  var enterAnimation = {
		    keyframeStyle: '.1s rotateUpRightIn'
		  };
	
		  var leaveAnimation = {
		    keyframeStyle: '.1s rotateUpRightOut'
		  };
	
		  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
		};
	
		creator.$inject = ['$fxMakeAnimation'];
	
		var classname = '.fx-rotate-up-right';
		var rotateUpRight = { creator: creator, classname: classname };
	
		exports.rotateUpRight = rotateUpRight;
	
	/***/ },
	/* 80 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		var _fxHelp = __webpack_require__(81);
	
		var _fxMakeAnimation = __webpack_require__(86);
	
		var config = function config($animateProvider) {
		  $animateProvider.classNameFilter(/fx-/);
		};
	
		config.$inject = ['$animateProvider'];
	
		var utils = angular.module('ngFx.utils', []).factory('$$fx', _fxHelp.fxHelp).factory('$fxMakeAnimation', _fxMakeAnimation.fxMakeAnimation).name;
		exports.utils = utils;
	
	/***/ },
	/* 81 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var _lodashLangToArray = __webpack_require__(82);
	
		var _lodashLangToArray2 = _interopRequireDefault(_lodashLangToArray);
	
		var _lodashObjectMerge = __webpack_require__(20);
	
		var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);
	
		var _easings = __webpack_require__(85);
	
		/**
		 * helper function to supply utility method for animations
		 * is registed as the $$fx factory
		 * @return {[Object]} public object of the methods to help with animations
		 */
		var fxHelp = function fxHelp($animateCss) {
		  // group of similar animation events
		  var similarEvents = ['enter', 'leave', 'move'];
		  var classEvents = ['addClass', 'setClass', 'removeClass'];
	
		  var durationRegxpString = '(\\d+)';
		  var durationRegxp = new RegExp(durationRegxpString);
	
		  /**
		   * takes in a fx-{option} and creates a regexp for
		   * checking against an element's classList
		   * @param  {[String]} option the fx-{option}
		   * @param  {[Boolean]} text   should the regexp loof for alphabet chars after the option
		   *                            ex: fx-ease-back
		   * @return {[Regexp]}        the composed regexp
		   */
		  var makeFxOptionRegexp = function makeFxOptionRegexp(option, text) {
		    var afterOption = text ? '[A-Za-z]' : durationRegxpString;
		    return new RegExp('fx\\-' + option + '\\-' + afterOption);
		  };
	
		  /**
		   * given a css classname, will check to see if it
		   * is trying to describe the duration of the animation
		   * with fx-speed-{num in ms}
		   * @param  {[String]} className a css classname
		   * @return {[Number]}           duration in seconds
		   */
		  var getDuration = function getDuration(className) {
		    // default to half a second duration
	
		    var duration = 500;
	
		    // allow usres to use fx-speed|dur|duration-{num in ms}
		    if (makeFxOptionRegexp('(speed|dur|duration)').test(className)) {
		      try {
		        duration = parseInt(className.match(durationRegxp)[0]);
		      } catch (e) {}
		    }
	
		    // convert ms to seconds for $animateCss to consume
		    return duration / 1000;
		  };
	
		  /**
		   * given a css classname, it will check to see if it
		   * trying to describe the stagger delay if any for the animation
		   * with fx-stagger-{num in ms}
		   * @param  {[String]} className css class name
		   * @return {[Number]}           number in seconds
		   */
		  var getStagger = function getStagger(className) {
		    if (makeFxOptionRegexp('stagger').test(className)) {
		      var stagger = undefined;
		      try {
		        stagger = parseInt(className.match(durationRegxp)[0]);
		      } catch (e) {
		        return;
		      }
		      // convert ms to seconds for $animateCss to consume
		      return stagger / 1000;
		    }
		  };
	
		  /**
		   * takes a class name and checks to see if it is trying
		   * to describe an ease type
		   * @param  {String} className css class name
		   * @return {Array}           bezier curve coordinates
		   */
		  var getEase = function getEase(className) {
		    var bezier = '';
	
		    if (!makeFxOptionRegexp('ease', true).test(className)) {
		      return;
		    } else {
		      var easeOptions = className.slice(8);
	
		      var _easeOptions$split = easeOptions.split('-');
	
		      var _easeOptions$split2 = _slicedToArray(_easeOptions$split, 3);
	
		      var ease = _easeOptions$split2[0];
		      var dir = _easeOptions$split2[1];
		      var _easeOptions$split2$2 = _easeOptions$split2[2];
		      var dir2 = _easeOptions$split2$2 === undefined ? '' : _easeOptions$split2$2;
	
		      var curve = _easings.curves[ease.trim()];
	
		      if (!curve) {
		        return;
		      }
	
		      if (!dir) {
		        return curve.inout;
		      } else {
		        var direction = ('' + dir + dir2).trim();
		        return curve[direction];
		      }
		    }
		  };
	
		  /**
		   * takes an element, parses the className, and returns
		   * an object of defined fx options
		   * @param  {DOM node} element
		   * @return {Object}           the fx options object for the element
		   */
		  var parseClassList = function parseClassList(element) {
		    var list = (0, _lodashLangToArray2['default'])(element[0].classList);
		    var classList = list.join(' ');
	
		    // will capture anything with `fx-thing-thing`
		    var fxRegexp = /(fx\-\w+\-(.*?)(\s|$))/g;
	
		    var options = classList.match(fxRegexp);
	
		    var results = options.reduce(function (_results, option) {
		      if (/stagger/.test(option)) {
	
		        var stagger = getStagger(option);
		        _results.stagger = stagger ? stagger : undefined;
		      } else if (/ease/.test(option)) {
		        var ease = getEase(option);
	
		        if (ease) {
		          _results.easing = 'cubic-bezier(' + ease.join() + ')';
		        }
		      } else if (/(speed|dur|duration)/.test(option)) {
		        _results.duration = getDuration(option);
		      }
	
		      return _results;
		      // default to half a second animations
		    }, { duration: .5 });
	
		    return results;
		  };
	
		  /**
		   * helper function to build ngAnimate animation object using $animateCss
		   * @param  {[DOM NODE]} element   the element that will be animated
		   * @param  {[Object]}   animation the object defining the animation, using
		   *                                $animateCss config
		   * @return {[Promise]}           whatver $animateCss returns
		   */
		  var buildAnimation = function buildAnimation(element, animation) {
		    var opts = parseClassList(element);
		    var animateInstructions = (0, _lodashObjectMerge2['default'])(animation, opts);
		    return $animateCss(element, animateInstructions);
		  };
	
		  /**
		   * helper function to buid the `enter`, `leave`, and `move` animation
		   * functions for ngAnimate to consume
		   * @param  {Object} animationConfigs all the animation objects for the
		   *                                     `enter`, `leave`, and `move` events
		   * @return {Object}                  animation object to feed ngAnimate
		   */
		  var createAnimationsForSimilarEvents = function createAnimationsForSimilarEvents(animationConfigs) {
		    return similarEvents.reduce(function (result, event) {
		      var animationConfig = animationConfigs[event];
		      if (animationConfig) {
		        result[event] = function (element, done) {
		          return buildAnimation(element, animationConfig);
		        };
		      }
	
		      return result;
		    }, {});
		  };
	
		  /**
		   * helper function to build `addClass` and `removeClass` animation
		   * functions for ngAnimate to consume
		   * @param  {Object} animationConfigs all the animations for the
		   *                                   `addClass` and `removeClass` events
		   * @return {Object}                  animation object to feed ngAnimate
		   */
		  var createClassAnimations = function createClassAnimations(animationConfigs) {
		    return classEvents.reduce(function (result, event) {
		      var animationConfig = animationConfigs[event];
	
		      if (animationConfig) {
		        result[event] = function (element, className, done) {
		          if (/(addClass|removeClass)/.test(event)) {
		            return buildAnimation(element, animationConfig);
		          } else {
		            done();
		          }
		        };
		      }
	
		      return result;
		    }, {});
		  };
	
		  // expose all for testing purposes
		  return {
		    getStagger: getStagger,
		    getDuration: getDuration,
		    getEase: getEase,
		    parseClassList: parseClassList,
		    buildAnimation: buildAnimation,
		    createAnimationsForSimilarEvents: createAnimationsForSimilarEvents,
		    createClassAnimations: createClassAnimations
		  };
		};
	
		fxHelp.$inject = ['$animateCss'];
		exports.fxHelp = fxHelp;
	
	/***/ },
	/* 82 */
	/***/ function(module, exports, __webpack_require__) {
	
		var arrayCopy = __webpack_require__(24),
		    getLength = __webpack_require__(27),
		    isLength = __webpack_require__(29),
		    values = __webpack_require__(83);
	
		/**
		 * Converts `value` to an array.
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to convert.
		 * @returns {Array} Returns the converted array.
		 * @example
		 *
		 * (function() {
		 *   return _.toArray(arguments).slice(1);
		 * }(1, 2, 3));
		 * // => [2, 3]
		 */
		function toArray(value) {
		  var length = value ? getLength(value) : 0;
		  if (!isLength(length)) {
		    return values(value);
		  }
		  if (!length) {
		    return [];
		  }
		  return arrayCopy(value);
		}
	
		module.exports = toArray;
	
	
	/***/ },
	/* 83 */
	/***/ function(module, exports, __webpack_require__) {
	
		var baseValues = __webpack_require__(84),
		    keys = __webpack_require__(46);
	
		/**
		 * Creates an array of the own enumerable property values of `object`.
		 *
		 * **Note:** Non-object values are coerced to objects.
		 *
		 * @static
		 * @memberOf _
		 * @category Object
		 * @param {Object} object The object to query.
		 * @returns {Array} Returns the array of property values.
		 * @example
		 *
		 * function Foo() {
		 *   this.a = 1;
		 *   this.b = 2;
		 * }
		 *
		 * Foo.prototype.c = 3;
		 *
		 * _.values(new Foo);
		 * // => [1, 2] (iteration order is not guaranteed)
		 *
		 * _.values('hi');
		 * // => ['h', 'i']
		 */
		function values(object) {
		  return baseValues(object, keys(object));
		}
	
		module.exports = values;
	
	
	/***/ },
	/* 84 */
	/***/ function(module, exports) {
	
		/**
		 * The base implementation of `_.values` and `_.valuesIn` which creates an
		 * array of `object` property values corresponding to the property names
		 * of `props`.
		 *
		 * @private
		 * @param {Object} object The object to query.
		 * @param {Array} props The property names to get values for.
		 * @returns {Object} Returns the array of property values.
		 */
		function baseValues(object, props) {
		  var index = -1,
		      length = props.length,
		      result = Array(length);
	
		  while (++index < length) {
		    result[index] = object[props[index]];
		  }
		  return result;
		}
	
		module.exports = baseValues;
	
	
	/***/ },
	/* 85 */
	/***/ function(module, exports) {
	
		"use strict";
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		var curves = {
		  back: {
		    "in": [0.6, -0.28, 0.735, 0.045],
		    out: [0.175, 0.885, 0.32, 1.275],
		    inout: [0.68, -0.55, 0.265, 1.55]
		  },
	
		  expo: {
		    "in": [0.95, 0.05, 0.795, 0.035],
		    out: [0.19, 1, 0.22, 1],
		    inout: [1, 0, 0, 1]
		  },
	
		  circ: {
		    "in": [0.6, 0.04, 0.98, 0.335],
		    out: [0.075, 0.82, 0.165, 1],
		    inout: [0.785, 0.135, 0.15, 0.86]
		  },
	
		  quint: {
		    "in": [0.755, 0.05, 0.855, 0.06],
		    out: [0.23, 1, 0.32, 1],
		    inout: [0.86, 0, 0.07, 1]
		  },
	
		  quart: {
		    "in": [0.895, 0.03, 0.685, 0.22],
		    out: [0.165, 0.84, 0.44, 1],
		    inout: [0.77, 0, 0.175, 1]
		  },
	
		  cubic: {
		    "in": [0.55, 0.055, 0.675, 0.19],
		    out: [0.215, 0.61, 0.355, 1],
		    inout: [0.645, 0.045, 0.355, 1]
		  },
	
		  quad: {
		    "in": [0.55, 0.085, 0.68, 0.53],
		    out: [0.25, 0.46, 0.45, 0.94],
		    inout: [0.455, 0.03, 0.515, 0.955]
		  },
	
		  sine: {
		    "in": [0.47, 0, 0.745, 0.715],
		    out: [0.39, 0.575, 0.565, 1],
		    inout: [0.445, 0.05, 0.55, 0.95]
		  }
		};
		exports.curves = curves;
	
	/***/ },
	/* 86 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var _lodashObjectMerge = __webpack_require__(20);
	
		var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);
	
		/**
		 * factory function to help with the
		 * basics of creating the events animaton
		 * object for $animate to consume
		 * @param  {[Object]} $animateCss part of ngAnimate
		 * @param  {[Object]} $$fx     helper object to assist in getting
		 *                                meta data from the element
		 * @return {[Function]}           function used to pass in animation options from
		 *                                the ngmodule.animation() methods
		 */
		var fxMakeAnimation = function fxMakeAnimation($animateCss, $$fx) {
	
		  /**
		   * takes in different animation objects for each animation event
		   * in ngAnimate. All are optional. The objects are given straight to
		   * $animateCss after the element's classList is parsed for information
		   * about duration and staggering
		   * @param  {[Object]}  enter object describing the enter animation
		   * @param  {[Object]}  leave object describing the leave animation
		   * @param  {[Object]}  move  object describing the move animation
		   * @param  {...[Object]} rest  rest of the objects for the other event type aniamtions
		   * @return {[Object]}          the animation object for ngAnimate to consume
		   */
		  var create = function create(enter, leave, setClass) {
		    var move = (0, _lodashObjectMerge2['default'])({}, enter);
		    var addClass = (0, _lodashObjectMerge2['default'])({}, leave);
		    var removeClass = (0, _lodashObjectMerge2['default'])({}, enter);
	
		    var ngAnimateConsumable = $$fx.createAnimationsForSimilarEvents({ enter: enter, leave: leave, move: move });
	
		    var classConsumables = $$fx.createClassAnimations({ addClass: addClass, removeClass: removeClass });
	
		    ngAnimateConsumable = (0, _lodashObjectMerge2['default'])(ngAnimateConsumable, classConsumables);
	
		    return ngAnimateConsumable;
		  };
	
		  return { create: create };
		};
	
		fxMakeAnimation.$inject = ['$animateCss', '$$fx'];
	
		exports.fxMakeAnimation = fxMakeAnimation;
	
	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(32);
	module.exports = 'ngAnimate';


/***/ },
/* 32 */
/***/ function(module, exports) {

	/**
	 * @license AngularJS v1.5.5
	 * (c) 2010-2016 Google, Inc. http://angularjs.org
	 * License: MIT
	 */
	(function(window, angular) {'use strict';
	
	/* jshint ignore:start */
	var noop        = angular.noop;
	var copy        = angular.copy;
	var extend      = angular.extend;
	var jqLite      = angular.element;
	var forEach     = angular.forEach;
	var isArray     = angular.isArray;
	var isString    = angular.isString;
	var isObject    = angular.isObject;
	var isUndefined = angular.isUndefined;
	var isDefined   = angular.isDefined;
	var isFunction  = angular.isFunction;
	var isElement   = angular.isElement;
	
	var ELEMENT_NODE = 1;
	var COMMENT_NODE = 8;
	
	var ADD_CLASS_SUFFIX = '-add';
	var REMOVE_CLASS_SUFFIX = '-remove';
	var EVENT_CLASS_PREFIX = 'ng-';
	var ACTIVE_CLASS_SUFFIX = '-active';
	var PREPARE_CLASS_SUFFIX = '-prepare';
	
	var NG_ANIMATE_CLASSNAME = 'ng-animate';
	var NG_ANIMATE_CHILDREN_DATA = '$$ngAnimateChildren';
	
	// Detect proper transitionend/animationend event names.
	var CSS_PREFIX = '', TRANSITION_PROP, TRANSITIONEND_EVENT, ANIMATION_PROP, ANIMATIONEND_EVENT;
	
	// If unprefixed events are not supported but webkit-prefixed are, use the latter.
	// Otherwise, just use W3C names, browsers not supporting them at all will just ignore them.
	// Note: Chrome implements `window.onwebkitanimationend` and doesn't implement `window.onanimationend`
	// but at the same time dispatches the `animationend` event and not `webkitAnimationEnd`.
	// Register both events in case `window.onanimationend` is not supported because of that,
	// do the same for `transitionend` as Safari is likely to exhibit similar behavior.
	// Also, the only modern browser that uses vendor prefixes for transitions/keyframes is webkit
	// therefore there is no reason to test anymore for other vendor prefixes:
	// http://caniuse.com/#search=transition
	if (isUndefined(window.ontransitionend) && isDefined(window.onwebkittransitionend)) {
	  CSS_PREFIX = '-webkit-';
	  TRANSITION_PROP = 'WebkitTransition';
	  TRANSITIONEND_EVENT = 'webkitTransitionEnd transitionend';
	} else {
	  TRANSITION_PROP = 'transition';
	  TRANSITIONEND_EVENT = 'transitionend';
	}
	
	if (isUndefined(window.onanimationend) && isDefined(window.onwebkitanimationend)) {
	  CSS_PREFIX = '-webkit-';
	  ANIMATION_PROP = 'WebkitAnimation';
	  ANIMATIONEND_EVENT = 'webkitAnimationEnd animationend';
	} else {
	  ANIMATION_PROP = 'animation';
	  ANIMATIONEND_EVENT = 'animationend';
	}
	
	var DURATION_KEY = 'Duration';
	var PROPERTY_KEY = 'Property';
	var DELAY_KEY = 'Delay';
	var TIMING_KEY = 'TimingFunction';
	var ANIMATION_ITERATION_COUNT_KEY = 'IterationCount';
	var ANIMATION_PLAYSTATE_KEY = 'PlayState';
	var SAFE_FAST_FORWARD_DURATION_VALUE = 9999;
	
	var ANIMATION_DELAY_PROP = ANIMATION_PROP + DELAY_KEY;
	var ANIMATION_DURATION_PROP = ANIMATION_PROP + DURATION_KEY;
	var TRANSITION_DELAY_PROP = TRANSITION_PROP + DELAY_KEY;
	var TRANSITION_DURATION_PROP = TRANSITION_PROP + DURATION_KEY;
	
	var isPromiseLike = function(p) {
	  return p && p.then ? true : false;
	};
	
	var ngMinErr = angular.$$minErr('ng');
	function assertArg(arg, name, reason) {
	  if (!arg) {
	    throw ngMinErr('areq', "Argument '{0}' is {1}", (name || '?'), (reason || "required"));
	  }
	  return arg;
	}
	
	function mergeClasses(a,b) {
	  if (!a && !b) return '';
	  if (!a) return b;
	  if (!b) return a;
	  if (isArray(a)) a = a.join(' ');
	  if (isArray(b)) b = b.join(' ');
	  return a + ' ' + b;
	}
	
	function packageStyles(options) {
	  var styles = {};
	  if (options && (options.to || options.from)) {
	    styles.to = options.to;
	    styles.from = options.from;
	  }
	  return styles;
	}
	
	function pendClasses(classes, fix, isPrefix) {
	  var className = '';
	  classes = isArray(classes)
	      ? classes
	      : classes && isString(classes) && classes.length
	          ? classes.split(/\s+/)
	          : [];
	  forEach(classes, function(klass, i) {
	    if (klass && klass.length > 0) {
	      className += (i > 0) ? ' ' : '';
	      className += isPrefix ? fix + klass
	                            : klass + fix;
	    }
	  });
	  return className;
	}
	
	function removeFromArray(arr, val) {
	  var index = arr.indexOf(val);
	  if (val >= 0) {
	    arr.splice(index, 1);
	  }
	}
	
	function stripCommentsFromElement(element) {
	  if (element instanceof jqLite) {
	    switch (element.length) {
	      case 0:
	        return [];
	        break;
	
	      case 1:
	        // there is no point of stripping anything if the element
	        // is the only element within the jqLite wrapper.
	        // (it's important that we retain the element instance.)
	        if (element[0].nodeType === ELEMENT_NODE) {
	          return element;
	        }
	        break;
	
	      default:
	        return jqLite(extractElementNode(element));
	        break;
	    }
	  }
	
	  if (element.nodeType === ELEMENT_NODE) {
	    return jqLite(element);
	  }
	}
	
	function extractElementNode(element) {
	  if (!element[0]) return element;
	  for (var i = 0; i < element.length; i++) {
	    var elm = element[i];
	    if (elm.nodeType == ELEMENT_NODE) {
	      return elm;
	    }
	  }
	}
	
	function $$addClass($$jqLite, element, className) {
	  forEach(element, function(elm) {
	    $$jqLite.addClass(elm, className);
	  });
	}
	
	function $$removeClass($$jqLite, element, className) {
	  forEach(element, function(elm) {
	    $$jqLite.removeClass(elm, className);
	  });
	}
	
	function applyAnimationClassesFactory($$jqLite) {
	  return function(element, options) {
	    if (options.addClass) {
	      $$addClass($$jqLite, element, options.addClass);
	      options.addClass = null;
	    }
	    if (options.removeClass) {
	      $$removeClass($$jqLite, element, options.removeClass);
	      options.removeClass = null;
	    }
	  }
	}
	
	function prepareAnimationOptions(options) {
	  options = options || {};
	  if (!options.$$prepared) {
	    var domOperation = options.domOperation || noop;
	    options.domOperation = function() {
	      options.$$domOperationFired = true;
	      domOperation();
	      domOperation = noop;
	    };
	    options.$$prepared = true;
	  }
	  return options;
	}
	
	function applyAnimationStyles(element, options) {
	  applyAnimationFromStyles(element, options);
	  applyAnimationToStyles(element, options);
	}
	
	function applyAnimationFromStyles(element, options) {
	  if (options.from) {
	    element.css(options.from);
	    options.from = null;
	  }
	}
	
	function applyAnimationToStyles(element, options) {
	  if (options.to) {
	    element.css(options.to);
	    options.to = null;
	  }
	}
	
	function mergeAnimationDetails(element, oldAnimation, newAnimation) {
	  var target = oldAnimation.options || {};
	  var newOptions = newAnimation.options || {};
	
	  var toAdd = (target.addClass || '') + ' ' + (newOptions.addClass || '');
	  var toRemove = (target.removeClass || '') + ' ' + (newOptions.removeClass || '');
	  var classes = resolveElementClasses(element.attr('class'), toAdd, toRemove);
	
	  if (newOptions.preparationClasses) {
	    target.preparationClasses = concatWithSpace(newOptions.preparationClasses, target.preparationClasses);
	    delete newOptions.preparationClasses;
	  }
	
	  // noop is basically when there is no callback; otherwise something has been set
	  var realDomOperation = target.domOperation !== noop ? target.domOperation : null;
	
	  extend(target, newOptions);
	
	  // TODO(matsko or sreeramu): proper fix is to maintain all animation callback in array and call at last,but now only leave has the callback so no issue with this.
	  if (realDomOperation) {
	    target.domOperation = realDomOperation;
	  }
	
	  if (classes.addClass) {
	    target.addClass = classes.addClass;
	  } else {
	    target.addClass = null;
	  }
	
	  if (classes.removeClass) {
	    target.removeClass = classes.removeClass;
	  } else {
	    target.removeClass = null;
	  }
	
	  oldAnimation.addClass = target.addClass;
	  oldAnimation.removeClass = target.removeClass;
	
	  return target;
	}
	
	function resolveElementClasses(existing, toAdd, toRemove) {
	  var ADD_CLASS = 1;
	  var REMOVE_CLASS = -1;
	
	  var flags = {};
	  existing = splitClassesToLookup(existing);
	
	  toAdd = splitClassesToLookup(toAdd);
	  forEach(toAdd, function(value, key) {
	    flags[key] = ADD_CLASS;
	  });
	
	  toRemove = splitClassesToLookup(toRemove);
	  forEach(toRemove, function(value, key) {
	    flags[key] = flags[key] === ADD_CLASS ? null : REMOVE_CLASS;
	  });
	
	  var classes = {
	    addClass: '',
	    removeClass: ''
	  };
	
	  forEach(flags, function(val, klass) {
	    var prop, allow;
	    if (val === ADD_CLASS) {
	      prop = 'addClass';
	      allow = !existing[klass];
	    } else if (val === REMOVE_CLASS) {
	      prop = 'removeClass';
	      allow = existing[klass];
	    }
	    if (allow) {
	      if (classes[prop].length) {
	        classes[prop] += ' ';
	      }
	      classes[prop] += klass;
	    }
	  });
	
	  function splitClassesToLookup(classes) {
	    if (isString(classes)) {
	      classes = classes.split(' ');
	    }
	
	    var obj = {};
	    forEach(classes, function(klass) {
	      // sometimes the split leaves empty string values
	      // incase extra spaces were applied to the options
	      if (klass.length) {
	        obj[klass] = true;
	      }
	    });
	    return obj;
	  }
	
	  return classes;
	}
	
	function getDomNode(element) {
	  return (element instanceof angular.element) ? element[0] : element;
	}
	
	function applyGeneratedPreparationClasses(element, event, options) {
	  var classes = '';
	  if (event) {
	    classes = pendClasses(event, EVENT_CLASS_PREFIX, true);
	  }
	  if (options.addClass) {
	    classes = concatWithSpace(classes, pendClasses(options.addClass, ADD_CLASS_SUFFIX));
	  }
	  if (options.removeClass) {
	    classes = concatWithSpace(classes, pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX));
	  }
	  if (classes.length) {
	    options.preparationClasses = classes;
	    element.addClass(classes);
	  }
	}
	
	function clearGeneratedClasses(element, options) {
	  if (options.preparationClasses) {
	    element.removeClass(options.preparationClasses);
	    options.preparationClasses = null;
	  }
	  if (options.activeClasses) {
	    element.removeClass(options.activeClasses);
	    options.activeClasses = null;
	  }
	}
	
	function blockTransitions(node, duration) {
	  // we use a negative delay value since it performs blocking
	  // yet it doesn't kill any existing transitions running on the
	  // same element which makes this safe for class-based animations
	  var value = duration ? '-' + duration + 's' : '';
	  applyInlineStyle(node, [TRANSITION_DELAY_PROP, value]);
	  return [TRANSITION_DELAY_PROP, value];
	}
	
	function blockKeyframeAnimations(node, applyBlock) {
	  var value = applyBlock ? 'paused' : '';
	  var key = ANIMATION_PROP + ANIMATION_PLAYSTATE_KEY;
	  applyInlineStyle(node, [key, value]);
	  return [key, value];
	}
	
	function applyInlineStyle(node, styleTuple) {
	  var prop = styleTuple[0];
	  var value = styleTuple[1];
	  node.style[prop] = value;
	}
	
	function concatWithSpace(a,b) {
	  if (!a) return b;
	  if (!b) return a;
	  return a + ' ' + b;
	}
	
	var $$rAFSchedulerFactory = ['$$rAF', function($$rAF) {
	  var queue, cancelFn;
	
	  function scheduler(tasks) {
	    // we make a copy since RAFScheduler mutates the state
	    // of the passed in array variable and this would be difficult
	    // to track down on the outside code
	    queue = queue.concat(tasks);
	    nextTick();
	  }
	
	  queue = scheduler.queue = [];
	
	  /* waitUntilQuiet does two things:
	   * 1. It will run the FINAL `fn` value only when an uncanceled RAF has passed through
	   * 2. It will delay the next wave of tasks from running until the quiet `fn` has run.
	   *
	   * The motivation here is that animation code can request more time from the scheduler
	   * before the next wave runs. This allows for certain DOM properties such as classes to
	   * be resolved in time for the next animation to run.
	   */
	  scheduler.waitUntilQuiet = function(fn) {
	    if (cancelFn) cancelFn();
	
	    cancelFn = $$rAF(function() {
	      cancelFn = null;
	      fn();
	      nextTick();
	    });
	  };
	
	  return scheduler;
	
	  function nextTick() {
	    if (!queue.length) return;
	
	    var items = queue.shift();
	    for (var i = 0; i < items.length; i++) {
	      items[i]();
	    }
	
	    if (!cancelFn) {
	      $$rAF(function() {
	        if (!cancelFn) nextTick();
	      });
	    }
	  }
	}];
	
	/**
	 * @ngdoc directive
	 * @name ngAnimateChildren
	 * @restrict AE
	 * @element ANY
	 *
	 * @description
	 *
	 * ngAnimateChildren allows you to specify that children of this element should animate even if any
	 * of the children's parents are currently animating. By default, when an element has an active `enter`, `leave`, or `move`
	 * (structural) animation, child elements that also have an active structural animation are not animated.
	 *
	 * Note that even if `ngAnimteChildren` is set, no child animations will run when the parent element is removed from the DOM (`leave` animation).
	 *
	 *
	 * @param {string} ngAnimateChildren If the value is empty, `true` or `on`,
	 *     then child animations are allowed. If the value is `false`, child animations are not allowed.
	 *
	 * @example
	 * <example module="ngAnimateChildren" name="ngAnimateChildren" deps="angular-animate.js" animations="true">
	     <file name="index.html">
	       <div ng-controller="mainController as main">
	         <label>Show container? <input type="checkbox" ng-model="main.enterElement" /></label>
	         <label>Animate children? <input type="checkbox" ng-model="main.animateChildren" /></label>
	         <hr>
	         <div ng-animate-children="{{main.animateChildren}}">
	           <div ng-if="main.enterElement" class="container">
	             List of items:
	             <div ng-repeat="item in [0, 1, 2, 3]" class="item">Item {{item}}</div>
	           </div>
	         </div>
	       </div>
	     </file>
	     <file name="animations.css">
	
	      .container.ng-enter,
	      .container.ng-leave {
	        transition: all ease 1.5s;
	      }
	
	      .container.ng-enter,
	      .container.ng-leave-active {
	        opacity: 0;
	      }
	
	      .container.ng-leave,
	      .container.ng-enter-active {
	        opacity: 1;
	      }
	
	      .item {
	        background: firebrick;
	        color: #FFF;
	        margin-bottom: 10px;
	      }
	
	      .item.ng-enter,
	      .item.ng-leave {
	        transition: transform 1.5s ease;
	      }
	
	      .item.ng-enter {
	        transform: translateX(50px);
	      }
	
	      .item.ng-enter-active {
	        transform: translateX(0);
	      }
	    </file>
	    <file name="script.js">
	      angular.module('ngAnimateChildren', ['ngAnimate'])
	        .controller('mainController', function() {
	          this.animateChildren = false;
	          this.enterElement = false;
	        });
	    </file>
	  </example>
	 */
	var $$AnimateChildrenDirective = ['$interpolate', function($interpolate) {
	  return {
	    link: function(scope, element, attrs) {
	      var val = attrs.ngAnimateChildren;
	      if (angular.isString(val) && val.length === 0) { //empty attribute
	        element.data(NG_ANIMATE_CHILDREN_DATA, true);
	      } else {
	        // Interpolate and set the value, so that it is available to
	        // animations that run right after compilation
	        setData($interpolate(val)(scope));
	        attrs.$observe('ngAnimateChildren', setData);
	      }
	
	      function setData(value) {
	        value = value === 'on' || value === 'true';
	        element.data(NG_ANIMATE_CHILDREN_DATA, value);
	      }
	    }
	  };
	}];
	
	var ANIMATE_TIMER_KEY = '$$animateCss';
	
	/**
	 * @ngdoc service
	 * @name $animateCss
	 * @kind object
	 *
	 * @description
	 * The `$animateCss` service is a useful utility to trigger customized CSS-based transitions/keyframes
	 * from a JavaScript-based animation or directly from a directive. The purpose of `$animateCss` is NOT
	 * to side-step how `$animate` and ngAnimate work, but the goal is to allow pre-existing animations or
	 * directives to create more complex animations that can be purely driven using CSS code.
	 *
	 * Note that only browsers that support CSS transitions and/or keyframe animations are capable of
	 * rendering animations triggered via `$animateCss` (bad news for IE9 and lower).
	 *
	 * ## Usage
	 * Once again, `$animateCss` is designed to be used inside of a registered JavaScript animation that
	 * is powered by ngAnimate. It is possible to use `$animateCss` directly inside of a directive, however,
	 * any automatic control over cancelling animations and/or preventing animations from being run on
	 * child elements will not be handled by Angular. For this to work as expected, please use `$animate` to
	 * trigger the animation and then setup a JavaScript animation that injects `$animateCss` to trigger
	 * the CSS animation.
	 *
	 * The example below shows how we can create a folding animation on an element using `ng-if`:
	 *
	 * ```html
	 * <!-- notice the `fold-animation` CSS class -->
	 * <div ng-if="onOff" class="fold-animation">
	 *   This element will go BOOM
	 * </div>
	 * <button ng-click="onOff=true">Fold In</button>
	 * ```
	 *
	 * Now we create the **JavaScript animation** that will trigger the CSS transition:
	 *
	 * ```js
	 * ngModule.animation('.fold-animation', ['$animateCss', function($animateCss) {
	 *   return {
	 *     enter: function(element, doneFn) {
	 *       var height = element[0].offsetHeight;
	 *       return $animateCss(element, {
	 *         from: { height:'0px' },
	 *         to: { height:height + 'px' },
	 *         duration: 1 // one second
	 *       });
	 *     }
	 *   }
	 * }]);
	 * ```
	 *
	 * ## More Advanced Uses
	 *
	 * `$animateCss` is the underlying code that ngAnimate uses to power **CSS-based animations** behind the scenes. Therefore CSS hooks
	 * like `.ng-EVENT`, `.ng-EVENT-active`, `.ng-EVENT-stagger` are all features that can be triggered using `$animateCss` via JavaScript code.
	 *
	 * This also means that just about any combination of adding classes, removing classes, setting styles, dynamically setting a keyframe animation,
	 * applying a hardcoded duration or delay value, changing the animation easing or applying a stagger animation are all options that work with
	 * `$animateCss`. The service itself is smart enough to figure out the combination of options and examine the element styling properties in order
	 * to provide a working animation that will run in CSS.
	 *
	 * The example below showcases a more advanced version of the `.fold-animation` from the example above:
	 *
	 * ```js
	 * ngModule.animation('.fold-animation', ['$animateCss', function($animateCss) {
	 *   return {
	 *     enter: function(element, doneFn) {
	 *       var height = element[0].offsetHeight;
	 *       return $animateCss(element, {
	 *         addClass: 'red large-text pulse-twice',
	 *         easing: 'ease-out',
	 *         from: { height:'0px' },
	 *         to: { height:height + 'px' },
	 *         duration: 1 // one second
	 *       });
	 *     }
	 *   }
	 * }]);
	 * ```
	 *
	 * Since we're adding/removing CSS classes then the CSS transition will also pick those up:
	 *
	 * ```css
	 * /&#42; since a hardcoded duration value of 1 was provided in the JavaScript animation code,
	 * the CSS classes below will be transitioned despite them being defined as regular CSS classes &#42;/
	 * .red { background:red; }
	 * .large-text { font-size:20px; }
	 *
	 * /&#42; we can also use a keyframe animation and $animateCss will make it work alongside the transition &#42;/
	 * .pulse-twice {
	 *   animation: 0.5s pulse linear 2;
	 *   -webkit-animation: 0.5s pulse linear 2;
	 * }
	 *
	 * @keyframes pulse {
	 *   from { transform: scale(0.5); }
	 *   to { transform: scale(1.5); }
	 * }
	 *
	 * @-webkit-keyframes pulse {
	 *   from { -webkit-transform: scale(0.5); }
	 *   to { -webkit-transform: scale(1.5); }
	 * }
	 * ```
	 *
	 * Given this complex combination of CSS classes, styles and options, `$animateCss` will figure everything out and make the animation happen.
	 *
	 * ## How the Options are handled
	 *
	 * `$animateCss` is very versatile and intelligent when it comes to figuring out what configurations to apply to the element to ensure the animation
	 * works with the options provided. Say for example we were adding a class that contained a keyframe value and we wanted to also animate some inline
	 * styles using the `from` and `to` properties.
	 *
	 * ```js
	 * var animator = $animateCss(element, {
	 *   from: { background:'red' },
	 *   to: { background:'blue' }
	 * });
	 * animator.start();
	 * ```
	 *
	 * ```css
	 * .rotating-animation {
	 *   animation:0.5s rotate linear;
	 *   -webkit-animation:0.5s rotate linear;
	 * }
	 *
	 * @keyframes rotate {
	 *   from { transform: rotate(0deg); }
	 *   to { transform: rotate(360deg); }
	 * }
	 *
	 * @-webkit-keyframes rotate {
	 *   from { -webkit-transform: rotate(0deg); }
	 *   to { -webkit-transform: rotate(360deg); }
	 * }
	 * ```
	 *
	 * The missing pieces here are that we do not have a transition set (within the CSS code nor within the `$animateCss` options) and the duration of the animation is
	 * going to be detected from what the keyframe styles on the CSS class are. In this event, `$animateCss` will automatically create an inline transition
	 * style matching the duration detected from the keyframe style (which is present in the CSS class that is being added) and then prepare both the transition
	 * and keyframe animations to run in parallel on the element. Then when the animation is underway the provided `from` and `to` CSS styles will be applied
	 * and spread across the transition and keyframe animation.
	 *
	 * ## What is returned
	 *
	 * `$animateCss` works in two stages: a preparation phase and an animation phase. Therefore when `$animateCss` is first called it will NOT actually
	 * start the animation. All that is going on here is that the element is being prepared for the animation (which means that the generated CSS classes are
	 * added and removed on the element). Once `$animateCss` is called it will return an object with the following properties:
	 *
	 * ```js
	 * var animator = $animateCss(element, { ... });
	 * ```
	 *
	 * Now what do the contents of our `animator` variable look like:
	 *
	 * ```js
	 * {
	 *   // starts the animation
	 *   start: Function,
	 *
	 *   // ends (aborts) the animation
	 *   end: Function
	 * }
	 * ```
	 *
	 * To actually start the animation we need to run `animation.start()` which will then return a promise that we can hook into to detect when the animation ends.
	 * If we choose not to run the animation then we MUST run `animation.end()` to perform a cleanup on the element (since some CSS classes and styles may have been
	 * applied to the element during the preparation phase). Note that all other properties such as duration, delay, transitions and keyframes are just properties
	 * and that changing them will not reconfigure the parameters of the animation.
	 *
	 * ### runner.done() vs runner.then()
	 * It is documented that `animation.start()` will return a promise object and this is true, however, there is also an additional method available on the
	 * runner called `.done(callbackFn)`. The done method works the same as `.finally(callbackFn)`, however, it does **not trigger a digest to occur**.
	 * Therefore, for performance reasons, it's always best to use `runner.done(callback)` instead of `runner.then()`, `runner.catch()` or `runner.finally()`
	 * unless you really need a digest to kick off afterwards.
	 *
	 * Keep in mind that, to make this easier, ngAnimate has tweaked the JS animations API to recognize when a runner instance is returned from $animateCss
	 * (so there is no need to call `runner.done(doneFn)` inside of your JavaScript animation code).
	 * Check the {@link ngAnimate.$animateCss#usage animation code above} to see how this works.
	 *
	 * @param {DOMElement} element the element that will be animated
	 * @param {object} options the animation-related options that will be applied during the animation
	 *
	 * * `event` - The DOM event (e.g. enter, leave, move). When used, a generated CSS class of `ng-EVENT` and `ng-EVENT-active` will be applied
	 * to the element during the animation. Multiple events can be provided when spaces are used as a separator. (Note that this will not perform any DOM operation.)
	 * * `structural` - Indicates that the `ng-` prefix will be added to the event class. Setting to `false` or omitting will turn `ng-EVENT` and
	 * `ng-EVENT-active` in `EVENT` and `EVENT-active`. Unused if `event` is omitted.
	 * * `easing` - The CSS easing value that will be applied to the transition or keyframe animation (or both).
	 * * `transitionStyle` - The raw CSS transition style that will be used (e.g. `1s linear all`).
	 * * `keyframeStyle` - The raw CSS keyframe animation style that will be used (e.g. `1s my_animation linear`).
	 * * `from` - The starting CSS styles (a key/value object) that will be applied at the start of the animation.
	 * * `to` - The ending CSS styles (a key/value object) that will be applied across the animation via a CSS transition.
	 * * `addClass` - A space separated list of CSS classes that will be added to the element and spread across the animation.
	 * * `removeClass` - A space separated list of CSS classes that will be removed from the element and spread across the animation.
	 * * `duration` - A number value representing the total duration of the transition and/or keyframe (note that a value of 1 is 1000ms). If a value of `0`
	 * is provided then the animation will be skipped entirely.
	 * * `delay` - A number value representing the total delay of the transition and/or keyframe (note that a value of 1 is 1000ms). If a value of `true` is
	 * used then whatever delay value is detected from the CSS classes will be mirrored on the elements styles (e.g. by setting delay true then the style value
	 * of the element will be `transition-delay: DETECTED_VALUE`). Using `true` is useful when you want the CSS classes and inline styles to all share the same
	 * CSS delay value.
	 * * `stagger` - A numeric time value representing the delay between successively animated elements
	 * ({@link ngAnimate#css-staggering-animations Click here to learn how CSS-based staggering works in ngAnimate.})
	 * * `staggerIndex` - The numeric index representing the stagger item (e.g. a value of 5 is equal to the sixth item in the stagger; therefore when a
	 *   `stagger` option value of `0.1` is used then there will be a stagger delay of `600ms`)
	 * * `applyClassesEarly` - Whether or not the classes being added or removed will be used when detecting the animation. This is set by `$animate` when enter/leave/move animations are fired to ensure that the CSS classes are resolved in time. (Note that this will prevent any transitions from occurring on the classes being added and removed.)
	 * * `cleanupStyles` - Whether or not the provided `from` and `to` styles will be removed once
	 *    the animation is closed. This is useful for when the styles are used purely for the sake of
	 *    the animation and do not have a lasting visual effect on the element (e.g. a collapse and open animation).
	 *    By default this value is set to `false`.
	 *
	 * @return {object} an object with start and end methods and details about the animation.
	 *
	 * * `start` - The method to start the animation. This will return a `Promise` when called.
	 * * `end` - This method will cancel the animation and remove all applied CSS classes and styles.
	 */
	var ONE_SECOND = 1000;
	var BASE_TEN = 10;
	
	var ELAPSED_TIME_MAX_DECIMAL_PLACES = 3;
	var CLOSING_TIME_BUFFER = 1.5;
	
	var DETECT_CSS_PROPERTIES = {
	  transitionDuration:      TRANSITION_DURATION_PROP,
	  transitionDelay:         TRANSITION_DELAY_PROP,
	  transitionProperty:      TRANSITION_PROP + PROPERTY_KEY,
	  animationDuration:       ANIMATION_DURATION_PROP,
	  animationDelay:          ANIMATION_DELAY_PROP,
	  animationIterationCount: ANIMATION_PROP + ANIMATION_ITERATION_COUNT_KEY
	};
	
	var DETECT_STAGGER_CSS_PROPERTIES = {
	  transitionDuration:      TRANSITION_DURATION_PROP,
	  transitionDelay:         TRANSITION_DELAY_PROP,
	  animationDuration:       ANIMATION_DURATION_PROP,
	  animationDelay:          ANIMATION_DELAY_PROP
	};
	
	function getCssKeyframeDurationStyle(duration) {
	  return [ANIMATION_DURATION_PROP, duration + 's'];
	}
	
	function getCssDelayStyle(delay, isKeyframeAnimation) {
	  var prop = isKeyframeAnimation ? ANIMATION_DELAY_PROP : TRANSITION_DELAY_PROP;
	  return [prop, delay + 's'];
	}
	
	function computeCssStyles($window, element, properties) {
	  var styles = Object.create(null);
	  var detectedStyles = $window.getComputedStyle(element) || {};
	  forEach(properties, function(formalStyleName, actualStyleName) {
	    var val = detectedStyles[formalStyleName];
	    if (val) {
	      var c = val.charAt(0);
	
	      // only numerical-based values have a negative sign or digit as the first value
	      if (c === '-' || c === '+' || c >= 0) {
	        val = parseMaxTime(val);
	      }
	
	      // by setting this to null in the event that the delay is not set or is set directly as 0
	      // then we can still allow for negative values to be used later on and not mistake this
	      // value for being greater than any other negative value.
	      if (val === 0) {
	        val = null;
	      }
	      styles[actualStyleName] = val;
	    }
	  });
	
	  return styles;
	}
	
	function parseMaxTime(str) {
	  var maxValue = 0;
	  var values = str.split(/\s*,\s*/);
	  forEach(values, function(value) {
	    // it's always safe to consider only second values and omit `ms` values since
	    // getComputedStyle will always handle the conversion for us
	    if (value.charAt(value.length - 1) == 's') {
	      value = value.substring(0, value.length - 1);
	    }
	    value = parseFloat(value) || 0;
	    maxValue = maxValue ? Math.max(value, maxValue) : value;
	  });
	  return maxValue;
	}
	
	function truthyTimingValue(val) {
	  return val === 0 || val != null;
	}
	
	function getCssTransitionDurationStyle(duration, applyOnlyDuration) {
	  var style = TRANSITION_PROP;
	  var value = duration + 's';
	  if (applyOnlyDuration) {
	    style += DURATION_KEY;
	  } else {
	    value += ' linear all';
	  }
	  return [style, value];
	}
	
	function createLocalCacheLookup() {
	  var cache = Object.create(null);
	  return {
	    flush: function() {
	      cache = Object.create(null);
	    },
	
	    count: function(key) {
	      var entry = cache[key];
	      return entry ? entry.total : 0;
	    },
	
	    get: function(key) {
	      var entry = cache[key];
	      return entry && entry.value;
	    },
	
	    put: function(key, value) {
	      if (!cache[key]) {
	        cache[key] = { total: 1, value: value };
	      } else {
	        cache[key].total++;
	      }
	    }
	  };
	}
	
	// we do not reassign an already present style value since
	// if we detect the style property value again we may be
	// detecting styles that were added via the `from` styles.
	// We make use of `isDefined` here since an empty string
	// or null value (which is what getPropertyValue will return
	// for a non-existing style) will still be marked as a valid
	// value for the style (a falsy value implies that the style
	// is to be removed at the end of the animation). If we had a simple
	// "OR" statement then it would not be enough to catch that.
	function registerRestorableStyles(backup, node, properties) {
	  forEach(properties, function(prop) {
	    backup[prop] = isDefined(backup[prop])
	        ? backup[prop]
	        : node.style.getPropertyValue(prop);
	  });
	}
	
	var $AnimateCssProvider = ['$animateProvider', function($animateProvider) {
	  var gcsLookup = createLocalCacheLookup();
	  var gcsStaggerLookup = createLocalCacheLookup();
	
	  this.$get = ['$window', '$$jqLite', '$$AnimateRunner', '$timeout',
	               '$$forceReflow', '$sniffer', '$$rAFScheduler', '$$animateQueue',
	       function($window,   $$jqLite,   $$AnimateRunner,   $timeout,
	                $$forceReflow,   $sniffer,   $$rAFScheduler, $$animateQueue) {
	
	    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
	
	    var parentCounter = 0;
	    function gcsHashFn(node, extraClasses) {
	      var KEY = "$$ngAnimateParentKey";
	      var parentNode = node.parentNode;
	      var parentID = parentNode[KEY] || (parentNode[KEY] = ++parentCounter);
	      return parentID + '-' + node.getAttribute('class') + '-' + extraClasses;
	    }
	
	    function computeCachedCssStyles(node, className, cacheKey, properties) {
	      var timings = gcsLookup.get(cacheKey);
	
	      if (!timings) {
	        timings = computeCssStyles($window, node, properties);
	        if (timings.animationIterationCount === 'infinite') {
	          timings.animationIterationCount = 1;
	        }
	      }
	
	      // we keep putting this in multiple times even though the value and the cacheKey are the same
	      // because we're keeping an internal tally of how many duplicate animations are detected.
	      gcsLookup.put(cacheKey, timings);
	      return timings;
	    }
	
	    function computeCachedCssStaggerStyles(node, className, cacheKey, properties) {
	      var stagger;
	
	      // if we have one or more existing matches of matching elements
	      // containing the same parent + CSS styles (which is how cacheKey works)
	      // then staggering is possible
	      if (gcsLookup.count(cacheKey) > 0) {
	        stagger = gcsStaggerLookup.get(cacheKey);
	
	        if (!stagger) {
	          var staggerClassName = pendClasses(className, '-stagger');
	
	          $$jqLite.addClass(node, staggerClassName);
	
	          stagger = computeCssStyles($window, node, properties);
	
	          // force the conversion of a null value to zero incase not set
	          stagger.animationDuration = Math.max(stagger.animationDuration, 0);
	          stagger.transitionDuration = Math.max(stagger.transitionDuration, 0);
	
	          $$jqLite.removeClass(node, staggerClassName);
	
	          gcsStaggerLookup.put(cacheKey, stagger);
	        }
	      }
	
	      return stagger || {};
	    }
	
	    var cancelLastRAFRequest;
	    var rafWaitQueue = [];
	    function waitUntilQuiet(callback) {
	      rafWaitQueue.push(callback);
	      $$rAFScheduler.waitUntilQuiet(function() {
	        gcsLookup.flush();
	        gcsStaggerLookup.flush();
	
	        // DO NOT REMOVE THIS LINE OR REFACTOR OUT THE `pageWidth` variable.
	        // PLEASE EXAMINE THE `$$forceReflow` service to understand why.
	        var pageWidth = $$forceReflow();
	
	        // we use a for loop to ensure that if the queue is changed
	        // during this looping then it will consider new requests
	        for (var i = 0; i < rafWaitQueue.length; i++) {
	          rafWaitQueue[i](pageWidth);
	        }
	        rafWaitQueue.length = 0;
	      });
	    }
	
	    function computeTimings(node, className, cacheKey) {
	      var timings = computeCachedCssStyles(node, className, cacheKey, DETECT_CSS_PROPERTIES);
	      var aD = timings.animationDelay;
	      var tD = timings.transitionDelay;
	      timings.maxDelay = aD && tD
	          ? Math.max(aD, tD)
	          : (aD || tD);
	      timings.maxDuration = Math.max(
	          timings.animationDuration * timings.animationIterationCount,
	          timings.transitionDuration);
	
	      return timings;
	    }
	
	    return function init(element, initialOptions) {
	      // all of the animation functions should create
	      // a copy of the options data, however, if a
	      // parent service has already created a copy then
	      // we should stick to using that
	      var options = initialOptions || {};
	      if (!options.$$prepared) {
	        options = prepareAnimationOptions(copy(options));
	      }
	
	      var restoreStyles = {};
	      var node = getDomNode(element);
	      if (!node
	          || !node.parentNode
	          || !$$animateQueue.enabled()) {
	        return closeAndReturnNoopAnimator();
	      }
	
	      var temporaryStyles = [];
	      var classes = element.attr('class');
	      var styles = packageStyles(options);
	      var animationClosed;
	      var animationPaused;
	      var animationCompleted;
	      var runner;
	      var runnerHost;
	      var maxDelay;
	      var maxDelayTime;
	      var maxDuration;
	      var maxDurationTime;
	      var startTime;
	      var events = [];
	
	      if (options.duration === 0 || (!$sniffer.animations && !$sniffer.transitions)) {
	        return closeAndReturnNoopAnimator();
	      }
	
	      var method = options.event && isArray(options.event)
	            ? options.event.join(' ')
	            : options.event;
	
	      var isStructural = method && options.structural;
	      var structuralClassName = '';
	      var addRemoveClassName = '';
	
	      if (isStructural) {
	        structuralClassName = pendClasses(method, EVENT_CLASS_PREFIX, true);
	      } else if (method) {
	        structuralClassName = method;
	      }
	
	      if (options.addClass) {
	        addRemoveClassName += pendClasses(options.addClass, ADD_CLASS_SUFFIX);
	      }
	
	      if (options.removeClass) {
	        if (addRemoveClassName.length) {
	          addRemoveClassName += ' ';
	        }
	        addRemoveClassName += pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX);
	      }
	
	      // there may be a situation where a structural animation is combined together
	      // with CSS classes that need to resolve before the animation is computed.
	      // However this means that there is no explicit CSS code to block the animation
	      // from happening (by setting 0s none in the class name). If this is the case
	      // we need to apply the classes before the first rAF so we know to continue if
	      // there actually is a detected transition or keyframe animation
	      if (options.applyClassesEarly && addRemoveClassName.length) {
	        applyAnimationClasses(element, options);
	      }
	
	      var preparationClasses = [structuralClassName, addRemoveClassName].join(' ').trim();
	      var fullClassName = classes + ' ' + preparationClasses;
	      var activeClasses = pendClasses(preparationClasses, ACTIVE_CLASS_SUFFIX);
	      var hasToStyles = styles.to && Object.keys(styles.to).length > 0;
	      var containsKeyframeAnimation = (options.keyframeStyle || '').length > 0;
	
	      // there is no way we can trigger an animation if no styles and
	      // no classes are being applied which would then trigger a transition,
	      // unless there a is raw keyframe value that is applied to the element.
	      if (!containsKeyframeAnimation
	           && !hasToStyles
	           && !preparationClasses) {
	        return closeAndReturnNoopAnimator();
	      }
	
	      var cacheKey, stagger;
	      if (options.stagger > 0) {
	        var staggerVal = parseFloat(options.stagger);
	        stagger = {
	          transitionDelay: staggerVal,
	          animationDelay: staggerVal,
	          transitionDuration: 0,
	          animationDuration: 0
	        };
	      } else {
	        cacheKey = gcsHashFn(node, fullClassName);
	        stagger = computeCachedCssStaggerStyles(node, preparationClasses, cacheKey, DETECT_STAGGER_CSS_PROPERTIES);
	      }
	
	      if (!options.$$skipPreparationClasses) {
	        $$jqLite.addClass(element, preparationClasses);
	      }
	
	      var applyOnlyDuration;
	
	      if (options.transitionStyle) {
	        var transitionStyle = [TRANSITION_PROP, options.transitionStyle];
	        applyInlineStyle(node, transitionStyle);
	        temporaryStyles.push(transitionStyle);
	      }
	
	      if (options.duration >= 0) {
	        applyOnlyDuration = node.style[TRANSITION_PROP].length > 0;
	        var durationStyle = getCssTransitionDurationStyle(options.duration, applyOnlyDuration);
	
	        // we set the duration so that it will be picked up by getComputedStyle later
	        applyInlineStyle(node, durationStyle);
	        temporaryStyles.push(durationStyle);
	      }
	
	      if (options.keyframeStyle) {
	        var keyframeStyle = [ANIMATION_PROP, options.keyframeStyle];
	        applyInlineStyle(node, keyframeStyle);
	        temporaryStyles.push(keyframeStyle);
	      }
	
	      var itemIndex = stagger
	          ? options.staggerIndex >= 0
	              ? options.staggerIndex
	              : gcsLookup.count(cacheKey)
	          : 0;
	
	      var isFirst = itemIndex === 0;
	
	      // this is a pre-emptive way of forcing the setup classes to be added and applied INSTANTLY
	      // without causing any combination of transitions to kick in. By adding a negative delay value
	      // it forces the setup class' transition to end immediately. We later then remove the negative
	      // transition delay to allow for the transition to naturally do it's thing. The beauty here is
	      // that if there is no transition defined then nothing will happen and this will also allow
	      // other transitions to be stacked on top of each other without any chopping them out.
	      if (isFirst && !options.skipBlocking) {
	        blockTransitions(node, SAFE_FAST_FORWARD_DURATION_VALUE);
	      }
	
	      var timings = computeTimings(node, fullClassName, cacheKey);
	      var relativeDelay = timings.maxDelay;
	      maxDelay = Math.max(relativeDelay, 0);
	      maxDuration = timings.maxDuration;
	
	      var flags = {};
	      flags.hasTransitions          = timings.transitionDuration > 0;
	      flags.hasAnimations           = timings.animationDuration > 0;
	      flags.hasTransitionAll        = flags.hasTransitions && timings.transitionProperty == 'all';
	      flags.applyTransitionDuration = hasToStyles && (
	                                        (flags.hasTransitions && !flags.hasTransitionAll)
	                                         || (flags.hasAnimations && !flags.hasTransitions));
	      flags.applyAnimationDuration  = options.duration && flags.hasAnimations;
	      flags.applyTransitionDelay    = truthyTimingValue(options.delay) && (flags.applyTransitionDuration || flags.hasTransitions);
	      flags.applyAnimationDelay     = truthyTimingValue(options.delay) && flags.hasAnimations;
	      flags.recalculateTimingStyles = addRemoveClassName.length > 0;
	
	      if (flags.applyTransitionDuration || flags.applyAnimationDuration) {
	        maxDuration = options.duration ? parseFloat(options.duration) : maxDuration;
	
	        if (flags.applyTransitionDuration) {
	          flags.hasTransitions = true;
	          timings.transitionDuration = maxDuration;
	          applyOnlyDuration = node.style[TRANSITION_PROP + PROPERTY_KEY].length > 0;
	          temporaryStyles.push(getCssTransitionDurationStyle(maxDuration, applyOnlyDuration));
	        }
	
	        if (flags.applyAnimationDuration) {
	          flags.hasAnimations = true;
	          timings.animationDuration = maxDuration;
	          temporaryStyles.push(getCssKeyframeDurationStyle(maxDuration));
	        }
	      }
	
	      if (maxDuration === 0 && !flags.recalculateTimingStyles) {
	        return closeAndReturnNoopAnimator();
	      }
	
	      if (options.delay != null) {
	        var delayStyle;
	        if (typeof options.delay !== "boolean") {
	          delayStyle = parseFloat(options.delay);
	          // number in options.delay means we have to recalculate the delay for the closing timeout
	          maxDelay = Math.max(delayStyle, 0);
	        }
	
	        if (flags.applyTransitionDelay) {
	          temporaryStyles.push(getCssDelayStyle(delayStyle));
	        }
	
	        if (flags.applyAnimationDelay) {
	          temporaryStyles.push(getCssDelayStyle(delayStyle, true));
	        }
	      }
	
	      // we need to recalculate the delay value since we used a pre-emptive negative
	      // delay value and the delay value is required for the final event checking. This
	      // property will ensure that this will happen after the RAF phase has passed.
	      if (options.duration == null && timings.transitionDuration > 0) {
	        flags.recalculateTimingStyles = flags.recalculateTimingStyles || isFirst;
	      }
	
	      maxDelayTime = maxDelay * ONE_SECOND;
	      maxDurationTime = maxDuration * ONE_SECOND;
	      if (!options.skipBlocking) {
	        flags.blockTransition = timings.transitionDuration > 0;
	        flags.blockKeyframeAnimation = timings.animationDuration > 0 &&
	                                       stagger.animationDelay > 0 &&
	                                       stagger.animationDuration === 0;
	      }
	
	      if (options.from) {
	        if (options.cleanupStyles) {
	          registerRestorableStyles(restoreStyles, node, Object.keys(options.from));
	        }
	        applyAnimationFromStyles(element, options);
	      }
	
	      if (flags.blockTransition || flags.blockKeyframeAnimation) {
	        applyBlocking(maxDuration);
	      } else if (!options.skipBlocking) {
	        blockTransitions(node, false);
	      }
	
	      // TODO(matsko): for 1.5 change this code to have an animator object for better debugging
	      return {
	        $$willAnimate: true,
	        end: endFn,
	        start: function() {
	          if (animationClosed) return;
	
	          runnerHost = {
	            end: endFn,
	            cancel: cancelFn,
	            resume: null, //this will be set during the start() phase
	            pause: null
	          };
	
	          runner = new $$AnimateRunner(runnerHost);
	
	          waitUntilQuiet(start);
	
	          // we don't have access to pause/resume the animation
	          // since it hasn't run yet. AnimateRunner will therefore
	          // set noop functions for resume and pause and they will
	          // later be overridden once the animation is triggered
	          return runner;
	        }
	      };
	
	      function endFn() {
	        close();
	      }
	
	      function cancelFn() {
	        close(true);
	      }
	
	      function close(rejected) { // jshint ignore:line
	        // if the promise has been called already then we shouldn't close
	        // the animation again
	        if (animationClosed || (animationCompleted && animationPaused)) return;
	        animationClosed = true;
	        animationPaused = false;
	
	        if (!options.$$skipPreparationClasses) {
	          $$jqLite.removeClass(element, preparationClasses);
	        }
	        $$jqLite.removeClass(element, activeClasses);
	
	        blockKeyframeAnimations(node, false);
	        blockTransitions(node, false);
	
	        forEach(temporaryStyles, function(entry) {
	          // There is only one way to remove inline style properties entirely from elements.
	          // By using `removeProperty` this works, but we need to convert camel-cased CSS
	          // styles down to hyphenated values.
	          node.style[entry[0]] = '';
	        });
	
	        applyAnimationClasses(element, options);
	        applyAnimationStyles(element, options);
	
	        if (Object.keys(restoreStyles).length) {
	          forEach(restoreStyles, function(value, prop) {
	            value ? node.style.setProperty(prop, value)
	                  : node.style.removeProperty(prop);
	          });
	        }
	
	        // the reason why we have this option is to allow a synchronous closing callback
	        // that is fired as SOON as the animation ends (when the CSS is removed) or if
	        // the animation never takes off at all. A good example is a leave animation since
	        // the element must be removed just after the animation is over or else the element
	        // will appear on screen for one animation frame causing an overbearing flicker.
	        if (options.onDone) {
	          options.onDone();
	        }
	
	        if (events && events.length) {
	          // Remove the transitionend / animationend listener(s)
	          element.off(events.join(' '), onAnimationProgress);
	        }
	
	        //Cancel the fallback closing timeout and remove the timer data
	        var animationTimerData = element.data(ANIMATE_TIMER_KEY);
	        if (animationTimerData) {
	          $timeout.cancel(animationTimerData[0].timer);
	          element.removeData(ANIMATE_TIMER_KEY);
	        }
	
	        // if the preparation function fails then the promise is not setup
	        if (runner) {
	          runner.complete(!rejected);
	        }
	      }
	
	      function applyBlocking(duration) {
	        if (flags.blockTransition) {
	          blockTransitions(node, duration);
	        }
	
	        if (flags.blockKeyframeAnimation) {
	          blockKeyframeAnimations(node, !!duration);
	        }
	      }
	
	      function closeAndReturnNoopAnimator() {
	        runner = new $$AnimateRunner({
	          end: endFn,
	          cancel: cancelFn
	        });
	
	        // should flush the cache animation
	        waitUntilQuiet(noop);
	        close();
	
	        return {
	          $$willAnimate: false,
	          start: function() {
	            return runner;
	          },
	          end: endFn
	        };
	      }
	
	      function onAnimationProgress(event) {
	        event.stopPropagation();
	        var ev = event.originalEvent || event;
	
	        // we now always use `Date.now()` due to the recent changes with
	        // event.timeStamp in Firefox, Webkit and Chrome (see #13494 for more info)
	        var timeStamp = ev.$manualTimeStamp || Date.now();
	
	        /* Firefox (or possibly just Gecko) likes to not round values up
	         * when a ms measurement is used for the animation */
	        var elapsedTime = parseFloat(ev.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES));
	
	        /* $manualTimeStamp is a mocked timeStamp value which is set
	         * within browserTrigger(). This is only here so that tests can
	         * mock animations properly. Real events fallback to event.timeStamp,
	         * or, if they don't, then a timeStamp is automatically created for them.
	         * We're checking to see if the timeStamp surpasses the expected delay,
	         * but we're using elapsedTime instead of the timeStamp on the 2nd
	         * pre-condition since animationPauseds sometimes close off early */
	        if (Math.max(timeStamp - startTime, 0) >= maxDelayTime && elapsedTime >= maxDuration) {
	          // we set this flag to ensure that if the transition is paused then, when resumed,
	          // the animation will automatically close itself since transitions cannot be paused.
	          animationCompleted = true;
	          close();
	        }
	      }
	
	      function start() {
	        if (animationClosed) return;
	        if (!node.parentNode) {
	          close();
	          return;
	        }
	
	        // even though we only pause keyframe animations here the pause flag
	        // will still happen when transitions are used. Only the transition will
	        // not be paused since that is not possible. If the animation ends when
	        // paused then it will not complete until unpaused or cancelled.
	        var playPause = function(playAnimation) {
	          if (!animationCompleted) {
	            animationPaused = !playAnimation;
	            if (timings.animationDuration) {
	              var value = blockKeyframeAnimations(node, animationPaused);
	              animationPaused
	                  ? temporaryStyles.push(value)
	                  : removeFromArray(temporaryStyles, value);
	            }
	          } else if (animationPaused && playAnimation) {
	            animationPaused = false;
	            close();
	          }
	        };
	
	        // checking the stagger duration prevents an accidentally cascade of the CSS delay style
	        // being inherited from the parent. If the transition duration is zero then we can safely
	        // rely that the delay value is an intentional stagger delay style.
	        var maxStagger = itemIndex > 0
	                         && ((timings.transitionDuration && stagger.transitionDuration === 0) ||
	                            (timings.animationDuration && stagger.animationDuration === 0))
	                         && Math.max(stagger.animationDelay, stagger.transitionDelay);
	        if (maxStagger) {
	          $timeout(triggerAnimationStart,
	                   Math.floor(maxStagger * itemIndex * ONE_SECOND),
	                   false);
	        } else {
	          triggerAnimationStart();
	        }
	
	        // this will decorate the existing promise runner with pause/resume methods
	        runnerHost.resume = function() {
	          playPause(true);
	        };
	
	        runnerHost.pause = function() {
	          playPause(false);
	        };
	
	        function triggerAnimationStart() {
	          // just incase a stagger animation kicks in when the animation
	          // itself was cancelled entirely
	          if (animationClosed) return;
	
	          applyBlocking(false);
	
	          forEach(temporaryStyles, function(entry) {
	            var key = entry[0];
	            var value = entry[1];
	            node.style[key] = value;
	          });
	
	          applyAnimationClasses(element, options);
	          $$jqLite.addClass(element, activeClasses);
	
	          if (flags.recalculateTimingStyles) {
	            fullClassName = node.className + ' ' + preparationClasses;
	            cacheKey = gcsHashFn(node, fullClassName);
	
	            timings = computeTimings(node, fullClassName, cacheKey);
	            relativeDelay = timings.maxDelay;
	            maxDelay = Math.max(relativeDelay, 0);
	            maxDuration = timings.maxDuration;
	
	            if (maxDuration === 0) {
	              close();
	              return;
	            }
	
	            flags.hasTransitions = timings.transitionDuration > 0;
	            flags.hasAnimations = timings.animationDuration > 0;
	          }
	
	          if (flags.applyAnimationDelay) {
	            relativeDelay = typeof options.delay !== "boolean" && truthyTimingValue(options.delay)
	                  ? parseFloat(options.delay)
	                  : relativeDelay;
	
	            maxDelay = Math.max(relativeDelay, 0);
	            timings.animationDelay = relativeDelay;
	            delayStyle = getCssDelayStyle(relativeDelay, true);
	            temporaryStyles.push(delayStyle);
	            node.style[delayStyle[0]] = delayStyle[1];
	          }
	
	          maxDelayTime = maxDelay * ONE_SECOND;
	          maxDurationTime = maxDuration * ONE_SECOND;
	
	          if (options.easing) {
	            var easeProp, easeVal = options.easing;
	            if (flags.hasTransitions) {
	              easeProp = TRANSITION_PROP + TIMING_KEY;
	              temporaryStyles.push([easeProp, easeVal]);
	              node.style[easeProp] = easeVal;
	            }
	            if (flags.hasAnimations) {
	              easeProp = ANIMATION_PROP + TIMING_KEY;
	              temporaryStyles.push([easeProp, easeVal]);
	              node.style[easeProp] = easeVal;
	            }
	          }
	
	          if (timings.transitionDuration) {
	            events.push(TRANSITIONEND_EVENT);
	          }
	
	          if (timings.animationDuration) {
	            events.push(ANIMATIONEND_EVENT);
	          }
	
	          startTime = Date.now();
	          var timerTime = maxDelayTime + CLOSING_TIME_BUFFER * maxDurationTime;
	          var endTime = startTime + timerTime;
	
	          var animationsData = element.data(ANIMATE_TIMER_KEY) || [];
	          var setupFallbackTimer = true;
	          if (animationsData.length) {
	            var currentTimerData = animationsData[0];
	            setupFallbackTimer = endTime > currentTimerData.expectedEndTime;
	            if (setupFallbackTimer) {
	              $timeout.cancel(currentTimerData.timer);
	            } else {
	              animationsData.push(close);
	            }
	          }
	
	          if (setupFallbackTimer) {
	            var timer = $timeout(onAnimationExpired, timerTime, false);
	            animationsData[0] = {
	              timer: timer,
	              expectedEndTime: endTime
	            };
	            animationsData.push(close);
	            element.data(ANIMATE_TIMER_KEY, animationsData);
	          }
	
	          if (events.length) {
	            element.on(events.join(' '), onAnimationProgress);
	          }
	
	          if (options.to) {
	            if (options.cleanupStyles) {
	              registerRestorableStyles(restoreStyles, node, Object.keys(options.to));
	            }
	            applyAnimationToStyles(element, options);
	          }
	        }
	
	        function onAnimationExpired() {
	          var animationsData = element.data(ANIMATE_TIMER_KEY);
	
	          // this will be false in the event that the element was
	          // removed from the DOM (via a leave animation or something
	          // similar)
	          if (animationsData) {
	            for (var i = 1; i < animationsData.length; i++) {
	              animationsData[i]();
	            }
	            element.removeData(ANIMATE_TIMER_KEY);
	          }
	        }
	      }
	    };
	  }];
	}];
	
	var $$AnimateCssDriverProvider = ['$$animationProvider', function($$animationProvider) {
	  $$animationProvider.drivers.push('$$animateCssDriver');
	
	  var NG_ANIMATE_SHIM_CLASS_NAME = 'ng-animate-shim';
	  var NG_ANIMATE_ANCHOR_CLASS_NAME = 'ng-anchor';
	
	  var NG_OUT_ANCHOR_CLASS_NAME = 'ng-anchor-out';
	  var NG_IN_ANCHOR_CLASS_NAME = 'ng-anchor-in';
	
	  function isDocumentFragment(node) {
	    return node.parentNode && node.parentNode.nodeType === 11;
	  }
	
	  this.$get = ['$animateCss', '$rootScope', '$$AnimateRunner', '$rootElement', '$sniffer', '$$jqLite', '$document',
	       function($animateCss,   $rootScope,   $$AnimateRunner,   $rootElement,   $sniffer,   $$jqLite,   $document) {
	
	    // only browsers that support these properties can render animations
	    if (!$sniffer.animations && !$sniffer.transitions) return noop;
	
	    var bodyNode = $document[0].body;
	    var rootNode = getDomNode($rootElement);
	
	    var rootBodyElement = jqLite(
	      // this is to avoid using something that exists outside of the body
	      // we also special case the doc fragment case because our unit test code
	      // appends the $rootElement to the body after the app has been bootstrapped
	      isDocumentFragment(rootNode) || bodyNode.contains(rootNode) ? rootNode : bodyNode
	    );
	
	    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
	
	    return function initDriverFn(animationDetails) {
	      return animationDetails.from && animationDetails.to
	          ? prepareFromToAnchorAnimation(animationDetails.from,
	                                         animationDetails.to,
	                                         animationDetails.classes,
	                                         animationDetails.anchors)
	          : prepareRegularAnimation(animationDetails);
	    };
	
	    function filterCssClasses(classes) {
	      //remove all the `ng-` stuff
	      return classes.replace(/\bng-\S+\b/g, '');
	    }
	
	    function getUniqueValues(a, b) {
	      if (isString(a)) a = a.split(' ');
	      if (isString(b)) b = b.split(' ');
	      return a.filter(function(val) {
	        return b.indexOf(val) === -1;
	      }).join(' ');
	    }
	
	    function prepareAnchoredAnimation(classes, outAnchor, inAnchor) {
	      var clone = jqLite(getDomNode(outAnchor).cloneNode(true));
	      var startingClasses = filterCssClasses(getClassVal(clone));
	
	      outAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME);
	      inAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME);
	
	      clone.addClass(NG_ANIMATE_ANCHOR_CLASS_NAME);
	
	      rootBodyElement.append(clone);
	
	      var animatorIn, animatorOut = prepareOutAnimation();
	
	      // the user may not end up using the `out` animation and
	      // only making use of the `in` animation or vice-versa.
	      // In either case we should allow this and not assume the
	      // animation is over unless both animations are not used.
	      if (!animatorOut) {
	        animatorIn = prepareInAnimation();
	        if (!animatorIn) {
	          return end();
	        }
	      }
	
	      var startingAnimator = animatorOut || animatorIn;
	
	      return {
	        start: function() {
	          var runner;
	
	          var currentAnimation = startingAnimator.start();
	          currentAnimation.done(function() {
	            currentAnimation = null;
	            if (!animatorIn) {
	              animatorIn = prepareInAnimation();
	              if (animatorIn) {
	                currentAnimation = animatorIn.start();
	                currentAnimation.done(function() {
	                  currentAnimation = null;
	                  end();
	                  runner.complete();
	                });
	                return currentAnimation;
	              }
	            }
	            // in the event that there is no `in` animation
	            end();
	            runner.complete();
	          });
	
	          runner = new $$AnimateRunner({
	            end: endFn,
	            cancel: endFn
	          });
	
	          return runner;
	
	          function endFn() {
	            if (currentAnimation) {
	              currentAnimation.end();
	            }
	          }
	        }
	      };
	
	      function calculateAnchorStyles(anchor) {
	        var styles = {};
	
	        var coords = getDomNode(anchor).getBoundingClientRect();
	
	        // we iterate directly since safari messes up and doesn't return
	        // all the keys for the coords object when iterated
	        forEach(['width','height','top','left'], function(key) {
	          var value = coords[key];
	          switch (key) {
	            case 'top':
	              value += bodyNode.scrollTop;
	              break;
	            case 'left':
	              value += bodyNode.scrollLeft;
	              break;
	          }
	          styles[key] = Math.floor(value) + 'px';
	        });
	        return styles;
	      }
	
	      function prepareOutAnimation() {
	        var animator = $animateCss(clone, {
	          addClass: NG_OUT_ANCHOR_CLASS_NAME,
	          delay: true,
	          from: calculateAnchorStyles(outAnchor)
	        });
	
	        // read the comment within `prepareRegularAnimation` to understand
	        // why this check is necessary
	        return animator.$$willAnimate ? animator : null;
	      }
	
	      function getClassVal(element) {
	        return element.attr('class') || '';
	      }
	
	      function prepareInAnimation() {
	        var endingClasses = filterCssClasses(getClassVal(inAnchor));
	        var toAdd = getUniqueValues(endingClasses, startingClasses);
	        var toRemove = getUniqueValues(startingClasses, endingClasses);
	
	        var animator = $animateCss(clone, {
	          to: calculateAnchorStyles(inAnchor),
	          addClass: NG_IN_ANCHOR_CLASS_NAME + ' ' + toAdd,
	          removeClass: NG_OUT_ANCHOR_CLASS_NAME + ' ' + toRemove,
	          delay: true
	        });
	
	        // read the comment within `prepareRegularAnimation` to understand
	        // why this check is necessary
	        return animator.$$willAnimate ? animator : null;
	      }
	
	      function end() {
	        clone.remove();
	        outAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME);
	        inAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME);
	      }
	    }
	
	    function prepareFromToAnchorAnimation(from, to, classes, anchors) {
	      var fromAnimation = prepareRegularAnimation(from, noop);
	      var toAnimation = prepareRegularAnimation(to, noop);
	
	      var anchorAnimations = [];
	      forEach(anchors, function(anchor) {
	        var outElement = anchor['out'];
	        var inElement = anchor['in'];
	        var animator = prepareAnchoredAnimation(classes, outElement, inElement);
	        if (animator) {
	          anchorAnimations.push(animator);
	        }
	      });
	
	      // no point in doing anything when there are no elements to animate
	      if (!fromAnimation && !toAnimation && anchorAnimations.length === 0) return;
	
	      return {
	        start: function() {
	          var animationRunners = [];
	
	          if (fromAnimation) {
	            animationRunners.push(fromAnimation.start());
	          }
	
	          if (toAnimation) {
	            animationRunners.push(toAnimation.start());
	          }
	
	          forEach(anchorAnimations, function(animation) {
	            animationRunners.push(animation.start());
	          });
	
	          var runner = new $$AnimateRunner({
	            end: endFn,
	            cancel: endFn // CSS-driven animations cannot be cancelled, only ended
	          });
	
	          $$AnimateRunner.all(animationRunners, function(status) {
	            runner.complete(status);
	          });
	
	          return runner;
	
	          function endFn() {
	            forEach(animationRunners, function(runner) {
	              runner.end();
	            });
	          }
	        }
	      };
	    }
	
	    function prepareRegularAnimation(animationDetails) {
	      var element = animationDetails.element;
	      var options = animationDetails.options || {};
	
	      if (animationDetails.structural) {
	        options.event = animationDetails.event;
	        options.structural = true;
	        options.applyClassesEarly = true;
	
	        // we special case the leave animation since we want to ensure that
	        // the element is removed as soon as the animation is over. Otherwise
	        // a flicker might appear or the element may not be removed at all
	        if (animationDetails.event === 'leave') {
	          options.onDone = options.domOperation;
	        }
	      }
	
	      // We assign the preparationClasses as the actual animation event since
	      // the internals of $animateCss will just suffix the event token values
	      // with `-active` to trigger the animation.
	      if (options.preparationClasses) {
	        options.event = concatWithSpace(options.event, options.preparationClasses);
	      }
	
	      var animator = $animateCss(element, options);
	
	      // the driver lookup code inside of $$animation attempts to spawn a
	      // driver one by one until a driver returns a.$$willAnimate animator object.
	      // $animateCss will always return an object, however, it will pass in
	      // a flag as a hint as to whether an animation was detected or not
	      return animator.$$willAnimate ? animator : null;
	    }
	  }];
	}];
	
	// TODO(matsko): use caching here to speed things up for detection
	// TODO(matsko): add documentation
	//  by the time...
	
	var $$AnimateJsProvider = ['$animateProvider', function($animateProvider) {
	  this.$get = ['$injector', '$$AnimateRunner', '$$jqLite',
	       function($injector,   $$AnimateRunner,   $$jqLite) {
	
	    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
	         // $animateJs(element, 'enter');
	    return function(element, event, classes, options) {
	      var animationClosed = false;
	
	      // the `classes` argument is optional and if it is not used
	      // then the classes will be resolved from the element's className
	      // property as well as options.addClass/options.removeClass.
	      if (arguments.length === 3 && isObject(classes)) {
	        options = classes;
	        classes = null;
	      }
	
	      options = prepareAnimationOptions(options);
	      if (!classes) {
	        classes = element.attr('class') || '';
	        if (options.addClass) {
	          classes += ' ' + options.addClass;
	        }
	        if (options.removeClass) {
	          classes += ' ' + options.removeClass;
	        }
	      }
	
	      var classesToAdd = options.addClass;
	      var classesToRemove = options.removeClass;
	
	      // the lookupAnimations function returns a series of animation objects that are
	      // matched up with one or more of the CSS classes. These animation objects are
	      // defined via the module.animation factory function. If nothing is detected then
	      // we don't return anything which then makes $animation query the next driver.
	      var animations = lookupAnimations(classes);
	      var before, after;
	      if (animations.length) {
	        var afterFn, beforeFn;
	        if (event == 'leave') {
	          beforeFn = 'leave';
	          afterFn = 'afterLeave'; // TODO(matsko): get rid of this
	        } else {
	          beforeFn = 'before' + event.charAt(0).toUpperCase() + event.substr(1);
	          afterFn = event;
	        }
	
	        if (event !== 'enter' && event !== 'move') {
	          before = packageAnimations(element, event, options, animations, beforeFn);
	        }
	        after  = packageAnimations(element, event, options, animations, afterFn);
	      }
	
	      // no matching animations
	      if (!before && !after) return;
	
	      function applyOptions() {
	        options.domOperation();
	        applyAnimationClasses(element, options);
	      }
	
	      function close() {
	        animationClosed = true;
	        applyOptions();
	        applyAnimationStyles(element, options);
	      }
	
	      var runner;
	
	      return {
	        $$willAnimate: true,
	        end: function() {
	          if (runner) {
	            runner.end();
	          } else {
	            close();
	            runner = new $$AnimateRunner();
	            runner.complete(true);
	          }
	          return runner;
	        },
	        start: function() {
	          if (runner) {
	            return runner;
	          }
	
	          runner = new $$AnimateRunner();
	          var closeActiveAnimations;
	          var chain = [];
	
	          if (before) {
	            chain.push(function(fn) {
	              closeActiveAnimations = before(fn);
	            });
	          }
	
	          if (chain.length) {
	            chain.push(function(fn) {
	              applyOptions();
	              fn(true);
	            });
	          } else {
	            applyOptions();
	          }
	
	          if (after) {
	            chain.push(function(fn) {
	              closeActiveAnimations = after(fn);
	            });
	          }
	
	          runner.setHost({
	            end: function() {
	              endAnimations();
	            },
	            cancel: function() {
	              endAnimations(true);
	            }
	          });
	
	          $$AnimateRunner.chain(chain, onComplete);
	          return runner;
	
	          function onComplete(success) {
	            close(success);
	            runner.complete(success);
	          }
	
	          function endAnimations(cancelled) {
	            if (!animationClosed) {
	              (closeActiveAnimations || noop)(cancelled);
	              onComplete(cancelled);
	            }
	          }
	        }
	      };
	
	      function executeAnimationFn(fn, element, event, options, onDone) {
	        var args;
	        switch (event) {
	          case 'animate':
	            args = [element, options.from, options.to, onDone];
	            break;
	
	          case 'setClass':
	            args = [element, classesToAdd, classesToRemove, onDone];
	            break;
	
	          case 'addClass':
	            args = [element, classesToAdd, onDone];
	            break;
	
	          case 'removeClass':
	            args = [element, classesToRemove, onDone];
	            break;
	
	          default:
	            args = [element, onDone];
	            break;
	        }
	
	        args.push(options);
	
	        var value = fn.apply(fn, args);
	        if (value) {
	          if (isFunction(value.start)) {
	            value = value.start();
	          }
	
	          if (value instanceof $$AnimateRunner) {
	            value.done(onDone);
	          } else if (isFunction(value)) {
	            // optional onEnd / onCancel callback
	            return value;
	          }
	        }
	
	        return noop;
	      }
	
	      function groupEventedAnimations(element, event, options, animations, fnName) {
	        var operations = [];
	        forEach(animations, function(ani) {
	          var animation = ani[fnName];
	          if (!animation) return;
	
	          // note that all of these animations will run in parallel
	          operations.push(function() {
	            var runner;
	            var endProgressCb;
	
	            var resolved = false;
	            var onAnimationComplete = function(rejected) {
	              if (!resolved) {
	                resolved = true;
	                (endProgressCb || noop)(rejected);
	                runner.complete(!rejected);
	              }
	            };
	
	            runner = new $$AnimateRunner({
	              end: function() {
	                onAnimationComplete();
	              },
	              cancel: function() {
	                onAnimationComplete(true);
	              }
	            });
	
	            endProgressCb = executeAnimationFn(animation, element, event, options, function(result) {
	              var cancelled = result === false;
	              onAnimationComplete(cancelled);
	            });
	
	            return runner;
	          });
	        });
	
	        return operations;
	      }
	
	      function packageAnimations(element, event, options, animations, fnName) {
	        var operations = groupEventedAnimations(element, event, options, animations, fnName);
	        if (operations.length === 0) {
	          var a,b;
	          if (fnName === 'beforeSetClass') {
	            a = groupEventedAnimations(element, 'removeClass', options, animations, 'beforeRemoveClass');
	            b = groupEventedAnimations(element, 'addClass', options, animations, 'beforeAddClass');
	          } else if (fnName === 'setClass') {
	            a = groupEventedAnimations(element, 'removeClass', options, animations, 'removeClass');
	            b = groupEventedAnimations(element, 'addClass', options, animations, 'addClass');
	          }
	
	          if (a) {
	            operations = operations.concat(a);
	          }
	          if (b) {
	            operations = operations.concat(b);
	          }
	        }
	
	        if (operations.length === 0) return;
	
	        // TODO(matsko): add documentation
	        return function startAnimation(callback) {
	          var runners = [];
	          if (operations.length) {
	            forEach(operations, function(animateFn) {
	              runners.push(animateFn());
	            });
	          }
	
	          runners.length ? $$AnimateRunner.all(runners, callback) : callback();
	
	          return function endFn(reject) {
	            forEach(runners, function(runner) {
	              reject ? runner.cancel() : runner.end();
	            });
	          };
	        };
	      }
	    };
	
	    function lookupAnimations(classes) {
	      classes = isArray(classes) ? classes : classes.split(' ');
	      var matches = [], flagMap = {};
	      for (var i=0; i < classes.length; i++) {
	        var klass = classes[i],
	            animationFactory = $animateProvider.$$registeredAnimations[klass];
	        if (animationFactory && !flagMap[klass]) {
	          matches.push($injector.get(animationFactory));
	          flagMap[klass] = true;
	        }
	      }
	      return matches;
	    }
	  }];
	}];
	
	var $$AnimateJsDriverProvider = ['$$animationProvider', function($$animationProvider) {
	  $$animationProvider.drivers.push('$$animateJsDriver');
	  this.$get = ['$$animateJs', '$$AnimateRunner', function($$animateJs, $$AnimateRunner) {
	    return function initDriverFn(animationDetails) {
	      if (animationDetails.from && animationDetails.to) {
	        var fromAnimation = prepareAnimation(animationDetails.from);
	        var toAnimation = prepareAnimation(animationDetails.to);
	        if (!fromAnimation && !toAnimation) return;
	
	        return {
	          start: function() {
	            var animationRunners = [];
	
	            if (fromAnimation) {
	              animationRunners.push(fromAnimation.start());
	            }
	
	            if (toAnimation) {
	              animationRunners.push(toAnimation.start());
	            }
	
	            $$AnimateRunner.all(animationRunners, done);
	
	            var runner = new $$AnimateRunner({
	              end: endFnFactory(),
	              cancel: endFnFactory()
	            });
	
	            return runner;
	
	            function endFnFactory() {
	              return function() {
	                forEach(animationRunners, function(runner) {
	                  // at this point we cannot cancel animations for groups just yet. 1.5+
	                  runner.end();
	                });
	              };
	            }
	
	            function done(status) {
	              runner.complete(status);
	            }
	          }
	        };
	      } else {
	        return prepareAnimation(animationDetails);
	      }
	    };
	
	    function prepareAnimation(animationDetails) {
	      // TODO(matsko): make sure to check for grouped animations and delegate down to normal animations
	      var element = animationDetails.element;
	      var event = animationDetails.event;
	      var options = animationDetails.options;
	      var classes = animationDetails.classes;
	      return $$animateJs(element, event, classes, options);
	    }
	  }];
	}];
	
	var NG_ANIMATE_ATTR_NAME = 'data-ng-animate';
	var NG_ANIMATE_PIN_DATA = '$ngAnimatePin';
	var $$AnimateQueueProvider = ['$animateProvider', function($animateProvider) {
	  var PRE_DIGEST_STATE = 1;
	  var RUNNING_STATE = 2;
	  var ONE_SPACE = ' ';
	
	  var rules = this.rules = {
	    skip: [],
	    cancel: [],
	    join: []
	  };
	
	  function makeTruthyCssClassMap(classString) {
	    if (!classString) {
	      return null;
	    }
	
	    var keys = classString.split(ONE_SPACE);
	    var map = Object.create(null);
	
	    forEach(keys, function(key) {
	      map[key] = true;
	    });
	    return map;
	  }
	
	  function hasMatchingClasses(newClassString, currentClassString) {
	    if (newClassString && currentClassString) {
	      var currentClassMap = makeTruthyCssClassMap(currentClassString);
	      return newClassString.split(ONE_SPACE).some(function(className) {
	        return currentClassMap[className];
	      });
	    }
	  }
	
	  function isAllowed(ruleType, element, currentAnimation, previousAnimation) {
	    return rules[ruleType].some(function(fn) {
	      return fn(element, currentAnimation, previousAnimation);
	    });
	  }
	
	  function hasAnimationClasses(animation, and) {
	    var a = (animation.addClass || '').length > 0;
	    var b = (animation.removeClass || '').length > 0;
	    return and ? a && b : a || b;
	  }
	
	  rules.join.push(function(element, newAnimation, currentAnimation) {
	    // if the new animation is class-based then we can just tack that on
	    return !newAnimation.structural && hasAnimationClasses(newAnimation);
	  });
	
	  rules.skip.push(function(element, newAnimation, currentAnimation) {
	    // there is no need to animate anything if no classes are being added and
	    // there is no structural animation that will be triggered
	    return !newAnimation.structural && !hasAnimationClasses(newAnimation);
	  });
	
	  rules.skip.push(function(element, newAnimation, currentAnimation) {
	    // why should we trigger a new structural animation if the element will
	    // be removed from the DOM anyway?
	    return currentAnimation.event == 'leave' && newAnimation.structural;
	  });
	
	  rules.skip.push(function(element, newAnimation, currentAnimation) {
	    // if there is an ongoing current animation then don't even bother running the class-based animation
	    return currentAnimation.structural && currentAnimation.state === RUNNING_STATE && !newAnimation.structural;
	  });
	
	  rules.cancel.push(function(element, newAnimation, currentAnimation) {
	    // there can never be two structural animations running at the same time
	    return currentAnimation.structural && newAnimation.structural;
	  });
	
	  rules.cancel.push(function(element, newAnimation, currentAnimation) {
	    // if the previous animation is already running, but the new animation will
	    // be triggered, but the new animation is structural
	    return currentAnimation.state === RUNNING_STATE && newAnimation.structural;
	  });
	
	  rules.cancel.push(function(element, newAnimation, currentAnimation) {
	    // cancel the animation if classes added / removed in both animation cancel each other out,
	    // but only if the current animation isn't structural
	
	    if (currentAnimation.structural) return false;
	
	    var nA = newAnimation.addClass;
	    var nR = newAnimation.removeClass;
	    var cA = currentAnimation.addClass;
	    var cR = currentAnimation.removeClass;
	
	    // early detection to save the global CPU shortage :)
	    if ((isUndefined(nA) && isUndefined(nR)) || (isUndefined(cA) && isUndefined(cR))) {
	      return false;
	    }
	
	    return hasMatchingClasses(nA, cR) || hasMatchingClasses(nR, cA);
	  });
	
	  this.$get = ['$$rAF', '$rootScope', '$rootElement', '$document', '$$HashMap',
	               '$$animation', '$$AnimateRunner', '$templateRequest', '$$jqLite', '$$forceReflow',
	       function($$rAF,   $rootScope,   $rootElement,   $document,   $$HashMap,
	                $$animation,   $$AnimateRunner,   $templateRequest,   $$jqLite,   $$forceReflow) {
	
	    var activeAnimationsLookup = new $$HashMap();
	    var disabledElementsLookup = new $$HashMap();
	    var animationsEnabled = null;
	
	    function postDigestTaskFactory() {
	      var postDigestCalled = false;
	      return function(fn) {
	        // we only issue a call to postDigest before
	        // it has first passed. This prevents any callbacks
	        // from not firing once the animation has completed
	        // since it will be out of the digest cycle.
	        if (postDigestCalled) {
	          fn();
	        } else {
	          $rootScope.$$postDigest(function() {
	            postDigestCalled = true;
	            fn();
	          });
	        }
	      };
	    }
	
	    // Wait until all directive and route-related templates are downloaded and
	    // compiled. The $templateRequest.totalPendingRequests variable keeps track of
	    // all of the remote templates being currently downloaded. If there are no
	    // templates currently downloading then the watcher will still fire anyway.
	    var deregisterWatch = $rootScope.$watch(
	      function() { return $templateRequest.totalPendingRequests === 0; },
	      function(isEmpty) {
	        if (!isEmpty) return;
	        deregisterWatch();
	
	        // Now that all templates have been downloaded, $animate will wait until
	        // the post digest queue is empty before enabling animations. By having two
	        // calls to $postDigest calls we can ensure that the flag is enabled at the
	        // very end of the post digest queue. Since all of the animations in $animate
	        // use $postDigest, it's important that the code below executes at the end.
	        // This basically means that the page is fully downloaded and compiled before
	        // any animations are triggered.
	        $rootScope.$$postDigest(function() {
	          $rootScope.$$postDigest(function() {
	            // we check for null directly in the event that the application already called
	            // .enabled() with whatever arguments that it provided it with
	            if (animationsEnabled === null) {
	              animationsEnabled = true;
	            }
	          });
	        });
	      }
	    );
	
	    var callbackRegistry = {};
	
	    // remember that the classNameFilter is set during the provider/config
	    // stage therefore we can optimize here and setup a helper function
	    var classNameFilter = $animateProvider.classNameFilter();
	    var isAnimatableClassName = !classNameFilter
	              ? function() { return true; }
	              : function(className) {
	                return classNameFilter.test(className);
	              };
	
	    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
	
	    function normalizeAnimationDetails(element, animation) {
	      return mergeAnimationDetails(element, animation, {});
	    }
	
	    // IE9-11 has no method "contains" in SVG element and in Node.prototype. Bug #10259.
	    var contains = window.Node.prototype.contains || function(arg) {
	      // jshint bitwise: false
	      return this === arg || !!(this.compareDocumentPosition(arg) & 16);
	      // jshint bitwise: true
	    };
	
	    function findCallbacks(parent, element, event) {
	      var targetNode = getDomNode(element);
	      var targetParentNode = getDomNode(parent);
	
	      var matches = [];
	      var entries = callbackRegistry[event];
	      if (entries) {
	        forEach(entries, function(entry) {
	          if (contains.call(entry.node, targetNode)) {
	            matches.push(entry.callback);
	          } else if (event === 'leave' && contains.call(entry.node, targetParentNode)) {
	            matches.push(entry.callback);
	          }
	        });
	      }
	
	      return matches;
	    }
	
	    function filterFromRegistry(list, matchContainer, matchCallback) {
	      var containerNode = extractElementNode(matchContainer);
	      return list.filter(function(entry) {
	        var isMatch = entry.node === containerNode &&
	                        (!matchCallback || entry.callback === matchCallback);
	        return !isMatch;
	      });
	    }
	
	    function cleanupEventListeners(phase, element) {
	      if (phase === 'close' && !element[0].parentNode) {
	        // If the element is not attached to a parentNode, it has been removed by
	        // the domOperation, and we can safely remove the event callbacks
	        $animate.off(element);
	      }
	    }
	
	    var $animate = {
	      on: function(event, container, callback) {
	        var node = extractElementNode(container);
	        callbackRegistry[event] = callbackRegistry[event] || [];
	        callbackRegistry[event].push({
	          node: node,
	          callback: callback
	        });
	
	        // Remove the callback when the element is removed from the DOM
	        jqLite(container).on('$destroy', function() {
	          var animationDetails = activeAnimationsLookup.get(node);
	
	          if (!animationDetails) {
	            // If there's an animation ongoing, the callback calling code will remove
	            // the event listeners. If we'd remove here, the callbacks would be removed
	            // before the animation ends
	            $animate.off(event, container, callback);
	          }
	        });
	      },
	
	      off: function(event, container, callback) {
	        if (arguments.length === 1 && !angular.isString(arguments[0])) {
	          container = arguments[0];
	          for (var eventType in callbackRegistry) {
	            callbackRegistry[eventType] = filterFromRegistry(callbackRegistry[eventType], container);
	          }
	
	          return;
	        }
	
	        var entries = callbackRegistry[event];
	        if (!entries) return;
	
	        callbackRegistry[event] = arguments.length === 1
	            ? null
	            : filterFromRegistry(entries, container, callback);
	      },
	
	      pin: function(element, parentElement) {
	        assertArg(isElement(element), 'element', 'not an element');
	        assertArg(isElement(parentElement), 'parentElement', 'not an element');
	        element.data(NG_ANIMATE_PIN_DATA, parentElement);
	      },
	
	      push: function(element, event, options, domOperation) {
	        options = options || {};
	        options.domOperation = domOperation;
	        return queueAnimation(element, event, options);
	      },
	
	      // this method has four signatures:
	      //  () - global getter
	      //  (bool) - global setter
	      //  (element) - element getter
	      //  (element, bool) - element setter<F37>
	      enabled: function(element, bool) {
	        var argCount = arguments.length;
	
	        if (argCount === 0) {
	          // () - Global getter
	          bool = !!animationsEnabled;
	        } else {
	          var hasElement = isElement(element);
	
	          if (!hasElement) {
	            // (bool) - Global setter
	            bool = animationsEnabled = !!element;
	          } else {
	            var node = getDomNode(element);
	            var recordExists = disabledElementsLookup.get(node);
	
	            if (argCount === 1) {
	              // (element) - Element getter
	              bool = !recordExists;
	            } else {
	              // (element, bool) - Element setter
	              disabledElementsLookup.put(node, !bool);
	            }
	          }
	        }
	
	        return bool;
	      }
	    };
	
	    return $animate;
	
	    function queueAnimation(element, event, initialOptions) {
	      // we always make a copy of the options since
	      // there should never be any side effects on
	      // the input data when running `$animateCss`.
	      var options = copy(initialOptions);
	
	      var node, parent;
	      element = stripCommentsFromElement(element);
	      if (element) {
	        node = getDomNode(element);
	        parent = element.parent();
	      }
	
	      options = prepareAnimationOptions(options);
	
	      // we create a fake runner with a working promise.
	      // These methods will become available after the digest has passed
	      var runner = new $$AnimateRunner();
	
	      // this is used to trigger callbacks in postDigest mode
	      var runInNextPostDigestOrNow = postDigestTaskFactory();
	
	      if (isArray(options.addClass)) {
	        options.addClass = options.addClass.join(' ');
	      }
	
	      if (options.addClass && !isString(options.addClass)) {
	        options.addClass = null;
	      }
	
	      if (isArray(options.removeClass)) {
	        options.removeClass = options.removeClass.join(' ');
	      }
	
	      if (options.removeClass && !isString(options.removeClass)) {
	        options.removeClass = null;
	      }
	
	      if (options.from && !isObject(options.from)) {
	        options.from = null;
	      }
	
	      if (options.to && !isObject(options.to)) {
	        options.to = null;
	      }
	
	      // there are situations where a directive issues an animation for
	      // a jqLite wrapper that contains only comment nodes... If this
	      // happens then there is no way we can perform an animation
	      if (!node) {
	        close();
	        return runner;
	      }
	
	      var className = [node.className, options.addClass, options.removeClass].join(' ');
	      if (!isAnimatableClassName(className)) {
	        close();
	        return runner;
	      }
	
	      var isStructural = ['enter', 'move', 'leave'].indexOf(event) >= 0;
	
	      var documentHidden = $document[0].hidden;
	
	      // this is a hard disable of all animations for the application or on
	      // the element itself, therefore  there is no need to continue further
	      // past this point if not enabled
	      // Animations are also disabled if the document is currently hidden (page is not visible
	      // to the user), because browsers slow down or do not flush calls to requestAnimationFrame
	      var skipAnimations = !animationsEnabled || documentHidden || disabledElementsLookup.get(node);
	      var existingAnimation = (!skipAnimations && activeAnimationsLookup.get(node)) || {};
	      var hasExistingAnimation = !!existingAnimation.state;
	
	      // there is no point in traversing the same collection of parent ancestors if a followup
	      // animation will be run on the same element that already did all that checking work
	      if (!skipAnimations && (!hasExistingAnimation || existingAnimation.state != PRE_DIGEST_STATE)) {
	        skipAnimations = !areAnimationsAllowed(element, parent, event);
	      }
	
	      if (skipAnimations) {
	        // Callbacks should fire even if the document is hidden (regression fix for issue #14120)
	        if (documentHidden) notifyProgress(runner, event, 'start');
	        close();
	        if (documentHidden) notifyProgress(runner, event, 'close');
	        return runner;
	      }
	
	      if (isStructural) {
	        closeChildAnimations(element);
	      }
	
	      var newAnimation = {
	        structural: isStructural,
	        element: element,
	        event: event,
	        addClass: options.addClass,
	        removeClass: options.removeClass,
	        close: close,
	        options: options,
	        runner: runner
	      };
	
	      if (hasExistingAnimation) {
	        var skipAnimationFlag = isAllowed('skip', element, newAnimation, existingAnimation);
	        if (skipAnimationFlag) {
	          if (existingAnimation.state === RUNNING_STATE) {
	            close();
	            return runner;
	          } else {
	            mergeAnimationDetails(element, existingAnimation, newAnimation);
	            return existingAnimation.runner;
	          }
	        }
	        var cancelAnimationFlag = isAllowed('cancel', element, newAnimation, existingAnimation);
	        if (cancelAnimationFlag) {
	          if (existingAnimation.state === RUNNING_STATE) {
	            // this will end the animation right away and it is safe
	            // to do so since the animation is already running and the
	            // runner callback code will run in async
	            existingAnimation.runner.end();
	          } else if (existingAnimation.structural) {
	            // this means that the animation is queued into a digest, but
	            // hasn't started yet. Therefore it is safe to run the close
	            // method which will call the runner methods in async.
	            existingAnimation.close();
	          } else {
	            // this will merge the new animation options into existing animation options
	            mergeAnimationDetails(element, existingAnimation, newAnimation);
	
	            return existingAnimation.runner;
	          }
	        } else {
	          // a joined animation means that this animation will take over the existing one
	          // so an example would involve a leave animation taking over an enter. Then when
	          // the postDigest kicks in the enter will be ignored.
	          var joinAnimationFlag = isAllowed('join', element, newAnimation, existingAnimation);
	          if (joinAnimationFlag) {
	            if (existingAnimation.state === RUNNING_STATE) {
	              normalizeAnimationDetails(element, newAnimation);
	            } else {
	              applyGeneratedPreparationClasses(element, isStructural ? event : null, options);
	
	              event = newAnimation.event = existingAnimation.event;
	              options = mergeAnimationDetails(element, existingAnimation, newAnimation);
	
	              //we return the same runner since only the option values of this animation will
	              //be fed into the `existingAnimation`.
	              return existingAnimation.runner;
	            }
	          }
	        }
	      } else {
	        // normalization in this case means that it removes redundant CSS classes that
	        // already exist (addClass) or do not exist (removeClass) on the element
	        normalizeAnimationDetails(element, newAnimation);
	      }
	
	      // when the options are merged and cleaned up we may end up not having to do
	      // an animation at all, therefore we should check this before issuing a post
	      // digest callback. Structural animations will always run no matter what.
	      var isValidAnimation = newAnimation.structural;
	      if (!isValidAnimation) {
	        // animate (from/to) can be quickly checked first, otherwise we check if any classes are present
	        isValidAnimation = (newAnimation.event === 'animate' && Object.keys(newAnimation.options.to || {}).length > 0)
	                            || hasAnimationClasses(newAnimation);
	      }
	
	      if (!isValidAnimation) {
	        close();
	        clearElementAnimationState(element);
	        return runner;
	      }
	
	      // the counter keeps track of cancelled animations
	      var counter = (existingAnimation.counter || 0) + 1;
	      newAnimation.counter = counter;
	
	      markElementAnimationState(element, PRE_DIGEST_STATE, newAnimation);
	
	      $rootScope.$$postDigest(function() {
	        var animationDetails = activeAnimationsLookup.get(node);
	        var animationCancelled = !animationDetails;
	        animationDetails = animationDetails || {};
	
	        // if addClass/removeClass is called before something like enter then the
	        // registered parent element may not be present. The code below will ensure
	        // that a final value for parent element is obtained
	        var parentElement = element.parent() || [];
	
	        // animate/structural/class-based animations all have requirements. Otherwise there
	        // is no point in performing an animation. The parent node must also be set.
	        var isValidAnimation = parentElement.length > 0
	                                && (animationDetails.event === 'animate'
	                                    || animationDetails.structural
	                                    || hasAnimationClasses(animationDetails));
	
	        // this means that the previous animation was cancelled
	        // even if the follow-up animation is the same event
	        if (animationCancelled || animationDetails.counter !== counter || !isValidAnimation) {
	          // if another animation did not take over then we need
	          // to make sure that the domOperation and options are
	          // handled accordingly
	          if (animationCancelled) {
	            applyAnimationClasses(element, options);
	            applyAnimationStyles(element, options);
	          }
	
	          // if the event changed from something like enter to leave then we do
	          // it, otherwise if it's the same then the end result will be the same too
	          if (animationCancelled || (isStructural && animationDetails.event !== event)) {
	            options.domOperation();
	            runner.end();
	          }
	
	          // in the event that the element animation was not cancelled or a follow-up animation
	          // isn't allowed to animate from here then we need to clear the state of the element
	          // so that any future animations won't read the expired animation data.
	          if (!isValidAnimation) {
	            clearElementAnimationState(element);
	          }
	
	          return;
	        }
	
	        // this combined multiple class to addClass / removeClass into a setClass event
	        // so long as a structural event did not take over the animation
	        event = !animationDetails.structural && hasAnimationClasses(animationDetails, true)
	            ? 'setClass'
	            : animationDetails.event;
	
	        markElementAnimationState(element, RUNNING_STATE);
	        var realRunner = $$animation(element, event, animationDetails.options);
	
	        // this will update the runner's flow-control events based on
	        // the `realRunner` object.
	        runner.setHost(realRunner);
	        notifyProgress(runner, event, 'start', {});
	
	        realRunner.done(function(status) {
	          close(!status);
	          var animationDetails = activeAnimationsLookup.get(node);
	          if (animationDetails && animationDetails.counter === counter) {
	            clearElementAnimationState(getDomNode(element));
	          }
	          notifyProgress(runner, event, 'close', {});
	        });
	      });
	
	      return runner;
	
	      function notifyProgress(runner, event, phase, data) {
	        runInNextPostDigestOrNow(function() {
	          var callbacks = findCallbacks(parent, element, event);
	          if (callbacks.length) {
	            // do not optimize this call here to RAF because
	            // we don't know how heavy the callback code here will
	            // be and if this code is buffered then this can
	            // lead to a performance regression.
	            $$rAF(function() {
	              forEach(callbacks, function(callback) {
	                callback(element, phase, data);
	              });
	              cleanupEventListeners(phase, element);
	            });
	          } else {
	            cleanupEventListeners(phase, element);
	          }
	        });
	        runner.progress(event, phase, data);
	      }
	
	      function close(reject) { // jshint ignore:line
	        clearGeneratedClasses(element, options);
	        applyAnimationClasses(element, options);
	        applyAnimationStyles(element, options);
	        options.domOperation();
	        runner.complete(!reject);
	      }
	    }
	
	    function closeChildAnimations(element) {
	      var node = getDomNode(element);
	      var children = node.querySelectorAll('[' + NG_ANIMATE_ATTR_NAME + ']');
	      forEach(children, function(child) {
	        var state = parseInt(child.getAttribute(NG_ANIMATE_ATTR_NAME));
	        var animationDetails = activeAnimationsLookup.get(child);
	        if (animationDetails) {
	          switch (state) {
	            case RUNNING_STATE:
	              animationDetails.runner.end();
	              /* falls through */
	            case PRE_DIGEST_STATE:
	              activeAnimationsLookup.remove(child);
	              break;
	          }
	        }
	      });
	    }
	
	    function clearElementAnimationState(element) {
	      var node = getDomNode(element);
	      node.removeAttribute(NG_ANIMATE_ATTR_NAME);
	      activeAnimationsLookup.remove(node);
	    }
	
	    function isMatchingElement(nodeOrElmA, nodeOrElmB) {
	      return getDomNode(nodeOrElmA) === getDomNode(nodeOrElmB);
	    }
	
	    /**
	     * This fn returns false if any of the following is true:
	     * a) animations on any parent element are disabled, and animations on the element aren't explicitly allowed
	     * b) a parent element has an ongoing structural animation, and animateChildren is false
	     * c) the element is not a child of the body
	     * d) the element is not a child of the $rootElement
	     */
	    function areAnimationsAllowed(element, parentElement, event) {
	      var bodyElement = jqLite($document[0].body);
	      var bodyElementDetected = isMatchingElement(element, bodyElement) || element[0].nodeName === 'HTML';
	      var rootElementDetected = isMatchingElement(element, $rootElement);
	      var parentAnimationDetected = false;
	      var animateChildren;
	      var elementDisabled = disabledElementsLookup.get(getDomNode(element));
	
	      var parentHost = jqLite.data(element[0], NG_ANIMATE_PIN_DATA);
	      if (parentHost) {
	        parentElement = parentHost;
	      }
	
	      parentElement = getDomNode(parentElement);
	
	      while (parentElement) {
	        if (!rootElementDetected) {
	          // angular doesn't want to attempt to animate elements outside of the application
	          // therefore we need to ensure that the rootElement is an ancestor of the current element
	          rootElementDetected = isMatchingElement(parentElement, $rootElement);
	        }
	
	        if (parentElement.nodeType !== ELEMENT_NODE) {
	          // no point in inspecting the #document element
	          break;
	        }
	
	        var details = activeAnimationsLookup.get(parentElement) || {};
	        // either an enter, leave or move animation will commence
	        // therefore we can't allow any animations to take place
	        // but if a parent animation is class-based then that's ok
	        if (!parentAnimationDetected) {
	          var parentElementDisabled = disabledElementsLookup.get(parentElement);
	
	          if (parentElementDisabled === true && elementDisabled !== false) {
	            // disable animations if the user hasn't explicitly enabled animations on the
	            // current element
	            elementDisabled = true;
	            // element is disabled via parent element, no need to check anything else
	            break;
	          } else if (parentElementDisabled === false) {
	            elementDisabled = false;
	          }
	          parentAnimationDetected = details.structural;
	        }
	
	        if (isUndefined(animateChildren) || animateChildren === true) {
	          var value = jqLite.data(parentElement, NG_ANIMATE_CHILDREN_DATA);
	          if (isDefined(value)) {
	            animateChildren = value;
	          }
	        }
	
	        // there is no need to continue traversing at this point
	        if (parentAnimationDetected && animateChildren === false) break;
	
	        if (!bodyElementDetected) {
	          // we also need to ensure that the element is or will be a part of the body element
	          // otherwise it is pointless to even issue an animation to be rendered
	          bodyElementDetected = isMatchingElement(parentElement, bodyElement);
	        }
	
	        if (bodyElementDetected && rootElementDetected) {
	          // If both body and root have been found, any other checks are pointless,
	          // as no animation data should live outside the application
	          break;
	        }
	
	        if (!rootElementDetected) {
	          // If no rootElement is detected, check if the parentElement is pinned to another element
	          parentHost = jqLite.data(parentElement, NG_ANIMATE_PIN_DATA);
	          if (parentHost) {
	            // The pin target element becomes the next parent element
	            parentElement = getDomNode(parentHost);
	            continue;
	          }
	        }
	
	        parentElement = parentElement.parentNode;
	      }
	
	      var allowAnimation = (!parentAnimationDetected || animateChildren) && elementDisabled !== true;
	      return allowAnimation && rootElementDetected && bodyElementDetected;
	    }
	
	    function markElementAnimationState(element, state, details) {
	      details = details || {};
	      details.state = state;
	
	      var node = getDomNode(element);
	      node.setAttribute(NG_ANIMATE_ATTR_NAME, state);
	
	      var oldValue = activeAnimationsLookup.get(node);
	      var newValue = oldValue
	          ? extend(oldValue, details)
	          : details;
	      activeAnimationsLookup.put(node, newValue);
	    }
	  }];
	}];
	
	var $$AnimationProvider = ['$animateProvider', function($animateProvider) {
	  var NG_ANIMATE_REF_ATTR = 'ng-animate-ref';
	
	  var drivers = this.drivers = [];
	
	  var RUNNER_STORAGE_KEY = '$$animationRunner';
	
	  function setRunner(element, runner) {
	    element.data(RUNNER_STORAGE_KEY, runner);
	  }
	
	  function removeRunner(element) {
	    element.removeData(RUNNER_STORAGE_KEY);
	  }
	
	  function getRunner(element) {
	    return element.data(RUNNER_STORAGE_KEY);
	  }
	
	  this.$get = ['$$jqLite', '$rootScope', '$injector', '$$AnimateRunner', '$$HashMap', '$$rAFScheduler',
	       function($$jqLite,   $rootScope,   $injector,   $$AnimateRunner,   $$HashMap,   $$rAFScheduler) {
	
	    var animationQueue = [];
	    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
	
	    function sortAnimations(animations) {
	      var tree = { children: [] };
	      var i, lookup = new $$HashMap();
	
	      // this is done first beforehand so that the hashmap
	      // is filled with a list of the elements that will be animated
	      for (i = 0; i < animations.length; i++) {
	        var animation = animations[i];
	        lookup.put(animation.domNode, animations[i] = {
	          domNode: animation.domNode,
	          fn: animation.fn,
	          children: []
	        });
	      }
	
	      for (i = 0; i < animations.length; i++) {
	        processNode(animations[i]);
	      }
	
	      return flatten(tree);
	
	      function processNode(entry) {
	        if (entry.processed) return entry;
	        entry.processed = true;
	
	        var elementNode = entry.domNode;
	        var parentNode = elementNode.parentNode;
	        lookup.put(elementNode, entry);
	
	        var parentEntry;
	        while (parentNode) {
	          parentEntry = lookup.get(parentNode);
	          if (parentEntry) {
	            if (!parentEntry.processed) {
	              parentEntry = processNode(parentEntry);
	            }
	            break;
	          }
	          parentNode = parentNode.parentNode;
	        }
	
	        (parentEntry || tree).children.push(entry);
	        return entry;
	      }
	
	      function flatten(tree) {
	        var result = [];
	        var queue = [];
	        var i;
	
	        for (i = 0; i < tree.children.length; i++) {
	          queue.push(tree.children[i]);
	        }
	
	        var remainingLevelEntries = queue.length;
	        var nextLevelEntries = 0;
	        var row = [];
	
	        for (i = 0; i < queue.length; i++) {
	          var entry = queue[i];
	          if (remainingLevelEntries <= 0) {
	            remainingLevelEntries = nextLevelEntries;
	            nextLevelEntries = 0;
	            result.push(row);
	            row = [];
	          }
	          row.push(entry.fn);
	          entry.children.forEach(function(childEntry) {
	            nextLevelEntries++;
	            queue.push(childEntry);
	          });
	          remainingLevelEntries--;
	        }
	
	        if (row.length) {
	          result.push(row);
	        }
	
	        return result;
	      }
	    }
	
	    // TODO(matsko): document the signature in a better way
	    return function(element, event, options) {
	      options = prepareAnimationOptions(options);
	      var isStructural = ['enter', 'move', 'leave'].indexOf(event) >= 0;
	
	      // there is no animation at the current moment, however
	      // these runner methods will get later updated with the
	      // methods leading into the driver's end/cancel methods
	      // for now they just stop the animation from starting
	      var runner = new $$AnimateRunner({
	        end: function() { close(); },
	        cancel: function() { close(true); }
	      });
	
	      if (!drivers.length) {
	        close();
	        return runner;
	      }
	
	      setRunner(element, runner);
	
	      var classes = mergeClasses(element.attr('class'), mergeClasses(options.addClass, options.removeClass));
	      var tempClasses = options.tempClasses;
	      if (tempClasses) {
	        classes += ' ' + tempClasses;
	        options.tempClasses = null;
	      }
	
	      var prepareClassName;
	      if (isStructural) {
	        prepareClassName = 'ng-' + event + PREPARE_CLASS_SUFFIX;
	        $$jqLite.addClass(element, prepareClassName);
	      }
	
	      animationQueue.push({
	        // this data is used by the postDigest code and passed into
	        // the driver step function
	        element: element,
	        classes: classes,
	        event: event,
	        structural: isStructural,
	        options: options,
	        beforeStart: beforeStart,
	        close: close
	      });
	
	      element.on('$destroy', handleDestroyedElement);
	
	      // we only want there to be one function called within the post digest
	      // block. This way we can group animations for all the animations that
	      // were apart of the same postDigest flush call.
	      if (animationQueue.length > 1) return runner;
	
	      $rootScope.$$postDigest(function() {
	        var animations = [];
	        forEach(animationQueue, function(entry) {
	          // the element was destroyed early on which removed the runner
	          // form its storage. This means we can't animate this element
	          // at all and it already has been closed due to destruction.
	          if (getRunner(entry.element)) {
	            animations.push(entry);
	          } else {
	            entry.close();
	          }
	        });
	
	        // now any future animations will be in another postDigest
	        animationQueue.length = 0;
	
	        var groupedAnimations = groupAnimations(animations);
	        var toBeSortedAnimations = [];
	
	        forEach(groupedAnimations, function(animationEntry) {
	          toBeSortedAnimations.push({
	            domNode: getDomNode(animationEntry.from ? animationEntry.from.element : animationEntry.element),
	            fn: function triggerAnimationStart() {
	              // it's important that we apply the `ng-animate` CSS class and the
	              // temporary classes before we do any driver invoking since these
	              // CSS classes may be required for proper CSS detection.
	              animationEntry.beforeStart();
	
	              var startAnimationFn, closeFn = animationEntry.close;
	
	              // in the event that the element was removed before the digest runs or
	              // during the RAF sequencing then we should not trigger the animation.
	              var targetElement = animationEntry.anchors
	                  ? (animationEntry.from.element || animationEntry.to.element)
	                  : animationEntry.element;
	
	              if (getRunner(targetElement)) {
	                var operation = invokeFirstDriver(animationEntry);
	                if (operation) {
	                  startAnimationFn = operation.start;
	                }
	              }
	
	              if (!startAnimationFn) {
	                closeFn();
	              } else {
	                var animationRunner = startAnimationFn();
	                animationRunner.done(function(status) {
	                  closeFn(!status);
	                });
	                updateAnimationRunners(animationEntry, animationRunner);
	              }
	            }
	          });
	        });
	
	        // we need to sort each of the animations in order of parent to child
	        // relationships. This ensures that the child classes are applied at the
	        // right time.
	        $$rAFScheduler(sortAnimations(toBeSortedAnimations));
	      });
	
	      return runner;
	
	      // TODO(matsko): change to reference nodes
	      function getAnchorNodes(node) {
	        var SELECTOR = '[' + NG_ANIMATE_REF_ATTR + ']';
	        var items = node.hasAttribute(NG_ANIMATE_REF_ATTR)
	              ? [node]
	              : node.querySelectorAll(SELECTOR);
	        var anchors = [];
	        forEach(items, function(node) {
	          var attr = node.getAttribute(NG_ANIMATE_REF_ATTR);
	          if (attr && attr.length) {
	            anchors.push(node);
	          }
	        });
	        return anchors;
	      }
	
	      function groupAnimations(animations) {
	        var preparedAnimations = [];
	        var refLookup = {};
	        forEach(animations, function(animation, index) {
	          var element = animation.element;
	          var node = getDomNode(element);
	          var event = animation.event;
	          var enterOrMove = ['enter', 'move'].indexOf(event) >= 0;
	          var anchorNodes = animation.structural ? getAnchorNodes(node) : [];
	
	          if (anchorNodes.length) {
	            var direction = enterOrMove ? 'to' : 'from';
	
	            forEach(anchorNodes, function(anchor) {
	              var key = anchor.getAttribute(NG_ANIMATE_REF_ATTR);
	              refLookup[key] = refLookup[key] || {};
	              refLookup[key][direction] = {
	                animationID: index,
	                element: jqLite(anchor)
	              };
	            });
	          } else {
	            preparedAnimations.push(animation);
	          }
	        });
	
	        var usedIndicesLookup = {};
	        var anchorGroups = {};
	        forEach(refLookup, function(operations, key) {
	          var from = operations.from;
	          var to = operations.to;
	
	          if (!from || !to) {
	            // only one of these is set therefore we can't have an
	            // anchor animation since all three pieces are required
	            var index = from ? from.animationID : to.animationID;
	            var indexKey = index.toString();
	            if (!usedIndicesLookup[indexKey]) {
	              usedIndicesLookup[indexKey] = true;
	              preparedAnimations.push(animations[index]);
	            }
	            return;
	          }
	
	          var fromAnimation = animations[from.animationID];
	          var toAnimation = animations[to.animationID];
	          var lookupKey = from.animationID.toString();
	          if (!anchorGroups[lookupKey]) {
	            var group = anchorGroups[lookupKey] = {
	              structural: true,
	              beforeStart: function() {
	                fromAnimation.beforeStart();
	                toAnimation.beforeStart();
	              },
	              close: function() {
	                fromAnimation.close();
	                toAnimation.close();
	              },
	              classes: cssClassesIntersection(fromAnimation.classes, toAnimation.classes),
	              from: fromAnimation,
	              to: toAnimation,
	              anchors: [] // TODO(matsko): change to reference nodes
	            };
	
	            // the anchor animations require that the from and to elements both have at least
	            // one shared CSS class which effectively marries the two elements together to use
	            // the same animation driver and to properly sequence the anchor animation.
	            if (group.classes.length) {
	              preparedAnimations.push(group);
	            } else {
	              preparedAnimations.push(fromAnimation);
	              preparedAnimations.push(toAnimation);
	            }
	          }
	
	          anchorGroups[lookupKey].anchors.push({
	            'out': from.element, 'in': to.element
	          });
	        });
	
	        return preparedAnimations;
	      }
	
	      function cssClassesIntersection(a,b) {
	        a = a.split(' ');
	        b = b.split(' ');
	        var matches = [];
	
	        for (var i = 0; i < a.length; i++) {
	          var aa = a[i];
	          if (aa.substring(0,3) === 'ng-') continue;
	
	          for (var j = 0; j < b.length; j++) {
	            if (aa === b[j]) {
	              matches.push(aa);
	              break;
	            }
	          }
	        }
	
	        return matches.join(' ');
	      }
	
	      function invokeFirstDriver(animationDetails) {
	        // we loop in reverse order since the more general drivers (like CSS and JS)
	        // may attempt more elements, but custom drivers are more particular
	        for (var i = drivers.length - 1; i >= 0; i--) {
	          var driverName = drivers[i];
	          if (!$injector.has(driverName)) continue; // TODO(matsko): remove this check
	
	          var factory = $injector.get(driverName);
	          var driver = factory(animationDetails);
	          if (driver) {
	            return driver;
	          }
	        }
	      }
	
	      function beforeStart() {
	        element.addClass(NG_ANIMATE_CLASSNAME);
	        if (tempClasses) {
	          $$jqLite.addClass(element, tempClasses);
	        }
	        if (prepareClassName) {
	          $$jqLite.removeClass(element, prepareClassName);
	          prepareClassName = null;
	        }
	      }
	
	      function updateAnimationRunners(animation, newRunner) {
	        if (animation.from && animation.to) {
	          update(animation.from.element);
	          update(animation.to.element);
	        } else {
	          update(animation.element);
	        }
	
	        function update(element) {
	          getRunner(element).setHost(newRunner);
	        }
	      }
	
	      function handleDestroyedElement() {
	        var runner = getRunner(element);
	        if (runner && (event !== 'leave' || !options.$$domOperationFired)) {
	          runner.end();
	        }
	      }
	
	      function close(rejected) { // jshint ignore:line
	        element.off('$destroy', handleDestroyedElement);
	        removeRunner(element);
	
	        applyAnimationClasses(element, options);
	        applyAnimationStyles(element, options);
	        options.domOperation();
	
	        if (tempClasses) {
	          $$jqLite.removeClass(element, tempClasses);
	        }
	
	        element.removeClass(NG_ANIMATE_CLASSNAME);
	        runner.complete(!rejected);
	      }
	    };
	  }];
	}];
	
	/**
	 * @ngdoc directive
	 * @name ngAnimateSwap
	 * @restrict A
	 * @scope
	 *
	 * @description
	 *
	 * ngAnimateSwap is a animation-oriented directive that allows for the container to
	 * be removed and entered in whenever the associated expression changes. A
	 * common usecase for this directive is a rotating banner or slider component which
	 * contains one image being present at a time. When the active image changes
	 * then the old image will perform a `leave` animation and the new element
	 * will be inserted via an `enter` animation.
	 *
	 * @animations
	 * | Animation                        | Occurs                               |
	 * |----------------------------------|--------------------------------------|
	 * | {@link ng.$animate#enter enter}  | when the new element is inserted to the DOM  |
	 * | {@link ng.$animate#leave leave}  | when the old element is removed from the DOM |
	 *
	 * @example
	 * <example name="ngAnimateSwap-directive" module="ngAnimateSwapExample"
	 *          deps="angular-animate.js"
	 *          animations="true" fixBase="true">
	 *   <file name="index.html">
	 *     <div class="container" ng-controller="AppCtrl">
	 *       <div ng-animate-swap="number" class="cell swap-animation" ng-class="colorClass(number)">
	 *         {{ number }}
	 *       </div>
	 *     </div>
	 *   </file>
	 *   <file name="script.js">
	 *     angular.module('ngAnimateSwapExample', ['ngAnimate'])
	 *       .controller('AppCtrl', ['$scope', '$interval', function($scope, $interval) {
	 *         $scope.number = 0;
	 *         $interval(function() {
	 *           $scope.number++;
	 *         }, 1000);
	 *
	 *         var colors = ['red','blue','green','yellow','orange'];
	 *         $scope.colorClass = function(number) {
	 *           return colors[number % colors.length];
	 *         };
	 *       }]);
	 *   </file>
	 *  <file name="animations.css">
	 *  .container {
	 *    height:250px;
	 *    width:250px;
	 *    position:relative;
	 *    overflow:hidden;
	 *    border:2px solid black;
	 *  }
	 *  .container .cell {
	 *    font-size:150px;
	 *    text-align:center;
	 *    line-height:250px;
	 *    position:absolute;
	 *    top:0;
	 *    left:0;
	 *    right:0;
	 *    border-bottom:2px solid black;
	 *  }
	 *  .swap-animation.ng-enter, .swap-animation.ng-leave {
	 *    transition:0.5s linear all;
	 *  }
	 *  .swap-animation.ng-enter {
	 *    top:-250px;
	 *  }
	 *  .swap-animation.ng-enter-active {
	 *    top:0px;
	 *  }
	 *  .swap-animation.ng-leave {
	 *    top:0px;
	 *  }
	 *  .swap-animation.ng-leave-active {
	 *    top:250px;
	 *  }
	 *  .red { background:red; }
	 *  .green { background:green; }
	 *  .blue { background:blue; }
	 *  .yellow { background:yellow; }
	 *  .orange { background:orange; }
	 *  </file>
	 * </example>
	 */
	var ngAnimateSwapDirective = ['$animate', '$rootScope', function($animate, $rootScope) {
	  return {
	    restrict: 'A',
	    transclude: 'element',
	    terminal: true,
	    priority: 600, // we use 600 here to ensure that the directive is caught before others
	    link: function(scope, $element, attrs, ctrl, $transclude) {
	      var previousElement, previousScope;
	      scope.$watchCollection(attrs.ngAnimateSwap || attrs['for'], function(value) {
	        if (previousElement) {
	          $animate.leave(previousElement);
	        }
	        if (previousScope) {
	          previousScope.$destroy();
	          previousScope = null;
	        }
	        if (value || value === 0) {
	          previousScope = scope.$new();
	          $transclude(previousScope, function(element) {
	            previousElement = element;
	            $animate.enter(element, null, $element);
	          });
	        }
	      });
	    }
	  };
	}];
	
	/* global angularAnimateModule: true,
	
	   ngAnimateSwapDirective,
	   $$AnimateAsyncRunFactory,
	   $$rAFSchedulerFactory,
	   $$AnimateChildrenDirective,
	   $$AnimateQueueProvider,
	   $$AnimationProvider,
	   $AnimateCssProvider,
	   $$AnimateCssDriverProvider,
	   $$AnimateJsProvider,
	   $$AnimateJsDriverProvider,
	*/
	
	/**
	 * @ngdoc module
	 * @name ngAnimate
	 * @description
	 *
	 * The `ngAnimate` module provides support for CSS-based animations (keyframes and transitions) as well as JavaScript-based animations via
	 * callback hooks. Animations are not enabled by default, however, by including `ngAnimate` the animation hooks are enabled for an Angular app.
	 *
	 * <div doc-module-components="ngAnimate"></div>
	 *
	 * # Usage
	 * Simply put, there are two ways to make use of animations when ngAnimate is used: by using **CSS** and **JavaScript**. The former works purely based
	 * using CSS (by using matching CSS selectors/styles) and the latter triggers animations that are registered via `module.animation()`. For
	 * both CSS and JS animations the sole requirement is to have a matching `CSS class` that exists both in the registered animation and within
	 * the HTML element that the animation will be triggered on.
	 *
	 * ## Directive Support
	 * The following directives are "animation aware":
	 *
	 * | Directive                                                                                                | Supported Animations                                                     |
	 * |----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
	 * | {@link ng.directive:ngRepeat#animations ngRepeat}                                                        | enter, leave and move                                                    |
	 * | {@link ngRoute.directive:ngView#animations ngView}                                                       | enter and leave                                                          |
	 * | {@link ng.directive:ngInclude#animations ngInclude}                                                      | enter and leave                                                          |
	 * | {@link ng.directive:ngSwitch#animations ngSwitch}                                                        | enter and leave                                                          |
	 * | {@link ng.directive:ngIf#animations ngIf}                                                                | enter and leave                                                          |
	 * | {@link ng.directive:ngClass#animations ngClass}                                                          | add and remove (the CSS class(es) present)                               |
	 * | {@link ng.directive:ngShow#animations ngShow} & {@link ng.directive:ngHide#animations ngHide}            | add and remove (the ng-hide class value)                                 |
	 * | {@link ng.directive:form#animation-hooks form} & {@link ng.directive:ngModel#animation-hooks ngModel}    | add and remove (dirty, pristine, valid, invalid & all other validations) |
	 * | {@link module:ngMessages#animations ngMessages}                                                          | add and remove (ng-active & ng-inactive)                                 |
	 * | {@link module:ngMessages#animations ngMessage}                                                           | enter and leave                                                          |
	 *
	 * (More information can be found by visiting each the documentation associated with each directive.)
	 *
	 * ## CSS-based Animations
	 *
	 * CSS-based animations with ngAnimate are unique since they require no JavaScript code at all. By using a CSS class that we reference between our HTML
	 * and CSS code we can create an animation that will be picked up by Angular when an the underlying directive performs an operation.
	 *
	 * The example below shows how an `enter` animation can be made possible on an element using `ng-if`:
	 *
	 * ```html
	 * <div ng-if="bool" class="fade">
	 *    Fade me in out
	 * </div>
	 * <button ng-click="bool=true">Fade In!</button>
	 * <button ng-click="bool=false">Fade Out!</button>
	 * ```
	 *
	 * Notice the CSS class **fade**? We can now create the CSS transition code that references this class:
	 *
	 * ```css
	 * /&#42; The starting CSS styles for the enter animation &#42;/
	 * .fade.ng-enter {
	 *   transition:0.5s linear all;
	 *   opacity:0;
	 * }
	 *
	 * /&#42; The finishing CSS styles for the enter animation &#42;/
	 * .fade.ng-enter.ng-enter-active {
	 *   opacity:1;
	 * }
	 * ```
	 *
	 * The key thing to remember here is that, depending on the animation event (which each of the directives above trigger depending on what's going on) two
	 * generated CSS classes will be applied to the element; in the example above we have `.ng-enter` and `.ng-enter-active`. For CSS transitions, the transition
	 * code **must** be defined within the starting CSS class (in this case `.ng-enter`). The destination class is what the transition will animate towards.
	 *
	 * If for example we wanted to create animations for `leave` and `move` (ngRepeat triggers move) then we can do so using the same CSS naming conventions:
	 *
	 * ```css
	 * /&#42; now the element will fade out before it is removed from the DOM &#42;/
	 * .fade.ng-leave {
	 *   transition:0.5s linear all;
	 *   opacity:1;
	 * }
	 * .fade.ng-leave.ng-leave-active {
	 *   opacity:0;
	 * }
	 * ```
	 *
	 * We can also make use of **CSS Keyframes** by referencing the keyframe animation within the starting CSS class:
	 *
	 * ```css
	 * /&#42; there is no need to define anything inside of the destination
	 * CSS class since the keyframe will take charge of the animation &#42;/
	 * .fade.ng-leave {
	 *   animation: my_fade_animation 0.5s linear;
	 *   -webkit-animation: my_fade_animation 0.5s linear;
	 * }
	 *
	 * @keyframes my_fade_animation {
	 *   from { opacity:1; }
	 *   to { opacity:0; }
	 * }
	 *
	 * @-webkit-keyframes my_fade_animation {
	 *   from { opacity:1; }
	 *   to { opacity:0; }
	 * }
	 * ```
	 *
	 * Feel free also mix transitions and keyframes together as well as any other CSS classes on the same element.
	 *
	 * ### CSS Class-based Animations
	 *
	 * Class-based animations (animations that are triggered via `ngClass`, `ngShow`, `ngHide` and some other directives) have a slightly different
	 * naming convention. Class-based animations are basic enough that a standard transition or keyframe can be referenced on the class being added
	 * and removed.
	 *
	 * For example if we wanted to do a CSS animation for `ngHide` then we place an animation on the `.ng-hide` CSS class:
	 *
	 * ```html
	 * <div ng-show="bool" class="fade">
	 *   Show and hide me
	 * </div>
	 * <button ng-click="bool=!bool">Toggle</button>
	 *
	 * <style>
	 * .fade.ng-hide {
	 *   transition:0.5s linear all;
	 *   opacity:0;
	 * }
	 * </style>
	 * ```
	 *
	 * All that is going on here with ngShow/ngHide behind the scenes is the `.ng-hide` class is added/removed (when the hidden state is valid). Since
	 * ngShow and ngHide are animation aware then we can match up a transition and ngAnimate handles the rest.
	 *
	 * In addition the addition and removal of the CSS class, ngAnimate also provides two helper methods that we can use to further decorate the animation
	 * with CSS styles.
	 *
	 * ```html
	 * <div ng-class="{on:onOff}" class="highlight">
	 *   Highlight this box
	 * </div>
	 * <button ng-click="onOff=!onOff">Toggle</button>
	 *
	 * <style>
	 * .highlight {
	 *   transition:0.5s linear all;
	 * }
	 * .highlight.on-add {
	 *   background:white;
	 * }
	 * .highlight.on {
	 *   background:yellow;
	 * }
	 * .highlight.on-remove {
	 *   background:black;
	 * }
	 * </style>
	 * ```
	 *
	 * We can also make use of CSS keyframes by placing them within the CSS classes.
	 *
	 *
	 * ### CSS Staggering Animations
	 * A Staggering animation is a collection of animations that are issued with a slight delay in between each successive operation resulting in a
	 * curtain-like effect. The ngAnimate module (versions >=1.2) supports staggering animations and the stagger effect can be
	 * performed by creating a **ng-EVENT-stagger** CSS class and attaching that class to the base CSS class used for
	 * the animation. The style property expected within the stagger class can either be a **transition-delay** or an
	 * **animation-delay** property (or both if your animation contains both transitions and keyframe animations).
	 *
	 * ```css
	 * .my-animation.ng-enter {
	 *   /&#42; standard transition code &#42;/
	 *   transition: 1s linear all;
	 *   opacity:0;
	 * }
	 * .my-animation.ng-enter-stagger {
	 *   /&#42; this will have a 100ms delay between each successive leave animation &#42;/
	 *   transition-delay: 0.1s;
	 *
	 *   /&#42; As of 1.4.4, this must always be set: it signals ngAnimate
	 *     to not accidentally inherit a delay property from another CSS class &#42;/
	 *   transition-duration: 0s;
	 * }
	 * .my-animation.ng-enter.ng-enter-active {
	 *   /&#42; standard transition styles &#42;/
	 *   opacity:1;
	 * }
	 * ```
	 *
	 * Staggering animations work by default in ngRepeat (so long as the CSS class is defined). Outside of ngRepeat, to use staggering animations
	 * on your own, they can be triggered by firing multiple calls to the same event on $animate. However, the restrictions surrounding this
	 * are that each of the elements must have the same CSS className value as well as the same parent element. A stagger operation
	 * will also be reset if one or more animation frames have passed since the multiple calls to `$animate` were fired.
	 *
	 * The following code will issue the **ng-leave-stagger** event on the element provided:
	 *
	 * ```js
	 * var kids = parent.children();
	 *
	 * $animate.leave(kids[0]); //stagger index=0
	 * $animate.leave(kids[1]); //stagger index=1
	 * $animate.leave(kids[2]); //stagger index=2
	 * $animate.leave(kids[3]); //stagger index=3
	 * $animate.leave(kids[4]); //stagger index=4
	 *
	 * window.requestAnimationFrame(function() {
	 *   //stagger has reset itself
	 *   $animate.leave(kids[5]); //stagger index=0
	 *   $animate.leave(kids[6]); //stagger index=1
	 *
	 *   $scope.$digest();
	 * });
	 * ```
	 *
	 * Stagger animations are currently only supported within CSS-defined animations.
	 *
	 * ### The `ng-animate` CSS class
	 *
	 * When ngAnimate is animating an element it will apply the `ng-animate` CSS class to the element for the duration of the animation.
	 * This is a temporary CSS class and it will be removed once the animation is over (for both JavaScript and CSS-based animations).
	 *
	 * Therefore, animations can be applied to an element using this temporary class directly via CSS.
	 *
	 * ```css
	 * .zipper.ng-animate {
	 *   transition:0.5s linear all;
	 * }
	 * .zipper.ng-enter {
	 *   opacity:0;
	 * }
	 * .zipper.ng-enter.ng-enter-active {
	 *   opacity:1;
	 * }
	 * .zipper.ng-leave {
	 *   opacity:1;
	 * }
	 * .zipper.ng-leave.ng-leave-active {
	 *   opacity:0;
	 * }
	 * ```
	 *
	 * (Note that the `ng-animate` CSS class is reserved and it cannot be applied on an element directly since ngAnimate will always remove
	 * the CSS class once an animation has completed.)
	 *
	 *
	 * ### The `ng-[event]-prepare` class
	 *
	 * This is a special class that can be used to prevent unwanted flickering / flash of content before
	 * the actual animation starts. The class is added as soon as an animation is initialized, but removed
	 * before the actual animation starts (after waiting for a $digest).
	 * It is also only added for *structural* animations (`enter`, `move`, and `leave`).
	 *
	 * In practice, flickering can appear when nesting elements with structural animations such as `ngIf`
	 * into elements that have class-based animations such as `ngClass`.
	 *
	 * ```html
	 * <div ng-class="{red: myProp}">
	 *   <div ng-class="{blue: myProp}">
	 *     <div class="message" ng-if="myProp"></div>
	 *   </div>
	 * </div>
	 * ```
	 *
	 * It is possible that during the `enter` animation, the `.message` div will be briefly visible before it starts animating.
	 * In that case, you can add styles to the CSS that make sure the element stays hidden before the animation starts:
	 *
	 * ```css
	 * .message.ng-enter-prepare {
	 *   opacity: 0;
	 * }
	 *
	 * ```
	 *
	 * ## JavaScript-based Animations
	 *
	 * ngAnimate also allows for animations to be consumed by JavaScript code. The approach is similar to CSS-based animations (where there is a shared
	 * CSS class that is referenced in our HTML code) but in addition we need to register the JavaScript animation on the module. By making use of the
	 * `module.animation()` module function we can register the animation.
	 *
	 * Let's see an example of a enter/leave animation using `ngRepeat`:
	 *
	 * ```html
	 * <div ng-repeat="item in items" class="slide">
	 *   {{ item }}
	 * </div>
	 * ```
	 *
	 * See the **slide** CSS class? Let's use that class to define an animation that we'll structure in our module code by using `module.animation`:
	 *
	 * ```js
	 * myModule.animation('.slide', [function() {
	 *   return {
	 *     // make note that other events (like addClass/removeClass)
	 *     // have different function input parameters
	 *     enter: function(element, doneFn) {
	 *       jQuery(element).fadeIn(1000, doneFn);
	 *
	 *       // remember to call doneFn so that angular
	 *       // knows that the animation has concluded
	 *     },
	 *
	 *     move: function(element, doneFn) {
	 *       jQuery(element).fadeIn(1000, doneFn);
	 *     },
	 *
	 *     leave: function(element, doneFn) {
	 *       jQuery(element).fadeOut(1000, doneFn);
	 *     }
	 *   }
	 * }]);
	 * ```
	 *
	 * The nice thing about JS-based animations is that we can inject other services and make use of advanced animation libraries such as
	 * greensock.js and velocity.js.
	 *
	 * If our animation code class-based (meaning that something like `ngClass`, `ngHide` and `ngShow` triggers it) then we can still define
	 * our animations inside of the same registered animation, however, the function input arguments are a bit different:
	 *
	 * ```html
	 * <div ng-class="color" class="colorful">
	 *   this box is moody
	 * </div>
	 * <button ng-click="color='red'">Change to red</button>
	 * <button ng-click="color='blue'">Change to blue</button>
	 * <button ng-click="color='green'">Change to green</button>
	 * ```
	 *
	 * ```js
	 * myModule.animation('.colorful', [function() {
	 *   return {
	 *     addClass: function(element, className, doneFn) {
	 *       // do some cool animation and call the doneFn
	 *     },
	 *     removeClass: function(element, className, doneFn) {
	 *       // do some cool animation and call the doneFn
	 *     },
	 *     setClass: function(element, addedClass, removedClass, doneFn) {
	 *       // do some cool animation and call the doneFn
	 *     }
	 *   }
	 * }]);
	 * ```
	 *
	 * ## CSS + JS Animations Together
	 *
	 * AngularJS 1.4 and higher has taken steps to make the amalgamation of CSS and JS animations more flexible. However, unlike earlier versions of Angular,
	 * defining CSS and JS animations to work off of the same CSS class will not work anymore. Therefore the example below will only result in **JS animations taking
	 * charge of the animation**:
	 *
	 * ```html
	 * <div ng-if="bool" class="slide">
	 *   Slide in and out
	 * </div>
	 * ```
	 *
	 * ```js
	 * myModule.animation('.slide', [function() {
	 *   return {
	 *     enter: function(element, doneFn) {
	 *       jQuery(element).slideIn(1000, doneFn);
	 *     }
	 *   }
	 * }]);
	 * ```
	 *
	 * ```css
	 * .slide.ng-enter {
	 *   transition:0.5s linear all;
	 *   transform:translateY(-100px);
	 * }
	 * .slide.ng-enter.ng-enter-active {
	 *   transform:translateY(0);
	 * }
	 * ```
	 *
	 * Does this mean that CSS and JS animations cannot be used together? Do JS-based animations always have higher priority? We can make up for the
	 * lack of CSS animations by using the `$animateCss` service to trigger our own tweaked-out, CSS-based animations directly from
	 * our own JS-based animation code:
	 *
	 * ```js
	 * myModule.animation('.slide', ['$animateCss', function($animateCss) {
	 *   return {
	 *     enter: function(element) {
	*        // this will trigger `.slide.ng-enter` and `.slide.ng-enter-active`.
	 *       return $animateCss(element, {
	 *         event: 'enter',
	 *         structural: true
	 *       });
	 *     }
	 *   }
	 * }]);
	 * ```
	 *
	 * The nice thing here is that we can save bandwidth by sticking to our CSS-based animation code and we don't need to rely on a 3rd-party animation framework.
	 *
	 * The `$animateCss` service is very powerful since we can feed in all kinds of extra properties that will be evaluated and fed into a CSS transition or
	 * keyframe animation. For example if we wanted to animate the height of an element while adding and removing classes then we can do so by providing that
	 * data into `$animateCss` directly:
	 *
	 * ```js
	 * myModule.animation('.slide', ['$animateCss', function($animateCss) {
	 *   return {
	 *     enter: function(element) {
	 *       return $animateCss(element, {
	 *         event: 'enter',
	 *         structural: true,
	 *         addClass: 'maroon-setting',
	 *         from: { height:0 },
	 *         to: { height: 200 }
	 *       });
	 *     }
	 *   }
	 * }]);
	 * ```
	 *
	 * Now we can fill in the rest via our transition CSS code:
	 *
	 * ```css
	 * /&#42; the transition tells ngAnimate to make the animation happen &#42;/
	 * .slide.ng-enter { transition:0.5s linear all; }
	 *
	 * /&#42; this extra CSS class will be absorbed into the transition
	 * since the $animateCss code is adding the class &#42;/
	 * .maroon-setting { background:red; }
	 * ```
	 *
	 * And `$animateCss` will figure out the rest. Just make sure to have the `done()` callback fire the `doneFn` function to signal when the animation is over.
	 *
	 * To learn more about what's possible be sure to visit the {@link ngAnimate.$animateCss $animateCss service}.
	 *
	 * ## Animation Anchoring (via `ng-animate-ref`)
	 *
	 * ngAnimate in AngularJS 1.4 comes packed with the ability to cross-animate elements between
	 * structural areas of an application (like views) by pairing up elements using an attribute
	 * called `ng-animate-ref`.
	 *
	 * Let's say for example we have two views that are managed by `ng-view` and we want to show
	 * that there is a relationship between two components situated in within these views. By using the
	 * `ng-animate-ref` attribute we can identify that the two components are paired together and we
	 * can then attach an animation, which is triggered when the view changes.
	 *
	 * Say for example we have the following template code:
	 *
	 * ```html
	 * <!-- index.html -->
	 * <div ng-view class="view-animation">
	 * </div>
	 *
	 * <!-- home.html -->
	 * <a href="#/banner-page">
	 *   <img src="./banner.jpg" class="banner" ng-animate-ref="banner">
	 * </a>
	 *
	 * <!-- banner-page.html -->
	 * <img src="./banner.jpg" class="banner" ng-animate-ref="banner">
	 * ```
	 *
	 * Now, when the view changes (once the link is clicked), ngAnimate will examine the
	 * HTML contents to see if there is a match reference between any components in the view
	 * that is leaving and the view that is entering. It will scan both the view which is being
	 * removed (leave) and inserted (enter) to see if there are any paired DOM elements that
	 * contain a matching ref value.
	 *
	 * The two images match since they share the same ref value. ngAnimate will now create a
	 * transport element (which is a clone of the first image element) and it will then attempt
	 * to animate to the position of the second image element in the next view. For the animation to
	 * work a special CSS class called `ng-anchor` will be added to the transported element.
	 *
	 * We can now attach a transition onto the `.banner.ng-anchor` CSS class and then
	 * ngAnimate will handle the entire transition for us as well as the addition and removal of
	 * any changes of CSS classes between the elements:
	 *
	 * ```css
	 * .banner.ng-anchor {
	 *   /&#42; this animation will last for 1 second since there are
	 *          two phases to the animation (an `in` and an `out` phase) &#42;/
	 *   transition:0.5s linear all;
	 * }
	 * ```
	 *
	 * We also **must** include animations for the views that are being entered and removed
	 * (otherwise anchoring wouldn't be possible since the new view would be inserted right away).
	 *
	 * ```css
	 * .view-animation.ng-enter, .view-animation.ng-leave {
	 *   transition:0.5s linear all;
	 *   position:fixed;
	 *   left:0;
	 *   top:0;
	 *   width:100%;
	 * }
	 * .view-animation.ng-enter {
	 *   transform:translateX(100%);
	 * }
	 * .view-animation.ng-leave,
	 * .view-animation.ng-enter.ng-enter-active {
	 *   transform:translateX(0%);
	 * }
	 * .view-animation.ng-leave.ng-leave-active {
	 *   transform:translateX(-100%);
	 * }
	 * ```
	 *
	 * Now we can jump back to the anchor animation. When the animation happens, there are two stages that occur:
	 * an `out` and an `in` stage. The `out` stage happens first and that is when the element is animated away
	 * from its origin. Once that animation is over then the `in` stage occurs which animates the
	 * element to its destination. The reason why there are two animations is to give enough time
	 * for the enter animation on the new element to be ready.
	 *
	 * The example above sets up a transition for both the in and out phases, but we can also target the out or
	 * in phases directly via `ng-anchor-out` and `ng-anchor-in`.
	 *
	 * ```css
	 * .banner.ng-anchor-out {
	 *   transition: 0.5s linear all;
	 *
	 *   /&#42; the scale will be applied during the out animation,
	 *          but will be animated away when the in animation runs &#42;/
	 *   transform: scale(1.2);
	 * }
	 *
	 * .banner.ng-anchor-in {
	 *   transition: 1s linear all;
	 * }
	 * ```
	 *
	 *
	 *
	 *
	 * ### Anchoring Demo
	 *
	  <example module="anchoringExample"
	           name="anchoringExample"
	           id="anchoringExample"
	           deps="angular-animate.js;angular-route.js"
	           animations="true">
	    <file name="index.html">
	      <a href="#/">Home</a>
	      <hr />
	      <div class="view-container">
	        <div ng-view class="view"></div>
	      </div>
	    </file>
	    <file name="script.js">
	      angular.module('anchoringExample', ['ngAnimate', 'ngRoute'])
	        .config(['$routeProvider', function($routeProvider) {
	          $routeProvider.when('/', {
	            templateUrl: 'home.html',
	            controller: 'HomeController as home'
	          });
	          $routeProvider.when('/profile/:id', {
	            templateUrl: 'profile.html',
	            controller: 'ProfileController as profile'
	          });
	        }])
	        .run(['$rootScope', function($rootScope) {
	          $rootScope.records = [
	            { id:1, title: "Miss Beulah Roob" },
	            { id:2, title: "Trent Morissette" },
	            { id:3, title: "Miss Ava Pouros" },
	            { id:4, title: "Rod Pouros" },
	            { id:5, title: "Abdul Rice" },
	            { id:6, title: "Laurie Rutherford Sr." },
	            { id:7, title: "Nakia McLaughlin" },
	            { id:8, title: "Jordon Blanda DVM" },
	            { id:9, title: "Rhoda Hand" },
	            { id:10, title: "Alexandrea Sauer" }
	          ];
	        }])
	        .controller('HomeController', [function() {
	          //empty
	        }])
	        .controller('ProfileController', ['$rootScope', '$routeParams', function($rootScope, $routeParams) {
	          var index = parseInt($routeParams.id, 10);
	          var record = $rootScope.records[index - 1];
	
	          this.title = record.title;
	          this.id = record.id;
	        }]);
	    </file>
	    <file name="home.html">
	      <h2>Welcome to the home page</h1>
	      <p>Please click on an element</p>
	      <a class="record"
	         ng-href="#/profile/{{ record.id }}"
	         ng-animate-ref="{{ record.id }}"
	         ng-repeat="record in records">
	        {{ record.title }}
	      </a>
	    </file>
	    <file name="profile.html">
	      <div class="profile record" ng-animate-ref="{{ profile.id }}">
	        {{ profile.title }}
	      </div>
	    </file>
	    <file name="animations.css">
	      .record {
	        display:block;
	        font-size:20px;
	      }
	      .profile {
	        background:black;
	        color:white;
	        font-size:100px;
	      }
	      .view-container {
	        position:relative;
	      }
	      .view-container > .view.ng-animate {
	        position:absolute;
	        top:0;
	        left:0;
	        width:100%;
	        min-height:500px;
	      }
	      .view.ng-enter, .view.ng-leave,
	      .record.ng-anchor {
	        transition:0.5s linear all;
	      }
	      .view.ng-enter {
	        transform:translateX(100%);
	      }
	      .view.ng-enter.ng-enter-active, .view.ng-leave {
	        transform:translateX(0%);
	      }
	      .view.ng-leave.ng-leave-active {
	        transform:translateX(-100%);
	      }
	      .record.ng-anchor-out {
	        background:red;
	      }
	    </file>
	  </example>
	 *
	 * ### How is the element transported?
	 *
	 * When an anchor animation occurs, ngAnimate will clone the starting element and position it exactly where the starting
	 * element is located on screen via absolute positioning. The cloned element will be placed inside of the root element
	 * of the application (where ng-app was defined) and all of the CSS classes of the starting element will be applied. The
	 * element will then animate into the `out` and `in` animations and will eventually reach the coordinates and match
	 * the dimensions of the destination element. During the entire animation a CSS class of `.ng-animate-shim` will be applied
	 * to both the starting and destination elements in order to hide them from being visible (the CSS styling for the class
	 * is: `visibility:hidden`). Once the anchor reaches its destination then it will be removed and the destination element
	 * will become visible since the shim class will be removed.
	 *
	 * ### How is the morphing handled?
	 *
	 * CSS Anchoring relies on transitions and keyframes and the internal code is intelligent enough to figure out
	 * what CSS classes differ between the starting element and the destination element. These different CSS classes
	 * will be added/removed on the anchor element and a transition will be applied (the transition that is provided
	 * in the anchor class). Long story short, ngAnimate will figure out what classes to add and remove which will
	 * make the transition of the element as smooth and automatic as possible. Be sure to use simple CSS classes that
	 * do not rely on DOM nesting structure so that the anchor element appears the same as the starting element (since
	 * the cloned element is placed inside of root element which is likely close to the body element).
	 *
	 * Note that if the root element is on the `<html>` element then the cloned node will be placed inside of body.
	 *
	 *
	 * ## Using $animate in your directive code
	 *
	 * So far we've explored how to feed in animations into an Angular application, but how do we trigger animations within our own directives in our application?
	 * By injecting the `$animate` service into our directive code, we can trigger structural and class-based hooks which can then be consumed by animations. Let's
	 * imagine we have a greeting box that shows and hides itself when the data changes
	 *
	 * ```html
	 * <greeting-box active="onOrOff">Hi there</greeting-box>
	 * ```
	 *
	 * ```js
	 * ngModule.directive('greetingBox', ['$animate', function($animate) {
	 *   return function(scope, element, attrs) {
	 *     attrs.$observe('active', function(value) {
	 *       value ? $animate.addClass(element, 'on') : $animate.removeClass(element, 'on');
	 *     });
	 *   });
	 * }]);
	 * ```
	 *
	 * Now the `on` CSS class is added and removed on the greeting box component. Now if we add a CSS class on top of the greeting box element
	 * in our HTML code then we can trigger a CSS or JS animation to happen.
	 *
	 * ```css
	 * /&#42; normally we would create a CSS class to reference on the element &#42;/
	 * greeting-box.on { transition:0.5s linear all; background:green; color:white; }
	 * ```
	 *
	 * The `$animate` service contains a variety of other methods like `enter`, `leave`, `animate` and `setClass`. To learn more about what's
	 * possible be sure to visit the {@link ng.$animate $animate service API page}.
	 *
	 *
	 * ## Callbacks and Promises
	 *
	 * When `$animate` is called it returns a promise that can be used to capture when the animation has ended. Therefore if we were to trigger
	 * an animation (within our directive code) then we can continue performing directive and scope related activities after the animation has
	 * ended by chaining onto the returned promise that animation method returns.
	 *
	 * ```js
	 * // somewhere within the depths of the directive
	 * $animate.enter(element, parent).then(function() {
	 *   //the animation has completed
	 * });
	 * ```
	 *
	 * (Note that earlier versions of Angular prior to v1.4 required the promise code to be wrapped using `$scope.$apply(...)`. This is not the case
	 * anymore.)
	 *
	 * In addition to the animation promise, we can also make use of animation-related callbacks within our directives and controller code by registering
	 * an event listener using the `$animate` service. Let's say for example that an animation was triggered on our view
	 * routing controller to hook into that:
	 *
	 * ```js
	 * ngModule.controller('HomePageController', ['$animate', function($animate) {
	 *   $animate.on('enter', ngViewElement, function(element) {
	 *     // the animation for this route has completed
	 *   }]);
	 * }])
	 * ```
	 *
	 * (Note that you will need to trigger a digest within the callback to get angular to notice any scope-related changes.)
	 */
	
	/**
	 * @ngdoc service
	 * @name $animate
	 * @kind object
	 *
	 * @description
	 * The ngAnimate `$animate` service documentation is the same for the core `$animate` service.
	 *
	 * Click here {@link ng.$animate to learn more about animations with `$animate`}.
	 */
	angular.module('ngAnimate', [])
	  .directive('ngAnimateSwap', ngAnimateSwapDirective)
	
	  .directive('ngAnimateChildren', $$AnimateChildrenDirective)
	  .factory('$$rAFScheduler', $$rAFSchedulerFactory)
	
	  .provider('$$animateQueue', $$AnimateQueueProvider)
	  .provider('$$animation', $$AnimationProvider)
	
	  .provider('$animateCss', $AnimateCssProvider)
	  .provider('$$animateCssDriver', $$AnimateCssDriverProvider)
	
	  .provider('$$animateJs', $$AnimateJsProvider)
	  .provider('$$animateJsDriver', $$AnimateJsDriverProvider);
	
	
	})(window, window.angular);


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(34);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	buf.push("<div ng-show=\"wom.show\" style=\"position:fixed;top:0;left:0;z-index:20;height:100%;width:100%;background-color:rgba(255,255,255,.95);overflow:auto;\" class=\"animate-fade\"><div style=\"position:relative;\"><div style=\"position:absolute;top:.2em;right:.2em;border:1px solid #DDD;border-radius:50%;\"><div ng-click=\"wom.show=null\" style=\"cursor:pointer;border:3px solid white;border-radius:50%;background-color:black;color:white;text-align:center;font-family:Arial;\"><div style=\"line-height:22px;font-size:23px;height:25px;width:25px;\">x</div></div></div></div><table style=\"height:100%;\" border=\"0\" align=\"center\" ng-style=\"{width:wom.size=='full'?'100%':null}\"><tr ng-hide=\"wom.size=='full'\"><td ng-click=\"wom.show=null\"></td></tr><tr><td ng-transclude></td></tr><tr ng-hide=\"wom.size=='full'\"><td ng-click=\"wom.show=null\"></td></tr></table></div>");;return buf.join("");
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */
	
	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];
	
	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }
	
	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }
	
	  return a;
	};
	
	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */
	
	function nulls(val) {
	  return val != null && val !== '';
	}
	
	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) :
	    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
	    [val]).filter(nulls).join(' ');
	}
	
	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};
	
	
	exports.style = function (val) {
	  if (val && typeof val === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
	                   'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' +
	                   'ISO form after 2.0.0');
	    }
	    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};
	
	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse){
	  var buf = [];
	
	  var keys = Object.keys(obj);
	
	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i]
	        , val = obj[key];
	
	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }
	
	  return buf.join('');
	};
	
	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */
	
	var jade_encode_html_rules = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	var jade_match_html = /[&<>"]/g;
	
	function jade_encode_char(c) {
	  return jade_encode_html_rules[c] || c;
	}
	
	exports.escape = jade_escape;
	function jade_escape(html){
	  var result = String(html).replace(jade_match_html, jade_encode_char);
	  if (result === '' + html) return html;
	  else return result;
	};
	
	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */
	
	exports.rethrow = function rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(35).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);
	
	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');
	
	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};
	
	exports.DebugItem = function DebugItem(lineno, filename) {
	  this.lineno = lineno;
	  this.filename = filename;
	}


/***/ },
/* 35 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(37);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(39)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./ack-angular-animations.css", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./ack-angular-animations.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(38)();
	// imports
	
	
	// module
	exports.push([module.id, "/* requires angular-animate */\n.animate-fade{\n  opacity:1;\n}\n\n.animate-fade.ng-hide-remove,\n.animate-fade.ng-hide-add,\n.animate-fade.ng-move,\n.animate-fade.ng-enter,\n.animate-fade.ng-leave{\n  transition: all linear 0.3s;\n}\n\n.animate-fade.ng-hide,\n.animate-fade.ng-leave,\n.animate-fade.ng-move.ng-move-active,\n.animate-fade.ng-enter.ng-enter-active{\n  opacity:0 !important;\n}\n\n.animate-all{\n  transition: all linear 0.3s;\n}\n\n.animate-v.ng-hide-remove,\n.animate-v.ng-move,\n.animate-v.ng-enter{\n  -webkit-transition:all linear 700ms;\n  transition:all linear 700ms;\n  overflow:hidden;vertical-align:top;\n}\n\n.animate-v.ng-hide-add,\n.animate-v.ng-leave{/* leave faster than they come in */\n  -webkit-transition:all linear 400ms;\n  transition:all linear 400ms;\n  overflow:hidden;vertical-align:top;\n}\n\n.animate-v.ng-hide-add,/* starts to hide */\n.animate-v.ng-hide-remove.ng-hide-remove-active,/* ends show */\n.animate-v.ng-leave,\n.animate-v.ng-move.ng-move-active,\n.animate-v.ng-enter.ng-enter-active{\n  max-height:1000px;\n  height:100%;\n}\n\n.animate-v.ng-hide-add.ng-hide-add-active,/* ends hide */\n.animate-v.ng-hide-remove,/* starts to show */\n.animate-v.ng-leave.ng-leave-active,\n.animate-v.ng-move,\n.animate-v.ng-enter{\n  max-height:0;\n  height:0;\n}\n\n.animate-v.ng-leave-stagger {\n    -webkit-transition-delay: 0.1s;\n    transition-delay: 0.1s;\n    -webkit-transition-duration: 0s;\n    transition-duration: 0s;\n}\n\n.animate-v.ng-enter-stagger {\n    -webkit-transition-delay: 0.1s;\n    transition-delay: 0.1s;\n    -webkit-transition-duration: 0s;\n    transition-duration: 0s;\n}\n\n\n\n\n.animate-h.ng-hide-remove,\n.animate-h.ng-move,\n.animate-h.ng-enter{\n  -webkit-transition:all linear 500ms;\n  transition:all linear 500ms;\n  overflow:hidden;white-space:nowrap;vertical-align:top;\n}\n\n.animate-h.ng-hide-add,\n.animate-h.ng-leave{/* leave faster than they come in */\n  -webkit-transition:all linear 400ms;\n  transition:all linear 400ms;\n  overflow:hidden;white-space:nowrap;vertical-align:top;\n}\n\n.animate-h.ng-hide-add,/* starts to hide */\n.animate-h.ng-hide-remove.ng-hide-remove-active,/* ends show */\n.animate-h.ng-leave,\n.animate-h.ng-move.ng-move-active,\n.animate-h.ng-enter.ng-enter-active{\n  width:100%;\n}\n\n.animate-h.ng-hide-add.ng-hide-add-active,/* ends hide */\n.animate-h.ng-hide-remove,/* starts to show */\n.animate-h.ng-leave.ng-leave-active,\n.animate-h.ng-move,\n.animate-h.ng-enter{\n  width:0;\n}\n\n.animate-h.ng-leave-stagger {\n    -webkit-transition-delay: 0.1s;\n    transition-delay: 0.1s;\n    -webkit-transition-duration: 0s;\n    transition-duration: 0s;\n}\n\n.animate-h.ng-enter-stagger {\n    -webkit-transition-delay: 0.1s;\n    transition-delay: 0.1s;\n    -webkit-transition-duration: 0s;\n    transition-duration: 0s;\n}\n\n\n\n\n/* animate diagonaly */\n.animate-d.ng-hide-remove,\n.animate-d.ng-move,\n.animate-d.ng-enter{\n  -webkit-transition:all linear 700ms;\n  transition:all linear 700ms;\n  overflow:hidden;\n}\n\n.animate-d.ng-hide-add,\n.animate-d.ng-leave{/* leave faster than they come in */\n  -webkit-transition:all linear 400ms;\n  transition:all linear 400ms;\n  overflow:hidden;\n}\n\n.animate-d.ng-hide-add,/* starts to hide */\n.animate-d.ng-hide-remove.ng-hide-remove-active,/* ends show */\n.animate-d.ng-leave,\n.animate-d.ng-move.ng-move-active,\n.animate-d.ng-enter.ng-enter-active{\n  width:100%;max-height:1000px;\n}\n\n.animate-d.ng-hide-add.ng-hide-add-active,/* ends hide */\n.animate-d.ng-hide-remove,/* starts to show */\n.animate-d.ng-leave.ng-leave-active,\n.animate-d.ng-move,\n.animate-d.ng-enter{\n  max-height:0;width:0;\n}\n\n.animate-d.ng-leave-stagger {\n    -webkit-transition-delay: 0.1s;\n    transition-delay: 0.1s;\n    -webkit-transition-duration: 0s;\n    transition-duration: 0s;\n}\n\n.animate-d.ng-enter-stagger {\n    -webkit-transition-delay: 0.1s;\n    transition-delay: 0.1s;\n    -webkit-transition-duration: 0s;\n    transition-duration: 0s;\n}\n", ""]);
	
	// exports


/***/ },
/* 38 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(41);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(39)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./ack-angular-helpers.css", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./ack-angular-helpers.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(38)();
	// imports
	
	
	// module
	exports.push([module.id, ".text-overflow\n{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}\n\n.valign,.valign-top,.vert-align-top{vertical-align:top}\n.valign-middle,.valign-center,.vert-align-middle{vertical-align:middle}\n.valign-bottom,.vert-align-bottom{vertical-align:bottom}\n\n.nowrap{white-space:nowrap}\n\na,.cursor-pointer {cursor:pointer}\n\n.text-underline,.underline {text-decoration:underline}\n.strong, .bold, .text-bold {font-weight:bold}\n\n.text-left {text-align:left}\n.text-right {text-align:right}\n.text-center {text-align:center}\n\n.text-uppercase {text-transform: uppercase}\n.text-lowercase {text-transform: lowercase}\n.text-capitalize {text-transform: capitalize}\n\n.text-3x {font-size:160%}\n.text-2x {font-size:145%}\n.text-lg {font-size:130%}\n.text-md {font-size:115%}\n.text-sm {font-size:90%}\n.text-smx {font-size:85%}\n.text-xs {font-size:75%}\n.text-xxs {font-size:65%}\n\n.text-primary{color:#337ab7}\n.text-success{color:#3c763d}\n.text-info{color:#31708f}\n.text-warning{color:#8a6d3b}\n.text-danger{color:#a94442}\n.text-muted{color:#777}\n.text-muted-sm{color:#AAA}\n.text-muted-xs{color:#BAB}\n\n.text-green,.font-green{color: #060}\n.text-orange,.font-orange{color: #C60}\n.text-red,.font-red{color:#900}\n.text-blue,.font-blue{color: #009}\n.text-purple,.font-purple{color: #60C}\n.text-black,.font-black{color: #000}\n.text-white,.font-white{color: #FFF}\n\n.clear,.clear-both,.clear-fix {clear:both}\n\n.pos-absolute,.pos-abs{position:absolute}\n.pos-relative,.pos-rel{position:relative}\n.pos-fixed,.pos-fix{position:fixed}\n\n.z-index-1{z-index:1}\n.z-index-10{z-index:10}\n.top-0{top:0}\n.right-0{right:0}\n.bottom-0{bottom:0}\n.left-0{left:0}\n\n.inline-block, .display-inline-block {display:inline-block}\n\n.block, .display-block {display:block}\n\n.opacity-half {opacity: 0.5}\n\n.width-full{width:100%}\n.width-half{width:50%}\n\n\n.margin-0{margin:0}\n.margin-xxs{margin:0.2em}\n.margin-xs{margin:0.4em}\n.margin-sm{margin:0.6em}\n.margin{margin:0.8em}\n.margin-md{margin:1em}\n.margin-lg{margin:1.5em}\n\n.margin-v-0{margin-top:0;margin-bottom:0}\n.margin-v-xxs{margin-top:0.2em;margin-bottom:0.2em}\n.margin-v-xs{margin-top:0.4em;margin-bottom:0.4em}\n.margin-v-sm{margin-top:0.6em;margin-bottom:0.6em}\n.margin-v{margin-top:0.8em;margin-bottom:0.8em}\n.margin-v-md{margin-top:1em;margin-bottom:1em}\n.margin-v-lg{margin-top:1.5em;margin-bottom:1.5em}\n\n.margin-h-0{margin-left:0;margin-right:0}\n.margin-h-xxs{margin-left:0.2em;margin-right:0.2em}\n.margin-h-xs{margin-left:0.4em;margin-right:0.4em}\n.margin-h-sm{margin-left:0.6em;margin-right:0.6em}\n.margin-h{margin-left:0.8em;margin-right:0.8em}\n.margin-h-md{margin-left:1em;margin-right:1em}\n.margin-h-lg{margin-left:1.5em;margin-right:1.5em}\n\n.margin-top-0{margin-top:0}\n.margin-top-xxs{margin-top:0.2em}\n.margin-top-xs{margin-top:0.4em}\n.margin-top-sm{margin-top:0.6em}\n.margin-top{margin-top:0.8em}\n.margin-top-md{margin-top:1em}\n.margin-top-lg{margin-top:1.5em}\n\n.margin-bottom-0{margin-bottom:0}\n.margin-bottom-xxs{margin-bottom:0.2em}\n.margin-bottom-xs{margin-bottom:0.4em}\n.margin-bottom-sm{margin-bottom:0.6em}\n.margin-bottom{margin-bottom:0.8em}\n.margin-bottom-md{margin-bottom:1em}\n.margin-bottom-lg{margin-bottom:1.5em}\n\n.margin-left-0{margin-left:0}\n.margin-left-xxs{margin-left:0.2em}\n.margin-left-xs{margin-left:0.4em}\n.margin-left-sm{margin-left:0.6em}\n.margin-left{margin-left:0.8em}\n.margin-left-md{margin-left:1em}\n.margin-left-lg{margin-left:1.5em}\n\n.margin-right-0{margin-right:0}\n.margin-right-xxs{margin-right:0.2em}\n.margin-right-xs{margin-right:0.4em}\n.margin-right-sm{margin-right:0.6em}\n.margin-right{margin-right:0.8em}\n.margin-right-md{margin-right:1em}\n.margin-right-lg{margin-right:1.5em}\n\n.pad-0{padding:0}\n.pad-xxs{padding:0.2em}\n.pad-xs{padding:0.4em}\n.pad-sm{padding:0.6em}\n.pad{padding:0.8em}\n.pad-md{padding:1em}\n.pad-lg{padding:1.5em}\n\n.pad-v-0{padding-top:0;padding-bottom:0}\n.pad-v-xxs{padding-top:0.2em;padding-bottom:0.2em}\n.pad-v-xs{padding-top:0.4em;padding-bottom:0.4em}\n.pad-v-sm{padding-top:0.6em;padding-bottom:0.6em}\n.pad-v{padding-top:0.8em;padding-bottom:0.8em}\n.pad-v-md{padding-top:1em;padding-bottom:1em}\n.pad-v-lg{padding-top:1.5em;padding-bottom:1.5em}\n\n.pad-h-0{padding-left:0;padding-right:0}\n.pad-h-xxs{padding-left:0.2em;padding-right:0.2em}\n.pad-h-xs{padding-left:0.4em;padding-right:0.4em}\n.pad-h-sm{padding-left:0.6em;padding-right:0.6em}\n.pad-h{padding-left:0.8em;padding-right:0.8em}\n.pad-h-md{padding-left:1em;padding-right:1em}\n.pad-h-lg{padding-left:1.5em;padding-right:1.5em}\n\n.pad-top-0{padding-top:0}\n.pad-top-xxs{padding-top:0.2em}\n.pad-top-xs{padding-top:0.4em}\n.pad-top-sm{padding-top:0.6em}\n.pad-top{padding-top:0.8em}\n.pad-top-md{padding-top:1em}\n.pad-top-lg{padding-top:1.5em}\n\n.pad-bottom-0{padding-bottom:0}\n.pad-bottom-xxs{padding-bottom:0.2em}\n.pad-bottom-xs{padding-bottom:0.4em}\n.pad-bottom-sm{padding-bottom:0.6em}\n.pad-bottom{padding-bottom:0.8em}\n.pad-bottom-md{padding-bottom:1em}\n.pad-bottom-lg{padding-bottom:1.5em}\n\n.pad-left-0{padding-left:0}\n.pad-left-xxs{padding-left:0.2em}\n.pad-left-xs{padding-left:0.4em}\n.pad-left-sm{padding-left:0.6em}\n.pad-left{padding-left:0.8em}\n.pad-left-md{padding-left:1em}\n.pad-left-lg{padding-left:1.5em}\n\n.pad-right-0{padding-right:0}\n.pad-right-xxs{padding-right:0.2em}\n.pad-right-xs{padding-right:0.4em}\n.pad-right-sm{padding-right:0.6em}\n.pad-right{padding-right:0.8em}\n.pad-right-md{padding-right:1em}\n.pad-right-lg{padding-right:1.5em}\n\n\n.bg-primary{background-color:#337ab7}\n.bg-success{background-color:#dff0d8}\n.bg-info{background-color:#d9edf7}\n.bg-warning{background-color:#fcf8e3}\n.bg-danger{background-color:#f2dede}\n.bg-white{background-color:white}\n.bg-black{background-color:black}\n\n.float-right, .pull-right{float:right}\n.float-left, .pull-left{float:left}\n\n.border-radius-0{border-radius:0}\n.border-radius-half{border-radius:50%}", ""]);
	
	// exports


/***/ }
/******/ ]);
//# sourceMappingURL=ack-angular.js.map