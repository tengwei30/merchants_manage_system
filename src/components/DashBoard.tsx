import React,{ FC } from 'react'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import { UserOutlined, LaptopOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface Props extends RouteComponentProps{
  children: React.ReactNode,
}

// const slideBarConfig = [
//   {
//     name: '商品管理',
//     icon: <UserOutlined/>,
//     url: '/good',
//     children: [
//       {
//         name: '我要卖',
//         url: '/good/publish'
//       },
//       {
//         name: '出售中的商品',
//         url: '/good/sale'
//       },
//       {
//         name: '仓库中的商品',
//         url: '/good/illegal'
//       },
//       {
//         name: '违规商品列表',
//         url: '/good/warehouse'
//       },
//     ]
//   },
//   {
//     name: '店铺管理',
//     url: '/shops',
//     icon: <LaptopOutlined/>,
//     children: [
//       {
//         name: '品牌授权',
//         url: '/shops/brand'
//       }
//     ]
//   }
// ]

// const getMenu = () => {
//   return slideBarConfig.map(item => {
//     if (item.children && item.children.length > 0) {
//       return (
//         <SubMenu key={item.url} icon={() => item.icon || ''} title={item.name}>
          
//         </SubMenu>
//       )
//     } else {

//     }
//   })
// }


const LayoutMenu: FC<Props> = ({ children }) => {
  const { location: { pathname } } = useHistory()
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/home">
              首页
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
    <Layout>
      <Sider width={200} trigger={null} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          selectedKeys={[pathname]}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="商品管理">
            <Menu.Item key="/good/publish">
              <Link to="/good/publish">我要卖</Link>
            </Menu.Item>
            <Menu.Item key="/good/sale"><Link to="/good/sale">出售中的商品</Link></Menu.Item>
            <Menu.Item key="/good/illegal"><Link to="/good/illegal">仓库中的商品</Link></Menu.Item>
            <Menu.Item key="/good/warehouse"><Link to="/good/warehouse">违规商品列表</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="店铺管理">
            <Menu.Item key="/shops/brand"><Link to="/shops/brand">品牌授权</Link></Menu.Item>
          </SubMenu>
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
  </Layout>
  )
}

export default withRouter(LayoutMenu)