import * as React from 'react'
import { DatePicker, Table, Row, Col, Form, Input, Select, Button, ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import LayoutMenu from '../../../components/DashBoard'
import './index.css'
const columns = [
  {
    title: '评价信息',
    dataIndex: 'name'
  },
  {
    title: '操作',
    dataIndex: 'age'
  }
]
interface DataType {
  key: React.Key
  name?: String
  age?: Number
}
const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32
  },
  {
    key: '2',
    name: 'John Brown',
    age: 32
  }
]
const Comment = () => {
  const [form] = Form.useForm()
  return (
    <>
      <LayoutMenu>
        <ConfigProvider locale={zhCN}>
          <Form form={form} name="ant-advanced-search-form" className="ant-advanced-search-form">
            <Row>
              <Col span={7}>
                <Form.Item label="商品名称">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item label="评价人">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={7}>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
              </Col>
            </Row>
          </Form>
        </ConfigProvider>
        <div className="tableCon">
          <Table columns={columns} dataSource={data} bordered />
        </div>
      </LayoutMenu>
    </>
  )
}

export default Comment
