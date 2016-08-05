import localForage from "localforage"
import {sync, promise} from "../mock-injects"
import AckOffline from "../ack-offline.service"

function testBasicSetCache(data){
  expect(typeof data).toEqual('object')
  expect(typeof data._timestamp).toEqual('number')
}

export default function() {
  let ackOffline, $http

  beforeEach(inject(function(_$http_) {
    $http = _$http_
    localForage.setItem("offline-foo")
  }))

  beforeEach(function() {
    ackOffline = new AckOffline($http)
  })

  describe("#setItem", function() {
    it("gets offline data from local storage", promise(()=>
      localForage.setItem("offline-foo","bar")
      .then(()=>ackOffline.get("foo"))
      .then(data => expect(data).toEqual("bar"))
    ))
  })

  describe("#set", function() {
    it("sets data into cache", promise(()=>
      ackOffline.set("foo", "bar")
      .then(()=>ackOffline.get("foo"))
      .then(data => expect(data).toEqual("bar"))
    ))
  })

  describe("#getCache", function() {
    it("retrieves cache from local storage", promise(()=>
      localForage.setItem("offline-foo", "bar")
      .then(()=>localForage.getItem("offline-foo"))
      .then(cache => {
        expect(cache).toEqual("bar")
      })
      .then(()=>ackOffline.getCache("foo"))
      .then(cache => {
        expect(cache).toEqual("bar")
      })
    ))

    describe("when cache data is a collection", function() {
      it("considers an 0-length cache valid", promise(()=>
        ackOffline.setCache('foo','bar')
        .then(()=>localForage.getItem("offline-foo"))
        .then(data=>{
          expect(typeof data).toEqual('object')
          expect(typeof data._timestamp).toEqual('number')
          expect(typeof data.cache).toEqual('string')
          expect(data.cache).toEqual('bar')
        })
        .then(()=>ackOffline.getCache("foo"))
        .then(cache => expect(cache).toEqual("bar"))
      ))
    })

    describe("when cache data is an object", function() {
      it("considers an empty object valid", promise(()=>
        ackOffline.setCache("foo")
        .then( data=>{
          testBasicSetCache(data)
          expect(typeof data.cache).toEqual('undefined')
        })
        .then( ()=>ackOffline.getCache("foo") )
        .then( cache => expect(typeof cache).toEqual("undefined") )
      ))
    })

    it("handles empty data storage", promise(()=>
      localForage.setItem("offline-foo")
      .then( d=>expect(d).toBe(null) )
      .then(()=>ackOffline.getCache("foos") )
      .catch(e=>{
        expect(e.message).toBe('No valid cache found for foos')
      })
    ))

    describe("with expiration", function() {
      it("returns cache if not expired", promise(()=>
        ackOffline.setCache("foo","bar")
        .then(()=>localForage.getItem("offline-foo") )
        .then(data=>{
          var timeDiff = Date.now() - data._timestamp
          expect(timeDiff).toBeLessThan( 200 )
          expect(data.cache).toBe( "bar" )
        })
        .then( ()=>ackOffline.getCache("foo") )
        .then( cache=>expect(cache).toBeDefined() )
      ))

      it("errors if expired", promise(()=>
        localForage.setItem("offline-foo", {
          _timestamp: Date.now() - 100,
          cache: "foo"
        })
        .then(()=>ackOffline.getCache("foo", { expires: 100 }))
        .then(()=>{
          throw new Error('not supposed to succeed here')
        })
        .catch(e=>expect(e.message).toBe('No valid cache found for foo'))
      ))
    })
  })

  describe("#setCache", function() {
    /*
    let clock
    beforeEach(() => clock = sinon.useFakeTimers())
    afterEach(() => clock.restore())
    */

    it("sets data into cache", promise(()=>
      ackOffline.setCache("foo", {data:"bar8"})
      .then(data=>{
        testBasicSetCache(data)
        expect(data.cache.data).toEqual("bar8")
      })
    ))

    it("does not overwrite non-cache data", promise(()=>
      localForage.setItem("offline-foo",{
        _timestamp: 1234,
        cache: {data0:"old-bar"},
        queue: [1,2,3]
      })
      .then( ()=>ackOffline.setCache("foo", { data: "bar" }) )
      .then(data=>{
        expect(typeof data.queue).toBe('object')
        expect(data.queue.constructor).toBe(Array)
        expect(data.queue.length).toBe(3)
        expect(typeof data.cache).toBe('object')
        expect(data.cache.data0).toBe('old-bar')
        expect(data.cache.data).toBe('bar')
      })
    ))
  })

  describe("#cacheResponse", function() {
    /*
    let clock
    beforeEach(() => clock = sinon.useFakeTimers())
    afterEach(() => clock.restore())
    */

    it("sets data into cache", promise(()=>
      ackOffline.cacheResponse("foo", {data: "bar"})
      .then(data=>{
        expect(typeof data).toBe('object')
        expect(typeof data._timestamp).toBe('number')
        expect(typeof data.cache).toBe('string')
        expect(data.cache).toBe('bar')
      })
    ))

    it("does not overwrite non-cache data", promise(()=>
      localForage.setItem("offline-foo",{
        _timestamp: 1234,
        cache: "old foo",
        queue: [1,2,3]
      })
      .then(()=>ackOffline.cacheResponse("foo", { data: "bar" }))
      .then(data=>{
        expect(typeof data.queue).toBe('object')
        expect(data.queue.constructor).toBe(Array)
        expect(data.queue.length).toBe(3)
        expect(typeof data.cache).toBe('string')
        expect(data.cache).toBe('bar')
      })
    ))
  })

  describe("#getQueue", function() {
    it("retrieves queue from local storage", promise(()=>
      localForage.setItem("offline-foo",{
        queue: [{ data: "bar" }]
      })
      .then(()=>ackOffline.getQueue("foo"))
      .then(data => {
        expect(typeof data).toBe('object')
        expect(data.constructor).toBe(Array)
        expect(data.length).toBe(1)
        expect(typeof data[0]).toBe('object')
        expect(typeof data[0].data).toBe('string')
        expect(data[0].data).toBe('bar')
      })
    ))
  })

  describe("#enqueue", function() {
    it("sets data into queue", promise(()=>
      localForage.setItem("offline-foo")
      .then( ()=>ackOffline.enqueue("foo", {data:"bar"}) )
      .then( ()=>ackOffline.getCache("foo") )
      .then(data=>{       
        expect(typeof data.queue).toBe('object')
        expect(data.queue.length).toBe(1)
        expect(typeof data.queue[0].data).toBe('string')
        expect(data.queue[0].data).toBe('bar')
      })      
    ))

    it("sets array of data into queue", promise(()=>
      localForage.setItem("offline-foo",{
        queue: [{ data: "bar" }]
      })
      .then( ()=>ackOffline.enqueue("foo", [{ data: "baz" }, { data: "qux" }]) )
      .then(data=>{
        expect(data.queue.length).toBe(3)
        expect(data.queue[0].data).toBe('bar')
        expect(data.queue[1].data).toBe('baz')
        expect(data.queue[2].data).toBe('qux')
      })
    ))

    it("does not overwrite data", promise(()=>
      localForage.setItem("offline-foo",{
        _timestamp: 1234,
        cache: "old foo",
        queue: [{ data: "foo" }]
      })
      .then( ()=>ackOffline.enqueue("foo", { data: "bar" }) )
      .then(data=>{
        expect(data._timestamp).toBe(1234)
        expect(data.cache).toBe("old foo")
        expect(data.queue.length).toBe(2)
        expect(data.queue[0].data).toBe('foo')
        expect(data.queue[1].data).toBe('bar')
      })
    ))
  })

  describe("#clearQueue", function() {
    it("clears queue", promise(()=>
      localForage.setItem("offline-foo", {
        _timestamp: 1234,
        cache: "foo",
        queue: [1,2,3]
      })
      .then( ()=>ackOffline.clearQueue("foo") )
      .then( ()=>ackOffline.get("foo") )
      .then(data=>{
        expect(typeof data).toBe('object')
        expect(typeof data.queue).toBe('object')
        expect(data.queue.constructor).toBe(Array)
        expect(data.queue.length).toBe(0)
      })
    ))
  })

  describe("#registerQueueHandler", function() {
    it("registers handler", sync(()=>{
      expect(ackOffline.handlers.length).toBe(0)

      var spy = function(){}
      spy.extraName = 'registers-handler'

      ackOffline.registerQueueHandler("foo", spy)
      
      expect(ackOffline.handlers.length).toBe(1)
      expect(typeof ackOffline.handlers[0]).toBe('object')
      expect(ackOffline.handlers[0].name).toBe('foo')
      expect(ackOffline.handlers[0].handler.extraName).toBe(spy.extraName)
    }))
  })

  describe("#processQueues", function() {
    it("iterates over all handlers", promise(()=>{
      const fooSpy = function(a){
        fooSpy.callLog.push(a)
      }
      fooSpy.extraName = 'foo-spy'
      fooSpy.callLog = []

      const barSpy = function(b){
        barSpy.callLog.push(b)
      }
      barSpy.extraName = 'bar-spy'
      barSpy.callLog = []

      ackOffline.handlers = [
        { name: "foo", handler: fooSpy },
        { name: "bar", handler: barSpy }
      ]
      
      return localForage.setItem("offline-foo",{queue: [1,2]})
      .then( ()=>localForage.setItem("offline-bar",{queue: [3,4]}) )
      .then( ()=>ackOffline.processQueues() )
      .then(()=>{      
        expect(fooSpy.callLog.length).toBe(2)
        expect(fooSpy.callLog[0]).toBe(1)
        expect(fooSpy.callLog[1]).toBe(2)

        expect(barSpy.callLog.length).toBe(2)
        expect(barSpy.callLog[0]).toBe(3)
        expect(barSpy.callLog[1]).toBe(4)
      })
    }))

    it("empties queues when complete", promise(()=>{
      ackOffline.handlers = [{ name: "foo", handler: () => {} }]
      
      return localForage.setItem("offline-foo", {queue: [1,2]})
      .then(()=>ackOffline.processQueues())
      .then(()=>ackOffline.getQueue('foo'))
      .then(data=>{
        expect(data.length).toBe(0)
      })
    }))
  })
}
