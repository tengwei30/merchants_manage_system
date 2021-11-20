//后端接口返回的数据结构子集
export interface SubServerItem {
  regionCode: string
  regionName: string
}
//后端接口返回的数据结构
export interface ServerData {
  regionCode: string
  regionName: string
  subMerchantExpressTemplateItemRegionDetailList: SubServerItem[]
}
