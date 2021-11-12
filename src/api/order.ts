import { get, post, fileUpload } from '../utils/axios'

/**
 * 用途：获取物流公司名字列表
 * YApi: http://yapi.yufu.cn:18094/project/9/interface/api/2242
 * tag: 商户运费模版相关api接口
 */
export const company = () => {
  return get({
    url: '/merchant/express/template/company'
  })
}
/**
 * 用途：查询同级区域
 * YApi: http://yapi.yufu.cn:18094/project/9/interface/api/1563
 * tag: 地域相关api接口
 */
export const region = (params?: {}) => {
  return get({
    url: '/goods/region/list-same-level',
    data: params
  })
}
