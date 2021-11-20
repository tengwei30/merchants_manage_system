import * as React from 'react'
import { DatePicker, Table, Row, Col, Form, Input, Select, Button, ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import LayoutMenu from '../../../components/DashBoard'
import './index.css'
const { RangePicker } = DatePicker
const { Option } = Select
const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Home phone',
    dataIndex: 'tel'
  },
  {
    title: 'Phone',
    dataIndex: 'phone'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
]
interface DataType {
  key: React.Key
  name?: String
  age?: Number
  tel?: String
  phone?: Number
  address?: String
}
const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park'
  },
  {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park'
  }
]
const Delivery = () => {
  const [form] = Form.useForm()
  return (
    <>
      <LayoutMenu>
        <ConfigProvider locale={zhCN}>
          <Form form={form} name="ant-advanced-search-form" className="ant-advanced-search-form">
            <Row>
              <Col span={9}>
                <Form.Item name="range-picker" label="下单时间">
                  <RangePicker placeholder={['开始时间', '结束时间']} />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label="买家">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item label="商品名称">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="订单编号">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item label="发货状态">
                  <Select placeholder="请选择">
                    <Option value="demo">全部</Option>
                    <Option value="demo">待发货</Option>
                    <Option value="demo">发货中</Option>
                    <Option value="demo">已收货</Option>
                  </Select>
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

export default Delivery
