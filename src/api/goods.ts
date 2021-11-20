import { get, post, fileUpload } from '../utils/axios'
/**
 * 用途：查询商品所有分类
 * 参数：无
 * YApi: http://yapi.yufu.cn:18094/project/9/interface/api/1325
 */
export const getAllCategory = () => {
  return get({
    url: '/merchant/category/all'
  })
}
/**
 * 用途：根据分类id查询规格
 * 参数：categoryId	否
 * YApi: http://yapi.yufu.cn:18094/project/9/interface/api/1682
 */
export const listSpecByCategoryId = (params: {}) => {
  return get({
    url: '/merchant/category/list-spec-by-category-id',
    data: params
  })
}
/**
 * 用途：发布商品接口
 * YApi: http://yapi.yufu.cn:18094/project/9/interface/api/1738
 * 商户中心商品相关api接口
 */
export const publish = (params: {}) => {
  return post({
    url: '/merchant/goods/publish',
    data: params
  })
}
/**
 * 用途：根据业务id分页查询商品spu列表
 * YApi: http://yapi.yufu.cn:18094/project/9/interface/api/1731
 * 商户中心商品相关api接口
 */
export const pageByCondition = (params?: {}) => {
  return post({
    url: '/merchant/goods/page-by-condition',
    data: params
  })
}
/**
 * 用途：查询商品详情接口
 * YApi: http://yapi.yufu.cn:18094/project/9/interface/api/1710
 * 商户中心商品相关api接口
 */
export const detail = (params: {}) => {
  return get({
    url: '/merchant/goods/detail',
    data: params
  })
}
/**
 * 用途：商品品牌列表接口
 * YApi: http://yapi.yufu.cn:18094/project/9/interface/api/1465
 * 商品品牌相关api接口
 */
export const brandList = () => {
  return post({
    url: '/goods/brand/list'
  })
}
/**
 * 用途：商品支付方式列表
 * YApi: http://yapi.yufu.cn:18094/project/9/interface/api/1465
 * 商品spu相关api接口
 */
export const payTypes = () => {
  return get({
    url: '/goods/spu/list-pay-types'
  })
}
