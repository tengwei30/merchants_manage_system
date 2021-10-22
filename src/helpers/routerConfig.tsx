import { Menu } from 'antd';
import { Link } from 'react-router-dom'
import { UserOutlined, LaptopOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

export interface SlideItem{
  name: string
  icon?: React.ReactElement,
  url: string,
  children?: SlideItem[],
  parent?: SlideItem | null
}

export const slideBarConfig: SlideItem[] = [
  {
    name: '商品管理',
    icon: <UserOutlined/>,
    url: '/good',
    children: [
      {
        name: '我要卖',
        url: '/good/publish'
      },
      {
        name: '出售中的商品',
        url: '/good/sale'
      },
      {
        name: '仓库中的商品',
        url: '/good/illegal'
      },
      {
        name: '违规商品列表',
        url: '/good/warehouse'
      },
    ]
  },
  {
    name: '店铺管理',
    url: '/shops',
    icon: <LaptopOutlined/>,
    children: [
      {
        name: '品牌授权',
        url: '/shops/brand'
      }
    ]
  }
]

/**
 * 获取左侧菜单栏
 * @param slideBarConfig 
 * @returns 
 */
export const getMenu = (slideBarConfig: SlideItem[]) => {
  return slideBarConfig.map(item => {
    if (item.children && item.children.length > 0) {
      return (
        <SubMenu key={item.url} icon={item.icon} title={item.name}>
          {
            item.children.map(inner => {
              return (
                (inner.children && inner.children.length > 0) ? getMenu(inner.children) :
                <Menu.Item key={inner.url}><Link to={inner.url}>{inner.name}</Link></Menu.Item>
              )
            })
          }
        </SubMenu>
      )
    } else {
      return (<Menu.Item key={item.url}><Link to={item.url}>{item.name}</Link></Menu.Item>)
    }
  })
}


const getFlatRoute = () => {
  let result:any = []
  const tempFun = (slideBarConfig: SlideItem[], parent: SlideItem | null) => {
    slideBarConfig.map(item => {
      result.push({ ...item, parent })
      if(item.children && item.children.length > 0){
        tempFun(item.children, item)
      }
    })
  }
  tempFun(slideBarConfig, null)
  return result
}

/**
 * 获取导航菜单栏的选中状态
 * @param url 当前页面的url
 * @returns 
 */
export const getDefaultOpenKey = (url: string): string => {
  const flatRoutes = getFlatRoute()
  const openKeys = flatRoutes.filter((item: any) => {
    return item.url === url
  })
  return openKeys.length > 0 ? openKeys[0].parent.url : ''
}