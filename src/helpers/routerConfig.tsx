import { UserOutlined, LaptopOutlined, TagsOutlined, ToolOutlined } from '@ant-design/icons'
import Home from '../pages/home/index'
import Sale from '../pages/goods/sale/index'
import WareHouse from '../pages/goods/warehouse/index'
import Brand from '../pages/shops/brand/index'
import Illegal from '../pages/goods/illegal'
import Order from '../pages/order/list/index'
import Delivery from '../pages/order/delivery/index'
import DeliverySet from '../pages/order/deliverySet/index'
import Comment from '../pages/order/comment/index'
import Refund from '../pages/afterSales/refund/index'
import Exchange from '../pages/afterSales/exchange/index'
import Publish from '../pages/goods/publish'
import Express from '../pages/order/express/index'
import ExpressTemplate from '../pages/order/expressTemplate/index'

export interface SlideItem {
  name: string
  icon?: React.ReactElement
  url: string
  children?: SlideItem[]
  parent?: SlideItem | null
  component?: React.ComponentType<any>
  noSideItem?: boolean // 是否显示在菜单栏
}

// 总的路由配置
export const slideBarConfig: SlideItem[] = [
  {
    name: 'home',
    url: '/home',
    noSideItem: true,
    component: Home
  },
  {
    name: '商品管理',
    icon: <UserOutlined />,
    url: '/goods',
    children: [
      {
        name: '商品发布',
        url: '/goods/publish',
        component: Publish
      },
      {
        name: '出售中的商品',
        url: '/goods/sale',
        component: Sale
      }
      // ,
      // {
      //   name: '违规商品列表',
      //   url: '/goods/illegal',
      //   component: Illegal
      // },
      // {
      //   name: '仓库中的商品',
      //   url: '/goods/warehouse',
      //   component: WareHouse
      // }
    ]
  },
  {
    name: '店铺管理',
    url: '/shops',
    icon: <LaptopOutlined />,
    children: [
      {
        name: '店铺信息',
        url: '/shops/brand',
        component: Brand
      }
    ]
  },
  {
    name: '订单管理',
    url: '/order',
    icon: <TagsOutlined />,
    children: [
      {
        name: '订单管理',
        url: '/order/list',
        component: Order
      },
      {
        name: '发货',
        url: '/order/delivery',
        component: Delivery
      },
      {
        name: '发货设置',
        url: '/order/deliverySet',
        component: DeliverySet
      },
      // {
      //   name: '评价管理',
      //   url: '/order/comment',
      //   component: Comment
      // },
      {
        name: '运费模版',
        url: '/order/express',
        component: Express
      }
      // ,
      // {
      //   name: '添加运费模版',
      //   url: '/order/expressTemplate/:id?',
      //   noSideItem: true,
      //   component: ExpressTemplate
      // }
    ]
  }
  // ,
  // {
  //   name: '售后服务',
  //   url: '/afterSales',
  //   icon: <ToolOutlined />,
  //   children: [
  //     {
  //       name: '退款记录',
  //       url: '/afterSales/refund',
  //       component: Refund
  //     },
  //     {
  //       name: '退货记录',
  //       url: '/afterSales/exchange',
  //       component: Exchange
  //     }
  //   ]
  // }
]
