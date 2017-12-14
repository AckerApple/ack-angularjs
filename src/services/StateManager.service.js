import injector from "../injector"
import StateManagerService from "./StateManager.class"

const deps = ['$state','$window']

export default StateManagerService
const inject = injector(StateManagerService, deps)