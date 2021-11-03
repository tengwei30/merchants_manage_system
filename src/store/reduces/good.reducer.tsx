import { GoodUnionType } from '../actions/good.actions'

export interface GoodState {
  category: {
    id: number
    value: string
  }
}

const initState = {
  category: {
    id: NaN,
    value: ''
  }
}

export default function GoodReducer(state: GoodState = initState, action: GoodUnionType) {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {
        ...state,
        category: {
          id: action.id,
          value: action.value
        }
      }
    default:
      return state
  }
}
