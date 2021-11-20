import { get, post, fileUpload } from '../utils/axios'

/**
 * 用途：根据分类id查询规格
 * 参数：categoryId	否
 * YApi: http://yapi.yufu.cn:18094/project/9/interface/api/1332
 */
export const listSpecByCategoryId = (params: {}) => {
  return get({
    url: '/merchant/category/list-spec-by-category-id',
    data: params
  })
}
/**
 * 用途：查询商品所有分类
 * 参数：无
 * YApi: http://yapi.yufu.cn:18094/project/9/interface/api/1325
 */
export const getAllCategory = (params: {}) => {
  return get({
    url: '/merchant/category/all',
    data: params
  })
}
