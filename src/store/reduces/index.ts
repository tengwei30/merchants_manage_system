import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import authReducer, { AuthState } from './auth.reducer'
import goodReducer, { GoodState } from './good.reducer'
import orderReducer, { OrderState } from './order.reducer'

export interface AppState {
  router: RouterState
  auth: AuthState
  good: GoodState
  order: OrderState
}

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    good: goodReducer,
    order: orderReducer
  })

export default createRootReducer
