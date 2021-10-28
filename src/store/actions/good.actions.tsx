/**
 * 商品信息
 */
export const SAVE_GOOD = 'SAVE_GOOD'

export interface SaveGoodPayload {
  name: string
  price: number
}
export interface SaveGoodAction {
  type: typeof SAVE_GOOD
  payload: SaveGoodPayload
}
export const saveGood = (payload: SaveGoodPayload): SaveGoodAction => ({
  type: SAVE_GOOD,
  payload
})
export type GoodUnionType = SaveGoodAction
