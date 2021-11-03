import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import authReducer, { AuthState } from './auth.reducer'
import goodReducer, { GoodState } from './good.reducer'

export interface AppState {
  router: RouterState
  auth: AuthState
  good: GoodState
}

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    good: goodReducer
  })

export default createRootReducer
