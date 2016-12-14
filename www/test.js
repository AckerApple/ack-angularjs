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

	"use strict";
	
	var _mockInjects = __webpack_require__(1);
	
	var _testOfflineStorage = __webpack_require__(3);
	
	var _testOfflineStorage2 = _interopRequireDefault(_testOfflineStorage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var testApp = angular.module('test-ack-angular', ['ngMockE2E']).name;
	
	describe('app', function () {
	  beforeEach(function () {
	    (0, _mockInjects.module)(testApp);
	  });
	
	  describe('offline-storage', _testOfflineStorage2.default);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.inject = exports.module = undefined;
	exports.createDepject = createDepject;
	exports.sync = sync;
	exports.async = async;
	exports.promise = promise;
	exports.syncject = syncject;
	exports.asyncject = asyncject;
	exports.promiseject = promiseject;
	
	var _angularMocks = __webpack_require__(2);
	
	var _angularMocks2 = _interopRequireDefault(_angularMocks);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createDepject(args, callback) {
	  var depjection = eval('(function(' + args + '){var args=Array.prototype.slice.call(arguments);callback(args)})');
	  return depjection;
	}
	
	function sync(callback) {
	  return function (done) {
	    _angularMocks2.default.inject(function ($rootScope) {
	      callback();
	      $rootScope.$apply();
	      done();
	    });
	  };
	}
	
	function async(callback) {
	  return function (done) {
	    _angularMocks2.default.inject(function ($rootScope) {
	      callback(done);
	      $rootScope.$apply();
	    });
	  };
	}
	
	function promise(callback) {
	  return function (done) {
	    _angularMocks2.default.inject(function ($rootScope) {
	      try {
	        var prom = callback();
	
	        if (prom.then && prom.catch) {
	          prom.then(done).catch(done.fail || done);
	        } else {
	          throw new Error('Expected promise in return from mock-injects.promise callback');
	        }
	
	        $rootScope.$apply();
	      } catch (e) {
	        done.fail ? done.fail(e) : done(e);
	      }
	    });
	  };
	}
	
	function syncject(args, callback) {
	  var loaded, $rs;
	
	  return function (done) {
	    loaded = function loaded(args) {
	      //args.push(done)
	      try {
	        callback.apply(null, args);
	        $rs.$apply();
	        done();
	      } catch (e) {
	        done.fail ? done.fail(e) : done(e);
	      }
	    };
	
	    var depjection = createDepject(args, loaded);
	
	    _angularMocks2.default.inject(function ($rootScope) {
	      $rs = $rootScope;
	      _angularMocks2.default.inject(depjection);
	    });
	  };
	}
	
	function asyncject(args, callback) {
	  var loaded, $rs;
	
	  return function (done) {
	    loaded = function loaded(args) {
	      args.push(done);
	      callback.apply(null, args);
	      $rs.$apply();
	    };
	
	    var depjection = createDepject(args, loaded);
	
	    _angularMocks2.default.inject(function ($rootScope) {
	      $rs = $rootScope;
	      _angularMocks2.default.inject(depjection);
	    });
	  };
	}
	
	function promiseject(args, callback) {
	  var loaded, $rs;
	
	  return function (done) {
	    loaded = function loaded(args) {
	      args.push(done);
	
	      try {
	        var prom = callback.apply(null, args);
	
	        if (prom.then && prom.catch) {
	          prom.then(done).catch(function (e) {
	            if (e && e.data && e.data.error) {
	              var error = new RequestError();
	
	              for (var x in e.data.error) {
	                error[x] = e.data.error[x];
	              }
	
	              if (error && error.detail && !error.message) {
	                error.message = error.detail;
	              }
	
	              error.code = error.code || e.status;
	              error.status = error.status || e.status;
	
	              e = error;
	            }
	
	            done.fail ? done.fail(e) : done(e);
	          });
	        } else {
	          throw new Error('Expected promise in return from mock-injects.promiseject callback');
	        }
	
	        $rs.$apply();
	      } catch (e) {
	        done.fail ? done.fail(e) : done(e);
	      }
	    };
	
	    var depjection = createDepject(args, loaded);
	
	    _angularMocks2.default.inject(['$rootScope', function ($rootScope) {
	      $rs = $rootScope;
	      _angularMocks2.default.inject(depjection);
	    }]);
	  };
	}
	
	var _module = _angularMocks2.default.module;
	exports.module = _module;
	var inject = exports.inject = _angularMocks2.default.inject;
	
	exports.default = {
	  sync: sync,
	  async: async,
	  promise: promise,
	  syncject: syncject,
	  asyncject: asyncject,
	  promiseject: promiseject,
	  module: _angularMocks2.default.module,
	  inject: _angularMocks2.default.inject
	};
	
	
	function RequestError(message) {
	  this.name = this.constructor.name;
	  //this.status = 400;
	  //this.code = "bad_request";
	  this.message = message || "RequestError";
	  return this;
	}
	RequestError.prototype = Object.create(Error.prototype);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * @license AngularJS v1.6.1-build.5200+sha.29f3bf4
	 * (c) 2010-2016 Google, Inc. http://angularjs.org
	 * License: MIT
	 */
	(function (window, angular) {
	
	  'use strict';
	
	  /**
	   * @ngdoc object
	   * @name angular.mock
	   * @description
	   *
	   * Namespace from 'angular-mocks.js' which contains testing related code.
	   *
	   */
	
	  angular.mock = {};
	
	  /**
	   * ! This is a private undocumented service !
	   *
	   * @name $browser
	   *
	   * @description
	   * This service is a mock implementation of {@link ng.$browser}. It provides fake
	   * implementation for commonly used browser apis that are hard to test, e.g. setTimeout, xhr,
	   * cookies, etc.
	   *
	   * The api of this service is the same as that of the real {@link ng.$browser $browser}, except
	   * that there are several helper methods available which can be used in tests.
	   */
	  angular.mock.$BrowserProvider = function () {
	    this.$get = function () {
	      return new angular.mock.$Browser();
	    };
	  };
	
	  angular.mock.$Browser = function () {
	    var self = this;
	
	    this.isMock = true;
	    self.$$url = 'http://server/';
	    self.$$lastUrl = self.$$url; // used by url polling fn
	    self.pollFns = [];
	
	    // TODO(vojta): remove this temporary api
	    self.$$completeOutstandingRequest = angular.noop;
	    self.$$incOutstandingRequestCount = angular.noop;
	
	    // register url polling fn
	
	    self.onUrlChange = function (listener) {
	      self.pollFns.push(function () {
	        if (self.$$lastUrl !== self.$$url || self.$$state !== self.$$lastState) {
	          self.$$lastUrl = self.$$url;
	          self.$$lastState = self.$$state;
	          listener(self.$$url, self.$$state);
	        }
	      });
	
	      return listener;
	    };
	
	    self.$$applicationDestroyed = angular.noop;
	    self.$$checkUrlChange = angular.noop;
	
	    self.deferredFns = [];
	    self.deferredNextId = 0;
	
	    self.defer = function (fn, delay) {
	      delay = delay || 0;
	      self.deferredFns.push({ time: self.defer.now + delay, fn: fn, id: self.deferredNextId });
	      self.deferredFns.sort(function (a, b) {
	        return a.time - b.time;
	      });
	      return self.deferredNextId++;
	    };
	
	    /**
	     * @name $browser#defer.now
	     *
	     * @description
	     * Current milliseconds mock time.
	     */
	    self.defer.now = 0;
	
	    self.defer.cancel = function (deferId) {
	      var fnIndex;
	
	      angular.forEach(self.deferredFns, function (fn, index) {
	        if (fn.id === deferId) fnIndex = index;
	      });
	
	      if (angular.isDefined(fnIndex)) {
	        self.deferredFns.splice(fnIndex, 1);
	        return true;
	      }
	
	      return false;
	    };
	
	    /**
	     * @name $browser#defer.flush
	     *
	     * @description
	     * Flushes all pending requests and executes the defer callbacks.
	     *
	     * @param {number=} number of milliseconds to flush. See {@link #defer.now}
	     */
	    self.defer.flush = function (delay) {
	      var nextTime;
	
	      if (angular.isDefined(delay)) {
	        // A delay was passed so compute the next time
	        nextTime = self.defer.now + delay;
	      } else {
	        if (self.deferredFns.length) {
	          // No delay was passed so set the next time so that it clears the deferred queue
	          nextTime = self.deferredFns[self.deferredFns.length - 1].time;
	        } else {
	          // No delay passed, but there are no deferred tasks so flush - indicates an error!
	          throw new Error('No deferred tasks to be flushed');
	        }
	      }
	
	      while (self.deferredFns.length && self.deferredFns[0].time <= nextTime) {
	        // Increment the time and call the next deferred function
	        self.defer.now = self.deferredFns[0].time;
	        self.deferredFns.shift().fn();
	      }
	
	      // Ensure that the current time is correct
	      self.defer.now = nextTime;
	    };
	
	    self.$$baseHref = '/';
	    self.baseHref = function () {
	      return this.$$baseHref;
	    };
	  };
	  angular.mock.$Browser.prototype = {
	
	    /**
	     * @name $browser#poll
	     *
	     * @description
	     * run all fns in pollFns
	     */
	    poll: function poll() {
	      angular.forEach(this.pollFns, function (pollFn) {
	        pollFn();
	      });
	    },
	
	    url: function url(_url, replace, state) {
	      if (angular.isUndefined(state)) {
	        state = null;
	      }
	      if (_url) {
	        this.$$url = _url;
	        // Native pushState serializes & copies the object; simulate it.
	        this.$$state = angular.copy(state);
	        return this;
	      }
	
	      return this.$$url;
	    },
	
	    state: function state() {
	      return this.$$state;
	    },
	
	    notifyWhenNoOutstandingRequests: function notifyWhenNoOutstandingRequests(fn) {
	      fn();
	    }
	  };
	
	  /**
	   * @ngdoc provider
	   * @name $exceptionHandlerProvider
	   *
	   * @description
	   * Configures the mock implementation of {@link ng.$exceptionHandler} to rethrow or to log errors
	   * passed to the `$exceptionHandler`.
	   */
	
	  /**
	   * @ngdoc service
	   * @name $exceptionHandler
	   *
	   * @description
	   * Mock implementation of {@link ng.$exceptionHandler} that rethrows or logs errors passed
	   * to it. See {@link ngMock.$exceptionHandlerProvider $exceptionHandlerProvider} for configuration
	   * information.
	   *
	   *
	   * ```js
	   *   describe('$exceptionHandlerProvider', function() {
	   *
	   *     it('should capture log messages and exceptions', function() {
	   *
	   *       module(function($exceptionHandlerProvider) {
	   *         $exceptionHandlerProvider.mode('log');
	   *       });
	   *
	   *       inject(function($log, $exceptionHandler, $timeout) {
	   *         $timeout(function() { $log.log(1); });
	   *         $timeout(function() { $log.log(2); throw 'banana peel'; });
	   *         $timeout(function() { $log.log(3); });
	   *         expect($exceptionHandler.errors).toEqual([]);
	   *         expect($log.assertEmpty());
	   *         $timeout.flush();
	   *         expect($exceptionHandler.errors).toEqual(['banana peel']);
	   *         expect($log.log.logs).toEqual([[1], [2], [3]]);
	   *       });
	   *     });
	   *   });
	   * ```
	   */
	
	  angular.mock.$ExceptionHandlerProvider = function () {
	    var handler;
	
	    /**
	     * @ngdoc method
	     * @name $exceptionHandlerProvider#mode
	     *
	     * @description
	     * Sets the logging mode.
	     *
	     * @param {string} mode Mode of operation, defaults to `rethrow`.
	     *
	     *   - `log`: Sometimes it is desirable to test that an error is thrown, for this case the `log`
	     *     mode stores an array of errors in `$exceptionHandler.errors`, to allow later assertion of
	     *     them. See {@link ngMock.$log#assertEmpty assertEmpty()} and
	     *     {@link ngMock.$log#reset reset()}.
	     *   - `rethrow`: If any errors are passed to the handler in tests, it typically means that there
	     *     is a bug in the application or test, so this mock will make these tests fail. For any
	     *     implementations that expect exceptions to be thrown, the `rethrow` mode will also maintain
	     *     a log of thrown errors in `$exceptionHandler.errors`.
	     */
	    this.mode = function (mode) {
	
	      switch (mode) {
	        case 'log':
	        case 'rethrow':
	          var errors = [];
	          handler = function handler(e) {
	            if (arguments.length === 1) {
	              errors.push(e);
	            } else {
	              errors.push([].slice.call(arguments, 0));
	            }
	            if (mode === 'rethrow') {
	              throw e;
	            }
	          };
	          handler.errors = errors;
	          break;
	        default:
	          throw new Error('Unknown mode \'' + mode + '\', only \'log\'/\'rethrow\' modes are allowed!');
	      }
	    };
	
	    this.$get = function () {
	      return handler;
	    };
	
	    this.mode('rethrow');
	  };
	
	  /**
	   * @ngdoc service
	   * @name $log
	   *
	   * @description
	   * Mock implementation of {@link ng.$log} that gathers all logged messages in arrays
	   * (one array per logging level). These arrays are exposed as `logs` property of each of the
	   * level-specific log function, e.g. for level `error` the array is exposed as `$log.error.logs`.
	   *
	   */
	  angular.mock.$LogProvider = function () {
	    var _debug = true;
	
	    function concat(array1, array2, index) {
	      return array1.concat(Array.prototype.slice.call(array2, index));
	    }
	
	    this.debugEnabled = function (flag) {
	      if (angular.isDefined(flag)) {
	        _debug = flag;
	        return this;
	      } else {
	        return _debug;
	      }
	    };
	
	    this.$get = function () {
	      var $log = {
	        log: function log() {
	          $log.log.logs.push(concat([], arguments, 0));
	        },
	        warn: function warn() {
	          $log.warn.logs.push(concat([], arguments, 0));
	        },
	        info: function info() {
	          $log.info.logs.push(concat([], arguments, 0));
	        },
	        error: function error() {
	          $log.error.logs.push(concat([], arguments, 0));
	        },
	        debug: function debug() {
	          if (_debug) {
	            $log.debug.logs.push(concat([], arguments, 0));
	          }
	        }
	      };
	
	      /**
	       * @ngdoc method
	       * @name $log#reset
	       *
	       * @description
	       * Reset all of the logging arrays to empty.
	       */
	      $log.reset = function () {
	        /**
	         * @ngdoc property
	         * @name $log#log.logs
	         *
	         * @description
	         * Array of messages logged using {@link ng.$log#log `log()`}.
	         *
	         * @example
	         * ```js
	         * $log.log('Some Log');
	         * var first = $log.log.logs.unshift();
	         * ```
	         */
	        $log.log.logs = [];
	        /**
	         * @ngdoc property
	         * @name $log#info.logs
	         *
	         * @description
	         * Array of messages logged using {@link ng.$log#info `info()`}.
	         *
	         * @example
	         * ```js
	         * $log.info('Some Info');
	         * var first = $log.info.logs.unshift();
	         * ```
	         */
	        $log.info.logs = [];
	        /**
	         * @ngdoc property
	         * @name $log#warn.logs
	         *
	         * @description
	         * Array of messages logged using {@link ng.$log#warn `warn()`}.
	         *
	         * @example
	         * ```js
	         * $log.warn('Some Warning');
	         * var first = $log.warn.logs.unshift();
	         * ```
	         */
	        $log.warn.logs = [];
	        /**
	         * @ngdoc property
	         * @name $log#error.logs
	         *
	         * @description
	         * Array of messages logged using {@link ng.$log#error `error()`}.
	         *
	         * @example
	         * ```js
	         * $log.error('Some Error');
	         * var first = $log.error.logs.unshift();
	         * ```
	         */
	        $log.error.logs = [];
	        /**
	        * @ngdoc property
	        * @name $log#debug.logs
	        *
	        * @description
	        * Array of messages logged using {@link ng.$log#debug `debug()`}.
	        *
	        * @example
	        * ```js
	        * $log.debug('Some Error');
	        * var first = $log.debug.logs.unshift();
	        * ```
	        */
	        $log.debug.logs = [];
	      };
	
	      /**
	       * @ngdoc method
	       * @name $log#assertEmpty
	       *
	       * @description
	       * Assert that all of the logging methods have no logged messages. If any messages are present,
	       * an exception is thrown.
	       */
	      $log.assertEmpty = function () {
	        var errors = [];
	        angular.forEach(['error', 'warn', 'info', 'log', 'debug'], function (logLevel) {
	          angular.forEach($log[logLevel].logs, function (log) {
	            angular.forEach(log, function (logItem) {
	              errors.push('MOCK $log (' + logLevel + '): ' + String(logItem) + '\n' + (logItem.stack || ''));
	            });
	          });
	        });
	        if (errors.length) {
	          errors.unshift('Expected $log to be empty! Either a message was logged unexpectedly, or ' + 'an expected log message was not checked and removed:');
	          errors.push('');
	          throw new Error(errors.join('\n---------\n'));
	        }
	      };
	
	      $log.reset();
	      return $log;
	    };
	  };
	
	  /**
	   * @ngdoc service
	   * @name $interval
	   *
	   * @description
	   * Mock implementation of the $interval service.
	   *
	   * Use {@link ngMock.$interval#flush `$interval.flush(millis)`} to
	   * move forward by `millis` milliseconds and trigger any functions scheduled to run in that
	   * time.
	   *
	   * @param {function()} fn A function that should be called repeatedly.
	   * @param {number} delay Number of milliseconds between each function call.
	   * @param {number=} [count=0] Number of times to repeat. If not set, or 0, will repeat
	   *   indefinitely.
	   * @param {boolean=} [invokeApply=true] If set to `false` skips model dirty checking, otherwise
	   *   will invoke `fn` within the {@link ng.$rootScope.Scope#$apply $apply} block.
	   * @param {...*=} Pass additional parameters to the executed function.
	   * @returns {promise} A promise which will be notified on each iteration.
	   */
	  angular.mock.$IntervalProvider = function () {
	    this.$get = ['$browser', '$rootScope', '$q', '$$q', function ($browser, $rootScope, $q, $$q) {
	      var repeatFns = [],
	          nextRepeatId = 0,
	          now = 0;
	
	      var $interval = function $interval(fn, delay, count, invokeApply) {
	        var hasParams = arguments.length > 4,
	            args = hasParams ? Array.prototype.slice.call(arguments, 4) : [],
	            iteration = 0,
	            skipApply = angular.isDefined(invokeApply) && !invokeApply,
	            deferred = (skipApply ? $$q : $q).defer(),
	            promise = deferred.promise;
	
	        count = angular.isDefined(count) ? count : 0;
	        promise.then(null, function () {}, !hasParams ? fn : function () {
	          fn.apply(null, args);
	        });
	
	        promise.$$intervalId = nextRepeatId;
	
	        function tick() {
	          deferred.notify(iteration++);
	
	          if (count > 0 && iteration >= count) {
	            var fnIndex;
	            deferred.resolve(iteration);
	
	            angular.forEach(repeatFns, function (fn, index) {
	              if (fn.id === promise.$$intervalId) fnIndex = index;
	            });
	
	            if (angular.isDefined(fnIndex)) {
	              repeatFns.splice(fnIndex, 1);
	            }
	          }
	
	          if (skipApply) {
	            $browser.defer.flush();
	          } else {
	            $rootScope.$apply();
	          }
	        }
	
	        repeatFns.push({
	          nextTime: now + delay,
	          delay: delay,
	          fn: tick,
	          id: nextRepeatId,
	          deferred: deferred
	        });
	        repeatFns.sort(function (a, b) {
	          return a.nextTime - b.nextTime;
	        });
	
	        nextRepeatId++;
	        return promise;
	      };
	      /**
	       * @ngdoc method
	       * @name $interval#cancel
	       *
	       * @description
	       * Cancels a task associated with the `promise`.
	       *
	       * @param {promise} promise A promise from calling the `$interval` function.
	       * @returns {boolean} Returns `true` if the task was successfully cancelled.
	       */
	      $interval.cancel = function (promise) {
	        if (!promise) return false;
	        var fnIndex;
	
	        angular.forEach(repeatFns, function (fn, index) {
	          if (fn.id === promise.$$intervalId) fnIndex = index;
	        });
	
	        if (angular.isDefined(fnIndex)) {
	          repeatFns[fnIndex].deferred.promise.then(undefined, function () {});
	          repeatFns[fnIndex].deferred.reject('canceled');
	          repeatFns.splice(fnIndex, 1);
	          return true;
	        }
	
	        return false;
	      };
	
	      /**
	       * @ngdoc method
	       * @name $interval#flush
	       * @description
	       *
	       * Runs interval tasks scheduled to be run in the next `millis` milliseconds.
	       *
	       * @param {number=} millis maximum timeout amount to flush up until.
	       *
	       * @return {number} The amount of time moved forward.
	       */
	      $interval.flush = function (millis) {
	        now += millis;
	        while (repeatFns.length && repeatFns[0].nextTime <= now) {
	          var task = repeatFns[0];
	          task.fn();
	          task.nextTime += task.delay;
	          repeatFns.sort(function (a, b) {
	            return a.nextTime - b.nextTime;
	          });
	        }
	        return millis;
	      };
	
	      return $interval;
	    }];
	  };
	
	  function jsonStringToDate(string) {
	    // The R_ISO8061_STR regex is never going to fit into the 100 char limit!
	    // eslit-disable-next-line max-len
	    var R_ISO8061_STR = /^(-?\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d{3}))?)?)?(Z|([+-])(\d\d):?(\d\d)))?$/;
	
	    var match;
	    if (match = string.match(R_ISO8061_STR)) {
	      var date = new Date(0),
	          tzHour = 0,
	          tzMin = 0;
	      if (match[9]) {
	        tzHour = toInt(match[9] + match[10]);
	        tzMin = toInt(match[9] + match[11]);
	      }
	      date.setUTCFullYear(toInt(match[1]), toInt(match[2]) - 1, toInt(match[3]));
	      date.setUTCHours(toInt(match[4] || 0) - tzHour, toInt(match[5] || 0) - tzMin, toInt(match[6] || 0), toInt(match[7] || 0));
	      return date;
	    }
	    return string;
	  }
	
	  function toInt(str) {
	    return parseInt(str, 10);
	  }
	
	  function padNumberInMock(num, digits, trim) {
	    var neg = '';
	    if (num < 0) {
	      neg = '-';
	      num = -num;
	    }
	    num = '' + num;
	    while (num.length < digits) {
	      num = '0' + num;
	    }if (trim) {
	      num = num.substr(num.length - digits);
	    }
	    return neg + num;
	  }
	
	  /**
	   * @ngdoc type
	   * @name angular.mock.TzDate
	   * @description
	   *
	   * *NOTE*: this is not an injectable instance, just a globally available mock class of `Date`.
	   *
	   * Mock of the Date type which has its timezone specified via constructor arg.
	   *
	   * The main purpose is to create Date-like instances with timezone fixed to the specified timezone
	   * offset, so that we can test code that depends on local timezone settings without dependency on
	   * the time zone settings of the machine where the code is running.
	   *
	   * @param {number} offset Offset of the *desired* timezone in hours (fractions will be honored)
	   * @param {(number|string)} timestamp Timestamp representing the desired time in *UTC*
	   *
	   * @example
	   * !!!! WARNING !!!!!
	   * This is not a complete Date object so only methods that were implemented can be called safely.
	   * To make matters worse, TzDate instances inherit stuff from Date via a prototype.
	   *
	   * We do our best to intercept calls to "unimplemented" methods, but since the list of methods is
	   * incomplete we might be missing some non-standard methods. This can result in errors like:
	   * "Date.prototype.foo called on incompatible Object".
	   *
	   * ```js
	   * var newYearInBratislava = new TzDate(-1, '2009-12-31T23:00:00Z');
	   * newYearInBratislava.getTimezoneOffset() => -60;
	   * newYearInBratislava.getFullYear() => 2010;
	   * newYearInBratislava.getMonth() => 0;
	   * newYearInBratislava.getDate() => 1;
	   * newYearInBratislava.getHours() => 0;
	   * newYearInBratislava.getMinutes() => 0;
	   * newYearInBratislava.getSeconds() => 0;
	   * ```
	   *
	   */
	  angular.mock.TzDate = function (offset, timestamp) {
	    var self = new Date(0);
	    if (angular.isString(timestamp)) {
	      var tsStr = timestamp;
	
	      self.origDate = jsonStringToDate(timestamp);
	
	      timestamp = self.origDate.getTime();
	      if (isNaN(timestamp)) {
	        // eslint-disable-next-line no-throw-literal
	        throw {
	          name: 'Illegal Argument',
	          message: 'Arg \'' + tsStr + '\' passed into TzDate constructor is not a valid date string'
	        };
	      }
	    } else {
	      self.origDate = new Date(timestamp);
	    }
	
	    var localOffset = new Date(timestamp).getTimezoneOffset();
	    self.offsetDiff = localOffset * 60 * 1000 - offset * 1000 * 60 * 60;
	    self.date = new Date(timestamp + self.offsetDiff);
	
	    self.getTime = function () {
	      return self.date.getTime() - self.offsetDiff;
	    };
	
	    self.toLocaleDateString = function () {
	      return self.date.toLocaleDateString();
	    };
	
	    self.getFullYear = function () {
	      return self.date.getFullYear();
	    };
	
	    self.getMonth = function () {
	      return self.date.getMonth();
	    };
	
	    self.getDate = function () {
	      return self.date.getDate();
	    };
	
	    self.getHours = function () {
	      return self.date.getHours();
	    };
	
	    self.getMinutes = function () {
	      return self.date.getMinutes();
	    };
	
	    self.getSeconds = function () {
	      return self.date.getSeconds();
	    };
	
	    self.getMilliseconds = function () {
	      return self.date.getMilliseconds();
	    };
	
	    self.getTimezoneOffset = function () {
	      return offset * 60;
	    };
	
	    self.getUTCFullYear = function () {
	      return self.origDate.getUTCFullYear();
	    };
	
	    self.getUTCMonth = function () {
	      return self.origDate.getUTCMonth();
	    };
	
	    self.getUTCDate = function () {
	      return self.origDate.getUTCDate();
	    };
	
	    self.getUTCHours = function () {
	      return self.origDate.getUTCHours();
	    };
	
	    self.getUTCMinutes = function () {
	      return self.origDate.getUTCMinutes();
	    };
	
	    self.getUTCSeconds = function () {
	      return self.origDate.getUTCSeconds();
	    };
	
	    self.getUTCMilliseconds = function () {
	      return self.origDate.getUTCMilliseconds();
	    };
	
	    self.getDay = function () {
	      return self.date.getDay();
	    };
	
	    // provide this method only on browsers that already have it
	    if (self.toISOString) {
	      self.toISOString = function () {
	        return padNumberInMock(self.origDate.getUTCFullYear(), 4) + '-' + padNumberInMock(self.origDate.getUTCMonth() + 1, 2) + '-' + padNumberInMock(self.origDate.getUTCDate(), 2) + 'T' + padNumberInMock(self.origDate.getUTCHours(), 2) + ':' + padNumberInMock(self.origDate.getUTCMinutes(), 2) + ':' + padNumberInMock(self.origDate.getUTCSeconds(), 2) + '.' + padNumberInMock(self.origDate.getUTCMilliseconds(), 3) + 'Z';
	      };
	    }
	
	    //hide all methods not implemented in this mock that the Date prototype exposes
	    var unimplementedMethods = ['getUTCDay', 'getYear', 'setDate', 'setFullYear', 'setHours', 'setMilliseconds', 'setMinutes', 'setMonth', 'setSeconds', 'setTime', 'setUTCDate', 'setUTCFullYear', 'setUTCHours', 'setUTCMilliseconds', 'setUTCMinutes', 'setUTCMonth', 'setUTCSeconds', 'setYear', 'toDateString', 'toGMTString', 'toJSON', 'toLocaleFormat', 'toLocaleString', 'toLocaleTimeString', 'toSource', 'toString', 'toTimeString', 'toUTCString', 'valueOf'];
	
	    angular.forEach(unimplementedMethods, function (methodName) {
	      self[methodName] = function () {
	        throw new Error('Method \'' + methodName + '\' is not implemented in the TzDate mock');
	      };
	    });
	
	    return self;
	  };
	
	  //make "tzDateInstance instanceof Date" return true
	  angular.mock.TzDate.prototype = Date.prototype;
	
	  /**
	   * @ngdoc service
	   * @name $animate
	   *
	   * @description
	   * Mock implementation of the {@link ng.$animate `$animate`} service. Exposes two additional methods
	   * for testing animations.
	   *
	   * You need to require the `ngAnimateMock` module in your test suite for instance `beforeEach(module('ngAnimateMock'))`
	   */
	  angular.mock.animate = angular.module('ngAnimateMock', ['ng']).config(['$provide', function ($provide) {
	
	    $provide.factory('$$forceReflow', function () {
	      function reflowFn() {
	        reflowFn.totalReflows++;
	      }
	      reflowFn.totalReflows = 0;
	      return reflowFn;
	    });
	
	    $provide.factory('$$animateAsyncRun', function () {
	      var queue = [];
	      var queueFn = function queueFn() {
	        return function (fn) {
	          queue.push(fn);
	        };
	      };
	      queueFn.flush = function () {
	        if (queue.length === 0) return false;
	
	        for (var i = 0; i < queue.length; i++) {
	          queue[i]();
	        }
	        queue = [];
	
	        return true;
	      };
	      return queueFn;
	    });
	
	    $provide.decorator('$$animateJs', ['$delegate', function ($delegate) {
	      var runners = [];
	
	      var animateJsConstructor = function animateJsConstructor() {
	        var animator = $delegate.apply($delegate, arguments);
	        // If no javascript animation is found, animator is undefined
	        if (animator) {
	          runners.push(animator);
	        }
	        return animator;
	      };
	
	      animateJsConstructor.$closeAndFlush = function () {
	        runners.forEach(function (runner) {
	          runner.end();
	        });
	        runners = [];
	      };
	
	      return animateJsConstructor;
	    }]);
	
	    $provide.decorator('$animateCss', ['$delegate', function ($delegate) {
	      var runners = [];
	
	      var animateCssConstructor = function animateCssConstructor(element, options) {
	        var animator = $delegate(element, options);
	        runners.push(animator);
	        return animator;
	      };
	
	      animateCssConstructor.$closeAndFlush = function () {
	        runners.forEach(function (runner) {
	          runner.end();
	        });
	        runners = [];
	      };
	
	      return animateCssConstructor;
	    }]);
	
	    $provide.decorator('$animate', ['$delegate', '$timeout', '$browser', '$$rAF', '$animateCss', '$$animateJs', '$$forceReflow', '$$animateAsyncRun', '$rootScope', function ($delegate, $timeout, $browser, $$rAF, $animateCss, $$animateJs, $$forceReflow, $$animateAsyncRun, $rootScope) {
	      var animate = {
	        queue: [],
	        cancel: $delegate.cancel,
	        on: $delegate.on,
	        off: $delegate.off,
	        pin: $delegate.pin,
	        get reflows() {
	          return $$forceReflow.totalReflows;
	        },
	        enabled: $delegate.enabled,
	        /**
	         * @ngdoc method
	         * @name $animate#closeAndFlush
	         * @description
	         *
	         * This method will close all pending animations (both {@link ngAnimate#javascript-based-animations Javascript}
	         * and {@link ngAnimate.$animateCss CSS}) and it will also flush any remaining animation frames and/or callbacks.
	         */
	        closeAndFlush: function closeAndFlush() {
	          // we allow the flush command to swallow the errors
	          // because depending on whether CSS or JS animations are
	          // used, there may not be a RAF flush. The primary flush
	          // at the end of this function must throw an exception
	          // because it will track if there were pending animations
	          this.flush(true);
	          $animateCss.$closeAndFlush();
	          $$animateJs.$closeAndFlush();
	          this.flush();
	        },
	        /**
	         * @ngdoc method
	         * @name $animate#flush
	         * @description
	         *
	         * This method is used to flush the pending callbacks and animation frames to either start
	         * an animation or conclude an animation. Note that this will not actually close an
	         * actively running animation (see {@link ngMock.$animate#closeAndFlush `closeAndFlush()`} for that).
	         */
	        flush: function flush(hideErrors) {
	          $rootScope.$digest();
	
	          var doNextRun,
	              somethingFlushed = false;
	          do {
	            doNextRun = false;
	
	            if ($$rAF.queue.length) {
	              $$rAF.flush();
	              doNextRun = somethingFlushed = true;
	            }
	
	            if ($$animateAsyncRun.flush()) {
	              doNextRun = somethingFlushed = true;
	            }
	          } while (doNextRun);
	
	          if (!somethingFlushed && !hideErrors) {
	            throw new Error('No pending animations ready to be closed or flushed');
	          }
	
	          $rootScope.$digest();
	        }
	      };
	
	      angular.forEach(['animate', 'enter', 'leave', 'move', 'addClass', 'removeClass', 'setClass'], function (method) {
	        animate[method] = function () {
	          animate.queue.push({
	            event: method,
	            element: arguments[0],
	            options: arguments[arguments.length - 1],
	            args: arguments
	          });
	          return $delegate[method].apply($delegate, arguments);
	        };
	      });
	
	      return animate;
	    }]);
	  }]);
	
	  /**
	   * @ngdoc function
	   * @name angular.mock.dump
	   * @description
	   *
	   * *NOTE*: This is not an injectable instance, just a globally available function.
	   *
	   * Method for serializing common angular objects (scope, elements, etc..) into strings.
	   * It is useful for logging objects to the console when debugging.
	   *
	   * @param {*} object - any object to turn into string.
	   * @return {string} a serialized string of the argument
	   */
	  angular.mock.dump = function (object) {
	    return serialize(object);
	
	    function serialize(object) {
	      var out;
	
	      if (angular.isElement(object)) {
	        object = angular.element(object);
	        out = angular.element('<div></div>');
	        angular.forEach(object, function (element) {
	          out.append(angular.element(element).clone());
	        });
	        out = out.html();
	      } else if (angular.isArray(object)) {
	        out = [];
	        angular.forEach(object, function (o) {
	          out.push(serialize(o));
	        });
	        out = '[ ' + out.join(', ') + ' ]';
	      } else if (angular.isObject(object)) {
	        if (angular.isFunction(object.$eval) && angular.isFunction(object.$apply)) {
	          out = serializeScope(object);
	        } else if (object instanceof Error) {
	          out = object.stack || '' + object.name + ': ' + object.message;
	        } else {
	          // TODO(i): this prevents methods being logged,
	          // we should have a better way to serialize objects
	          out = angular.toJson(object, true);
	        }
	      } else {
	        out = String(object);
	      }
	
	      return out;
	    }
	
	    function serializeScope(scope, offset) {
	      offset = offset || '  ';
	      var log = [offset + 'Scope(' + scope.$id + '): {'];
	      for (var key in scope) {
	        if (Object.prototype.hasOwnProperty.call(scope, key) && !key.match(/^(\$|this)/)) {
	          log.push('  ' + key + ': ' + angular.toJson(scope[key]));
	        }
	      }
	      var child = scope.$$childHead;
	      while (child) {
	        log.push(serializeScope(child, offset + '  '));
	        child = child.$$nextSibling;
	      }
	      log.push('}');
	      return log.join('\n' + offset);
	    }
	  };
	
	  /**
	   * @ngdoc service
	   * @name $httpBackend
	   * @description
	   * Fake HTTP backend implementation suitable for unit testing applications that use the
	   * {@link ng.$http $http service}.
	   *
	   * <div class="alert alert-info">
	   * **Note**: For fake HTTP backend implementation suitable for end-to-end testing or backend-less
	   * development please see {@link ngMockE2E.$httpBackend e2e $httpBackend mock}.
	   * </div>
	   *
	   * During unit testing, we want our unit tests to run quickly and have no external dependencies so
	   * we don’t want to send [XHR](https://developer.mozilla.org/en/xmlhttprequest) or
	   * [JSONP](http://en.wikipedia.org/wiki/JSONP) requests to a real server. All we really need is
	   * to verify whether a certain request has been sent or not, or alternatively just let the
	   * application make requests, respond with pre-trained responses and assert that the end result is
	   * what we expect it to be.
	   *
	   * This mock implementation can be used to respond with static or dynamic responses via the
	   * `expect` and `when` apis and their shortcuts (`expectGET`, `whenPOST`, etc).
	   *
	   * When an Angular application needs some data from a server, it calls the $http service, which
	   * sends the request to a real server using $httpBackend service. With dependency injection, it is
	   * easy to inject $httpBackend mock (which has the same API as $httpBackend) and use it to verify
	   * the requests and respond with some testing data without sending a request to a real server.
	   *
	   * There are two ways to specify what test data should be returned as http responses by the mock
	   * backend when the code under test makes http requests:
	   *
	   * - `$httpBackend.expect` - specifies a request expectation
	   * - `$httpBackend.when` - specifies a backend definition
	   *
	   *
	   * ## Request Expectations vs Backend Definitions
	   *
	   * Request expectations provide a way to make assertions about requests made by the application and
	   * to define responses for those requests. The test will fail if the expected requests are not made
	   * or they are made in the wrong order.
	   *
	   * Backend definitions allow you to define a fake backend for your application which doesn't assert
	   * if a particular request was made or not, it just returns a trained response if a request is made.
	   * The test will pass whether or not the request gets made during testing.
	   *
	   *
	   * <table class="table">
	   *   <tr><th width="220px"></th><th>Request expectations</th><th>Backend definitions</th></tr>
	   *   <tr>
	   *     <th>Syntax</th>
	   *     <td>.expect(...).respond(...)</td>
	   *     <td>.when(...).respond(...)</td>
	   *   </tr>
	   *   <tr>
	   *     <th>Typical usage</th>
	   *     <td>strict unit tests</td>
	   *     <td>loose (black-box) unit testing</td>
	   *   </tr>
	   *   <tr>
	   *     <th>Fulfills multiple requests</th>
	   *     <td>NO</td>
	   *     <td>YES</td>
	   *   </tr>
	   *   <tr>
	   *     <th>Order of requests matters</th>
	   *     <td>YES</td>
	   *     <td>NO</td>
	   *   </tr>
	   *   <tr>
	   *     <th>Request required</th>
	   *     <td>YES</td>
	   *     <td>NO</td>
	   *   </tr>
	   *   <tr>
	   *     <th>Response required</th>
	   *     <td>optional (see below)</td>
	   *     <td>YES</td>
	   *   </tr>
	   * </table>
	   *
	   * In cases where both backend definitions and request expectations are specified during unit
	   * testing, the request expectations are evaluated first.
	   *
	   * If a request expectation has no response specified, the algorithm will search your backend
	   * definitions for an appropriate response.
	   *
	   * If a request didn't match any expectation or if the expectation doesn't have the response
	   * defined, the backend definitions are evaluated in sequential order to see if any of them match
	   * the request. The response from the first matched definition is returned.
	   *
	   *
	   * ## Flushing HTTP requests
	   *
	   * The $httpBackend used in production always responds to requests asynchronously. If we preserved
	   * this behavior in unit testing, we'd have to create async unit tests, which are hard to write,
	   * to follow and to maintain. But neither can the testing mock respond synchronously; that would
	   * change the execution of the code under test. For this reason, the mock $httpBackend has a
	   * `flush()` method, which allows the test to explicitly flush pending requests. This preserves
	   * the async api of the backend, while allowing the test to execute synchronously.
	   *
	   *
	   * ## Unit testing with mock $httpBackend
	   * The following code shows how to setup and use the mock backend when unit testing a controller.
	   * First we create the controller under test:
	   *
	    ```js
	    // The module code
	    angular
	      .module('MyApp', [])
	      .controller('MyController', MyController);
	  
	    // The controller code
	    function MyController($scope, $http) {
	      var authToken;
	  
	      $http.get('/auth.py').then(function(response) {
	        authToken = response.headers('A-Token');
	        $scope.user = response.data;
	      });
	  
	      $scope.saveMessage = function(message) {
	        var headers = { 'Authorization': authToken };
	        $scope.status = 'Saving...';
	  
	        $http.post('/add-msg.py', message, { headers: headers } ).then(function(response) {
	          $scope.status = '';
	        }).catch(function() {
	          $scope.status = 'Failed...';
	        });
	      };
	    }
	    ```
	   *
	   * Now we setup the mock backend and create the test specs:
	   *
	    ```js
	      // testing controller
	      describe('MyController', function() {
	         var $httpBackend, $rootScope, createController, authRequestHandler;
	  
	         // Set up the module
	         beforeEach(module('MyApp'));
	  
	         beforeEach(inject(function($injector) {
	           // Set up the mock http service responses
	           $httpBackend = $injector.get('$httpBackend');
	           // backend definition common for all tests
	           authRequestHandler = $httpBackend.when('GET', '/auth.py')
	                                  .respond({userId: 'userX'}, {'A-Token': 'xxx'});
	  
	           // Get hold of a scope (i.e. the root scope)
	           $rootScope = $injector.get('$rootScope');
	           // The $controller service is used to create instances of controllers
	           var $controller = $injector.get('$controller');
	  
	           createController = function() {
	             return $controller('MyController', {'$scope' : $rootScope });
	           };
	         }));
	  
	  
	         afterEach(function() {
	           $httpBackend.verifyNoOutstandingExpectation();
	           $httpBackend.verifyNoOutstandingRequest();
	         });
	  
	  
	         it('should fetch authentication token', function() {
	           $httpBackend.expectGET('/auth.py');
	           var controller = createController();
	           $httpBackend.flush();
	         });
	  
	  
	         it('should fail authentication', function() {
	  
	           // Notice how you can change the response even after it was set
	           authRequestHandler.respond(401, '');
	  
	           $httpBackend.expectGET('/auth.py');
	           var controller = createController();
	           $httpBackend.flush();
	           expect($rootScope.status).toBe('Failed...');
	         });
	  
	  
	         it('should send msg to server', function() {
	           var controller = createController();
	           $httpBackend.flush();
	  
	           // now you don’t care about the authentication, but
	           // the controller will still send the request and
	           // $httpBackend will respond without you having to
	           // specify the expectation and response for this request
	  
	           $httpBackend.expectPOST('/add-msg.py', 'message content').respond(201, '');
	           $rootScope.saveMessage('message content');
	           expect($rootScope.status).toBe('Saving...');
	           $httpBackend.flush();
	           expect($rootScope.status).toBe('');
	         });
	  
	  
	         it('should send auth header', function() {
	           var controller = createController();
	           $httpBackend.flush();
	  
	           $httpBackend.expectPOST('/add-msg.py', undefined, function(headers) {
	             // check if the header was sent, if it wasn't the expectation won't
	             // match the request and the test will fail
	             return headers['Authorization'] === 'xxx';
	           }).respond(201, '');
	  
	           $rootScope.saveMessage('whatever');
	           $httpBackend.flush();
	         });
	      });
	    ```
	   *
	   * ## Dynamic responses
	   *
	   * You define a response to a request by chaining a call to `respond()` onto a definition or expectation.
	   * If you provide a **callback** as the first parameter to `respond(callback)` then you can dynamically generate
	   * a response based on the properties of the request.
	   *
	   * The `callback` function should be of the form `function(method, url, data, headers, params)`.
	   *
	   * ### Query parameters
	   *
	   * By default, query parameters on request URLs are parsed into the `params` object. So a request URL
	   * of `/list?q=searchstr&orderby=-name` would set `params` to be `{q: 'searchstr', orderby: '-name'}`.
	   *
	   * ### Regex parameter matching
	   *
	   * If an expectation or definition uses a **regex** to match the URL, you can provide an array of **keys** via a
	   * `params` argument. The index of each **key** in the array will match the index of a **group** in the
	   * **regex**.
	   *
	   * The `params` object in the **callback** will now have properties with these keys, which hold the value of the
	   * corresponding **group** in the **regex**.
	   *
	   * This also applies to the `when` and `expect` shortcut methods.
	   *
	   *
	   * ```js
	   *   $httpBackend.expect('GET', /\/user\/(.+)/, undefined, undefined, ['id'])
	   *     .respond(function(method, url, data, headers, params) {
	   *       // for requested url of '/user/1234' params is {id: '1234'}
	   *     });
	   *
	   *   $httpBackend.whenPATCH(/\/user\/(.+)\/article\/(.+)/, undefined, undefined, ['user', 'article'])
	   *     .respond(function(method, url, data, headers, params) {
	   *       // for url of '/user/1234/article/567' params is {user: '1234', article: '567'}
	   *     });
	   * ```
	   *
	   * ## Matching route requests
	   *
	   * For extra convenience, `whenRoute` and `expectRoute` shortcuts are available. These methods offer colon
	   * delimited matching of the url path, ignoring the query string. This allows declarations
	   * similar to how application routes are configured with `$routeProvider`. Because these methods convert
	   * the definition url to regex, declaration order is important. Combined with query parameter parsing,
	   * the following is possible:
	   *
	    ```js
	      $httpBackend.whenRoute('GET', '/users/:id')
	        .respond(function(method, url, data, headers, params) {
	          return [200, MockUserList[Number(params.id)]];
	        });
	  
	      $httpBackend.whenRoute('GET', '/users')
	        .respond(function(method, url, data, headers, params) {
	          var userList = angular.copy(MockUserList),
	            defaultSort = 'lastName',
	            count, pages, isPrevious, isNext;
	  
	          // paged api response '/v1/users?page=2'
	          params.page = Number(params.page) || 1;
	  
	          // query for last names '/v1/users?q=Archer'
	          if (params.q) {
	            userList = $filter('filter')({lastName: params.q});
	          }
	  
	          pages = Math.ceil(userList.length / pagingLength);
	          isPrevious = params.page > 1;
	          isNext = params.page < pages;
	  
	          return [200, {
	            count:    userList.length,
	            previous: isPrevious,
	            next:     isNext,
	            // sort field -> '/v1/users?sortBy=firstName'
	            results:  $filter('orderBy')(userList, params.sortBy || defaultSort)
	                        .splice((params.page - 1) * pagingLength, pagingLength)
	          }];
	        });
	    ```
	   */
	  angular.mock.$HttpBackendProvider = function () {
	    this.$get = ['$rootScope', '$timeout', createHttpBackendMock];
	  };
	
	  /**
	   * General factory function for $httpBackend mock.
	   * Returns instance for unit testing (when no arguments specified):
	   *   - passing through is disabled
	   *   - auto flushing is disabled
	   *
	   * Returns instance for e2e testing (when `$delegate` and `$browser` specified):
	   *   - passing through (delegating request to real backend) is enabled
	   *   - auto flushing is enabled
	   *
	   * @param {Object=} $delegate Real $httpBackend instance (allow passing through if specified)
	   * @param {Object=} $browser Auto-flushing enabled if specified
	   * @return {Object} Instance of $httpBackend mock
	   */
	  function createHttpBackendMock($rootScope, $timeout, $delegate, $browser) {
	    var definitions = [],
	        expectations = [],
	        responses = [],
	        responsesPush = angular.bind(responses, responses.push),
	        copy = angular.copy;
	
	    function createResponse(status, data, headers, statusText) {
	      if (angular.isFunction(status)) return status;
	
	      return function () {
	        return angular.isNumber(status) ? [status, data, headers, statusText] : [200, status, data, headers];
	      };
	    }
	
	    // TODO(vojta): change params to: method, url, data, headers, callback
	    function $httpBackend(method, url, data, callback, headers, timeout, withCredentials, responseType, eventHandlers, uploadEventHandlers) {
	
	      var xhr = new MockXhr(),
	          expectation = expectations[0],
	          wasExpected = false;
	
	      xhr.$$events = eventHandlers;
	      xhr.upload.$$events = uploadEventHandlers;
	
	      function prettyPrint(data) {
	        return angular.isString(data) || angular.isFunction(data) || data instanceof RegExp ? data : angular.toJson(data);
	      }
	
	      function wrapResponse(wrapped) {
	        if (!$browser && timeout) {
	          if (timeout.then) {
	            timeout.then(handleTimeout);
	          } else {
	            $timeout(handleTimeout, timeout);
	          }
	        }
	
	        return handleResponse;
	
	        function handleResponse() {
	          var response = wrapped.response(method, url, data, headers, wrapped.params(url));
	          xhr.$$respHeaders = response[2];
	          callback(copy(response[0]), copy(response[1]), xhr.getAllResponseHeaders(), copy(response[3] || ''));
	        }
	
	        function handleTimeout() {
	          for (var i = 0, ii = responses.length; i < ii; i++) {
	            if (responses[i] === handleResponse) {
	              responses.splice(i, 1);
	              callback(-1, undefined, '');
	              break;
	            }
	          }
	        }
	      }
	
	      if (expectation && expectation.match(method, url)) {
	        if (!expectation.matchData(data)) {
	          throw new Error('Expected ' + expectation + ' with different data\n' + 'EXPECTED: ' + prettyPrint(expectation.data) + '\nGOT:      ' + data);
	        }
	
	        if (!expectation.matchHeaders(headers)) {
	          throw new Error('Expected ' + expectation + ' with different headers\n' + 'EXPECTED: ' + prettyPrint(expectation.headers) + '\nGOT:      ' + prettyPrint(headers));
	        }
	
	        expectations.shift();
	
	        if (expectation.response) {
	          responses.push(wrapResponse(expectation));
	          return;
	        }
	        wasExpected = true;
	      }
	
	      var i = -1,
	          definition;
	      while (definition = definitions[++i]) {
	        if (definition.match(method, url, data, headers || {})) {
	          if (definition.response) {
	            // if $browser specified, we do auto flush all requests
	            ($browser ? $browser.defer : responsesPush)(wrapResponse(definition));
	          } else if (definition.passThrough) {
	            $delegate(method, url, data, callback, headers, timeout, withCredentials, responseType, eventHandlers, uploadEventHandlers);
	          } else throw new Error('No response defined !');
	          return;
	        }
	      }
	      throw wasExpected ? new Error('No response defined !') : new Error('Unexpected request: ' + method + ' ' + url + '\n' + (expectation ? 'Expected ' + expectation : 'No more request expected'));
	    }
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#when
	     * @description
	     * Creates a new backend definition.
	     *
	     * @param {string} method HTTP method.
	     * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	     *   and returns true if the url matches the current definition.
	     * @param {(string|RegExp|function(string))=} data HTTP request body or function that receives
	     *   data string and returns true if the data is as expected.
	     * @param {(Object|function(Object))=} headers HTTP headers or function that receives http header
	     *   object and returns true if the headers match the current definition.
	     * @param {(Array)=} keys Array of keys to assign to regex matches in request url described above.
	     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
	     *   request is handled. You can save this object for later use and invoke `respond` again in
	     *   order to change how a matched request is handled.
	     *
	     *  - respond –
	     *      ```js
	     *      {function([status,] data[, headers, statusText])
	     *      | function(function(method, url, data, headers, params)}
	     *      ```
	     *    – The respond method takes a set of static data to be returned or a function that can
	     *    return an array containing response status (number), response data (Array|Object|string),
	     *    response headers (Object), and the text for the status (string). The respond method returns
	     *    the `requestHandler` object for possible overrides.
	     */
	    $httpBackend.when = function (method, url, data, headers, keys) {
	
	      assertArgDefined(arguments, 1, 'url');
	
	      var definition = new MockHttpExpectation(method, url, data, headers, keys),
	          chain = {
	        respond: function respond(status, data, headers, statusText) {
	          definition.passThrough = undefined;
	          definition.response = createResponse(status, data, headers, statusText);
	          return chain;
	        }
	      };
	
	      if ($browser) {
	        chain.passThrough = function () {
	          definition.response = undefined;
	          definition.passThrough = true;
	          return chain;
	        };
	      }
	
	      definitions.push(definition);
	      return chain;
	    };
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#whenGET
	     * @description
	     * Creates a new backend definition for GET requests. For more info see `when()`.
	     *
	     * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	     *   and returns true if the url matches the current definition.
	     * @param {(Object|function(Object))=} headers HTTP headers.
	     * @param {(Array)=} keys Array of keys to assign to regex matches in request url described above.
	     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
	     * request is handled. You can save this object for later use and invoke `respond` again in
	     * order to change how a matched request is handled.
	     */
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#whenHEAD
	     * @description
	     * Creates a new backend definition for HEAD requests. For more info see `when()`.
	     *
	     * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	     *   and returns true if the url matches the current definition.
	     * @param {(Object|function(Object))=} headers HTTP headers.
	     * @param {(Array)=} keys Array of keys to assign to regex matches in request url described above.
	     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
	     * request is handled. You can save this object for later use and invoke `respond` again in
	     * order to change how a matched request is handled.
	     */
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#whenDELETE
	     * @description
	     * Creates a new backend definition for DELETE requests. For more info see `when()`.
	     *
	     * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	     *   and returns true if the url matches the current definition.
	     * @param {(Object|function(Object))=} headers HTTP headers.
	     * @param {(Array)=} keys Array of keys to assign to regex matches in request url described above.
	     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
	     * request is handled. You can save this object for later use and invoke `respond` again in
	     * order to change how a matched request is handled.
	     */
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#whenPOST
	     * @description
	     * Creates a new backend definition for POST requests. For more info see `when()`.
	     *
	     * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	     *   and returns true if the url matches the current definition.
	     * @param {(string|RegExp|function(string))=} data HTTP request body or function that receives
	     *   data string and returns true if the data is as expected.
	     * @param {(Object|function(Object))=} headers HTTP headers.
	     * @param {(Array)=} keys Array of keys to assign to regex matches in request url described above.
	     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
	     * request is handled. You can save this object for later use and invoke `respond` again in
	     * order to change how a matched request is handled.
	     */
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#whenPUT
	     * @description
	     * Creates a new backend definition for PUT requests.  For more info see `when()`.
	     *
	     * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	     *   and returns true if the url matches the current definition.
	     * @param {(string|RegExp|function(string))=} data HTTP request body or function that receives
	     *   data string and returns true if the data is as expected.
	     * @param {(Object|function(Object))=} headers HTTP headers.
	     * @param {(Array)=} keys Array of keys to assign to regex matches in request url described above.
	     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
	     * request is handled. You can save this object for later use and invoke `respond` again in
	     * order to change how a matched request is handled.
	     */
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#whenJSONP
	     * @description
	     * Creates a new backend definition for JSONP requests. For more info see `when()`.
	     *
	     * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	     *   and returns true if the url matches the current definition.
	     * @param {(Array)=} keys Array of keys to assign to regex matches in request url described above.
	     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
	     * request is handled. You can save this object for later use and invoke `respond` again in
	     * order to change how a matched request is handled.
	     */
	    createShortMethods('when');
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#whenRoute
	     * @description
	     * Creates a new backend definition that compares only with the requested route.
	     *
	     * @param {string} method HTTP method.
	     * @param {string} url HTTP url string that supports colon param matching.
	     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
	     * request is handled. You can save this object for later use and invoke `respond` again in
	     * order to change how a matched request is handled. See #when for more info.
	     */
	    $httpBackend.whenRoute = function (method, url) {
	      var pathObj = parseRoute(url);
	      return $httpBackend.when(method, pathObj.regexp, undefined, undefined, pathObj.keys);
	    };
	
	    function parseRoute(url) {
	      var ret = {
	        regexp: url
	      },
	          keys = ret.keys = [];
	
	      if (!url || !angular.isString(url)) return ret;
	
	      url = url.replace(/([().])/g, '\\$1').replace(/(\/)?:(\w+)([?*])?/g, function (_, slash, key, option) {
	        var optional = option === '?' ? option : null;
	        var star = option === '*' ? option : null;
	        keys.push({ name: key, optional: !!optional });
	        slash = slash || '';
	        return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (star && '(.+?)' || '([^/]+)') + (optional || '') + ')' + (optional || '');
	      }).replace(/([/$*])/g, '\\$1');
	
	      ret.regexp = new RegExp('^' + url, 'i');
	      return ret;
	    }
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#expect
	     * @description
	     * Creates a new request expectation.
	     *
	     * @param {string} method HTTP method.
	     * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	     *   and returns true if the url matches the current definition.
	     * @param {(string|RegExp|function(string)|Object)=} data HTTP request body or function that
	     *  receives data string and returns true if the data is as expected, or Object if request body
	     *  is in JSON format.
	     * @param {(Object|function(Object))=} headers HTTP headers or function that receives http header
	     *   object and returns true if the headers match the current expectation.
	     * @param {(Array)=} keys Array of keys to assign to regex matches in request url described above.
	     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
	     *  request is handled. You can save this object for later use and invoke `respond` again in
	     *  order to change how a matched request is handled.
	     *
	     *  - respond –
	     *    ```
	     *    { function([status,] data[, headers, statusText])
	     *    | function(function(method, url, data, headers, params)}
	     *    ```
	     *    – The respond method takes a set of static data to be returned or a function that can
	     *    return an array containing response status (number), response data (Array|Object|string),
	     *    response headers (Object), and the text for the status (string). The respond method returns
	     *    the `requestHandler` object for possible overrides.
	     */
	    $httpBackend.expect = function (method, url, data, headers, keys) {
	
	      assertArgDefined(arguments, 1, 'url');
	
	      var expectation = new MockHttpExpectation(method, url, data, headers, keys),
	          chain = {
	        respond: function respond(status, data, headers, statusText) {
	          expectation.response = createResponse(status, data, headers, statusText);
	          return chain;
	        }
	      };
	
	      expectations.push(expectation);
	      return chain;
	    };
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#expectGET
	     * @description
	     * Creates a new request expectation for GET requests. For more info see `expect()`.
	     *
	     * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	     *   and returns true if the url matches the current definition.
	     * @param {Object=} headers HTTP headers.
	     * @param {(Array)=} keys Array of keys to assign to regex matches in request url described above.
	     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
	     * request is handled. You can save this object for later use and invoke `respond` again in
	     * order to change how a matched request is handled. See #expect for more info.
	     */
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#expectHEAD
	     * @description
	     * Creates a new request expectation for HEAD requests. For more info see `expect()`.
	     *
	     * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	     *   and returns true if the url matches the current definition.
	     * @param {Object=} headers HTTP headers.
	     * @param {(Array)=} keys Array of keys to assign to regex matches in request url described above.
	     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
	     *   request is handled. You can save this object for later use and invoke `respond` again in
	     *   order to change how a matched request is handled.
	     */
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#expectDELETE
	     * @description
	     * Creates a new request expectation for DELETE requests. For more info see `expect()`.
	     *
	     * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	     *   and returns true if the url matches the current definition.
	     * @param {Object=} headers HTTP headers.
	     * @param {(Array)=} keys Array of keys to assign to regex matches in request url described above.
	     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
	     *   request is handled. You can save this object for later use and invoke `respond` again in
	     *   order to change how a matched request is handled.
	     */
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#expectPOST
	     * @description
	     * Creates a new request expectation for POST requests. For more info see `expect()`.
	     *
	     * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	     *   and returns true if the url matches the current definition.
	     * @param {(string|RegExp|function(string)|Object)=} data HTTP request body or function that
	     *  receives data string and returns true if the data is as expected, or Object if request body
	     *  is in JSON format.
	     * @param {Object=} headers HTTP headers.
	     * @param {(Array)=} keys Array of keys to assign to regex matches in request url described above.
	     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
	     *   request is handled. You can save this object for later use and invoke `respond` again in
	     *   order to change how a matched request is handled.
	     */
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#expectPUT
	     * @description
	     * Creates a new request expectation for PUT requests. For more info see `expect()`.
	     *
	     * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	     *   and returns true if the url matches the current definition.
	     * @param {(string|RegExp|function(string)|Object)=} data HTTP request body or function that
	     *  receives data string and returns true if the data is as expected, or Object if request body
	     *  is in JSON format.
	     * @param {Object=} headers HTTP headers.
	     * @param {(Array)=} keys Array of keys to assign to regex matches in request url described above.
	     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
	     *   request is handled. You can save this object for later use and invoke `respond` again in
	     *   order to change how a matched request is handled.
	     */
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#expectPATCH
	     * @description
	     * Creates a new request expectation for PATCH requests. For more info see `expect()`.
	     *
	     * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	     *   and returns true if the url matches the current definition.
	     * @param {(string|RegExp|function(string)|Object)=} data HTTP request body or function that
	     *  receives data string and returns true if the data is as expected, or Object if request body
	     *  is in JSON format.
	     * @param {Object=} headers HTTP headers.
	     * @param {(Array)=} keys Array of keys to assign to regex matches in request url described above.
	     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
	     *   request is handled. You can save this object for later use and invoke `respond` again in
	     *   order to change how a matched request is handled.
	     */
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#expectJSONP
	     * @description
	     * Creates a new request expectation for JSONP requests. For more info see `expect()`.
	     *
	     * @param {string|RegExp|function(string)=} url HTTP url or function that receives an url
	     *   and returns true if the url matches the current definition.
	     * @param {(Array)=} keys Array of keys to assign to regex matches in request url described above.
	     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
	     *   request is handled. You can save this object for later use and invoke `respond` again in
	     *   order to change how a matched request is handled.
	     */
	    createShortMethods('expect');
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#expectRoute
	     * @description
	     * Creates a new request expectation that compares only with the requested route.
	     *
	     * @param {string} method HTTP method.
	     * @param {string} url HTTP url string that supports colon param matching.
	     * @returns {requestHandler} Returns an object with `respond` method that controls how a matched
	     * request is handled. You can save this object for later use and invoke `respond` again in
	     * order to change how a matched request is handled. See #expect for more info.
	     */
	    $httpBackend.expectRoute = function (method, url) {
	      var pathObj = parseRoute(url);
	      return $httpBackend.expect(method, pathObj.regexp, undefined, undefined, pathObj.keys);
	    };
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#flush
	     * @description
	     * Flushes pending requests using the trained responses. Requests are flushed in the order they
	     * were made, but it is also possible to skip one or more requests (for example to have them
	     * flushed later). This is useful for simulating scenarios where responses arrive from the server
	     * in any order.
	     *
	     * If there are no pending requests to flush when the method is called, an exception is thrown (as
	     * this is typically a sign of programming error).
	     *
	     * @param {number=} count - Number of responses to flush. If undefined/null, all pending requests
	     *     (starting after `skip`) will be flushed.
	     * @param {number=} [skip=0] - Number of pending requests to skip. For example, a value of `5`
	     *     would skip the first 5 pending requests and start flushing from the 6th onwards.
	     */
	    $httpBackend.flush = function (count, skip, digest) {
	      if (digest !== false) $rootScope.$digest();
	
	      skip = skip || 0;
	      if (skip >= responses.length) throw new Error('No pending request to flush !');
	
	      if (angular.isDefined(count) && count !== null) {
	        while (count--) {
	          var part = responses.splice(skip, 1);
	          if (!part.length) throw new Error('No more pending request to flush !');
	          part[0]();
	        }
	      } else {
	        while (responses.length > skip) {
	          responses.splice(skip, 1)[0]();
	        }
	      }
	      $httpBackend.verifyNoOutstandingExpectation(digest);
	    };
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#verifyNoOutstandingExpectation
	     * @description
	     * Verifies that all of the requests defined via the `expect` api were made. If any of the
	     * requests were not made, verifyNoOutstandingExpectation throws an exception.
	     *
	     * Typically, you would call this method following each test case that asserts requests using an
	     * "afterEach" clause.
	     *
	     * ```js
	     *   afterEach($httpBackend.verifyNoOutstandingExpectation);
	     * ```
	     */
	    $httpBackend.verifyNoOutstandingExpectation = function (digest) {
	      if (digest !== false) $rootScope.$digest();
	      if (expectations.length) {
	        throw new Error('Unsatisfied requests: ' + expectations.join(', '));
	      }
	    };
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#verifyNoOutstandingRequest
	     * @description
	     * Verifies that there are no outstanding requests that need to be flushed.
	     *
	     * Typically, you would call this method following each test case that asserts requests using an
	     * "afterEach" clause.
	     *
	     * ```js
	     *   afterEach($httpBackend.verifyNoOutstandingRequest);
	     * ```
	     */
	    $httpBackend.verifyNoOutstandingRequest = function (digest) {
	      if (digest !== false) $rootScope.$digest();
	      if (responses.length) {
	        throw new Error('Unflushed requests: ' + responses.length);
	      }
	    };
	
	    /**
	     * @ngdoc method
	     * @name $httpBackend#resetExpectations
	     * @description
	     * Resets all request expectations, but preserves all backend definitions. Typically, you would
	     * call resetExpectations during a multiple-phase test when you want to reuse the same instance of
	     * $httpBackend mock.
	     */
	    $httpBackend.resetExpectations = function () {
	      expectations.length = 0;
	      responses.length = 0;
	    };
	
	    return $httpBackend;
	
	    function createShortMethods(prefix) {
	      angular.forEach(['GET', 'DELETE', 'JSONP', 'HEAD'], function (method) {
	        $httpBackend[prefix + method] = function (url, headers, keys) {
	          assertArgDefined(arguments, 0, 'url');
	
	          // Change url to `null` if `undefined` to stop it throwing an exception further down
	          if (angular.isUndefined(url)) url = null;
	
	          return $httpBackend[prefix](method, url, undefined, headers, keys);
	        };
	      });
	
	      angular.forEach(['PUT', 'POST', 'PATCH'], function (method) {
	        $httpBackend[prefix + method] = function (url, data, headers, keys) {
	          assertArgDefined(arguments, 0, 'url');
	
	          // Change url to `null` if `undefined` to stop it throwing an exception further down
	          if (angular.isUndefined(url)) url = null;
	
	          return $httpBackend[prefix](method, url, data, headers, keys);
	        };
	      });
	    }
	  }
	
	  function assertArgDefined(args, index, name) {
	    if (args.length > index && angular.isUndefined(args[index])) {
	      throw new Error('Undefined argument `' + name + '`; the argument is provided but not defined');
	    }
	  }
	
	  function MockHttpExpectation(method, url, data, headers, keys) {
	
	    function getUrlParams(u) {
	      var params = u.slice(u.indexOf('?') + 1).split('&');
	      return params.sort();
	    }
	
	    function compareUrl(u) {
	      return url.slice(0, url.indexOf('?')) === u.slice(0, u.indexOf('?')) && getUrlParams(url).join() === getUrlParams(u).join();
	    }
	
	    this.data = data;
	    this.headers = headers;
	
	    this.match = function (m, u, d, h) {
	      if (method !== m) return false;
	      if (!this.matchUrl(u)) return false;
	      if (angular.isDefined(d) && !this.matchData(d)) return false;
	      if (angular.isDefined(h) && !this.matchHeaders(h)) return false;
	      return true;
	    };
	
	    this.matchUrl = function (u) {
	      if (!url) return true;
	      if (angular.isFunction(url.test)) return url.test(u);
	      if (angular.isFunction(url)) return url(u);
	      return url === u || compareUrl(u);
	    };
	
	    this.matchHeaders = function (h) {
	      if (angular.isUndefined(headers)) return true;
	      if (angular.isFunction(headers)) return headers(h);
	      return angular.equals(headers, h);
	    };
	
	    this.matchData = function (d) {
	      if (angular.isUndefined(data)) return true;
	      if (data && angular.isFunction(data.test)) return data.test(d);
	      if (data && angular.isFunction(data)) return data(d);
	      if (data && !angular.isString(data)) {
	        return angular.equals(angular.fromJson(angular.toJson(data)), angular.fromJson(d));
	      }
	      // eslint-disable-next-line eqeqeq
	      return data == d;
	    };
	
	    this.toString = function () {
	      return method + ' ' + url;
	    };
	
	    this.params = function (u) {
	      return angular.extend(parseQuery(), pathParams());
	
	      function pathParams() {
	        var keyObj = {};
	        if (!url || !angular.isFunction(url.test) || !keys || keys.length === 0) return keyObj;
	
	        var m = url.exec(u);
	        if (!m) return keyObj;
	        for (var i = 1, len = m.length; i < len; ++i) {
	          var key = keys[i - 1];
	          var val = m[i];
	          if (key && val) {
	            keyObj[key.name || key] = val;
	          }
	        }
	
	        return keyObj;
	      }
	
	      function parseQuery() {
	        var obj = {},
	            key_value,
	            key,
	            queryStr = u.indexOf('?') > -1 ? u.substring(u.indexOf('?') + 1) : '';
	
	        angular.forEach(queryStr.split('&'), function (keyValue) {
	          if (keyValue) {
	            key_value = keyValue.replace(/\+/g, '%20').split('=');
	            key = tryDecodeURIComponent(key_value[0]);
	            if (angular.isDefined(key)) {
	              var val = angular.isDefined(key_value[1]) ? tryDecodeURIComponent(key_value[1]) : true;
	              if (!hasOwnProperty.call(obj, key)) {
	                obj[key] = val;
	              } else if (angular.isArray(obj[key])) {
	                obj[key].push(val);
	              } else {
	                obj[key] = [obj[key], val];
	              }
	            }
	          }
	        });
	        return obj;
	      }
	      function tryDecodeURIComponent(value) {
	        try {
	          return decodeURIComponent(value);
	        } catch (e) {
	          // Ignore any invalid uri component
	        }
	      }
	    };
	  }
	
	  function createMockXhr() {
	    return new MockXhr();
	  }
	
	  function MockXhr() {
	
	    // hack for testing $http, $httpBackend
	    MockXhr.$$lastInstance = this;
	
	    this.open = function (method, url, async) {
	      this.$$method = method;
	      this.$$url = url;
	      this.$$async = async;
	      this.$$reqHeaders = {};
	      this.$$respHeaders = {};
	    };
	
	    this.send = function (data) {
	      this.$$data = data;
	    };
	
	    this.setRequestHeader = function (key, value) {
	      this.$$reqHeaders[key] = value;
	    };
	
	    this.getResponseHeader = function (name) {
	      // the lookup must be case insensitive,
	      // that's why we try two quick lookups first and full scan last
	      var header = this.$$respHeaders[name];
	      if (header) return header;
	
	      name = angular.lowercase(name);
	      header = this.$$respHeaders[name];
	      if (header) return header;
	
	      header = undefined;
	      angular.forEach(this.$$respHeaders, function (headerVal, headerName) {
	        if (!header && angular.lowercase(headerName) === name) header = headerVal;
	      });
	      return header;
	    };
	
	    this.getAllResponseHeaders = function () {
	      var lines = [];
	
	      angular.forEach(this.$$respHeaders, function (value, key) {
	        lines.push(key + ': ' + value);
	      });
	      return lines.join('\n');
	    };
	
	    this.abort = angular.noop;
	
	    // This section simulates the events on a real XHR object (and the upload object)
	    // When we are testing $httpBackend (inside the angular project) we make partial use of this
	    // but store the events directly ourselves on `$$events`, instead of going through the `addEventListener`
	    this.$$events = {};
	    this.addEventListener = function (name, listener) {
	      if (angular.isUndefined(this.$$events[name])) this.$$events[name] = [];
	      this.$$events[name].push(listener);
	    };
	
	    this.upload = {
	      $$events: {},
	      addEventListener: this.addEventListener
	    };
	  }
	
	  /**
	   * @ngdoc service
	   * @name $timeout
	   * @description
	   *
	   * This service is just a simple decorator for {@link ng.$timeout $timeout} service
	   * that adds a "flush" and "verifyNoPendingTasks" methods.
	   */
	
	  angular.mock.$TimeoutDecorator = ['$delegate', '$browser', function ($delegate, $browser) {
	
	    /**
	     * @ngdoc method
	     * @name $timeout#flush
	     * @description
	     *
	     * Flushes the queue of pending tasks.
	     *
	     * @param {number=} delay maximum timeout amount to flush up until
	     */
	    $delegate.flush = function (delay) {
	      $browser.defer.flush(delay);
	    };
	
	    /**
	     * @ngdoc method
	     * @name $timeout#verifyNoPendingTasks
	     * @description
	     *
	     * Verifies that there are no pending tasks that need to be flushed.
	     */
	    $delegate.verifyNoPendingTasks = function () {
	      if ($browser.deferredFns.length) {
	        throw new Error('Deferred tasks to flush (' + $browser.deferredFns.length + '): ' + formatPendingTasksAsString($browser.deferredFns));
	      }
	    };
	
	    function formatPendingTasksAsString(tasks) {
	      var result = [];
	      angular.forEach(tasks, function (task) {
	        result.push('{id: ' + task.id + ', time: ' + task.time + '}');
	      });
	
	      return result.join(', ');
	    }
	
	    return $delegate;
	  }];
	
	  angular.mock.$RAFDecorator = ['$delegate', function ($delegate) {
	    var rafFn = function rafFn(fn) {
	      var index = rafFn.queue.length;
	      rafFn.queue.push(fn);
	      return function () {
	        rafFn.queue.splice(index, 1);
	      };
	    };
	
	    rafFn.queue = [];
	    rafFn.supported = $delegate.supported;
	
	    rafFn.flush = function () {
	      if (rafFn.queue.length === 0) {
	        throw new Error('No rAF callbacks present');
	      }
	
	      var length = rafFn.queue.length;
	      for (var i = 0; i < length; i++) {
	        rafFn.queue[i]();
	      }
	
	      rafFn.queue = rafFn.queue.slice(i);
	    };
	
	    return rafFn;
	  }];
	
	  /**
	   *
	   */
	  var originalRootElement;
	  angular.mock.$RootElementProvider = function () {
	    this.$get = ['$injector', function ($injector) {
	      originalRootElement = angular.element('<div ng-app></div>').data('$injector', $injector);
	      return originalRootElement;
	    }];
	  };
	
	  /**
	   * @ngdoc service
	   * @name $controller
	   * @description
	   * A decorator for {@link ng.$controller} with additional `bindings` parameter, useful when testing
	   * controllers of directives that use {@link $compile#-bindtocontroller- `bindToController`}.
	   *
	   * Depending on the value of
	   * {@link ng.$compileProvider#preAssignBindingsEnabled `preAssignBindingsEnabled()`}, the properties
	   * will be bound before or after invoking the constructor.
	   *
	   *
	   * ## Example
	   *
	   * ```js
	   *
	   * // Directive definition ...
	   *
	   * myMod.directive('myDirective', {
	   *   controller: 'MyDirectiveController',
	   *   bindToController: {
	   *     name: '@'
	   *   }
	   * });
	   *
	   *
	   * // Controller definition ...
	   *
	   * myMod.controller('MyDirectiveController', ['$log', function($log) {
	   *   this.log = function() {
	   *     $log.info(this.name);
	   *   };
	   * }]);
	   *
	   *
	   * // In a test ...
	   *
	   * describe('myDirectiveController', function() {
	   *   describe('log()', function() {
	   *     it('should write the bound name to the log', inject(function($controller, $log) {
	   *       var ctrl = $controller('MyDirectiveController', { /* no locals &#42;/ }, { name: 'Clark Kent' });
	   *       ctrl.log();
	   *
	   *       expect(ctrl.name).toEqual('Clark Kent');
	   *       expect($log.info.logs).toEqual(['Clark Kent']);
	   *     }));
	   *   });
	   * });
	   *
	   * ```
	   *
	   * @param {Function|string} constructor If called with a function then it's considered to be the
	   *    controller constructor function. Otherwise it's considered to be a string which is used
	   *    to retrieve the controller constructor using the following steps:
	   *
	   *    * check if a controller with given name is registered via `$controllerProvider`
	   *    * check if evaluating the string on the current scope returns a constructor
	   *    * if $controllerProvider#allowGlobals, check `window[constructor]` on the global
	   *      `window` object (deprecated, not recommended)
	   *
	   *    The string can use the `controller as property` syntax, where the controller instance is published
	   *    as the specified property on the `scope`; the `scope` must be injected into `locals` param for this
	   *    to work correctly.
	   *
	   * @param {Object} locals Injection locals for Controller.
	   * @param {Object=} bindings Properties to add to the controller instance. This is used to simulate
	   *                           the `bindToController` feature and simplify certain kinds of tests.
	   * @return {Object} Instance of given controller.
	   */
	  function createControllerDecorator(compileProvider) {
	    angular.mock.$ControllerDecorator = ['$delegate', function ($delegate) {
	      return function (expression, locals, later, ident) {
	        if (later && (typeof later === 'undefined' ? 'undefined' : _typeof(later)) === 'object') {
	          var preAssignBindingsEnabled = compileProvider.preAssignBindingsEnabled();
	
	          var instantiate = $delegate(expression, locals, true, ident);
	          if (preAssignBindingsEnabled) {
	            angular.extend(instantiate.instance, later);
	          }
	
	          var instance = instantiate();
	          if (!preAssignBindingsEnabled || instance !== instantiate.instance) {
	            angular.extend(instance, later);
	          }
	
	          return instance;
	        }
	        return $delegate(expression, locals, later, ident);
	      };
	    }];
	
	    return angular.mock.$ControllerDecorator;
	  }
	
	  /**
	   * @ngdoc service
	   * @name $componentController
	   * @description
	   * A service that can be used to create instances of component controllers. Useful for unit-testing.
	   *
	   * Be aware that the controller will be instantiated and attached to the scope as specified in
	   * the component definition object. If you do not provide a `$scope` object in the `locals` param
	   * then the helper will create a new isolated scope as a child of `$rootScope`.
	   *
	   * If you are using `$element` or `$attrs` in the controller, make sure to provide them as `locals`.
	   * The `$element` must be a jqLite-wrapped DOM element, and `$attrs` should be an object that
	   * has all properties / functions that you are using in the controller. If this is getting too complex,
	   * you should compile the component instead and access the component's controller via the
	   * {@link angular.element#methods `controller`} function.
	   *
	   * See also the section on {@link guide/component#unit-testing-component-controllers unit-testing component controllers}
	   * in the guide.
	   *
	   * @param {string} componentName the name of the component whose controller we want to instantiate
	   * @param {Object} locals Injection locals for Controller.
	   * @param {Object=} bindings Properties to add to the controller before invoking the constructor. This is used
	   *                           to simulate the `bindToController` feature and simplify certain kinds of tests.
	   * @param {string=} ident Override the property name to use when attaching the controller to the scope.
	   * @return {Object} Instance of requested controller.
	   */
	  angular.mock.$ComponentControllerProvider = ['$compileProvider', function ComponentControllerProvider($compileProvider) {
	    this.$get = ['$controller', '$injector', '$rootScope', function ($controller, $injector, $rootScope) {
	      return function $componentController(componentName, locals, bindings, ident) {
	        // get all directives associated to the component name
	        var directives = $injector.get(componentName + 'Directive');
	        // look for those directives that are components
	        var candidateDirectives = directives.filter(function (directiveInfo) {
	          // components have controller, controllerAs and restrict:'E'
	          return directiveInfo.controller && directiveInfo.controllerAs && directiveInfo.restrict === 'E';
	        });
	        // check if valid directives found
	        if (candidateDirectives.length === 0) {
	          throw new Error('No component found');
	        }
	        if (candidateDirectives.length > 1) {
	          throw new Error('Too many components found');
	        }
	        // get the info of the component
	        var directiveInfo = candidateDirectives[0];
	        // create a scope if needed
	        locals = locals || {};
	        locals.$scope = locals.$scope || $rootScope.$new(true);
	        return $controller(directiveInfo.controller, locals, bindings, ident || directiveInfo.controllerAs);
	      };
	    }];
	  }];
	
	  /**
	   * @ngdoc module
	   * @name ngMock
	   * @packageName angular-mocks
	   * @description
	   *
	   * # ngMock
	   *
	   * The `ngMock` module provides support to inject and mock Angular services into unit tests.
	   * In addition, ngMock also extends various core ng services such that they can be
	   * inspected and controlled in a synchronous manner within test code.
	   *
	   *
	   * <div doc-module-components="ngMock"></div>
	   *
	   * @installation
	   *
	   *  First, download the file:
	   *  * [Google CDN](https://developers.google.com/speed/libraries/devguide#angularjs) e.g.
	   *    `"//ajax.googleapis.com/ajax/libs/angularjs/X.Y.Z/angular-mocks.js"`
	   *  * [NPM](https://www.npmjs.com/) e.g. `npm install angular-mocks@X.Y.Z`
	   *  * [Yarn](https://yarnpkg.com) e.g. `yarn add angular-mocks@X.Y.Z`
	   *  * [Bower](http://bower.io) e.g. `bower install angular-mocks#X.Y.Z`
	   *  * [code.angularjs.org](https://code.angularjs.org/) (discouraged for production use)  e.g.
	   *    `"//code.angularjs.org/X.Y.Z/angular-mocks.js"`
	   *
	   * where X.Y.Z is the AngularJS version you are running.
	   *
	   * Then, configure your test runner to load `angular-mocks.js` after `angular.js`.
	   * This example uses <a href="http://karma-runner.github.io/">Karma</a>:
	   *
	   * ```
	   * config.set({
	   *   files: [
	   *     'build/angular.js', // and other module files you need
	   *     'build/angular-mocks.js',
	   *     '<path/to/application/files>',
	   *     '<path/to/spec/files>'
	   *   ]
	   * });
	   * ```
	   *
	   * Including the `angular-mocks.js` file automatically adds the `ngMock` module, so your tests
	   *  are ready to go!
	   */
	  angular.module('ngMock', ['ng']).provider({
	    $browser: angular.mock.$BrowserProvider,
	    $exceptionHandler: angular.mock.$ExceptionHandlerProvider,
	    $log: angular.mock.$LogProvider,
	    $interval: angular.mock.$IntervalProvider,
	    $httpBackend: angular.mock.$HttpBackendProvider,
	    $rootElement: angular.mock.$RootElementProvider,
	    $componentController: angular.mock.$ComponentControllerProvider
	  }).config(['$provide', '$compileProvider', function ($provide, $compileProvider) {
	    $provide.decorator('$timeout', angular.mock.$TimeoutDecorator);
	    $provide.decorator('$$rAF', angular.mock.$RAFDecorator);
	    $provide.decorator('$rootScope', angular.mock.$RootScopeDecorator);
	    $provide.decorator('$controller', createControllerDecorator($compileProvider));
	  }]);
	
	  /**
	   * @ngdoc module
	   * @name ngMockE2E
	   * @module ngMockE2E
	   * @packageName angular-mocks
	   * @description
	   *
	   * The `ngMockE2E` is an angular module which contains mocks suitable for end-to-end testing.
	   * Currently there is only one mock present in this module -
	   * the {@link ngMockE2E.$httpBackend e2e $httpBackend} mock.
	   */
	  angular.module('ngMockE2E', ['ng']).config(['$provide', function ($provide) {
	    $provide.value('$httpBackend', angular.injector(['ng']).get('$httpBackend'));
	    $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
	  }]);
	
	  /**
	   * @ngdoc service
	   * @name $httpBackend
	   * @module ngMockE2E
	   * @description
	   * Fake HTTP backend implementation suitable for end-to-end testing or backend-less development of
	   * applications that use the {@link ng.$http $http service}.
	   *
	   * <div class="alert alert-info">
	   * **Note**: For fake http backend implementation suitable for unit testing please see
	   * {@link ngMock.$httpBackend unit-testing $httpBackend mock}.
	   * </div>
	   *
	   * This implementation can be used to respond with static or dynamic responses via the `when` api
	   * and its shortcuts (`whenGET`, `whenPOST`, etc) and optionally pass through requests to the
	   * real $httpBackend for specific requests (e.g. to interact with certain remote apis or to fetch
	   * templates from a webserver).
	   *
	   * As opposed to unit-testing, in an end-to-end testing scenario or in scenario when an application
	   * is being developed with the real backend api replaced with a mock, it is often desirable for
	   * certain category of requests to bypass the mock and issue a real http request (e.g. to fetch
	   * templates or static files from the webserver). To configure the backend with this behavior
	   * use the `passThrough` request handler of `when` instead of `respond`.
	   *
	   * Additionally, we don't want to manually have to flush mocked out requests like we do during unit
	   * testing. For this reason the e2e $httpBackend flushes mocked out requests
	   * automatically, closely simulating the behavior of the XMLHttpRequest object.
	   *
	   * To setup the application to run with this http backend, you have to create a module that depends
	   * on the `ngMockE2E` and your application modules and defines the fake backend:
	   *
	   * ```js
	   *   var myAppDev = angular.module('myAppDev', ['myApp', 'ngMockE2E']);
	   *   myAppDev.run(function($httpBackend) {
	   *     var phones = [{name: 'phone1'}, {name: 'phone2'}];
	   *
	   *     // returns the current list of phones
	   *     $httpBackend.whenGET('/phones').respond(phones);
	   *
	   *     // adds a new phone to the phones array
	   *     $httpBackend.whenPOST('/phones').respond(function(method, url, data) {
	   *       var phone = angular.fromJson(data);
	   *       phones.push(phone);
	   *       return [200, phone, {}];
	   *     });
	   *     $httpBackend.whenGET(/^\/templates\//).passThrough(); // Requests for templates are handled by the real server
	   *     //...
	   *   });
	   * ```
	   *
	   * Afterwards, bootstrap your app with this new module.
	   *
	   * ## Example
	   * <example name="httpbackend-e2e-testing" module="myAppE2E" deps="angular-mocks.js">
	   * <file name="app.js">
	   *   var myApp = angular.module('myApp', []);
	   *
	   *   myApp.controller('MainCtrl', function MainCtrl($http) {
	   *     var ctrl = this;
	   *
	   *     ctrl.phones = [];
	   *     ctrl.newPhone = {
	   *       name: ''
	   *     };
	   *
	   *     ctrl.getPhones = function() {
	   *       $http.get('/phones').then(function(response) {
	   *         ctrl.phones = response.data;
	   *       });
	   *     };
	   *
	   *     ctrl.addPhone = function(phone) {
	   *       $http.post('/phones', phone).then(function() {
	   *         ctrl.newPhone = {name: ''};
	   *         return ctrl.getPhones();
	   *       });
	   *     };
	   *
	   *     ctrl.getPhones();
	   *   });
	   * </file>
	   * <file name="e2e.js">
	   *   var myAppDev = angular.module('myAppE2E', ['myApp', 'ngMockE2E']);
	   *
	   *   myAppDev.run(function($httpBackend) {
	   *     var phones = [{name: 'phone1'}, {name: 'phone2'}];
	   *
	   *     // returns the current list of phones
	   *     $httpBackend.whenGET('/phones').respond(phones);
	   *
	   *     // adds a new phone to the phones array
	   *     $httpBackend.whenPOST('/phones').respond(function(method, url, data) {
	   *       var phone = angular.fromJson(data);
	   *       phones.push(phone);
	   *       return [200, phone, {}];
	   *     });
	   *   });
	   * </file>
	   * <file name="index.html">
	   *   <div ng-controller="MainCtrl as $ctrl">
	   *   <form name="newPhoneForm" ng-submit="$ctrl.addPhone($ctrl.newPhone)">
	   *     <input type="text" ng-model="$ctrl.newPhone.name">
	   *     <input type="submit" value="Add Phone">
	   *   </form>
	   *   <h1>Phones</h1>
	   *   <ul>
	   *     <li ng-repeat="phone in $ctrl.phones">{{phone.name}}</li>
	   *   </ul>
	   *   </div>
	   * </file>
	   * </example>
	   *
	   *
	   */
	
	  /**
	   * @ngdoc method
	   * @name $httpBackend#when
	   * @module ngMockE2E
	   * @description
	   * Creates a new backend definition.
	   *
	   * @param {string} method HTTP method.
	   * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	   *   and returns true if the url matches the current definition.
	   * @param {(string|RegExp|function(string))=} data HTTP request body or function that receives
	   *   data string and returns true if the data is as expected.
	   * @param {(Object|function(Object))=} headers HTTP headers or function that receives http header
	   *   object and returns true if the headers match the current definition.
	   * @param {(Array)=} keys Array of keys to assign to regex matches in request url described on
	   *   {@link ngMock.$httpBackend $httpBackend mock}.
	   * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
	   *   control how a matched request is handled. You can save this object for later use and invoke
	   *   `respond` or `passThrough` again in order to change how a matched request is handled.
	   *
	   *  - respond –
	   *    ```
	   *    { function([status,] data[, headers, statusText])
	   *    | function(function(method, url, data, headers, params)}
	   *    ```
	   *    – The respond method takes a set of static data to be returned or a function that can return
	   *    an array containing response status (number), response data (Array|Object|string), response
	   *    headers (Object), and the text for the status (string).
	   *  - passThrough – `{function()}` – Any request matching a backend definition with
	   *    `passThrough` handler will be passed through to the real backend (an XHR request will be made
	   *    to the server.)
	   *  - Both methods return the `requestHandler` object for possible overrides.
	   */
	
	  /**
	   * @ngdoc method
	   * @name $httpBackend#whenGET
	   * @module ngMockE2E
	   * @description
	   * Creates a new backend definition for GET requests. For more info see `when()`.
	   *
	   * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	   *   and returns true if the url matches the current definition.
	   * @param {(Object|function(Object))=} headers HTTP headers.
	   * @param {(Array)=} keys Array of keys to assign to regex matches in request url described on
	   *   {@link ngMock.$httpBackend $httpBackend mock}.
	   * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
	   *   control how a matched request is handled. You can save this object for later use and invoke
	   *   `respond` or `passThrough` again in order to change how a matched request is handled.
	   */
	
	  /**
	   * @ngdoc method
	   * @name $httpBackend#whenHEAD
	   * @module ngMockE2E
	   * @description
	   * Creates a new backend definition for HEAD requests. For more info see `when()`.
	   *
	   * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	   *   and returns true if the url matches the current definition.
	   * @param {(Object|function(Object))=} headers HTTP headers.
	   * @param {(Array)=} keys Array of keys to assign to regex matches in request url described on
	   *   {@link ngMock.$httpBackend $httpBackend mock}.
	   * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
	   *   control how a matched request is handled. You can save this object for later use and invoke
	   *   `respond` or `passThrough` again in order to change how a matched request is handled.
	   */
	
	  /**
	   * @ngdoc method
	   * @name $httpBackend#whenDELETE
	   * @module ngMockE2E
	   * @description
	   * Creates a new backend definition for DELETE requests. For more info see `when()`.
	   *
	   * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	   *   and returns true if the url matches the current definition.
	   * @param {(Object|function(Object))=} headers HTTP headers.
	   * @param {(Array)=} keys Array of keys to assign to regex matches in request url described on
	   *   {@link ngMock.$httpBackend $httpBackend mock}.
	   * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
	   *   control how a matched request is handled. You can save this object for later use and invoke
	   *   `respond` or `passThrough` again in order to change how a matched request is handled.
	   */
	
	  /**
	   * @ngdoc method
	   * @name $httpBackend#whenPOST
	   * @module ngMockE2E
	   * @description
	   * Creates a new backend definition for POST requests. For more info see `when()`.
	   *
	   * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	   *   and returns true if the url matches the current definition.
	   * @param {(string|RegExp|function(string))=} data HTTP request body or function that receives
	   *   data string and returns true if the data is as expected.
	   * @param {(Object|function(Object))=} headers HTTP headers.
	   * @param {(Array)=} keys Array of keys to assign to regex matches in request url described on
	   *   {@link ngMock.$httpBackend $httpBackend mock}.
	   * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
	   *   control how a matched request is handled. You can save this object for later use and invoke
	   *   `respond` or `passThrough` again in order to change how a matched request is handled.
	   */
	
	  /**
	   * @ngdoc method
	   * @name $httpBackend#whenPUT
	   * @module ngMockE2E
	   * @description
	   * Creates a new backend definition for PUT requests.  For more info see `when()`.
	   *
	   * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	   *   and returns true if the url matches the current definition.
	   * @param {(string|RegExp|function(string))=} data HTTP request body or function that receives
	   *   data string and returns true if the data is as expected.
	   * @param {(Object|function(Object))=} headers HTTP headers.
	   * @param {(Array)=} keys Array of keys to assign to regex matches in request url described on
	   *   {@link ngMock.$httpBackend $httpBackend mock}.
	   * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
	   *   control how a matched request is handled. You can save this object for later use and invoke
	   *   `respond` or `passThrough` again in order to change how a matched request is handled.
	   */
	
	  /**
	   * @ngdoc method
	   * @name $httpBackend#whenPATCH
	   * @module ngMockE2E
	   * @description
	   * Creates a new backend definition for PATCH requests.  For more info see `when()`.
	   *
	   * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	   *   and returns true if the url matches the current definition.
	   * @param {(string|RegExp|function(string))=} data HTTP request body or function that receives
	   *   data string and returns true if the data is as expected.
	   * @param {(Object|function(Object))=} headers HTTP headers.
	   * @param {(Array)=} keys Array of keys to assign to regex matches in request url described on
	   *   {@link ngMock.$httpBackend $httpBackend mock}.
	   * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
	   *   control how a matched request is handled. You can save this object for later use and invoke
	   *   `respond` or `passThrough` again in order to change how a matched request is handled.
	   */
	
	  /**
	   * @ngdoc method
	   * @name $httpBackend#whenJSONP
	   * @module ngMockE2E
	   * @description
	   * Creates a new backend definition for JSONP requests. For more info see `when()`.
	   *
	   * @param {string|RegExp|function(string)=} url HTTP url or function that receives a url
	   *   and returns true if the url matches the current definition.
	   * @param {(Array)=} keys Array of keys to assign to regex matches in request url described on
	   *   {@link ngMock.$httpBackend $httpBackend mock}.
	   * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
	   *   control how a matched request is handled. You can save this object for later use and invoke
	   *   `respond` or `passThrough` again in order to change how a matched request is handled.
	   */
	  /**
	   * @ngdoc method
	   * @name $httpBackend#whenRoute
	   * @module ngMockE2E
	   * @description
	   * Creates a new backend definition that compares only with the requested route.
	   *
	   * @param {string} method HTTP method.
	   * @param {string} url HTTP url string that supports colon param matching.
	   * @returns {requestHandler} Returns an object with `respond` and `passThrough` methods that
	   *   control how a matched request is handled. You can save this object for later use and invoke
	   *   `respond` or `passThrough` again in order to change how a matched request is handled.
	   */
	  angular.mock.e2e = {};
	  angular.mock.e2e.$httpBackendDecorator = ['$rootScope', '$timeout', '$delegate', '$browser', createHttpBackendMock];
	
	  /**
	   * @ngdoc type
	   * @name $rootScope.Scope
	   * @module ngMock
	   * @description
	   * {@link ng.$rootScope.Scope Scope} type decorated with helper methods useful for testing. These
	   * methods are automatically available on any {@link ng.$rootScope.Scope Scope} instance when
	   * `ngMock` module is loaded.
	   *
	   * In addition to all the regular `Scope` methods, the following helper methods are available:
	   */
	  angular.mock.$RootScopeDecorator = ['$delegate', function ($delegate) {
	
	    var $rootScopePrototype = Object.getPrototypeOf($delegate);
	
	    $rootScopePrototype.$countChildScopes = countChildScopes;
	    $rootScopePrototype.$countWatchers = countWatchers;
	
	    return $delegate;
	
	    // ------------------------------------------------------------------------------------------ //
	
	    /**
	     * @ngdoc method
	     * @name $rootScope.Scope#$countChildScopes
	     * @module ngMock
	     * @this $rootScope.Scope
	     * @description
	     * Counts all the direct and indirect child scopes of the current scope.
	     *
	     * The current scope is excluded from the count. The count includes all isolate child scopes.
	     *
	     * @returns {number} Total number of child scopes.
	     */
	    function countChildScopes() {
	      var count = 0; // exclude the current scope
	      var pendingChildHeads = [this.$$childHead];
	      var currentScope;
	
	      while (pendingChildHeads.length) {
	        currentScope = pendingChildHeads.shift();
	
	        while (currentScope) {
	          count += 1;
	          pendingChildHeads.push(currentScope.$$childHead);
	          currentScope = currentScope.$$nextSibling;
	        }
	      }
	
	      return count;
	    }
	
	    /**
	     * @ngdoc method
	     * @name $rootScope.Scope#$countWatchers
	     * @this $rootScope.Scope
	     * @module ngMock
	     * @description
	     * Counts all the watchers of direct and indirect child scopes of the current scope.
	     *
	     * The watchers of the current scope are included in the count and so are all the watchers of
	     * isolate child scopes.
	     *
	     * @returns {number} Total number of watchers.
	     */
	    function countWatchers() {
	      var count = this.$$watchers ? this.$$watchers.length : 0; // include the current scope
	      var pendingChildHeads = [this.$$childHead];
	      var currentScope;
	
	      while (pendingChildHeads.length) {
	        currentScope = pendingChildHeads.shift();
	
	        while (currentScope) {
	          count += currentScope.$$watchers ? currentScope.$$watchers.length : 0;
	          pendingChildHeads.push(currentScope.$$childHead);
	          currentScope = currentScope.$$nextSibling;
	        }
	      }
	
	      return count;
	    }
	  }];
	
	  (function (jasmineOrMocha) {
	
	    if (!jasmineOrMocha) {
	      return;
	    }
	
	    var currentSpec = null,
	        injectorState = new InjectorState(),
	        annotatedFunctions = [],
	        wasInjectorCreated = function wasInjectorCreated() {
	      return !!currentSpec;
	    };
	
	    angular.mock.$$annotate = angular.injector.$$annotate;
	    angular.injector.$$annotate = function (fn) {
	      if (typeof fn === 'function' && !fn.$inject) {
	        annotatedFunctions.push(fn);
	      }
	      return angular.mock.$$annotate.apply(this, arguments);
	    };
	
	    /**
	     * @ngdoc function
	     * @name angular.mock.module
	     * @description
	     *
	     * *NOTE*: This function is also published on window for easy access.<br>
	     * *NOTE*: This function is declared ONLY WHEN running tests with jasmine or mocha
	     *
	     * This function registers a module configuration code. It collects the configuration information
	     * which will be used when the injector is created by {@link angular.mock.inject inject}.
	     *
	     * See {@link angular.mock.inject inject} for usage example
	     *
	     * @param {...(string|Function|Object)} fns any number of modules which are represented as string
	     *        aliases or as anonymous module initialization functions. The modules are used to
	     *        configure the injector. The 'ng' and 'ngMock' modules are automatically loaded. If an
	     *        object literal is passed each key-value pair will be registered on the module via
	     *        {@link auto.$provide $provide}.value, the key being the string name (or token) to associate
	     *        with the value on the injector.
	     */
	    var module = window.module = angular.mock.module = function () {
	      var moduleFns = Array.prototype.slice.call(arguments, 0);
	      return wasInjectorCreated() ? workFn() : workFn;
	      /////////////////////
	      function workFn() {
	        if (currentSpec.$injector) {
	          throw new Error('Injector already created, can not register a module!');
	        } else {
	          var fn,
	              modules = currentSpec.$modules || (currentSpec.$modules = []);
	          angular.forEach(moduleFns, function (module) {
	            if (angular.isObject(module) && !angular.isArray(module)) {
	              fn = ['$provide', function ($provide) {
	                angular.forEach(module, function (value, key) {
	                  $provide.value(key, value);
	                });
	              }];
	            } else {
	              fn = module;
	            }
	            if (currentSpec.$providerInjector) {
	              currentSpec.$providerInjector.invoke(fn);
	            } else {
	              modules.push(fn);
	            }
	          });
	        }
	      }
	    };
	
	    module.$$beforeAllHook = window.before || window.beforeAll;
	    module.$$afterAllHook = window.after || window.afterAll;
	
	    // purely for testing ngMock itself
	    module.$$currentSpec = function (to) {
	      if (arguments.length === 0) return to;
	      currentSpec = to;
	    };
	
	    /**
	     * @ngdoc function
	     * @name angular.mock.module.sharedInjector
	     * @description
	     *
	     * *NOTE*: This function is declared ONLY WHEN running tests with jasmine or mocha
	     *
	     * This function ensures a single injector will be used for all tests in a given describe context.
	     * This contrasts with the default behaviour where a new injector is created per test case.
	     *
	     * Use sharedInjector when you want to take advantage of Jasmine's `beforeAll()`, or mocha's
	     * `before()` methods. Call `module.sharedInjector()` before you setup any other hooks that
	     * will create (i.e call `module()`) or use (i.e call `inject()`) the injector.
	     *
	     * You cannot call `sharedInjector()` from within a context already using `sharedInjector()`.
	     *
	     * ## Example
	     *
	     * Typically beforeAll is used to make many assertions about a single operation. This can
	     * cut down test run-time as the test setup doesn't need to be re-run, and enabling focussed
	     * tests each with a single assertion.
	     *
	     * ```js
	     * describe("Deep Thought", function() {
	     *
	     *   module.sharedInjector();
	     *
	     *   beforeAll(module("UltimateQuestion"));
	     *
	     *   beforeAll(inject(function(DeepThought) {
	     *     expect(DeepThought.answer).toBeUndefined();
	     *     DeepThought.generateAnswer();
	     *   }));
	     *
	     *   it("has calculated the answer correctly", inject(function(DeepThought) {
	     *     // Because of sharedInjector, we have access to the instance of the DeepThought service
	     *     // that was provided to the beforeAll() hook. Therefore we can test the generated answer
	     *     expect(DeepThought.answer).toBe(42);
	     *   }));
	     *
	     *   it("has calculated the answer within the expected time", inject(function(DeepThought) {
	     *     expect(DeepThought.runTimeMillennia).toBeLessThan(8000);
	     *   }));
	     *
	     *   it("has double checked the answer", inject(function(DeepThought) {
	     *     expect(DeepThought.absolutelySureItIsTheRightAnswer).toBe(true);
	     *   }));
	     *
	     * });
	     *
	     * ```
	     */
	    module.sharedInjector = function () {
	      if (!(module.$$beforeAllHook && module.$$afterAllHook)) {
	        throw Error('sharedInjector() cannot be used unless your test runner defines beforeAll/afterAll');
	      }
	
	      var initialized = false;
	
	      module.$$beforeAllHook( /** @this */function () {
	        if (injectorState.shared) {
	          injectorState.sharedError = Error('sharedInjector() cannot be called inside a context that has already called sharedInjector()');
	          throw injectorState.sharedError;
	        }
	        initialized = true;
	        currentSpec = this;
	        injectorState.shared = true;
	      });
	
	      module.$$afterAllHook(function () {
	        if (initialized) {
	          injectorState = new InjectorState();
	          module.$$cleanup();
	        } else {
	          injectorState.sharedError = null;
	        }
	      });
	    };
	
	    module.$$beforeEach = function () {
	      if (injectorState.shared && currentSpec && currentSpec !== this) {
	        var state = currentSpec;
	        currentSpec = this;
	        angular.forEach(['$injector', '$modules', '$providerInjector', '$injectorStrict'], function (k) {
	          currentSpec[k] = state[k];
	          state[k] = null;
	        });
	      } else {
	        currentSpec = this;
	        originalRootElement = null;
	        annotatedFunctions = [];
	      }
	    };
	
	    module.$$afterEach = function () {
	      if (injectorState.cleanupAfterEach()) {
	        module.$$cleanup();
	      }
	    };
	
	    module.$$cleanup = function () {
	      var injector = currentSpec.$injector;
	
	      annotatedFunctions.forEach(function (fn) {
	        delete fn.$inject;
	      });
	
	      angular.forEach(currentSpec.$modules, function (module) {
	        if (module && module.$$hashKey) {
	          module.$$hashKey = undefined;
	        }
	      });
	
	      currentSpec.$injector = null;
	      currentSpec.$modules = null;
	      currentSpec.$providerInjector = null;
	      currentSpec = null;
	
	      if (injector) {
	        // Ensure `$rootElement` is instantiated, before checking `originalRootElement`
	        var $rootElement = injector.get('$rootElement');
	        var rootNode = $rootElement && $rootElement[0];
	        var cleanUpNodes = !originalRootElement ? [] : [originalRootElement[0]];
	        if (rootNode && (!originalRootElement || rootNode !== originalRootElement[0])) {
	          cleanUpNodes.push(rootNode);
	        }
	        angular.element.cleanData(cleanUpNodes);
	
	        // Ensure `$destroy()` is available, before calling it
	        // (a mocked `$rootScope` might not implement it (or not even be an object at all))
	        var $rootScope = injector.get('$rootScope');
	        if ($rootScope && $rootScope.$destroy) $rootScope.$destroy();
	      }
	
	      // clean up jquery's fragment cache
	      angular.forEach(angular.element.fragments, function (val, key) {
	        delete angular.element.fragments[key];
	      });
	
	      MockXhr.$$lastInstance = null;
	
	      angular.forEach(angular.callbacks, function (val, key) {
	        delete angular.callbacks[key];
	      });
	      angular.callbacks.$$counter = 0;
	    };
	
	    (window.beforeEach || window.setup)(module.$$beforeEach);
	    (window.afterEach || window.teardown)(module.$$afterEach);
	
	    /**
	     * @ngdoc function
	     * @name angular.mock.inject
	     * @description
	     *
	     * *NOTE*: This function is also published on window for easy access.<br>
	     * *NOTE*: This function is declared ONLY WHEN running tests with jasmine or mocha
	     *
	     * The inject function wraps a function into an injectable function. The inject() creates new
	     * instance of {@link auto.$injector $injector} per test, which is then used for
	     * resolving references.
	     *
	     *
	     * ## Resolving References (Underscore Wrapping)
	     * Often, we would like to inject a reference once, in a `beforeEach()` block and reuse this
	     * in multiple `it()` clauses. To be able to do this we must assign the reference to a variable
	     * that is declared in the scope of the `describe()` block. Since we would, most likely, want
	     * the variable to have the same name of the reference we have a problem, since the parameter
	     * to the `inject()` function would hide the outer variable.
	     *
	     * To help with this, the injected parameters can, optionally, be enclosed with underscores.
	     * These are ignored by the injector when the reference name is resolved.
	     *
	     * For example, the parameter `_myService_` would be resolved as the reference `myService`.
	     * Since it is available in the function body as `_myService_`, we can then assign it to a variable
	     * defined in an outer scope.
	     *
	     * ```
	     * // Defined out reference variable outside
	     * var myService;
	     *
	     * // Wrap the parameter in underscores
	     * beforeEach( inject( function(_myService_){
	     *   myService = _myService_;
	     * }));
	     *
	     * // Use myService in a series of tests.
	     * it('makes use of myService', function() {
	     *   myService.doStuff();
	     * });
	     *
	     * ```
	     *
	     * See also {@link angular.mock.module angular.mock.module}
	     *
	     * ## Example
	     * Example of what a typical jasmine tests looks like with the inject method.
	     * ```js
	     *
	     *   angular.module('myApplicationModule', [])
	     *       .value('mode', 'app')
	     *       .value('version', 'v1.0.1');
	     *
	     *
	     *   describe('MyApp', function() {
	     *
	     *     // You need to load modules that you want to test,
	     *     // it loads only the "ng" module by default.
	     *     beforeEach(module('myApplicationModule'));
	     *
	     *
	     *     // inject() is used to inject arguments of all given functions
	     *     it('should provide a version', inject(function(mode, version) {
	     *       expect(version).toEqual('v1.0.1');
	     *       expect(mode).toEqual('app');
	     *     }));
	     *
	     *
	     *     // The inject and module method can also be used inside of the it or beforeEach
	     *     it('should override a version and test the new version is injected', function() {
	     *       // module() takes functions or strings (module aliases)
	     *       module(function($provide) {
	     *         $provide.value('version', 'overridden'); // override version here
	     *       });
	     *
	     *       inject(function(version) {
	     *         expect(version).toEqual('overridden');
	     *       });
	     *     });
	     *   });
	     *
	     * ```
	     *
	     * @param {...Function} fns any number of functions which will be injected using the injector.
	     */
	
	    var ErrorAddingDeclarationLocationStack = function ErrorAddingDeclarationLocationStack(e, errorForStack) {
	      this.message = e.message;
	      this.name = e.name;
	      if (e.line) this.line = e.line;
	      if (e.sourceId) this.sourceId = e.sourceId;
	      if (e.stack && errorForStack) this.stack = e.stack + '\n' + errorForStack.stack;
	      if (e.stackArray) this.stackArray = e.stackArray;
	    };
	    ErrorAddingDeclarationLocationStack.prototype = Error.prototype;
	
	    window.inject = angular.mock.inject = function () {
	      var blockFns = Array.prototype.slice.call(arguments, 0);
	      var errorForStack = new Error('Declaration Location');
	      // IE10+ and PhanthomJS do not set stack trace information, until the error is thrown
	      if (!errorForStack.stack) {
	        try {
	          throw errorForStack;
	        } catch (e) {/* empty */}
	      }
	      return wasInjectorCreated() ? WorkFn.call(currentSpec) : WorkFn;
	      /////////////////////
	      function WorkFn() {
	        var modules = currentSpec.$modules || [];
	        var strictDi = !!currentSpec.$injectorStrict;
	        modules.unshift(['$injector', function ($injector) {
	          currentSpec.$providerInjector = $injector;
	        }]);
	        modules.unshift('ngMock');
	        modules.unshift('ng');
	        var injector = currentSpec.$injector;
	        if (!injector) {
	          if (strictDi) {
	            // If strictDi is enabled, annotate the providerInjector blocks
	            angular.forEach(modules, function (moduleFn) {
	              if (typeof moduleFn === 'function') {
	                angular.injector.$$annotate(moduleFn);
	              }
	            });
	          }
	          injector = currentSpec.$injector = angular.injector(modules, strictDi);
	          currentSpec.$injectorStrict = strictDi;
	        }
	        for (var i = 0, ii = blockFns.length; i < ii; i++) {
	          if (currentSpec.$injectorStrict) {
	            // If the injector is strict / strictDi, and the spec wants to inject using automatic
	            // annotation, then annotate the function here.
	            injector.annotate(blockFns[i]);
	          }
	          try {
	            injector.invoke(blockFns[i] || angular.noop, this);
	          } catch (e) {
	            if (e.stack && errorForStack) {
	              throw new ErrorAddingDeclarationLocationStack(e, errorForStack);
	            }
	            throw e;
	          } finally {
	            errorForStack = null;
	          }
	        }
	      }
	    };
	
	    angular.mock.inject.strictDi = function (value) {
	      value = arguments.length ? !!value : true;
	      return wasInjectorCreated() ? workFn() : workFn;
	
	      function workFn() {
	        if (value !== currentSpec.$injectorStrict) {
	          if (currentSpec.$injector) {
	            throw new Error('Injector already created, can not modify strict annotations');
	          } else {
	            currentSpec.$injectorStrict = value;
	          }
	        }
	      }
	    };
	
	    function InjectorState() {
	      this.shared = false;
	      this.sharedError = null;
	
	      this.cleanupAfterEach = function () {
	        return !this.shared || this.sharedError;
	      };
	    }
	  })(window.jasmine || window.mocha);
	
	  'use strict';
	
	  (function () {
	    /**
	     * Triggers a browser event. Attempts to choose the right event if one is
	     * not specified.
	     *
	     * @param {Object} element Either a wrapped jQuery/jqLite node or a DOMElement
	     * @param {string} eventType Optional event type
	     * @param {Object=} eventData An optional object which contains additional event data (such as x,y
	     * coordinates, keys, etc...) that are passed into the event when triggered
	     */
	    window.browserTrigger = function browserTrigger(element, eventType, eventData) {
	      if (element && !element.nodeName) element = element[0];
	      if (!element) return;
	
	      eventData = eventData || {};
	      var relatedTarget = eventData.relatedTarget || element;
	      var keys = eventData.keys;
	      var x = eventData.x;
	      var y = eventData.y;
	
	      var inputType = element.type ? element.type.toLowerCase() : null,
	          nodeName = element.nodeName.toLowerCase();
	      if (!eventType) {
	        eventType = {
	          'text': 'change',
	          'textarea': 'change',
	          'hidden': 'change',
	          'password': 'change',
	          'button': 'click',
	          'submit': 'click',
	          'reset': 'click',
	          'image': 'click',
	          'checkbox': 'click',
	          'radio': 'click',
	          'select-one': 'change',
	          'select-multiple': 'change',
	          '_default_': 'click'
	        }[inputType || '_default_'];
	      }
	
	      if (nodeName === 'option') {
	        element.parentNode.value = element.value;
	        element = element.parentNode;
	        eventType = 'change';
	      }
	
	      keys = keys || [];
	      function pressed(key) {
	        return keys.indexOf(key) !== -1;
	      }
	
	      var evnt;
	      if (/transitionend/.test(eventType)) {
	        if (window.WebKitTransitionEvent) {
	          evnt = new window.WebKitTransitionEvent(eventType, eventData);
	          evnt.initEvent(eventType, false, true);
	        } else {
	          try {
	            evnt = new window.TransitionEvent(eventType, eventData);
	          } catch (e) {
	            evnt = window.document.createEvent('TransitionEvent');
	            evnt.initTransitionEvent(eventType, null, null, null, eventData.elapsedTime || 0);
	          }
	        }
	      } else if (/animationend/.test(eventType)) {
	        if (window.WebKitAnimationEvent) {
	          evnt = new window.WebKitAnimationEvent(eventType, eventData);
	          evnt.initEvent(eventType, false, true);
	        } else {
	          try {
	            evnt = new window.AnimationEvent(eventType, eventData);
	          } catch (e) {
	            evnt = window.document.createEvent('AnimationEvent');
	            evnt.initAnimationEvent(eventType, null, null, null, eventData.elapsedTime || 0);
	          }
	        }
	      } else if (/touch/.test(eventType) && supportsTouchEvents()) {
	        evnt = createTouchEvent(element, eventType, x, y);
	      } else if (/key/.test(eventType)) {
	        evnt = window.document.createEvent('Events');
	        evnt.initEvent(eventType, eventData.bubbles, eventData.cancelable);
	        evnt.view = window;
	        evnt.ctrlKey = pressed('ctrl');
	        evnt.altKey = pressed('alt');
	        evnt.shiftKey = pressed('shift');
	        evnt.metaKey = pressed('meta');
	        evnt.keyCode = eventData.keyCode;
	        evnt.charCode = eventData.charCode;
	        evnt.which = eventData.which;
	      } else {
	        evnt = window.document.createEvent('MouseEvents');
	        x = x || 0;
	        y = y || 0;
	        evnt.initMouseEvent(eventType, true, true, window, 0, x, y, x, y, pressed('ctrl'), pressed('alt'), pressed('shift'), pressed('meta'), 0, relatedTarget);
	      }
	
	      /* we're unable to change the timeStamp value directly so this
	       * is only here to allow for testing where the timeStamp value is
	       * read */
	      evnt.$manualTimeStamp = eventData.timeStamp;
	
	      if (!evnt) return;
	
	      var originalPreventDefault = evnt.preventDefault,
	          appWindow = element.ownerDocument.defaultView,
	          fakeProcessDefault = true,
	          finalProcessDefault,
	          angular = appWindow.angular || {};
	
	      // igor: temporary fix for https://bugzilla.mozilla.org/show_bug.cgi?id=684208
	      angular['ff-684208-preventDefault'] = false;
	      evnt.preventDefault = function () {
	        fakeProcessDefault = false;
	        return originalPreventDefault.apply(evnt, arguments);
	      };
	
	      if (!eventData.bubbles || supportsEventBubblingInDetachedTree() || isAttachedToDocument(element)) {
	        element.dispatchEvent(evnt);
	      } else {
	        triggerForPath(element, evnt);
	      }
	
	      finalProcessDefault = !(angular['ff-684208-preventDefault'] || !fakeProcessDefault);
	
	      delete angular['ff-684208-preventDefault'];
	
	      return finalProcessDefault;
	    };
	
	    function supportsTouchEvents() {
	      if ('_cached' in supportsTouchEvents) {
	        return supportsTouchEvents._cached;
	      }
	      if (!window.document.createTouch || !window.document.createTouchList) {
	        supportsTouchEvents._cached = false;
	        return false;
	      }
	      try {
	        window.document.createEvent('TouchEvent');
	      } catch (e) {
	        supportsTouchEvents._cached = false;
	        return false;
	      }
	      supportsTouchEvents._cached = true;
	      return true;
	    }
	
	    function createTouchEvent(element, eventType, x, y) {
	      var evnt = new window.Event(eventType);
	      x = x || 0;
	      y = y || 0;
	
	      var touch = window.document.createTouch(window, element, Date.now(), x, y, x, y);
	      var touches = window.document.createTouchList(touch);
	
	      evnt.touches = touches;
	
	      return evnt;
	    }
	
	    function supportsEventBubblingInDetachedTree() {
	      if ('_cached' in supportsEventBubblingInDetachedTree) {
	        return supportsEventBubblingInDetachedTree._cached;
	      }
	      supportsEventBubblingInDetachedTree._cached = false;
	      var doc = window.document;
	      if (doc) {
	        var parent = doc.createElement('div'),
	            child = parent.cloneNode();
	        parent.appendChild(child);
	        parent.addEventListener('e', function () {
	          supportsEventBubblingInDetachedTree._cached = true;
	        });
	        var evnt = window.document.createEvent('Events');
	        evnt.initEvent('e', true, true);
	        child.dispatchEvent(evnt);
	      }
	      return supportsEventBubblingInDetachedTree._cached;
	    }
	
	    function triggerForPath(element, evnt) {
	      var stop = false;
	
	      var _stopPropagation = evnt.stopPropagation;
	      evnt.stopPropagation = function () {
	        stop = true;
	        _stopPropagation.apply(evnt, arguments);
	      };
	      patchEventTargetForBubbling(evnt, element);
	      do {
	        element.dispatchEvent(evnt);
	        // eslint-disable-next-line no-unmodified-loop-condition
	      } while (!stop && (element = element.parentNode));
	    }
	
	    function patchEventTargetForBubbling(event, target) {
	      event._target = target;
	      Object.defineProperty(event, 'target', { get: function get() {
	          return this._target;
	        } });
	    }
	
	    function isAttachedToDocument(element) {
	      while (element = element.parentNode) {
	        if (element === window) {
	          return true;
	        }
	      }
	      return false;
	    }
	  })();
	})(window, window.angular);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //import localForage from "../localforage-build"
	
	
	exports.default = function () {
	  var ackOffline = void 0,
	      $http = void 0;
	
	  beforeEach(inject(function (_$http_) {
	    $http = _$http_;
	    _localforage2.default.setItem("offline-foo");
	  }));
	
	  beforeEach(function () {
	    ackOffline = new _ackOffline2.default($http);
	  });
	
	  describe("#setItem", function () {
	    it("gets offline data from local storage", (0, _mockInjects.promise)(function () {
	      return _localforage2.default.setItem("offline-foo", "bar").then(function () {
	        return ackOffline.get("foo");
	      }).then(function (data) {
	        return expect(data).toEqual("bar");
	      });
	    }));
	  });
	
	  describe("#set", function () {
	    it("sets data into cache", (0, _mockInjects.promise)(function () {
	      return ackOffline.set("foo", "bar").then(function () {
	        return ackOffline.get("foo");
	      }).then(function (data) {
	        return expect(data).toEqual("bar");
	      });
	    }));
	  });
	
	  describe("#getCache", function () {
	    it("retrieves cache from local storage", (0, _mockInjects.promise)(function () {
	      return _localforage2.default.setItem("offline-foo", "bar").then(function () {
	        return _localforage2.default.getItem("offline-foo");
	      }).then(function (cache) {
	        expect(cache).toEqual("bar");
	      }).then(function () {
	        return ackOffline.getCache("foo");
	      }).then(function (cache) {
	        expect(cache).toEqual("bar");
	      });
	    }));
	
	    describe("when cache data is a collection", function () {
	      it("considers an 0-length cache valid", (0, _mockInjects.promise)(function () {
	        return ackOffline.setCache('foo', 'bar').then(function () {
	          return _localforage2.default.getItem("offline-foo");
	        }).then(function (data) {
	          expect(typeof data === "undefined" ? "undefined" : _typeof(data)).toEqual('object');
	          expect(_typeof(data._timestamp)).toEqual('number');
	          expect(_typeof(data.cache)).toEqual('string');
	          expect(data.cache).toEqual('bar');
	        }).then(function () {
	          return ackOffline.getCache("foo");
	        }).then(function (cache) {
	          return expect(cache).toEqual("bar");
	        });
	      }));
	    });
	
	    describe("when cache data is an object", function () {
	      it("considers an empty object valid", (0, _mockInjects.promise)(function () {
	        return ackOffline.setCache("foo").then(function (data) {
	          testBasicSetCache(data);
	          expect(_typeof(data.cache)).toEqual('undefined');
	        }).then(function () {
	          return ackOffline.getCache("foo");
	        }).then(function (cache) {
	          return expect(typeof cache === "undefined" ? "undefined" : _typeof(cache)).toEqual("undefined");
	        });
	      }));
	    });
	
	    it("handles empty data storage", (0, _mockInjects.promise)(function () {
	      return _localforage2.default.setItem("offline-foo").then(function (d) {
	        return expect(d).toBe(null);
	      }).then(function () {
	        return ackOffline.getCache("foos");
	      }).catch(function (e) {
	        expect(e.message).toBe('No valid cache found for foos');
	      });
	    }));
	
	    describe("with expiration", function () {
	      it("returns cache if not expired", (0, _mockInjects.promise)(function () {
	        return ackOffline.setCache("foo", "bar").then(function () {
	          return _localforage2.default.getItem("offline-foo");
	        }).then(function (data) {
	          var timeDiff = Date.now() - data._timestamp;
	          expect(timeDiff).toBeLessThan(200);
	          expect(data.cache).toBe("bar");
	        }).then(function () {
	          return ackOffline.getCache("foo");
	        }).then(function (cache) {
	          return expect(cache).toBeDefined();
	        });
	      }));
	
	      it("errors if expired", (0, _mockInjects.promise)(function () {
	        return _localforage2.default.setItem("offline-foo", {
	          _timestamp: Date.now() - 100,
	          cache: "foo"
	        }).then(function () {
	          return ackOffline.getCache("foo", { expires: 100 });
	        }).then(function () {
	          throw new Error('not supposed to succeed here');
	        }).catch(function (e) {
	          return expect(e.message).toBe('No valid cache found for foo');
	        });
	      }));
	    });
	  });
	
	  describe("#setCache", function () {
	    /*
	    let clock
	    beforeEach(() => clock = sinon.useFakeTimers())
	    afterEach(() => clock.restore())
	    */
	
	    it("sets data into cache", (0, _mockInjects.promise)(function () {
	      return ackOffline.setCache("foo", { data: "bar8" }).then(function (data) {
	        testBasicSetCache(data);
	        expect(data.cache.data).toEqual("bar8");
	      });
	    }));
	
	    it("does not overwrite non-cache data", (0, _mockInjects.promise)(function () {
	      return _localforage2.default.setItem("offline-foo", {
	        _timestamp: 1234,
	        cache: { data0: "old-bar" },
	        queue: [1, 2, 3]
	      }).then(function () {
	        return ackOffline.setCache("foo", { data: "bar" });
	      }).then(function (data) {
	        expect(_typeof(data.queue)).toBe('object');
	        expect(data.queue.constructor).toBe(Array);
	        expect(data.queue.length).toBe(3);
	        expect(_typeof(data.cache)).toBe('object');
	        expect(data.cache.data0).toBe('old-bar');
	        expect(data.cache.data).toBe('bar');
	      });
	    }));
	  });
	
	  describe("#cacheResponse", function () {
	    /*
	    let clock
	    beforeEach(() => clock = sinon.useFakeTimers())
	    afterEach(() => clock.restore())
	    */
	
	    it("sets data into cache", (0, _mockInjects.promise)(function () {
	      return ackOffline.cacheResponse("foo", { data: "bar" }).then(function (data) {
	        expect(typeof data === "undefined" ? "undefined" : _typeof(data)).toBe('object');
	        expect(_typeof(data._timestamp)).toBe('number');
	        expect(_typeof(data.cache)).toBe('string');
	        expect(data.cache).toBe('bar');
	      });
	    }));
	
	    it("does not overwrite non-cache data", (0, _mockInjects.promise)(function () {
	      return _localforage2.default.setItem("offline-foo", {
	        _timestamp: 1234,
	        cache: "old foo",
	        queue: [1, 2, 3]
	      }).then(function () {
	        return ackOffline.cacheResponse("foo", { data: "bar" });
	      }).then(function (data) {
	        expect(_typeof(data.queue)).toBe('object');
	        expect(data.queue.constructor).toBe(Array);
	        expect(data.queue.length).toBe(3);
	        expect(_typeof(data.cache)).toBe('string');
	        expect(data.cache).toBe('bar');
	      });
	    }));
	  });
	
	  describe("#getQueue", function () {
	    it("retrieves queue from local storage", (0, _mockInjects.promise)(function () {
	      return _localforage2.default.setItem("offline-foo", {
	        queue: [{ data: "bar" }]
	      }).then(function () {
	        return ackOffline.getQueue("foo");
	      }).then(function (data) {
	        expect(typeof data === "undefined" ? "undefined" : _typeof(data)).toBe('object');
	        expect(data.constructor).toBe(Array);
	        expect(data.length).toBe(1);
	        expect(_typeof(data[0])).toBe('object');
	        expect(_typeof(data[0].data)).toBe('string');
	        expect(data[0].data).toBe('bar');
	      });
	    }));
	  });
	
	  describe("#enqueue", function () {
	    it("sets data into queue", (0, _mockInjects.promise)(function () {
	      return _localforage2.default.setItem("offline-foo").then(function () {
	        return ackOffline.enqueue("foo", { data: "bar" });
	      }).then(function () {
	        return ackOffline.getCache("foo");
	      }).then(function (data) {
	        expect(_typeof(data.queue)).toBe('object');
	        expect(data.queue.length).toBe(1);
	        expect(_typeof(data.queue[0].data)).toBe('string');
	        expect(data.queue[0].data).toBe('bar');
	      });
	    }));
	
	    it("sets array of data into queue", (0, _mockInjects.promise)(function () {
	      return _localforage2.default.setItem("offline-foo", {
	        queue: [{ data: "bar" }]
	      }).then(function () {
	        return ackOffline.enqueue("foo", [{ data: "baz" }, { data: "qux" }]);
	      }).then(function (data) {
	        expect(data.queue.length).toBe(3);
	        expect(data.queue[0].data).toBe('bar');
	        expect(data.queue[1].data).toBe('baz');
	        expect(data.queue[2].data).toBe('qux');
	      });
	    }));
	
	    it("does not overwrite data", (0, _mockInjects.promise)(function () {
	      return _localforage2.default.setItem("offline-foo", {
	        _timestamp: 1234,
	        cache: "old foo",
	        queue: [{ data: "foo" }]
	      }).then(function () {
	        return ackOffline.enqueue("foo", { data: "bar" });
	      }).then(function (data) {
	        expect(data._timestamp).toBe(1234);
	        expect(data.cache).toBe("old foo");
	        expect(data.queue.length).toBe(2);
	        expect(data.queue[0].data).toBe('foo');
	        expect(data.queue[1].data).toBe('bar');
	      });
	    }));
	  });
	
	  describe("#clearQueue", function () {
	    it("clears queue", (0, _mockInjects.promise)(function () {
	      return _localforage2.default.setItem("offline-foo", {
	        _timestamp: 1234,
	        cache: "foo",
	        queue: [1, 2, 3]
	      }).then(function () {
	        return ackOffline.clearQueue("foo");
	      }).then(function () {
	        return ackOffline.get("foo");
	      }).then(function (data) {
	        expect(typeof data === "undefined" ? "undefined" : _typeof(data)).toBe('object');
	        expect(_typeof(data.queue)).toBe('object');
	        expect(data.queue.constructor).toBe(Array);
	        expect(data.queue.length).toBe(0);
	      });
	    }));
	  });
	
	  describe("#registerQueueHandler", function () {
	    it("registers handler", (0, _mockInjects.sync)(function () {
	      expect(ackOffline.handlers.length).toBe(0);
	
	      var spy = function spy() {};
	      spy.extraName = 'registers-handler';
	
	      ackOffline.registerQueueHandler("foo", spy);
	
	      expect(ackOffline.handlers.length).toBe(1);
	      expect(_typeof(ackOffline.handlers[0])).toBe('object');
	      expect(ackOffline.handlers[0].name).toBe('foo');
	      expect(ackOffline.handlers[0].handler.extraName).toBe(spy.extraName);
	    }));
	  });
	
	  describe("#processQueues", function () {
	    it("iterates over all handlers", (0, _mockInjects.promise)(function () {
	      var fooSpy = function fooSpy(a) {
	        fooSpy.callLog.push(a);
	      };
	      fooSpy.extraName = 'foo-spy';
	      fooSpy.callLog = [];
	
	      var barSpy = function barSpy(b) {
	        barSpy.callLog.push(b);
	      };
	      barSpy.extraName = 'bar-spy';
	      barSpy.callLog = [];
	
	      ackOffline.handlers = [{ name: "foo", handler: fooSpy }, { name: "bar", handler: barSpy }];
	
	      return _localforage2.default.setItem("offline-foo", { queue: [1, 2] }).then(function () {
	        return _localforage2.default.setItem("offline-bar", { queue: [3, 4] });
	      }).then(function () {
	        return ackOffline.processQueues();
	      }).then(function () {
	        expect(fooSpy.callLog.length).toBe(2);
	        expect(fooSpy.callLog[0]).toBe(1);
	        expect(fooSpy.callLog[1]).toBe(2);
	
	        expect(barSpy.callLog.length).toBe(2);
	        expect(barSpy.callLog[0]).toBe(3);
	        expect(barSpy.callLog[1]).toBe(4);
	      });
	    }));
	
	    it("empties queues when complete", (0, _mockInjects.promise)(function () {
	      ackOffline.handlers = [{ name: "foo", handler: function handler() {} }];
	
	      return _localforage2.default.setItem("offline-foo", { queue: [1, 2] }).then(function () {
	        return ackOffline.processQueues();
	      }).then(function () {
	        return ackOffline.getQueue('foo');
	      }).then(function (data) {
	        expect(data.length).toBe(0);
	      });
	    }));
	  });
	};
	
	var _localforage = __webpack_require__(4);
	
	var _localforage2 = _interopRequireDefault(_localforage);
	
	var _mockInjects = __webpack_require__(1);
	
	var _ackOffline = __webpack_require__(5);
	
	var _ackOffline2 = _interopRequireDefault(_ackOffline);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function testBasicSetCache(data) {
	  expect(typeof data === "undefined" ? "undefined" : _typeof(data)).toEqual('object');
	  expect(_typeof(data._timestamp)).toEqual('number');
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/* WEBPACK VAR INJECTION */(function(global) {/*!
	    localForage -- Offline Storage, Improved
	    Version 1.4.3
	    https://mozilla.github.io/localForage
	    (c) 2013-2016 Mozilla, Apache License 2.0
	*/
	(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.localforage = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
	'use strict';
	var immediate = _dereq_(2);
	
	/* istanbul ignore next */
	function INTERNAL() {}
	
	var handlers = {};
	
	var REJECTED = ['REJECTED'];
	var FULFILLED = ['FULFILLED'];
	var PENDING = ['PENDING'];
	
	module.exports = exports = Promise;
	
	function Promise(resolver) {
	  if (typeof resolver !== 'function') {
	    throw new TypeError('resolver must be a function');
	  }
	  this.state = PENDING;
	  this.queue = [];
	  this.outcome = void 0;
	  if (resolver !== INTERNAL) {
	    safelyResolveThenable(this, resolver);
	  }
	}
	
	Promise.prototype["catch"] = function (onRejected) {
	  return this.then(null, onRejected);
	};
	Promise.prototype.then = function (onFulfilled, onRejected) {
	  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
	    typeof onRejected !== 'function' && this.state === REJECTED) {
	    return this;
	  }
	  var promise = new this.constructor(INTERNAL);
	  if (this.state !== PENDING) {
	    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
	    unwrap(promise, resolver, this.outcome);
	  } else {
	    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
	  }
	
	  return promise;
	};
	function QueueItem(promise, onFulfilled, onRejected) {
	  this.promise = promise;
	  if (typeof onFulfilled === 'function') {
	    this.onFulfilled = onFulfilled;
	    this.callFulfilled = this.otherCallFulfilled;
	  }
	  if (typeof onRejected === 'function') {
	    this.onRejected = onRejected;
	    this.callRejected = this.otherCallRejected;
	  }
	}
	QueueItem.prototype.callFulfilled = function (value) {
	  handlers.resolve(this.promise, value);
	};
	QueueItem.prototype.otherCallFulfilled = function (value) {
	  unwrap(this.promise, this.onFulfilled, value);
	};
	QueueItem.prototype.callRejected = function (value) {
	  handlers.reject(this.promise, value);
	};
	QueueItem.prototype.otherCallRejected = function (value) {
	  unwrap(this.promise, this.onRejected, value);
	};
	
	function unwrap(promise, func, value) {
	  immediate(function () {
	    var returnValue;
	    try {
	      returnValue = func(value);
	    } catch (e) {
	      return handlers.reject(promise, e);
	    }
	    if (returnValue === promise) {
	      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
	    } else {
	      handlers.resolve(promise, returnValue);
	    }
	  });
	}
	
	handlers.resolve = function (self, value) {
	  var result = tryCatch(getThen, value);
	  if (result.status === 'error') {
	    return handlers.reject(self, result.value);
	  }
	  var thenable = result.value;
	
	  if (thenable) {
	    safelyResolveThenable(self, thenable);
	  } else {
	    self.state = FULFILLED;
	    self.outcome = value;
	    var i = -1;
	    var len = self.queue.length;
	    while (++i < len) {
	      self.queue[i].callFulfilled(value);
	    }
	  }
	  return self;
	};
	handlers.reject = function (self, error) {
	  self.state = REJECTED;
	  self.outcome = error;
	  var i = -1;
	  var len = self.queue.length;
	  while (++i < len) {
	    self.queue[i].callRejected(error);
	  }
	  return self;
	};
	
	function getThen(obj) {
	  // Make sure we only access the accessor once as required by the spec
	  var then = obj && obj.then;
	  if (obj && typeof obj === 'object' && typeof then === 'function') {
	    return function appyThen() {
	      then.apply(obj, arguments);
	    };
	  }
	}
	
	function safelyResolveThenable(self, thenable) {
	  // Either fulfill, reject or reject with error
	  var called = false;
	  function onError(value) {
	    if (called) {
	      return;
	    }
	    called = true;
	    handlers.reject(self, value);
	  }
	
	  function onSuccess(value) {
	    if (called) {
	      return;
	    }
	    called = true;
	    handlers.resolve(self, value);
	  }
	
	  function tryToUnwrap() {
	    thenable(onSuccess, onError);
	  }
	
	  var result = tryCatch(tryToUnwrap);
	  if (result.status === 'error') {
	    onError(result.value);
	  }
	}
	
	function tryCatch(func, value) {
	  var out = {};
	  try {
	    out.value = func(value);
	    out.status = 'success';
	  } catch (e) {
	    out.status = 'error';
	    out.value = e;
	  }
	  return out;
	}
	
	exports.resolve = resolve;
	function resolve(value) {
	  if (value instanceof this) {
	    return value;
	  }
	  return handlers.resolve(new this(INTERNAL), value);
	}
	
	exports.reject = reject;
	function reject(reason) {
	  var promise = new this(INTERNAL);
	  return handlers.reject(promise, reason);
	}
	
	exports.all = all;
	function all(iterable) {
	  var self = this;
	  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
	    return this.reject(new TypeError('must be an array'));
	  }
	
	  var len = iterable.length;
	  var called = false;
	  if (!len) {
	    return this.resolve([]);
	  }
	
	  var values = new Array(len);
	  var resolved = 0;
	  var i = -1;
	  var promise = new this(INTERNAL);
	
	  while (++i < len) {
	    allResolver(iterable[i], i);
	  }
	  return promise;
	  function allResolver(value, i) {
	    self.resolve(value).then(resolveFromAll, function (error) {
	      if (!called) {
	        called = true;
	        handlers.reject(promise, error);
	      }
	    });
	    function resolveFromAll(outValue) {
	      values[i] = outValue;
	      if (++resolved === len && !called) {
	        called = true;
	        handlers.resolve(promise, values);
	      }
	    }
	  }
	}
	
	exports.race = race;
	function race(iterable) {
	  var self = this;
	  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
	    return this.reject(new TypeError('must be an array'));
	  }
	
	  var len = iterable.length;
	  var called = false;
	  if (!len) {
	    return this.resolve([]);
	  }
	
	  var i = -1;
	  var promise = new this(INTERNAL);
	
	  while (++i < len) {
	    resolver(iterable[i]);
	  }
	  return promise;
	  function resolver(value) {
	    self.resolve(value).then(function (response) {
	      if (!called) {
	        called = true;
	        handlers.resolve(promise, response);
	      }
	    }, function (error) {
	      if (!called) {
	        called = true;
	        handlers.reject(promise, error);
	      }
	    });
	  }
	}
	
	},{"2":2}],2:[function(_dereq_,module,exports){
	(function (global){
	'use strict';
	var Mutation = global.MutationObserver || global.WebKitMutationObserver;
	
	var scheduleDrain;
	
	{
	  if (Mutation) {
	    var called = 0;
	    var observer = new Mutation(nextTick);
	    var element = global.document.createTextNode('');
	    observer.observe(element, {
	      characterData: true
	    });
	    scheduleDrain = function () {
	      element.data = (called = ++called % 2);
	    };
	  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
	    var channel = new global.MessageChannel();
	    channel.port1.onmessage = nextTick;
	    scheduleDrain = function () {
	      channel.port2.postMessage(0);
	    };
	  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
	    scheduleDrain = function () {
	
	      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	      var scriptEl = global.document.createElement('script');
	      scriptEl.onreadystatechange = function () {
	        nextTick();
	
	        scriptEl.onreadystatechange = null;
	        scriptEl.parentNode.removeChild(scriptEl);
	        scriptEl = null;
	      };
	      global.document.documentElement.appendChild(scriptEl);
	    };
	  } else {
	    scheduleDrain = function () {
	      setTimeout(nextTick, 0);
	    };
	  }
	}
	
	var draining;
	var queue = [];
	//named nextTick for less confusing stack traces
	function nextTick() {
	  draining = true;
	  var i, oldQueue;
	  var len = queue.length;
	  while (len) {
	    oldQueue = queue;
	    queue = [];
	    i = -1;
	    while (++i < len) {
	      oldQueue[i]();
	    }
	    len = queue.length;
	  }
	  draining = false;
	}
	
	module.exports = immediate;
	function immediate(task) {
	  if (queue.push(task) === 1 && !draining) {
	    scheduleDrain();
	  }
	}
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{}],3:[function(_dereq_,module,exports){
	(function (global){
	'use strict';
	if (typeof global.Promise !== 'function') {
	  global.Promise = _dereq_(1);
	}
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"1":1}],4:[function(_dereq_,module,exports){
	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function getIDB() {
	    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
	    try {
	        if (typeof indexedDB !== 'undefined') {
	            return indexedDB;
	        }
	        if (typeof webkitIndexedDB !== 'undefined') {
	            return webkitIndexedDB;
	        }
	        if (typeof mozIndexedDB !== 'undefined') {
	            return mozIndexedDB;
	        }
	        if (typeof OIndexedDB !== 'undefined') {
	            return OIndexedDB;
	        }
	        if (typeof msIndexedDB !== 'undefined') {
	            return msIndexedDB;
	        }
	    } catch (e) {}
	}
	
	var idb = getIDB();
	
	function isIndexedDBValid() {
	    try {
	        // Initialize IndexedDB; fall back to vendor-prefixed versions
	        // if needed.
	        if (!idb) {
	            return false;
	        }
	        // We mimic PouchDB here; just UA test for Safari (which, as of
	        // iOS 8/Yosemite, doesn't properly support IndexedDB).
	        // IndexedDB support is broken and different from Blink's.
	        // This is faster than the test case (and it's sync), so we just
	        // do this. *SIGH*
	        // http://bl.ocks.org/nolanlawson/raw/c83e9039edf2278047e9/
	        //
	        // We test for openDatabase because IE Mobile identifies itself
	        // as Safari. Oh the lulz...
	        if (typeof openDatabase !== 'undefined' && typeof navigator !== 'undefined' && navigator.userAgent && /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) {
	            return false;
	        }
	
	        return idb && typeof idb.open === 'function' &&
	        // Some Samsung/HTC Android 4.0-4.3 devices
	        // have older IndexedDB specs; if this isn't available
	        // their IndexedDB is too old for us to use.
	        // (Replaces the onupgradeneeded test.)
	        typeof IDBKeyRange !== 'undefined';
	    } catch (e) {
	        return false;
	    }
	}
	
	function isWebSQLValid() {
	    return typeof openDatabase === 'function';
	}
	
	function isLocalStorageValid() {
	    try {
	        return typeof localStorage !== 'undefined' && 'setItem' in localStorage && localStorage.setItem;
	    } catch (e) {
	        return false;
	    }
	}
	
	// Abstracts constructing a Blob object, so it also works in older
	// browsers that don't support the native Blob constructor. (i.e.
	// old QtWebKit versions, at least).
	// Abstracts constructing a Blob object, so it also works in older
	// browsers that don't support the native Blob constructor. (i.e.
	// old QtWebKit versions, at least).
	function createBlob(parts, properties) {
	    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
	    parts = parts || [];
	    properties = properties || {};
	    try {
	        return new Blob(parts, properties);
	    } catch (e) {
	        if (e.name !== 'TypeError') {
	            throw e;
	        }
	        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
	        var builder = new Builder();
	        for (var i = 0; i < parts.length; i += 1) {
	            builder.append(parts[i]);
	        }
	        return builder.getBlob(properties.type);
	    }
	}
	
	// This is CommonJS because lie is an external dependency, so Rollup
	// can just ignore it.
	if (typeof Promise === 'undefined' && typeof _dereq_ !== 'undefined') {
	    _dereq_(3);
	}
	var Promise$1 = Promise;
	
	function executeCallback(promise, callback) {
	    if (callback) {
	        promise.then(function (result) {
	            callback(null, result);
	        }, function (error) {
	            callback(error);
	        });
	    }
	}
	
	function executeTwoCallbacks(promise, callback, errorCallback) {
	    if (typeof callback === 'function') {
	        promise.then(callback);
	    }
	
	    if (typeof errorCallback === 'function') {
	        promise["catch"](errorCallback);
	    }
	}
	
	// Some code originally from async_storage.js in
	// [Gaia](https://github.com/mozilla-b2g/gaia).
	
	var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
	var supportsBlobs;
	var dbContexts;
	var toString = Object.prototype.toString;
	
	// Transform a binary string to an array buffer, because otherwise
	// weird stuff happens when you try to work with the binary string directly.
	// It is known.
	// From http://stackoverflow.com/questions/14967647/ (continues on next line)
	// encode-decode-image-with-base64-breaks-image (2013-04-21)
	function _binStringToArrayBuffer(bin) {
	    var length = bin.length;
	    var buf = new ArrayBuffer(length);
	    var arr = new Uint8Array(buf);
	    for (var i = 0; i < length; i++) {
	        arr[i] = bin.charCodeAt(i);
	    }
	    return buf;
	}
	
	//
	// Blobs are not supported in all versions of IndexedDB, notably
	// Chrome <37 and Android <5. In those versions, storing a blob will throw.
	//
	// Various other blob bugs exist in Chrome v37-42 (inclusive).
	// Detecting them is expensive and confusing to users, and Chrome 37-42
	// is at very low usage worldwide, so we do a hacky userAgent check instead.
	//
	// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
	// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
	// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
	//
	// Code borrowed from PouchDB. See:
	// https://github.com/pouchdb/pouchdb/blob/9c25a23/src/adapters/idb/blobSupport.js
	//
	function _checkBlobSupportWithoutCaching(txn) {
	    return new Promise$1(function (resolve) {
	        var blob = createBlob(['']);
	        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');
	
	        txn.onabort = function (e) {
	            // If the transaction aborts now its due to not being able to
	            // write to the database, likely due to the disk being full
	            e.preventDefault();
	            e.stopPropagation();
	            resolve(false);
	        };
	
	        txn.oncomplete = function () {
	            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
	            var matchedEdge = navigator.userAgent.match(/Edge\//);
	            // MS Edge pretends to be Chrome 42:
	            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
	            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
	        };
	    })["catch"](function () {
	        return false; // error, so assume unsupported
	    });
	}
	
	function _checkBlobSupport(idb) {
	    if (typeof supportsBlobs === 'boolean') {
	        return Promise$1.resolve(supportsBlobs);
	    }
	    return _checkBlobSupportWithoutCaching(idb).then(function (value) {
	        supportsBlobs = value;
	        return supportsBlobs;
	    });
	}
	
	function _deferReadiness(dbInfo) {
	    var dbContext = dbContexts[dbInfo.name];
	
	    // Create a deferred object representing the current database operation.
	    var deferredOperation = {};
	
	    deferredOperation.promise = new Promise$1(function (resolve) {
	        deferredOperation.resolve = resolve;
	    });
	
	    // Enqueue the deferred operation.
	    dbContext.deferredOperations.push(deferredOperation);
	
	    // Chain its promise to the database readiness.
	    if (!dbContext.dbReady) {
	        dbContext.dbReady = deferredOperation.promise;
	    } else {
	        dbContext.dbReady = dbContext.dbReady.then(function () {
	            return deferredOperation.promise;
	        });
	    }
	}
	
	function _advanceReadiness(dbInfo) {
	    var dbContext = dbContexts[dbInfo.name];
	
	    // Dequeue a deferred operation.
	    var deferredOperation = dbContext.deferredOperations.pop();
	
	    // Resolve its promise (which is part of the database readiness
	    // chain of promises).
	    if (deferredOperation) {
	        deferredOperation.resolve();
	    }
	}
	
	function _getConnection(dbInfo, upgradeNeeded) {
	    return new Promise$1(function (resolve, reject) {
	
	        if (dbInfo.db) {
	            if (upgradeNeeded) {
	                _deferReadiness(dbInfo);
	                dbInfo.db.close();
	            } else {
	                return resolve(dbInfo.db);
	            }
	        }
	
	        var dbArgs = [dbInfo.name];
	
	        if (upgradeNeeded) {
	            dbArgs.push(dbInfo.version);
	        }
	
	        var openreq = idb.open.apply(idb, dbArgs);
	
	        if (upgradeNeeded) {
	            openreq.onupgradeneeded = function (e) {
	                var db = openreq.result;
	                try {
	                    db.createObjectStore(dbInfo.storeName);
	                    if (e.oldVersion <= 1) {
	                        // Added when support for blob shims was added
	                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
	                    }
	                } catch (ex) {
	                    if (ex.name === 'ConstraintError') {
	                        console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
	                    } else {
	                        throw ex;
	                    }
	                }
	            };
	        }
	
	        openreq.onerror = function () {
	            reject(openreq.error);
	        };
	
	        openreq.onsuccess = function () {
	            resolve(openreq.result);
	            _advanceReadiness(dbInfo);
	        };
	    });
	}
	
	function _getOriginalConnection(dbInfo) {
	    return _getConnection(dbInfo, false);
	}
	
	function _getUpgradedConnection(dbInfo) {
	    return _getConnection(dbInfo, true);
	}
	
	function _isUpgradeNeeded(dbInfo, defaultVersion) {
	    if (!dbInfo.db) {
	        return true;
	    }
	
	    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
	    var isDowngrade = dbInfo.version < dbInfo.db.version;
	    var isUpgrade = dbInfo.version > dbInfo.db.version;
	
	    if (isDowngrade) {
	        // If the version is not the default one
	        // then warn for impossible downgrade.
	        if (dbInfo.version !== defaultVersion) {
	            console.warn('The database "' + dbInfo.name + '"' + ' can\'t be downgraded from version ' + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
	        }
	        // Align the versions to prevent errors.
	        dbInfo.version = dbInfo.db.version;
	    }
	
	    if (isUpgrade || isNewStore) {
	        // If the store is new then increment the version (if needed).
	        // This will trigger an "upgradeneeded" event which is required
	        // for creating a store.
	        if (isNewStore) {
	            var incVersion = dbInfo.db.version + 1;
	            if (incVersion > dbInfo.version) {
	                dbInfo.version = incVersion;
	            }
	        }
	
	        return true;
	    }
	
	    return false;
	}
	
	// encode a blob for indexeddb engines that don't support blobs
	function _encodeBlob(blob) {
	    return new Promise$1(function (resolve, reject) {
	        var reader = new FileReader();
	        reader.onerror = reject;
	        reader.onloadend = function (e) {
	            var base64 = btoa(e.target.result || '');
	            resolve({
	                __local_forage_encoded_blob: true,
	                data: base64,
	                type: blob.type
	            });
	        };
	        reader.readAsBinaryString(blob);
	    });
	}
	
	// decode an encoded blob
	function _decodeBlob(encodedBlob) {
	    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
	    return createBlob([arrayBuff], { type: encodedBlob.type });
	}
	
	// is this one of our fancy encoded blobs?
	function _isEncodedBlob(value) {
	    return value && value.__local_forage_encoded_blob;
	}
	
	// Specialize the default `ready()` function by making it dependent
	// on the current database operations. Thus, the driver will be actually
	// ready when it's been initialized (default) *and* there are no pending
	// operations on the database (initiated by some other instances).
	function _fullyReady(callback) {
	    var self = this;
	
	    var promise = self._initReady().then(function () {
	        var dbContext = dbContexts[self._dbInfo.name];
	
	        if (dbContext && dbContext.dbReady) {
	            return dbContext.dbReady;
	        }
	    });
	
	    executeTwoCallbacks(promise, callback, callback);
	    return promise;
	}
	
	// Open the IndexedDB database (automatically creates one if one didn't
	// previously exist), using any options set in the config.
	function _initStorage(options) {
	    var self = this;
	    var dbInfo = {
	        db: null
	    };
	
	    if (options) {
	        for (var i in options) {
	            dbInfo[i] = options[i];
	        }
	    }
	
	    // Initialize a singleton container for all running localForages.
	    if (!dbContexts) {
	        dbContexts = {};
	    }
	
	    // Get the current context of the database;
	    var dbContext = dbContexts[dbInfo.name];
	
	    // ...or create a new context.
	    if (!dbContext) {
	        dbContext = {
	            // Running localForages sharing a database.
	            forages: [],
	            // Shared database.
	            db: null,
	            // Database readiness (promise).
	            dbReady: null,
	            // Deferred operations on the database.
	            deferredOperations: []
	        };
	        // Register the new context in the global container.
	        dbContexts[dbInfo.name] = dbContext;
	    }
	
	    // Register itself as a running localForage in the current context.
	    dbContext.forages.push(self);
	
	    // Replace the default `ready()` function with the specialized one.
	    if (!self._initReady) {
	        self._initReady = self.ready;
	        self.ready = _fullyReady;
	    }
	
	    // Create an array of initialization states of the related localForages.
	    var initPromises = [];
	
	    function ignoreErrors() {
	        // Don't handle errors here,
	        // just makes sure related localForages aren't pending.
	        return Promise$1.resolve();
	    }
	
	    for (var j = 0; j < dbContext.forages.length; j++) {
	        var forage = dbContext.forages[j];
	        if (forage !== self) {
	            // Don't wait for itself...
	            initPromises.push(forage._initReady()["catch"](ignoreErrors));
	        }
	    }
	
	    // Take a snapshot of the related localForages.
	    var forages = dbContext.forages.slice(0);
	
	    // Initialize the connection process only when
	    // all the related localForages aren't pending.
	    return Promise$1.all(initPromises).then(function () {
	        dbInfo.db = dbContext.db;
	        // Get the connection or open a new one without upgrade.
	        return _getOriginalConnection(dbInfo);
	    }).then(function (db) {
	        dbInfo.db = db;
	        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
	            // Reopen the database for upgrading.
	            return _getUpgradedConnection(dbInfo);
	        }
	        return db;
	    }).then(function (db) {
	        dbInfo.db = dbContext.db = db;
	        self._dbInfo = dbInfo;
	        // Share the final connection amongst related localForages.
	        for (var k = 0; k < forages.length; k++) {
	            var forage = forages[k];
	            if (forage !== self) {
	                // Self is already up-to-date.
	                forage._dbInfo.db = dbInfo.db;
	                forage._dbInfo.version = dbInfo.version;
	            }
	        }
	    });
	}
	
	function getItem(key, callback) {
	    var self = this;
	
	    // Cast the key to a string, as that's all we can set as a key.
	    if (typeof key !== 'string') {
	        console.warn(key + ' used as a key, but it is not a string.');
	        key = String(key);
	    }
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly').objectStore(dbInfo.storeName);
	            var req = store.get(key);
	
	            req.onsuccess = function () {
	                var value = req.result;
	                if (value === undefined) {
	                    value = null;
	                }
	                if (_isEncodedBlob(value)) {
	                    value = _decodeBlob(value);
	                }
	                resolve(value);
	            };
	
	            req.onerror = function () {
	                reject(req.error);
	            };
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	// Iterate over all items stored in database.
	function iterate(iterator, callback) {
	    var self = this;
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly').objectStore(dbInfo.storeName);
	
	            var req = store.openCursor();
	            var iterationNumber = 1;
	
	            req.onsuccess = function () {
	                var cursor = req.result;
	
	                if (cursor) {
	                    var value = cursor.value;
	                    if (_isEncodedBlob(value)) {
	                        value = _decodeBlob(value);
	                    }
	                    var result = iterator(value, cursor.key, iterationNumber++);
	
	                    if (result !== void 0) {
	                        resolve(result);
	                    } else {
	                        cursor["continue"]();
	                    }
	                } else {
	                    resolve();
	                }
	            };
	
	            req.onerror = function () {
	                reject(req.error);
	            };
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	
	    return promise;
	}
	
	function setItem(key, value, callback) {
	    var self = this;
	
	    // Cast the key to a string, as that's all we can set as a key.
	    if (typeof key !== 'string') {
	        console.warn(key + ' used as a key, but it is not a string.');
	        key = String(key);
	    }
	
	    var promise = new Promise$1(function (resolve, reject) {
	        var dbInfo;
	        self.ready().then(function () {
	            dbInfo = self._dbInfo;
	            if (toString.call(value) === '[object Blob]') {
	                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
	                    if (blobSupport) {
	                        return value;
	                    }
	                    return _encodeBlob(value);
	                });
	            }
	            return value;
	        }).then(function (value) {
	            var transaction = dbInfo.db.transaction(dbInfo.storeName, 'readwrite');
	            var store = transaction.objectStore(dbInfo.storeName);
	
	            // The reason we don't _save_ null is because IE 10 does
	            // not support saving the `null` type in IndexedDB. How
	            // ironic, given the bug below!
	            // See: https://github.com/mozilla/localForage/issues/161
	            if (value === null) {
	                value = undefined;
	            }
	
	            transaction.oncomplete = function () {
	                // Cast to undefined so the value passed to
	                // callback/promise is the same as what one would get out
	                // of `getItem()` later. This leads to some weirdness
	                // (setItem('foo', undefined) will return `null`), but
	                // it's not my fault localStorage is our baseline and that
	                // it's weird.
	                if (value === undefined) {
	                    value = null;
	                }
	
	                resolve(value);
	            };
	            transaction.onabort = transaction.onerror = function () {
	                var err = req.error ? req.error : req.transaction.error;
	                reject(err);
	            };
	
	            var req = store.put(value, key);
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	function removeItem(key, callback) {
	    var self = this;
	
	    // Cast the key to a string, as that's all we can set as a key.
	    if (typeof key !== 'string') {
	        console.warn(key + ' used as a key, but it is not a string.');
	        key = String(key);
	    }
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            var transaction = dbInfo.db.transaction(dbInfo.storeName, 'readwrite');
	            var store = transaction.objectStore(dbInfo.storeName);
	
	            // We use a Grunt task to make this safe for IE and some
	            // versions of Android (including those used by Cordova).
	            // Normally IE won't like `.delete()` and will insist on
	            // using `['delete']()`, but we have a build step that
	            // fixes this for us now.
	            var req = store["delete"](key);
	            transaction.oncomplete = function () {
	                resolve();
	            };
	
	            transaction.onerror = function () {
	                reject(req.error);
	            };
	
	            // The request will be also be aborted if we've exceeded our storage
	            // space.
	            transaction.onabort = function () {
	                var err = req.error ? req.error : req.transaction.error;
	                reject(err);
	            };
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	function clear(callback) {
	    var self = this;
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            var transaction = dbInfo.db.transaction(dbInfo.storeName, 'readwrite');
	            var store = transaction.objectStore(dbInfo.storeName);
	            var req = store.clear();
	
	            transaction.oncomplete = function () {
	                resolve();
	            };
	
	            transaction.onabort = transaction.onerror = function () {
	                var err = req.error ? req.error : req.transaction.error;
	                reject(err);
	            };
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	function length(callback) {
	    var self = this;
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly').objectStore(dbInfo.storeName);
	            var req = store.count();
	
	            req.onsuccess = function () {
	                resolve(req.result);
	            };
	
	            req.onerror = function () {
	                reject(req.error);
	            };
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	function key(n, callback) {
	    var self = this;
	
	    var promise = new Promise$1(function (resolve, reject) {
	        if (n < 0) {
	            resolve(null);
	
	            return;
	        }
	
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly').objectStore(dbInfo.storeName);
	
	            var advanced = false;
	            var req = store.openCursor();
	            req.onsuccess = function () {
	                var cursor = req.result;
	                if (!cursor) {
	                    // this means there weren't enough keys
	                    resolve(null);
	
	                    return;
	                }
	
	                if (n === 0) {
	                    // We have the first key, return it if that's what they
	                    // wanted.
	                    resolve(cursor.key);
	                } else {
	                    if (!advanced) {
	                        // Otherwise, ask the cursor to skip ahead n
	                        // records.
	                        advanced = true;
	                        cursor.advance(n);
	                    } else {
	                        // When we get here, we've got the nth key.
	                        resolve(cursor.key);
	                    }
	                }
	            };
	
	            req.onerror = function () {
	                reject(req.error);
	            };
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	function keys(callback) {
	    var self = this;
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly').objectStore(dbInfo.storeName);
	
	            var req = store.openCursor();
	            var keys = [];
	
	            req.onsuccess = function () {
	                var cursor = req.result;
	
	                if (!cursor) {
	                    resolve(keys);
	                    return;
	                }
	
	                keys.push(cursor.key);
	                cursor["continue"]();
	            };
	
	            req.onerror = function () {
	                reject(req.error);
	            };
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	var asyncStorage = {
	    _driver: 'asyncStorage',
	    _initStorage: _initStorage,
	    iterate: iterate,
	    getItem: getItem,
	    setItem: setItem,
	    removeItem: removeItem,
	    clear: clear,
	    length: length,
	    key: key,
	    keys: keys
	};
	
	// Sadly, the best way to save binary data in WebSQL/localStorage is serializing
	// it to Base64, so this is how we store it to prevent very strange errors with less
	// verbose ways of binary <-> string data storage.
	var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	
	var BLOB_TYPE_PREFIX = '~~local_forage_type~';
	var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
	
	var SERIALIZED_MARKER = '__lfsc__:';
	var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;
	
	// OMG the serializations!
	var TYPE_ARRAYBUFFER = 'arbf';
	var TYPE_BLOB = 'blob';
	var TYPE_INT8ARRAY = 'si08';
	var TYPE_UINT8ARRAY = 'ui08';
	var TYPE_UINT8CLAMPEDARRAY = 'uic8';
	var TYPE_INT16ARRAY = 'si16';
	var TYPE_INT32ARRAY = 'si32';
	var TYPE_UINT16ARRAY = 'ur16';
	var TYPE_UINT32ARRAY = 'ui32';
	var TYPE_FLOAT32ARRAY = 'fl32';
	var TYPE_FLOAT64ARRAY = 'fl64';
	var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
	
	var toString$1 = Object.prototype.toString;
	
	function stringToBuffer(serializedString) {
	    // Fill the string into a ArrayBuffer.
	    var bufferLength = serializedString.length * 0.75;
	    var len = serializedString.length;
	    var i;
	    var p = 0;
	    var encoded1, encoded2, encoded3, encoded4;
	
	    if (serializedString[serializedString.length - 1] === '=') {
	        bufferLength--;
	        if (serializedString[serializedString.length - 2] === '=') {
	            bufferLength--;
	        }
	    }
	
	    var buffer = new ArrayBuffer(bufferLength);
	    var bytes = new Uint8Array(buffer);
	
	    for (i = 0; i < len; i += 4) {
	        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
	        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
	        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
	        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);
	
	        /*jslint bitwise: true */
	        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
	        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
	        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
	    }
	    return buffer;
	}
	
	// Converts a buffer to a string to store, serialized, in the backend
	// storage library.
	function bufferToString(buffer) {
	    // base64-arraybuffer
	    var bytes = new Uint8Array(buffer);
	    var base64String = '';
	    var i;
	
	    for (i = 0; i < bytes.length; i += 3) {
	        /*jslint bitwise: true */
	        base64String += BASE_CHARS[bytes[i] >> 2];
	        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
	        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
	        base64String += BASE_CHARS[bytes[i + 2] & 63];
	    }
	
	    if (bytes.length % 3 === 2) {
	        base64String = base64String.substring(0, base64String.length - 1) + '=';
	    } else if (bytes.length % 3 === 1) {
	        base64String = base64String.substring(0, base64String.length - 2) + '==';
	    }
	
	    return base64String;
	}
	
	// Serialize a value, afterwards executing a callback (which usually
	// instructs the `setItem()` callback/promise to be executed). This is how
	// we store binary data with localStorage.
	function serialize(value, callback) {
	    var valueType = '';
	    if (value) {
	        valueType = toString$1.call(value);
	    }
	
	    // Cannot use `value instanceof ArrayBuffer` or such here, as these
	    // checks fail when running the tests using casper.js...
	    //
	    // TODO: See why those tests fail and use a better solution.
	    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
	        // Convert binary arrays to a string and prefix the string with
	        // a special marker.
	        var buffer;
	        var marker = SERIALIZED_MARKER;
	
	        if (value instanceof ArrayBuffer) {
	            buffer = value;
	            marker += TYPE_ARRAYBUFFER;
	        } else {
	            buffer = value.buffer;
	
	            if (valueType === '[object Int8Array]') {
	                marker += TYPE_INT8ARRAY;
	            } else if (valueType === '[object Uint8Array]') {
	                marker += TYPE_UINT8ARRAY;
	            } else if (valueType === '[object Uint8ClampedArray]') {
	                marker += TYPE_UINT8CLAMPEDARRAY;
	            } else if (valueType === '[object Int16Array]') {
	                marker += TYPE_INT16ARRAY;
	            } else if (valueType === '[object Uint16Array]') {
	                marker += TYPE_UINT16ARRAY;
	            } else if (valueType === '[object Int32Array]') {
	                marker += TYPE_INT32ARRAY;
	            } else if (valueType === '[object Uint32Array]') {
	                marker += TYPE_UINT32ARRAY;
	            } else if (valueType === '[object Float32Array]') {
	                marker += TYPE_FLOAT32ARRAY;
	            } else if (valueType === '[object Float64Array]') {
	                marker += TYPE_FLOAT64ARRAY;
	            } else {
	                callback(new Error('Failed to get type for BinaryArray'));
	            }
	        }
	
	        callback(marker + bufferToString(buffer));
	    } else if (valueType === '[object Blob]') {
	        // Conver the blob to a binaryArray and then to a string.
	        var fileReader = new FileReader();
	
	        fileReader.onload = function () {
	            // Backwards-compatible prefix for the blob type.
	            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);
	
	            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
	        };
	
	        fileReader.readAsArrayBuffer(value);
	    } else {
	        try {
	            callback(JSON.stringify(value));
	        } catch (e) {
	            console.error("Couldn't convert value into a JSON string: ", value);
	
	            callback(null, e);
	        }
	    }
	}
	
	// Deserialize data we've inserted into a value column/field. We place
	// special markers into our strings to mark them as encoded; this isn't
	// as nice as a meta field, but it's the only sane thing we can do whilst
	// keeping localStorage support intact.
	//
	// Oftentimes this will just deserialize JSON content, but if we have a
	// special marker (SERIALIZED_MARKER, defined above), we will extract
	// some kind of arraybuffer/binary data/typed array out of the string.
	function deserialize(value) {
	    // If we haven't marked this string as being specially serialized (i.e.
	    // something other than serialized JSON), we can just return it and be
	    // done with it.
	    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
	        return JSON.parse(value);
	    }
	
	    // The following code deals with deserializing some kind of Blob or
	    // TypedArray. First we separate out the type of data we're dealing
	    // with from the data itself.
	    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
	    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
	
	    var blobType;
	    // Backwards-compatible blob type serialization strategy.
	    // DBs created with older versions of localForage will simply not have the blob type.
	    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
	        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
	        blobType = matcher[1];
	        serializedString = serializedString.substring(matcher[0].length);
	    }
	    var buffer = stringToBuffer(serializedString);
	
	    // Return the right type based on the code/type set during
	    // serialization.
	    switch (type) {
	        case TYPE_ARRAYBUFFER:
	            return buffer;
	        case TYPE_BLOB:
	            return createBlob([buffer], { type: blobType });
	        case TYPE_INT8ARRAY:
	            return new Int8Array(buffer);
	        case TYPE_UINT8ARRAY:
	            return new Uint8Array(buffer);
	        case TYPE_UINT8CLAMPEDARRAY:
	            return new Uint8ClampedArray(buffer);
	        case TYPE_INT16ARRAY:
	            return new Int16Array(buffer);
	        case TYPE_UINT16ARRAY:
	            return new Uint16Array(buffer);
	        case TYPE_INT32ARRAY:
	            return new Int32Array(buffer);
	        case TYPE_UINT32ARRAY:
	            return new Uint32Array(buffer);
	        case TYPE_FLOAT32ARRAY:
	            return new Float32Array(buffer);
	        case TYPE_FLOAT64ARRAY:
	            return new Float64Array(buffer);
	        default:
	            throw new Error('Unkown type: ' + type);
	    }
	}
	
	var localforageSerializer = {
	    serialize: serialize,
	    deserialize: deserialize,
	    stringToBuffer: stringToBuffer,
	    bufferToString: bufferToString
	};
	
	/*
	 * Includes code from:
	 *
	 * base64-arraybuffer
	 * https://github.com/niklasvh/base64-arraybuffer
	 *
	 * Copyright (c) 2012 Niklas von Hertzen
	 * Licensed under the MIT license.
	 */
	// Open the WebSQL database (automatically creates one if one didn't
	// previously exist), using any options set in the config.
	function _initStorage$1(options) {
	    var self = this;
	    var dbInfo = {
	        db: null
	    };
	
	    if (options) {
	        for (var i in options) {
	            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
	        }
	    }
	
	    var dbInfoPromise = new Promise$1(function (resolve, reject) {
	        // Open the database; the openDatabase API will automatically
	        // create it for us if it doesn't exist.
	        try {
	            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
	        } catch (e) {
	            return reject(e);
	        }
	
	        // Create our key/value table if it doesn't exist.
	        dbInfo.db.transaction(function (t) {
	            t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' (id INTEGER PRIMARY KEY, key unique, value)', [], function () {
	                self._dbInfo = dbInfo;
	                resolve();
	            }, function (t, error) {
	                reject(error);
	            });
	        });
	    });
	
	    dbInfo.serializer = localforageSerializer;
	    return dbInfoPromise;
	}
	
	function getItem$1(key, callback) {
	    var self = this;
	
	    // Cast the key to a string, as that's all we can set as a key.
	    if (typeof key !== 'string') {
	        console.warn(key + ' used as a key, but it is not a string.');
	        key = String(key);
	    }
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            dbInfo.db.transaction(function (t) {
	                t.executeSql('SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
	                    var result = results.rows.length ? results.rows.item(0).value : null;
	
	                    // Check to see if this is serialized content we need to
	                    // unpack.
	                    if (result) {
	                        result = dbInfo.serializer.deserialize(result);
	                    }
	
	                    resolve(result);
	                }, function (t, error) {
	
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	function iterate$1(iterator, callback) {
	    var self = this;
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	
	            dbInfo.db.transaction(function (t) {
	                t.executeSql('SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
	                    var rows = results.rows;
	                    var length = rows.length;
	
	                    for (var i = 0; i < length; i++) {
	                        var item = rows.item(i);
	                        var result = item.value;
	
	                        // Check to see if this is serialized content
	                        // we need to unpack.
	                        if (result) {
	                            result = dbInfo.serializer.deserialize(result);
	                        }
	
	                        result = iterator(result, item.key, i + 1);
	
	                        // void(0) prevents problems with redefinition
	                        // of `undefined`.
	                        if (result !== void 0) {
	                            resolve(result);
	                            return;
	                        }
	                    }
	
	                    resolve();
	                }, function (t, error) {
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	function setItem$1(key, value, callback) {
	    var self = this;
	
	    // Cast the key to a string, as that's all we can set as a key.
	    if (typeof key !== 'string') {
	        console.warn(key + ' used as a key, but it is not a string.');
	        key = String(key);
	    }
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            // The localStorage API doesn't return undefined values in an
	            // "expected" way, so undefined is always cast to null in all
	            // drivers. See: https://github.com/mozilla/localForage/pull/42
	            if (value === undefined) {
	                value = null;
	            }
	
	            // Save the original value to pass to the callback.
	            var originalValue = value;
	
	            var dbInfo = self._dbInfo;
	            dbInfo.serializer.serialize(value, function (value, error) {
	                if (error) {
	                    reject(error);
	                } else {
	                    dbInfo.db.transaction(function (t) {
	                        t.executeSql('INSERT OR REPLACE INTO ' + dbInfo.storeName + ' (key, value) VALUES (?, ?)', [key, value], function () {
	                            resolve(originalValue);
	                        }, function (t, error) {
	                            reject(error);
	                        });
	                    }, function (sqlError) {
	                        // The transaction failed; check
	                        // to see if it's a quota error.
	                        if (sqlError.code === sqlError.QUOTA_ERR) {
	                            // We reject the callback outright for now, but
	                            // it's worth trying to re-run the transaction.
	                            // Even if the user accepts the prompt to use
	                            // more storage on Safari, this error will
	                            // be called.
	                            //
	                            // TODO: Try to re-run the transaction.
	                            reject(sqlError);
	                        }
	                    });
	                }
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	function removeItem$1(key, callback) {
	    var self = this;
	
	    // Cast the key to a string, as that's all we can set as a key.
	    if (typeof key !== 'string') {
	        console.warn(key + ' used as a key, but it is not a string.');
	        key = String(key);
	    }
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            dbInfo.db.transaction(function (t) {
	                t.executeSql('DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
	                    resolve();
	                }, function (t, error) {
	
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	// Deletes every item in the table.
	// TODO: Find out if this resets the AUTO_INCREMENT number.
	function clear$1(callback) {
	    var self = this;
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            dbInfo.db.transaction(function (t) {
	                t.executeSql('DELETE FROM ' + dbInfo.storeName, [], function () {
	                    resolve();
	                }, function (t, error) {
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	// Does a simple `COUNT(key)` to get the number of items stored in
	// localForage.
	function length$1(callback) {
	    var self = this;
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            dbInfo.db.transaction(function (t) {
	                // Ahhh, SQL makes this one soooooo easy.
	                t.executeSql('SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
	                    var result = results.rows.item(0).c;
	
	                    resolve(result);
	                }, function (t, error) {
	
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	// Return the key located at key index X; essentially gets the key from a
	// `WHERE id = ?`. This is the most efficient way I can think to implement
	// this rarely-used (in my experience) part of the API, but it can seem
	// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
	// the ID of each key will change every time it's updated. Perhaps a stored
	// procedure for the `setItem()` SQL would solve this problem?
	// TODO: Don't change ID on `setItem()`.
	function key$1(n, callback) {
	    var self = this;
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            dbInfo.db.transaction(function (t) {
	                t.executeSql('SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
	                    var result = results.rows.length ? results.rows.item(0).key : null;
	                    resolve(result);
	                }, function (t, error) {
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	function keys$1(callback) {
	    var self = this;
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            dbInfo.db.transaction(function (t) {
	                t.executeSql('SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
	                    var keys = [];
	
	                    for (var i = 0; i < results.rows.length; i++) {
	                        keys.push(results.rows.item(i).key);
	                    }
	
	                    resolve(keys);
	                }, function (t, error) {
	
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	var webSQLStorage = {
	    _driver: 'webSQLStorage',
	    _initStorage: _initStorage$1,
	    iterate: iterate$1,
	    getItem: getItem$1,
	    setItem: setItem$1,
	    removeItem: removeItem$1,
	    clear: clear$1,
	    length: length$1,
	    key: key$1,
	    keys: keys$1
	};
	
	// Config the localStorage backend, using options set in the config.
	function _initStorage$2(options) {
	    var self = this;
	    var dbInfo = {};
	    if (options) {
	        for (var i in options) {
	            dbInfo[i] = options[i];
	        }
	    }
	
	    dbInfo.keyPrefix = dbInfo.name + '/';
	
	    if (dbInfo.storeName !== self._defaultConfig.storeName) {
	        dbInfo.keyPrefix += dbInfo.storeName + '/';
	    }
	
	    self._dbInfo = dbInfo;
	    dbInfo.serializer = localforageSerializer;
	
	    return Promise$1.resolve();
	}
	
	// Remove all keys from the datastore, effectively destroying all data in
	// the app's key/value store!
	function clear$2(callback) {
	    var self = this;
	    var promise = self.ready().then(function () {
	        var keyPrefix = self._dbInfo.keyPrefix;
	
	        for (var i = localStorage.length - 1; i >= 0; i--) {
	            var key = localStorage.key(i);
	
	            if (key.indexOf(keyPrefix) === 0) {
	                localStorage.removeItem(key);
	            }
	        }
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	// Retrieve an item from the store. Unlike the original async_storage
	// library in Gaia, we don't modify return values at all. If a key's value
	// is `undefined`, we pass that value to the callback function.
	function getItem$2(key, callback) {
	    var self = this;
	
	    // Cast the key to a string, as that's all we can set as a key.
	    if (typeof key !== 'string') {
	        console.warn(key + ' used as a key, but it is not a string.');
	        key = String(key);
	    }
	
	    var promise = self.ready().then(function () {
	        var dbInfo = self._dbInfo;
	        var result = localStorage.getItem(dbInfo.keyPrefix + key);
	
	        // If a result was found, parse it from the serialized
	        // string into a JS object. If result isn't truthy, the key
	        // is likely undefined and we'll pass it straight to the
	        // callback.
	        if (result) {
	            result = dbInfo.serializer.deserialize(result);
	        }
	
	        return result;
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	// Iterate over all items in the store.
	function iterate$2(iterator, callback) {
	    var self = this;
	
	    var promise = self.ready().then(function () {
	        var dbInfo = self._dbInfo;
	        var keyPrefix = dbInfo.keyPrefix;
	        var keyPrefixLength = keyPrefix.length;
	        var length = localStorage.length;
	
	        // We use a dedicated iterator instead of the `i` variable below
	        // so other keys we fetch in localStorage aren't counted in
	        // the `iterationNumber` argument passed to the `iterate()`
	        // callback.
	        //
	        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
	        var iterationNumber = 1;
	
	        for (var i = 0; i < length; i++) {
	            var key = localStorage.key(i);
	            if (key.indexOf(keyPrefix) !== 0) {
	                continue;
	            }
	            var value = localStorage.getItem(key);
	
	            // If a result was found, parse it from the serialized
	            // string into a JS object. If result isn't truthy, the
	            // key is likely undefined and we'll pass it straight
	            // to the iterator.
	            if (value) {
	                value = dbInfo.serializer.deserialize(value);
	            }
	
	            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);
	
	            if (value !== void 0) {
	                return value;
	            }
	        }
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	// Same as localStorage's key() method, except takes a callback.
	function key$2(n, callback) {
	    var self = this;
	    var promise = self.ready().then(function () {
	        var dbInfo = self._dbInfo;
	        var result;
	        try {
	            result = localStorage.key(n);
	        } catch (error) {
	            result = null;
	        }
	
	        // Remove the prefix from the key, if a key is found.
	        if (result) {
	            result = result.substring(dbInfo.keyPrefix.length);
	        }
	
	        return result;
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	function keys$2(callback) {
	    var self = this;
	    var promise = self.ready().then(function () {
	        var dbInfo = self._dbInfo;
	        var length = localStorage.length;
	        var keys = [];
	
	        for (var i = 0; i < length; i++) {
	            if (localStorage.key(i).indexOf(dbInfo.keyPrefix) === 0) {
	                keys.push(localStorage.key(i).substring(dbInfo.keyPrefix.length));
	            }
	        }
	
	        return keys;
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	// Supply the number of keys in the datastore to the callback function.
	function length$2(callback) {
	    var self = this;
	    var promise = self.keys().then(function (keys) {
	        return keys.length;
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	// Remove an item from the store, nice and simple.
	function removeItem$2(key, callback) {
	    var self = this;
	
	    // Cast the key to a string, as that's all we can set as a key.
	    if (typeof key !== 'string') {
	        console.warn(key + ' used as a key, but it is not a string.');
	        key = String(key);
	    }
	
	    var promise = self.ready().then(function () {
	        var dbInfo = self._dbInfo;
	        localStorage.removeItem(dbInfo.keyPrefix + key);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	// Set a key's value and run an optional callback once the value is set.
	// Unlike Gaia's implementation, the callback function is passed the value,
	// in case you want to operate on that value only after you're sure it
	// saved, or something like that.
	function setItem$2(key, value, callback) {
	    var self = this;
	
	    // Cast the key to a string, as that's all we can set as a key.
	    if (typeof key !== 'string') {
	        console.warn(key + ' used as a key, but it is not a string.');
	        key = String(key);
	    }
	
	    var promise = self.ready().then(function () {
	        // Convert undefined values to null.
	        // https://github.com/mozilla/localForage/pull/42
	        if (value === undefined) {
	            value = null;
	        }
	
	        // Save the original value to pass to the callback.
	        var originalValue = value;
	
	        return new Promise$1(function (resolve, reject) {
	            var dbInfo = self._dbInfo;
	            dbInfo.serializer.serialize(value, function (value, error) {
	                if (error) {
	                    reject(error);
	                } else {
	                    try {
	                        localStorage.setItem(dbInfo.keyPrefix + key, value);
	                        resolve(originalValue);
	                    } catch (e) {
	                        // localStorage capacity exceeded.
	                        // TODO: Make this a specific error/event.
	                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
	                            reject(e);
	                        }
	                        reject(e);
	                    }
	                }
	            });
	        });
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	var localStorageWrapper = {
	    _driver: 'localStorageWrapper',
	    _initStorage: _initStorage$2,
	    // Default API, from Gaia/localStorage.
	    iterate: iterate$2,
	    getItem: getItem$2,
	    setItem: setItem$2,
	    removeItem: removeItem$2,
	    clear: clear$2,
	    length: length$2,
	    key: key$2,
	    keys: keys$2
	};
	
	// Custom drivers are stored here when `defineDriver()` is called.
	// They are shared across all instances of localForage.
	var CustomDrivers = {};
	
	var DriverType = {
	    INDEXEDDB: 'asyncStorage',
	    LOCALSTORAGE: 'localStorageWrapper',
	    WEBSQL: 'webSQLStorage'
	};
	
	var DefaultDriverOrder = [DriverType.INDEXEDDB, DriverType.WEBSQL, DriverType.LOCALSTORAGE];
	
	var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'];
	
	var DefaultConfig = {
	    description: '',
	    driver: DefaultDriverOrder.slice(),
	    name: 'localforage',
	    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
	    // we can use without a prompt.
	    size: 4980736,
	    storeName: 'keyvaluepairs',
	    version: 1.0
	};
	
	var driverSupport = {};
	// Check to see if IndexedDB is available and if it is the latest
	// implementation; it's our preferred backend library. We use "_spec_test"
	// as the name of the database because it's not the one we'll operate on,
	// but it's useful to make sure its using the right spec.
	// See: https://github.com/mozilla/localForage/issues/128
	driverSupport[DriverType.INDEXEDDB] = isIndexedDBValid();
	
	driverSupport[DriverType.WEBSQL] = isWebSQLValid();
	
	driverSupport[DriverType.LOCALSTORAGE] = isLocalStorageValid();
	
	var isArray = Array.isArray || function (arg) {
	    return Object.prototype.toString.call(arg) === '[object Array]';
	};
	
	function callWhenReady(localForageInstance, libraryMethod) {
	    localForageInstance[libraryMethod] = function () {
	        var _args = arguments;
	        return localForageInstance.ready().then(function () {
	            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
	        });
	    };
	}
	
	function extend() {
	    for (var i = 1; i < arguments.length; i++) {
	        var arg = arguments[i];
	
	        if (arg) {
	            for (var key in arg) {
	                if (arg.hasOwnProperty(key)) {
	                    if (isArray(arg[key])) {
	                        arguments[0][key] = arg[key].slice();
	                    } else {
	                        arguments[0][key] = arg[key];
	                    }
	                }
	            }
	        }
	    }
	
	    return arguments[0];
	}
	
	function isLibraryDriver(driverName) {
	    for (var driver in DriverType) {
	        if (DriverType.hasOwnProperty(driver) && DriverType[driver] === driverName) {
	            return true;
	        }
	    }
	
	    return false;
	}
	
	var LocalForage = function () {
	    function LocalForage(options) {
	        _classCallCheck(this, LocalForage);
	
	        this.INDEXEDDB = DriverType.INDEXEDDB;
	        this.LOCALSTORAGE = DriverType.LOCALSTORAGE;
	        this.WEBSQL = DriverType.WEBSQL;
	
	        this._defaultConfig = extend({}, DefaultConfig);
	        this._config = extend({}, this._defaultConfig, options);
	        this._driverSet = null;
	        this._initDriver = null;
	        this._ready = false;
	        this._dbInfo = null;
	
	        this._wrapLibraryMethodsWithReady();
	        this.setDriver(this._config.driver);
	    }
	
	    // Set any config values for localForage; can be called anytime before
	    // the first API call (e.g. `getItem`, `setItem`).
	    // We loop through options so we don't overwrite existing config
	    // values.
	
	
	    LocalForage.prototype.config = function config(options) {
	        // If the options argument is an object, we use it to set values.
	        // Otherwise, we return either a specified config value or all
	        // config values.
	        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	            // If localforage is ready and fully initialized, we can't set
	            // any new configuration values. Instead, we return an error.
	            if (this._ready) {
	                return new Error("Can't call config() after localforage " + 'has been used.');
	            }
	
	            for (var i in options) {
	                if (i === 'storeName') {
	                    options[i] = options[i].replace(/\W/g, '_');
	                }
	
	                this._config[i] = options[i];
	            }
	
	            // after all config options are set and
	            // the driver option is used, try setting it
	            if ('driver' in options && options.driver) {
	                this.setDriver(this._config.driver);
	            }
	
	            return true;
	        } else if (typeof options === 'string') {
	            return this._config[options];
	        } else {
	            return this._config;
	        }
	    };
	
	    // Used to define a custom driver, shared across all instances of
	    // localForage.
	
	
	    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
	        var promise = new Promise$1(function (resolve, reject) {
	            try {
	                var driverName = driverObject._driver;
	                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');
	                var namingError = new Error('Custom driver name already in use: ' + driverObject._driver);
	
	                // A driver name should be defined and not overlap with the
	                // library-defined, default drivers.
	                if (!driverObject._driver) {
	                    reject(complianceError);
	                    return;
	                }
	                if (isLibraryDriver(driverObject._driver)) {
	                    reject(namingError);
	                    return;
	                }
	
	                var customDriverMethods = LibraryMethods.concat('_initStorage');
	                for (var i = 0; i < customDriverMethods.length; i++) {
	                    var customDriverMethod = customDriverMethods[i];
	                    if (!customDriverMethod || !driverObject[customDriverMethod] || typeof driverObject[customDriverMethod] !== 'function') {
	                        reject(complianceError);
	                        return;
	                    }
	                }
	
	                var supportPromise = Promise$1.resolve(true);
	                if ('_support' in driverObject) {
	                    if (driverObject._support && typeof driverObject._support === 'function') {
	                        supportPromise = driverObject._support();
	                    } else {
	                        supportPromise = Promise$1.resolve(!!driverObject._support);
	                    }
	                }
	
	                supportPromise.then(function (supportResult) {
	                    driverSupport[driverName] = supportResult;
	                    CustomDrivers[driverName] = driverObject;
	                    resolve();
	                }, reject);
	            } catch (e) {
	                reject(e);
	            }
	        });
	
	        executeTwoCallbacks(promise, callback, errorCallback);
	        return promise;
	    };
	
	    LocalForage.prototype.driver = function driver() {
	        return this._driver || null;
	    };
	
	    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
	        var self = this;
	        var getDriverPromise = Promise$1.resolve().then(function () {
	            if (isLibraryDriver(driverName)) {
	                switch (driverName) {
	                    case self.INDEXEDDB:
	                        return asyncStorage;
	                    case self.LOCALSTORAGE:
	                        return localStorageWrapper;
	                    case self.WEBSQL:
	                        return webSQLStorage;
	                }
	            } else if (CustomDrivers[driverName]) {
	                return CustomDrivers[driverName];
	            } else {
	                throw new Error('Driver not found.');
	            }
	        });
	        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
	        return getDriverPromise;
	    };
	
	    LocalForage.prototype.getSerializer = function getSerializer(callback) {
	        var serializerPromise = Promise$1.resolve(localforageSerializer);
	        executeTwoCallbacks(serializerPromise, callback);
	        return serializerPromise;
	    };
	
	    LocalForage.prototype.ready = function ready(callback) {
	        var self = this;
	
	        var promise = self._driverSet.then(function () {
	            if (self._ready === null) {
	                self._ready = self._initDriver();
	            }
	
	            return self._ready;
	        });
	
	        executeTwoCallbacks(promise, callback, callback);
	        return promise;
	    };
	
	    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
	        var self = this;
	
	        if (!isArray(drivers)) {
	            drivers = [drivers];
	        }
	
	        var supportedDrivers = this._getSupportedDrivers(drivers);
	
	        function setDriverToConfig() {
	            self._config.driver = self.driver();
	        }
	
	        function initDriver(supportedDrivers) {
	            return function () {
	                var currentDriverIndex = 0;
	
	                function driverPromiseLoop() {
	                    while (currentDriverIndex < supportedDrivers.length) {
	                        var driverName = supportedDrivers[currentDriverIndex];
	                        currentDriverIndex++;
	
	                        self._dbInfo = null;
	                        self._ready = null;
	
	                        return self.getDriver(driverName).then(function (driver) {
	                            self._extend(driver);
	                            setDriverToConfig();
	
	                            self._ready = self._initStorage(self._config);
	                            return self._ready;
	                        })["catch"](driverPromiseLoop);
	                    }
	
	                    setDriverToConfig();
	                    var error = new Error('No available storage method found.');
	                    self._driverSet = Promise$1.reject(error);
	                    return self._driverSet;
	                }
	
	                return driverPromiseLoop();
	            };
	        }
	
	        // There might be a driver initialization in progress
	        // so wait for it to finish in order to avoid a possible
	        // race condition to set _dbInfo
	        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
	            return Promise$1.resolve();
	        }) : Promise$1.resolve();
	
	        this._driverSet = oldDriverSetDone.then(function () {
	            var driverName = supportedDrivers[0];
	            self._dbInfo = null;
	            self._ready = null;
	
	            return self.getDriver(driverName).then(function (driver) {
	                self._driver = driver._driver;
	                setDriverToConfig();
	                self._wrapLibraryMethodsWithReady();
	                self._initDriver = initDriver(supportedDrivers);
	            });
	        })["catch"](function () {
	            setDriverToConfig();
	            var error = new Error('No available storage method found.');
	            self._driverSet = Promise$1.reject(error);
	            return self._driverSet;
	        });
	
	        executeTwoCallbacks(this._driverSet, callback, errorCallback);
	        return this._driverSet;
	    };
	
	    LocalForage.prototype.supports = function supports(driverName) {
	        return !!driverSupport[driverName];
	    };
	
	    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
	        extend(this, libraryMethodsAndProperties);
	    };
	
	    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
	        var supportedDrivers = [];
	        for (var i = 0, len = drivers.length; i < len; i++) {
	            var driverName = drivers[i];
	            if (this.supports(driverName)) {
	                supportedDrivers.push(driverName);
	            }
	        }
	        return supportedDrivers;
	    };
	
	    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
	        // Add a stub for each driver API method that delays the call to the
	        // corresponding driver method until localForage is ready. These stubs
	        // will be replaced by the driver methods as soon as the driver is
	        // loaded, so there is no performance impact.
	        for (var i = 0; i < LibraryMethods.length; i++) {
	            callWhenReady(this, LibraryMethods[i]);
	        }
	    };
	
	    LocalForage.prototype.createInstance = function createInstance(options) {
	        return new LocalForage(options);
	    };
	
	    return LocalForage;
	}();
	
	// The actual localForage object that we expose as a module or via a
	// global. It's extended by pulling in one of our other libraries.
	
	
	var localforage_js = new LocalForage();
	
	module.exports = localforage_js;
	
	},{"3":3}]},{},[4])(4)
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //import localForage from "localforage/dist/localforage.js"
	
	
	var _localforage = __webpack_require__(4);
	
	var _localforage2 = _interopRequireDefault(_localforage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//import localForage from "./localforage-build"
	
	var supportsNav = typeof navigator != 'undefined';
	
	var AckOffline = function () {
	  function AckOffline($http) {
	    _classCallCheck(this, AckOffline);
	
	    this.$http = $http;
	    this.prefix = "offline";
	    this.handlers = [];
	  }
	
	  _createClass(AckOffline, [{
	    key: "remove",
	    value: function remove(name) {
	      return _localforage2.default.removeItem(this.prefix + '-' + name);
	    }
	  }, {
	    key: "get",
	    value: function get(name) {
	      return _localforage2.default.getItem(this.prefix + '-' + name);
	    }
	  }, {
	    key: "set",
	    value: function set(name, data) {
	      return _localforage2.default.setItem(this.prefix + '-' + name, data);
	    }
	  }, {
	    key: "_validate",
	    value: function _validate(data, _ref) {
	      var expires = _ref.expires;
	
	      var exists = data !== null && typeof data.cache !== "undefined";
	      return exists && !this._expired(data._timestamp, expires);
	    }
	  }, {
	    key: "_expired",
	    value: function _expired(stamp, expires) {
	      var diff = Date.now() - expires;
	      var expired = stamp <= diff;
	      return expires && expired ? true : false;
	    }
	
	    /**
	      Creates que handler. Returns self. Most likely, use newQueModel
	      @options - {
	        handler : dataArray=> - overrides $http posting for que processing
	        onData : data=> - callback fired everytime data is retrieved
	        expires: Number - how many milisecs can a saved transmission live in cache
	      }
	    */
	
	  }, {
	    key: "newQueModel",
	    value: function newQueModel(name) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      options.name = name;
	      this.addQueModel(name, options);
	      return new QueModel(this, options);
	    }
	
	    /**
	      Creates que handler. Returns self. Most likely, use newQueModel
	      @options - {
	        handler : dataArray=> - overrides $http posting for que processing
	        onData : data=> - callback fired everytime data is retrieved
	      }
	    */
	
	  }, {
	    key: "addQueModel",
	    value: function addQueModel(name) {
	      var _this = this;
	
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      return this.registerQueueHandler(name, function (trans) {
	        var prom = _this.$http(trans);
	
	        if (options.onData) {
	          prom = prom.then(function (response) {
	            if (response.data) {
	              options.onData(response.data);
	            }
	          });
	        }
	
	        return prom.catch(function (e) {
	          return _this.ErrorHandler.record(e);
	        });
	      });
	    }
	  }, {
	    key: "paramCache",
	    value: function paramCache(name) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      options.param = options.param || [];
	      return this.getCache(name, options);
	    }
	  }, {
	    key: "paramSaveCache",
	    value: function paramSaveCache(name, options) {
	      var _this2 = this;
	
	      return this.paramCache(name, options).then(function (items) {
	        return _this2.setCache(name, items);
	      });
	    }
	  }, {
	    key: "getCache",
	    value: function getCache(name) {
	      var _this3 = this;
	
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      return this.get(name).then(function (data) {
	        if (_this3._validate(data, options)) {
	          return data.cache;
	        }
	
	        if (data) {
	          if (data.cache == null && data._timestamp == null) {
	            return data;
	          }
	
	          if (!options.expires) {
	            return data.cache;
	          }
	
	          var isCheckExpired = data && data._timestamp && options.allowExpired;
	          var expired = data && data._timestamp && _this3._expired(data._timestamp, options.expires);
	          var isAllowExpired = isCheckExpired && expired;
	          if (isAllowExpired) {
	            return data.cache;
	          }
	
	          if (expired) {
	            var _err = new Error('Cache expired for ' + name);
	            _err.code = 401;
	          }
	        }
	
	        if (options.param) return options.param;
	
	        var err = new Error('No valid cache found for ' + name);
	        err.code = 404;
	
	        return new Promise(function (res, rej) {
	          rej(err);
	        });
	      });
	    }
	  }, {
	    key: "setCache",
	    value: function setCache(name, cache) {
	      var _this4 = this;
	
	      var newCache = {
	        _timestamp: Date.now() //,cache: response.data
	      };
	
	      return this.get(name).then(function (data) {
	        data = data && data.constructor != String ? data : {};
	
	        Object.assign(data, newCache);
	        if (cache && cache.constructor == String) {
	          data.cache = cache;
	        } else if (data.cache && data.cache.constructor != String) {
	          Object.assign(data.cache, cache);
	        } else {
	          data.cache = cache;
	        }
	
	        return data;
	      }) //paste cache over cache, leave all else alone
	      .then(function (data) {
	        return _this4.set(name, data);
	      });
	    }
	  }, {
	    key: "cacheResponse",
	    value: function cacheResponse(name, response) {
	      return this.setCache(name, response.data);
	    }
	  }, {
	    key: "getQueue",
	    value: function getQueue(name) {
	      return this.get(name).then(function (data) {
	        return data && data.queue ? data.queue : [];
	      });
	    }
	  }, {
	    key: "setQueue",
	    value: function setQueue(name, queue) {
	      var _this5 = this;
	
	      return this.get(name).then(function (data) {
	        return Object.assign({}, data, { queue: queue });
	      }).then(function (data) {
	        return _this5.set(name, data);
	      });
	    }
	  }, {
	    key: "clearQueue",
	    value: function clearQueue(name) {
	      var _this6 = this;
	
	      return this.get(name).then(function (data) {
	        data.queue = [];
	        _this6.set(name, data);
	      });
	    }
	
	    /** post/put que */
	
	  }, {
	    key: "enqueue",
	    value: function enqueue(name, queueData) {
	      var _this7 = this;
	
	      if (supportsNav && navigator.onLine) {
	        var handler = this.handlers.find(function (handler) {
	          return handler.name === name;
	        });
	        if (handler) return handler(queueData);
	      }
	
	      return this.get(name).then(function (data) {
	        data = data || {};
	        data.queue = data.queue || [];
	
	        if (queueData.forEach) {
	          queueData.forEach(function (x) {
	            data.queue.push(x);
	          });
	        } else {
	          data.queue.push(queueData);
	        }
	        return _this7.set(name, data);
	      });
	    }
	  }, {
	    key: "registerQueueHandler",
	    value: function registerQueueHandler(name, handler) {
	      handler = handler || this.getQueHandler.bind(this);
	      this.handlers.push({ name: name, handler: handler });
	      return this;
	    }
	  }, {
	    key: "processQueues",
	    value: function processQueues() {
	      var _this8 = this;
	
	      var x = this.handlers.length - 1,
	          promises = [];
	
	      var _loop = function _loop() {
	        var hand = _this8.handlers[x];
	
	        var prom = _this8.getQueue(hand.name).then(function (queue) {
	          return queue.forEach(function (x) {
	            return hand.handler(x);
	          });
	        }).then(function () {
	          return _this8.clearQueue(hand.name);
	        });
	
	        promises.push(prom);
	      };
	
	      for (; x >= 0; --x) {
	        _loop();
	      }
	
	      return Promise.all(promises);
	    }
	  }, {
	    key: "getQueHandler",
	    value: function getQueHandler(item) {
	      return this.$http(item);
	    }
	  }, {
	    key: "promiseNameArray",
	    value: function promiseNameArray() {
	      var _this9 = this;
	
	      var keys = [];
	      return _localforage2.default.iterate(function (_, k) {
	        if (k.startsWith(_this9.prefix)) {
	          keys.push(k.substring(_this9.prefix.length + 1, k.length));
	        }
	      }).then(function () {
	        return keys;
	      });
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      var _this10 = this;
	
	      this.promiseNameArray().then(function (keys) {
	        return keys.forEach(function (name) {
	          return _this10.remove(name);
	        });
	      });
	    }
	  }]);
	
	  return AckOffline;
	}();
	
	exports.default = AckOffline;
	
	
	AckOffline.$inject = ["$http"];
	
	/**
	  @config {expires, allowExpired, name}
	*/
	
	var QueModel = function () {
	  function QueModel(AckOffline, config) {
	    _classCallCheck(this, QueModel);
	
	    this.AckOffline = AckOffline;
	    this.config = config;
	  }
	
	  _createClass(QueModel, [{
	    key: "mergeConfig",
	    value: function mergeConfig(config) {
	      Object.assign(config, this.config);
	      this.config = config;
	      return this;
	    }
	  }, {
	    key: "get",
	    value: function get() {
	      return this.AckOffline.get(this.config.name);
	    }
	  }, {
	    key: "set",
	    value: function set(data) {
	      return this.AckOffline.set(this.config.name, data);
	    }
	  }]);

	  return QueModel;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=test.js.map