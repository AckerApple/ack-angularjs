//import ack from 'ack-x/index-browser'

//import angular from 'angular'
import ackNgServices from './ack-ng-services.module'
import ackNgFilters from './ack-ng-filters.module'
import ackNgDirectives from './ack-ng-directives.module'

import ActivityMonitor from 'angular-activity-monitor'
import ngFx from './ng-fx-build'
import 'angular-animate'


export default angular.module('ack-angular', [
  ActivityMonitor,
  'ngAnimate',
  'ng-fx',
  ackNgDirectives,
  ackNgFilters,
  ackNgServices
])
.name