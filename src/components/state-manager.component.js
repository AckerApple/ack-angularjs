import injector from "../injector"

const deps = ['StateManagerService','$state','$rootScope']

class StateManager{
  constructor(){
    inject(arguments, this)
    this.as = this.StateManagerService
  }

  $onInit(){
    this.$rootScope.$on('$stateChangeSuccess', (event, toState)=>{
      setTimeout(()=>{
        this.onStateChange({state:toState, toState:toState, current:this.StateManagerService.$state.current})
      },1)//allow model digest to occur
    })
  }

  goBackTo(name, params){
    this.StateManagerService.goBackTo(name, params)
  }

  tryBack(name, params){
    this.StateManagerService.tryBack(name, params)
  }
}
const inject = injector(StateManager, deps)

export default {
  bindings:{as:'=?', onStateChange:'&'}
  ,controller:StateManager
}