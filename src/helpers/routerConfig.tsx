import { UserOutlined, LaptopOutlined } from '@ant-design/icons'
import Home from '../pages/home/index'
import Publish from '../pages/good/publish/index'
import Sale from '../pages/good/sale/index'
import WareHouse from '../pages/good/warehouse/index'
import Brand from '../pages/shops/brand/index'
import Illegal from '../pages/good/illegal'
import AddGood from '../pages/good/add-good'

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
    url: '/good',
    children: [
      {
        name: '我要卖',
        url: '/good/publish',
        component: Publish
      },
      {
        name: '出售中的商品',
        url: '/good/sale',
        component: Sale
      },
      {
        name: '仓库中的商品',
        url: '/good/illegal',
        component: Illegal
      },
      {
        name: '违规商品列表',
        url: '/good/warehouse',
        component: WareHouse
      },
      {
        name: '商品发布',
        url: '/good/add-good',
        component: AddGood
      }
    ]
  },
  {
    name: '店铺管理',
    url: '/shops',
    icon: <LaptopOutlined />,
    children: [
      {
        name: '品牌授权',
        url: '/shops/brand',
        component: Brand
      }
    ]
  }
]
