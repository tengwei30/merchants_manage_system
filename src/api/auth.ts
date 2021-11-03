import { get, post, fileUpload } from '../utils/axios'

/**
 * 用途：商户雇员登录
 * 参数：categoryId	否
 * YApi: http://yapi.yufu.cn:18094/project/9/interface/api/1304
 */
export const login = (params: {}) => {
  return post({
    url: '/merchant/staff/login',
    data: params
  })
}
