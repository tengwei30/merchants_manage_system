import * as React from 'react'
import { DatePicker, Table, Row, Col, Form, Input, Select, Button, ConfigProvider } from 'antd'
import { ColumnsType } from 'antd/es/table'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import LayoutMenu from '../../../components/DashBoard'
import './index.css'
const { RangePicker } = DatePicker
const { Option } = Select
const renderContent = (value: any, index: Number) => {
  const obj = {
    children: value,
    props: {
      colSpan: 0
    }
  }
  if (index === 4) {
    obj.props.colSpan = 0
  }
  return obj
}
const columns = [
  {
    title: '商品详情',
    dataIndex: 'name',
    render: (value: String, item: Object, index: number) => {
      const obj = {
        children: value,
        props: {
          rowSpan: 0
        }
      }
      if (index === 2) {
        obj.props.rowSpan = 2
      }
    }
  },
  {
    title: '单价',
    dataIndex: 'age'
  },
  {
    title: '数量',
    dataIndex: 'tel'
  },
  {
    title: '买家',
    dataIndex: 'phone'
  },
  {
    title: '订单总价',
    dataIndex: 'address'
  },
  {
    title: '状态与操作',
    dataIndex: 'opreate'
  }
]
interface DataType {
  key: React.Key
  name?: String
  age?: Number
  tel?: String
  phone?: Number
  address?: String
  opreate?: String
}
const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
    opreate: 'aaa'
  },
  {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park',
    opreate: 'aaa'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park',
    opreate: 'aaa'
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
    opreate: 'aaa'
  },
  {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
    opreate: 'aaa'
  }
]
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  }
}
const Order = () => {
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
                <Form.Item label="订单状态">
                  <Select placeholder="请选择">
                    <Option value="demo">全部</Option>
                    <Option value="demo">待付款</Option>
                    <Option value="demo">待发货</Option>
                    <Option value="demo">已发货</Option>
                    <Option value="demo">已完成</Option>
                    <Option value="demo">已取消</Option>
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
          <Row className="mangeBtn">
            <Col span={24}>
              <Button className="btn">导出订单</Button>
              <Button className="btn">批量生成电子面单</Button>
              <Button className="btn">批量发货</Button>
              <Button className="btn">批量打印电子面单</Button>
              <Button className="btn">批量打印发货单</Button>
            </Col>
          </Row>
        </ConfigProvider>
        <div className="tableCon">
          <Table
            rowSelection={{ type: 'checkbox', ...rowSelection }}
            // columns={columns}
            dataSource={data}
            bordered
          />
          {/* <div className="ant-table">
            <table className="table">
              <thead className="ant-table-thead">
                <tr>
                  <th>
                    <input type="checkbox" id="checkall" name="checkall" value="1" />
                    全选
                  </th>
                  <th>商品详情</th>
                  <th>单价</th>
                  <th>数量</th>
                  <th>买家</th>
                  <th>订单总价</th>
                  <th>状态与操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan="2">1111</td>
                </tr>
              </tbody>
            </table>
          </div> */}
        </div>
      </LayoutMenu>
    </>
  )
}

export default Order
