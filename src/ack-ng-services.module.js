import ack from 'ack-x/dist/ack-x-min'
import AckApi from './ack-api.service'
import AckOffline from './ack-offline.service'

export default angular.module('ack-ng-services', [])
.service('ack', function(){return ack})
.service('AckOffline', AckOffline)
.service('AckApi', AckApi)
.controller('AckApiControl', AckApi)
.name