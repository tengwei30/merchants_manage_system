import axios from 'axios'
import { Redirect } from 'react-router'
interface codeType {
  [key: string]: unknown
}
/**
 * 统一错误码
 * @type {*} */
const codeMessage: codeType = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

axios.defaults.timeout = 5000 // 设置请求超时时间
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status < 300
}
// const request = axios.create({
//   // 配置选项
//   // baseURL,
//   // timeout
// });
// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    const configTemp = Object.create(config)
    let token: string | null = window.localStorage.getItem('token')
    Object.assign(configTemp.headers, {
      sessionId: token ? JSON.parse(token).sessionId : '',
      'X-Client': JSON.stringify({
        channelId: 1,
        deviceId: 'x',
        fixVersion: 1,
        mainVersion: 1,
        os: 'x',
        platformId: 1,
        pm: 'x',
        screenSize: 'x',
        sessionId: '',
        signVersion: 1,
        subVersion: 1,
        systemVersion: 'x'
      })
    })
    configTemp.headers.common.eventTime = Date.now()
    // Do something before request is sent
    return configTemp
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
axios.interceptors.response.use(
  (response: any) => {
    // 状态码为 2XX的都会走这
    if (response.data.code === '000004') {
      window.location.href = ''
      localStorage.removeItem('token')
    }
    return response.data
  },
  async (error) => {
    // 状态码 非 2XX的走这
    // console.dir("error --->",error)
    const { response } = error

    if (response && response.status) {
      const errorText = codeMessage[response.status] || response.statusText

      console.error('----->', response, errorText)
    } else if (!response) {
      console.error('错误——您的网络发生异常，无法连接服务器')
    }
    return Promise.reject(error)
  }
)
/*网络请求部分*/

/*
 *  get请求
 *  url:请求地址
 *  params:参数
 * */
export function get({ url = '', data = {} }) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'get',
      params: data
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/*
 *  post请求
 *  url:请求地址
 *  params:参数
 * */
export function post({ url = '', data = {}, headers = {} }) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'post',
      data: data,
      headers
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/*
 *  文件上传
 *  url:请求地址
 *  params:参数
 * */
export function fileUpload({ url = '', data = {} }) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'post',
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  get,
  post,
  fileUpload
}
