import * as React from 'react'
import { Radio, Table, Row, Col, Form, Input, Select, Button, Modal, ConfigProvider } from 'antd'
import LayoutMenu from '../../../components/DashBoard'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import { getDetail } from '../../../api/afterSales'
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
    dataIndex: 'operate',
    render: (text: string) => <a>{text}</a>
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
const DeliverySet = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [dataArr, setDataArr] = React.useState([])
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    // setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const fetchData = () => {
    getDetail().then((res: any) => {
      const obj: any = res.data.data
      const data: any = [
        {
          key: obj.id,
          name: obj.contacts,
          address: '默认',
          district: '111111' + obj.merchantAddressDetailInfo.detail,
          phone: 18889898989,
          operate: '编辑'
        }
      ]
      setDataArr(data)
    })
  }
  React.useEffect(() => {
    fetchData()
  }, [])

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
            <Table columns={columns} dataSource={dataArr} bordered />
          </div>
        </LayoutMenu>
        <Modal title="新增地址" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form form={form} name="ant-advanced-search-form" className="ant-advanced-search-form">
            <Row>
              <Col span={16}>
                <Form.Item
                  name="name"
                  label="联系人："
                  rules={[{ required: true, message: '请输入联系人' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  name="district"
                  label="所在地区："
                  rules={[{ required: true, message: '请输入联系人' }]}
                >
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
                <Form.Item
                  name="street"
                  label="街道地址："
                  rules={[{ required: true, message: '请输入联系人' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  name="phone"
                  label="电话："
                  rules={[{ required: true, message: '请输入手机号码' }]}
                >
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
