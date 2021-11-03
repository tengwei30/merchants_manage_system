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
    title: '商品/订单号/退货号',
    dataIndex: 'orderNo'
  },
  {
    title: '退款金额',
    dataIndex: 'money'
  },
  {
    title: '退货数量',
    dataIndex: 'number'
  },
  {
    title: '买家会员名',
    dataIndex: 'name'
  },
  {
    title: '申请时间',
    dataIndex: 'time'
  },
  {
    title: '处理状态',
    dataIndex: 'status'
  },
  {
    title: '平台确认',
    dataIndex: 'confirm'
  },
  {
    title: '操作',
    dataIndex: 'opreate'
  }
]
interface DataType {
  key: React.Key
  orderNo?: String
  money?: Number
  number?: Number
  name?: String
  time?: String
  status?: String
  confirm?: String
  opreate?: String
}
const data: DataType[] = [
  {
    key: '1',
    orderNo: '1',
    money: 1,
    number: 1,
    name: '1',
    time: '1',
    status: '1',
    confirm: '1',
    opreate: '1'
  },
  {
    key: '1',
    orderNo: '1',
    money: 1,
    number: 1,
    name: '1',
    time: '1',
    status: '1',
    confirm: '1',
    opreate: '1'
  },
  {
    key: '1',
    orderNo: '1',
    money: 1,
    number: 1,
    name: '1',
    time: '1',
    status: '1',
    confirm: '1',
    opreate: '1'
  }
]
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  }
}
const Exchange = () => {
  const [form] = Form.useForm()
  return (
    <>
      <LayoutMenu>
        <ConfigProvider locale={zhCN}>
          <Form form={form} name="ant-advanced-search-form" className="ant-advanced-search-form">
            <Row>
              <Col span={8}>
                <Form.Item name="range-picker" label="申请时间">
                  <RangePicker placeholder={['开始时间', '结束时间']} />
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item label="处理状态">
                  <Select placeholder="请选择">
                    <Option value="demo">全部</Option>
                    <Option value="demo">待审核</Option>
                    <Option value="demo">同意</Option>
                    <Option value="demo">不同意</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={6}>
                <Form.Item label="">
                  <Select defaultValue="订单编号">
                    <Option value="订单编号">订单编号</Option>
                    <Option value="demo">退款编号</Option>
                    <Option value="demo">买家会员名</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="退货">
                  <Select>
                    <Option value="demo">售前退货</Option>
                    <Option value="demo">售后退货</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item>
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
          <Table
            rowSelection={{ type: 'checkbox', ...rowSelection }}
            columns={columns}
            dataSource={data}
            bordered
          />
        </div>
      </LayoutMenu>
    </>
  )
}

export default Exchange
