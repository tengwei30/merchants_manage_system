/**
 * 商品信息
 */
export const SET_CATEGORY = 'SET_CATEGORY'

export interface SetCategoryAction {
  type: typeof SET_CATEGORY
  id: number
  value: string[]
}
export const setCategory = (id: number, value: string[]): SetCategoryAction => ({
  type: SET_CATEGORY,
  id,
  value
})
export type GoodUnionType = SetCategoryAction
