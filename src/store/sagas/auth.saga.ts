import { takeEvery,put } from 'redux-saga/effects'
// import axios from 'axios'
// import { API } from '../../config'
import { SIGNIN, SigninAction, signinSuccess} from "../actions/auth.actions";

// 登录
function* hanldeSigin(action: SigninAction): any {
  try {
    // let response = yield axios.post(`${API}/signin`,  action.payload)
    let response = yield action.payload
    console.log('response', response)
    
    localStorage.setItem('token', JSON.stringify(response))
    yield put(signinSuccess())
  } catch (error) {
    console.error('---->', error)
    // yield put(signinFail(error.response.data.error))
  }
}


export default function* authSage () {
  
  // 登录
  yield takeEvery(SIGNIN, hanldeSigin)
}

