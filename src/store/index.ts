import { applyMiddleware, createStore } from 'redux'
import { createHashHistory } from 'history'
import createRootReducer from './reduces'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

export const history = createHashHistory()

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export default store
