import { GoodsUnionType } from '../actions/goods.actions'
import { SkuList } from '../models/goods'
export interface GoodsState {
  category: {
    id: number
    value: string[]
  }
  skuList: SkuList[]
}

const initState = {
  category: {
    id: NaN,
    value: []
  },
  skuList: []
}

export default function GoodsReducer(state: GoodsState = initState, action: GoodsUnionType) {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {
        ...state,
        category: {
          id: action.id,
          value: action.value
        }
      }
    case 'SET_SKU_LIST':
      return {
        ...state,
        skuList: action.value
      }
    default:
      return state
  }
}
