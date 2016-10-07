import injector from "../injector"

const deps = ['StateManagerService','$state','$rootScope','$document', '$scope', '$timeout']

export class StateDocWatcher{
  constructor(){
    inject(arguments, this)
    this.as = this.StateManagerService

    const isBackButton = ()=>{this.isMouseOut=true;this.StateManagerService.isOsAction=true}
    const isNotBackButton = ()=>{this.StateManagerService.isOsAction=false}
    const mouseover = ()=>{
      this.isMouseOut=false
    }

    this.$rootScope.$on('$stateChangeStart', ()=>this.StateManagerService.stateChange())

    this.$rootScope.$on('$stateChangeSuccess', (event, toState, toParams)=>{
      this.$timeout(()=>{
        if(!this.isMouseOut){
          this.StateManagerService.isNextBackMode = false
          this.StateManagerService.isOsAction=true
        }

        this.onStateChange({
          state:toState,
          toState:toState,
          params:toParams,
          current:this.StateManagerService.$state.current
        })
      },1)//allow a digest to occur to ng-model population
    })

    this.$document[0].addEventListener('mouseout',isBackButton)
    this.$document[0].addEventListener('mouseover',mouseover)
    this.$document[0].addEventListener('mousedown',isNotBackButton)

    this.$scope.$on('$destroy',()=>{
      this.$document[0].removeEventListener('mouseout',isBackButton)
      this.$document[0].removeEventListener('mouseover',isNotBackButton)
      this.$document[0].removeEventListener('mousedown',isNotBackButton)
    })

  }

  goBackTo(name, params){
    this.StateManagerService.goBackTo(name, params)
  }

  tryBack(name, params){
    this.StateManagerService.tryBack(name, params)
  }
}
const inject = injector(StateDocWatcher, deps)

export default {
  bindings:{as:'=?', onStateChange:'&'}
  ,controller:StateDocWatcher
}