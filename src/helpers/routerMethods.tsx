import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { SlideItem, slideBarConfig } from './routerConfig'

const { SubMenu } = Menu

/**
 * 获取左侧菜单栏
 * @param slideBarConfig
 * @returns
 */
export const getMenu = (slideBarConfig: SlideItem[]) => {
  return slideBarConfig.map((item) => {
    console.log(item.name, item.noSideItem)
    if (item.noSideItem) {
      return ''
    }
    if (item.children && item.children.length > 0) {
      return (
        <SubMenu key={item.url} icon={item.icon} title={item.name}>
          {item.children.map((inner) => {
            return inner.children && inner.children.length > 0 ? (
              getMenu(inner.children)
            ) : (
              <Menu.Item key={inner.url}>
                <Link to={inner.url}>
                  {inner.name} {inner.noSideItem}
                </Link>
              </Menu.Item>
            )
          })}
        </SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.url}>
          <Link to={item.url}>{item.name}</Link>
        </Menu.Item>
      )
    }
  })
}

/**
 * 将菜单配置扁平化
 * @returns
 */
const getFlatMenu = (): SlideItem[] => {
  let result: SlideItem[] = []
  const tempFun = (slideBarConfig: SlideItem[], parent: SlideItem | null) => {
    slideBarConfig.map((item) => {
      result.push({ ...item, parent })
      if (item.children && item.children.length > 0) {
        tempFun(item.children, item)
      }
    })
  }
  tempFun(slideBarConfig, null)
  return result
}

export const getRoutes = (): SlideItem[] => {
  const flatMenu = getFlatMenu()
  return flatMenu.filter((item) => {
    return !!item.component
  })
}

/**
 * 获取导航菜单栏的选中状态
 * @param url 当前页面的url
 * @returns
 */
export const getDefaultOpenKey = (url: string): string => {
  const flatMenu = getFlatMenu()
  const openKeys = flatMenu.filter((item) => {
    return item.url === url
  })
  return openKeys.length > 0 ? openKeys[0].parent?.url || '' : ''
}

// 左侧菜单栏显示
export const menus = getMenu(slideBarConfig)
