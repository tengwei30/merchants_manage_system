/**
 * 订单相关信息
 * 运费模版--地区数据 expressRegion --SET_EXPRESS_REGION
 */
import { ServerData } from '../models/order'
export const SET_EXPRESS_REGION = 'SET_EXPRESS_REGION'

export interface SetExpressRegionAction {
  type: typeof SET_EXPRESS_REGION
  serverData: ServerData[]
  renderData: string
  isVisible: boolean
  id?: number
}
export const setExpressRegion = (
  serverData: ServerData[],
  renderData: string,
  isVisible: boolean,
  id?: number
): SetExpressRegionAction => ({
  type: SET_EXPRESS_REGION,
  id: id || NaN,
  serverData,
  renderData,
  isVisible
})
export type OrderUnionType = SetExpressRegionAction
