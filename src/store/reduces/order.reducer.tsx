import { OrderUnionType } from '../actions/order.actions'
import { ServerData } from '../models/order'
export interface OrderState {
  expressRegion: {
    targetKey: number
    serverData: ServerData[]
    renderData: string
    isVisible: boolean
  }
}

const initState = {
  expressRegion: {
    targetKey: 0,
    serverData: [] as ServerData[],
    renderData: '',
    isVisible: false
  }
}

export default function OrderReducer(state: OrderState = initState, action: OrderUnionType) {
  switch (action.type) {
    case 'SET_EXPRESS_REGION':
      return {
        ...state,
        expressRegion: {
          ...state.expressRegion,
          serverData: action.serverData as ServerData[],
          renderData: action.renderData
        }
      }
    case 'IS_EXPRESS_REGION_MODAL_SHOW':
      return {
        ...state,
        expressRegion: {
          ...state.expressRegion,
          isVisible: action.isVisible
        }
      }
    case 'SET_EXPRESS_REGION_KEY':
      return {
        ...state,
        expressRegion: {
          ...state.expressRegion,
          targetKey: action.targetKey
        }
      }
    default:
      return state
  }
}
