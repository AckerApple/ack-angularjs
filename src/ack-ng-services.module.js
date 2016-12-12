import 'angular'
import ack from 'ack-x/index-browser'
import AckApi from './ack-api.service'
import AckOffline from './ack-offline.service'

export default angular.module('ack-ng-services', [])
.service('ack', function(){return ack})
.service('AckOffline', AckOffline)
.service('AckApi', AckApi)
.service('urlVars',urlVars)
.name

function urlVars($window){
  const fetcher = function(){
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
        url = $window.location.href,
        params = {},
        match;

    while(match = regex.exec(url)) {
      params[match[1]] = match[2];
    }
    return params
  }

  /** case in-sensative variable search */
  fetcher.get = function(name, param){
    const a = ack( fetcher() )
    return a.get.apply(a, arguments)
  }

  return fetcher
}

urlVars.$inject = ['$window']