import { AuthUnionType } from '../actions/auth.actions'

export interface AuthState {
  signin: {
    loaded: boolean
    success: boolean
    message: string
  }
}

const initState = {
  signin: {
    loaded: false,
    success: false,
    message: ''
  }
}

export default function authReducer(state: AuthState = initState, action: AuthUnionType) {
  switch (action.type) {
    case 'SIGNIN':
      return {
        ...state,
        signin: {
          loaded: false,
          success: false,
          message: ''
        }
      }
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        signin: {
          loaded: true,
          success: true,
          message: ''
        }
      }
    case 'SIGNIN_FAIL':
      return {
        ...state,
        signin: {
          loaded: true,
          success: false,
          message: action.message
        }
      }
    default:
      return state
  }
}
