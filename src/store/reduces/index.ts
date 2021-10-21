
import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

export interface AppState {
  router: RouterState,
}

const createRootReducer = (history:History) => combineReducers({
  router: connectRouter(history),
})

export default createRootReducer