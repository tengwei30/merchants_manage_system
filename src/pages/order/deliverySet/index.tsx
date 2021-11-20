import * as React from 'react'
import { Radio, Table, Row, Col, Form, Input, Select, Button, Modal, ConfigProvider } from 'antd'
import LayoutMenu from '../../../components/DashBoard'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import './index.css'
const { Option } = Select
const columns = [
  {
    title: '发货地址',
    dataIndex: 'address'
  },
  {
    title: '联系人',
    dataIndex: 'name'
  },
  {
    title: '所在地区',
    dataIndex: 'district'
  },
  {
    title: '电话',
    dataIndex: 'phone'
  },
  {
    title: '操作',
    dataIndex: 'operate'
  }
]
interface DataType {
  key: React.Key
  name?: String
  address?: String
  district?: String
  phone?: Number
  operate?: String
}
const data: DataType[] = [
  {
    key: '1',
    name: '啊啊啊',
    address: '默认',
    district: '上海市 闵行区 莘庄镇上海市闵行区秀文路西子国际5号楼',
    phone: 18889898989,
    operate: 'New York No. 1 Lake Park'
  }
]
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  }
}
const DeliverySet = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const [form] = Form.useForm()
  return (
    <>
      <ConfigProvider locale={zhCN}>
        <LayoutMenu>
          <Row>
            <Col span={24} style={{ textAlign: 'left' }}>
              <Button type="primary" onClick={showModal}>
                新增地址
              </Button>
            </Col>
          </Row>
          <div className="tableCon">
            <Table
              rowSelection={{ type: 'radio', ...rowSelection }}
              columns={columns}
              dataSource={data}
              bordered
            />
          </div>
        </LayoutMenu>
        <Modal title="新增地址" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form form={form} name="ant-advanced-search-form" className="ant-advanced-search-form">
            <Row>
              <Col span={16}>
                <Form.Item label="*联系人：">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="*所在地区：">
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
            </Row>
            <Row>
              <Col span={18}>
                <Form.Item label="*街道地址：">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="*电话：">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="公司：">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  )
}

export default DeliverySet
