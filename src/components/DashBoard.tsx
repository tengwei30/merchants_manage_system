import React, { FC } from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'

import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom'

import { menus, getDefaultOpenKey } from '../helpers/routerMethods'

const { Header, Content, Sider } = Layout;

interface Props extends RouteComponentProps {
  children: React.ReactNode
}


const LayoutMenu: FC<Props> = ({ children }) => {
  const { location: { pathname } } = useHistory()
  const defaultOpenKey = getDefaultOpenKey(pathname)
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/home">首页</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Sider width={200} trigger={null} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={[defaultOpenKey]}
          selectedKeys={[pathname]}
          style={{ height: '100%', borderRight: 0 }}
        >
          {
            menus
          }
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: '#fff'
          }}
        >
          { children }
        </Content>
      </Layout>
    </Layout>
  )
}

export default withRouter(LayoutMenu)
