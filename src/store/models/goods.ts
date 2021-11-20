export interface Goods {
  id: string
  goodsName: string
  brand: string
}
export interface SkuImgsList {
  id?: number
  ifViedo: number
  url: string
}
export interface SkuSpecValueList {
  name: string
  specColleId: number
  specId: number
  type: number
  value: number
}
export interface SkuList {
  id?: number
  alertStock: number
  costPrice: number
  marketPrice: number
  merchantGoodsImgsReqList: SkuImgsList[]
  merchantGoodsSkuSpecValueReqList: SkuSpecValueList[]
  salePrice: number
  stock: number
  [propName: string]: any
}
export interface SubListSpec {
  id?: number
  specColleId: number
  specId: number
  value: string
}
export interface ListSpec {
  creater: string | null
  id: number
  name: string
  sort: number
  specColleId: number
  type: number
  updator: string | null
  value: SubListSpec[]
  [propName: string]: any
}
export interface ListSpecServer {
  specColleId: number
  specId: number
  value: string
  type: number
  name: string
}
