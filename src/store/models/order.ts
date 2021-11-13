//后端接口返回的数据结构子集
export interface SubServerItem {
  ifSlected: boolean
  regionCode: string
  regionName: string
}
//后端接口返回的数据结构
export interface ServerData {
  ifSlected: boolean
  regionCode: string
  regionName: string
  subMerchantExpressTemplateItemRegionDetailList: SubServerItem[]
}
