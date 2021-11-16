import { takeEvery, put } from 'redux-saga/effects'
import { login } from '../../api/auth'
// import axios from 'axios'
// import { API } from '../../config'
import { SIGNIN, SigninAction, signinSuccess, signinFail } from '../actions/auth.actions'

// 登录
function* hanldeSigin(action: SigninAction): any {
  try {
    // let response = yield axios.post(`${API}/signin`,  action.payload)
    let response = yield login(action.payload)
    // let response = yield action.payload
    console.log('response', response)
    if (response.code === '000000') {
      localStorage.setItem('token', JSON.stringify(response.data))
      yield put(signinSuccess())
    } else {
      yield put(signinFail(response.msg))
    }
  } catch (error) {
    console.error('---->', error)
    // yield put(signinFail(error.response.data.error))
  }
}

export default function* authSage() {
  // 登录
  yield takeEvery(SIGNIN, hanldeSigin)
}
