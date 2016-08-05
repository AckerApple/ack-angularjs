import {module} from "../mock-injects"
import testOfflineStorage from "./test-offline-storage"

const testApp = angular.module('test-ack-angular',['ngMockE2E']).name

describe('app', ()=>{
  beforeEach(function(){
    module(testApp)
  })

  describe('offline-storage', testOfflineStorage)
})
