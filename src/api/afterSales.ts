import { get, post } from '../utils/axios'

export const getDetail = () => {
  return get({
    url: '/merchant/address/detail'
  })
}
