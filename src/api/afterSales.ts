import { get, post } from '../utils/axios'

export const getDetail = () => {
  return get({
    url: '/merchant/address/detail'
  })
}
export const handleSave = (params: {}) => {
  return post({
    url: '/merchant/address/save',
    data: params
  })
}
export const getListSameLLevel = (params: {}) => {
  return get({
    url: '/goods/region/list-same-level',
    data: params
  })
}
