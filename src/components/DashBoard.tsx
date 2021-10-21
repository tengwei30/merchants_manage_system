import React,{ FC } from 'react'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import { UserOutlined, LaptopOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface Props{
  children: React.ReactNode,
}


const LayoutMenu: FC<Props> = ({ children }) => {
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
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="商品管理">
            <Menu.Item key="1">
              <Link to="/good/publish">我要卖</Link>
            </Menu.Item>
            <Menu.Item key="2"><Link to="/good/sale">出售中的商品</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/good/illegal">仓库中的商品</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/good/warehouse">违规商品列表</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="店铺管理">
            <Menu.Item key="5"><Link to="/shops/brand">品牌授权</Link></Menu.Item>
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

export default LayoutMenu