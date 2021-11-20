/**
 * 商品信息
 */
import { SkuList } from '../models/goods'
export const SET_CATEGORY = 'SET_CATEGORY'
export const SET_SKU_LIST = 'SET_SKU_LIST'

export interface SetCategoryAction {
  type: typeof SET_CATEGORY
  id: number
  value: string[]
}
export interface SetSkuListAction {
  type: typeof SET_SKU_LIST
  value: SkuList[]
}
export const setCategory = (id: number, value: string[]): SetCategoryAction => ({
  type: SET_CATEGORY,
  id,
  value
})
export const setSkuList = (value: SkuList[]): SetSkuListAction => ({
  type: SET_SKU_LIST,
  value
})
export type GoodsUnionType = SetCategoryAction | SetSkuListAction
