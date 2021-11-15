/**
 * 订单相关信息
 * 运费模版--地区数据 expressRegion --SET_EXPRESS_REGION
 */
import { ServerData } from '../models/order'
export const SET_EXPRESS_REGION = 'SET_EXPRESS_REGION'
export const IS_EXPRESS_REGION_MODAL_SHOW = 'IS_EXPRESS_REGION_MODAL_SHOW'
export const SET_EXPRESS_REGION_KEY = 'SET_EXPRESS_REGION_KEY'

export interface SetExpressRegionAction {
  type: typeof SET_EXPRESS_REGION
  serverData: ServerData[]
  renderData: string
}
export interface IsExpressRegionModalShow {
  type: typeof IS_EXPRESS_REGION_MODAL_SHOW
  isVisible: boolean
}
export interface SetExpressRegionKey {
  type: typeof SET_EXPRESS_REGION_KEY
  targetKey: number
}
export const setExpressRegion = (
  serverData: ServerData[],
  renderData: string
): SetExpressRegionAction => ({
  type: SET_EXPRESS_REGION,
  serverData,
  renderData
})
export const isExpressRegionModalShow = (isVisible: boolean): IsExpressRegionModalShow => ({
  type: IS_EXPRESS_REGION_MODAL_SHOW,
  isVisible
})
export const setExpressRegionKey = (targetKey: number): SetExpressRegionKey => ({
  type: SET_EXPRESS_REGION_KEY,
  targetKey
})
export type OrderUnionType = SetExpressRegionAction | IsExpressRegionModalShow | SetExpressRegionKey
