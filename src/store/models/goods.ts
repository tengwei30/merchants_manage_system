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
