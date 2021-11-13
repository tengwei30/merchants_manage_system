import { OrderUnionType } from '../actions/order.actions'
import { ServerData } from '../models/order'
export interface OrderState {
  expressRegion: {
    id?: number
    serverData: ServerData[]
    renderData: string
    isVisible: boolean
  }
}

const initState = {
  expressRegion: {
    id: NaN,
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
          id: action.id || NaN,
          serverData: action.serverData as ServerData[],
          renderData: action.renderData,
          isVisible: action.isVisible
        }
      }
    default:
      return state
  }
}
