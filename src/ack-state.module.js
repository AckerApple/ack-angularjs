//import "angular"
import ngUiRouter from "angular-ui-router"

import StateManagerService from "./services/StateManager.service"
import stateManagerCom from "./components/state-manager.component"
import stateDocWatcher from "./components/state-doc-watcher.component"

export default angular.module('ack-state',[ngUiRouter])
.service('StateManagerService', StateManagerService)
.component('stateManager', stateManagerCom)
.component('stateDocWatcher', stateDocWatcher)
.name