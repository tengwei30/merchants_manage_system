/**
 * 登录
 */
export const SIGNIN = 'SIGNIN'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNIN_FAIL = 'SIGNIN_FAIL'

export interface SigninPayload {
  loginName: string
  password: string
}
export interface SigninAction {
  type: typeof SIGNIN
  payload: SigninPayload
}

export interface SigninSuccessAction {
  type: typeof SIGNIN_SUCCESS
}

export interface SigninFailAction {
  type: typeof SIGNIN_FAIL
  message: string
}

export const signin = (payload: SigninPayload): SigninAction => ({
  type: SIGNIN,
  payload
})

export const signinSuccess = (): SigninSuccessAction => ({
  type: SIGNIN_SUCCESS
})

export const signinFail = (message: string): SigninFailAction => ({
  type: SIGNIN_FAIL,
  message
})

export type AuthUnionType = SigninAction | SigninSuccessAction | SigninFailAction
