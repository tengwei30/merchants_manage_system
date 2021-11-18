import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import authReducer, { AuthState } from './auth.reducer'
import goodsReducer, { GoodsState } from './goods.reducer'
import orderReducer, { OrderState } from './order.reducer'

export interface AppState {
  router: RouterState
  auth: AuthState
  goods: GoodsState
  order: OrderState
}

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    goods: goodsReducer,
    order: orderReducer
  })

export default createRootReducer
