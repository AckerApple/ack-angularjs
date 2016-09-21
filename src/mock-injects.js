import mocks from "angular-mocks"

export function createDepject(args, callback){
  var depjection = eval('(function('+args+'){var args=Array.prototype.slice.call(arguments);callback(args)})')
  return depjection
}

export function sync(callback){
  return function(done){
    mocks.inject($rootScope=>{
      callback()
      $rootScope.$apply()
      done()
    })
  }
}

export function async(callback){
  return function(done){
    mocks.inject($rootScope=>{
      callback(done)
      $rootScope.$apply()
    })
  }
}

export function promise(callback){
  return function(done){
    mocks.inject($rootScope=>{
      try{
        var prom = callback()


        if(prom.then && prom.catch){
          prom.then(done).catch(done.fail||done)
        }else{
          throw new Error('Expected promise in return from mock-injects.promise callback')
        }

        $rootScope.$apply()
      }catch(e){
        done.fail ? done.fail(e) : done(e)
      }
    })
  }
}

export function syncject(args, callback){
  var loaded, $rs

  return done=>{
    loaded = args=>{
      //args.push(done)
      try{
        callback.apply(null, args)
        $rs.$apply();
        done()
      }catch(e){
        done.fail ? done.fail(e) : done(e)
      }
    }

    var depjection = createDepject(args,loaded)

    mocks.inject($rootScope=>{
      $rs = $rootScope
      mocks.inject(depjection)
    })
  }
}

export function asyncject(args, callback){
  var loaded, $rs

  return done=>{
    loaded = args=>{
      args.push(done)
      callback.apply(null, args)
      $rs.$apply();
    }

    var depjection = createDepject(args, loaded)
    
    mocks.inject($rootScope=>{
      $rs = $rootScope
      mocks.inject(depjection)
    })
  }
}

export function promiseject(args, callback){
  var loaded, $rs

  return done=>{
    loaded = args=>{
      args.push(done)
      
      try{
        var prom = callback.apply(null, args)

        if(prom.then && prom.catch){
          prom.then(done).catch(e=>{
            if(e && e.data && e.data.error){
              let error = new RequestError()

              for(let x in e.data.error){
                error[x] = e.data.error[x]
              }

              if(error && error.detail && !error.message){
                error.message = error.detail
              }

              error.code = error.code || e.status
              error.status = error.status || e.status
              
              e = error
            }

            done.fail?done.fail(e):done(e)
          })
        }else{
          throw new Error('Expected promise in return from mock-injects.promiseject callback')
        }

        $rs.$apply()
      }catch(e){
        done.fail ? done.fail(e) : done(e)
      }
    }

    var depjection = createDepject(args, loaded)
    
    mocks.inject($rootScope=>{
      $rs = $rootScope
      mocks.inject(depjection)
    })
  }
}

export let module = mocks.module;
export let inject = mocks.inject;

export default {
  sync: sync,
  async: async,
  promise: promise,
  syncject: syncject,
  asyncject: asyncject,
  promiseject: promiseject,
  module: mocks.module,
  inject: mocks.inject
}


function RequestError(message){
  this.name = this.constructor.name;
  //this.status = 400;
  //this.code = "bad_request";
  this.message = message || "RequestError";
  return this
}
RequestError.prototype = Object.create(Error.prototype)
