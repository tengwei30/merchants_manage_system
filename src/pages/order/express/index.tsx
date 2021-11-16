import * as React from 'react'
import { Button, Table, Row, Col, Form, Input, Select, ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import LayoutMenu from '../../../components/DashBoard'
import { Redirect } from 'react-router'
import styles from '.'
import { useStore } from 'react-redux'
import { templateList } from '../../../api/order'

interface DataType {
  key: React.Key
  name: string
  deliveryDuration: string
  deliveryCompany: string
  [propName: string]: any
}
const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    deliveryDuration: '24h',
    deliveryCompany: 'qwe'
  },
  {
    key: '2',
    name: 'John Brown2',
    deliveryDuration: '24h',
    deliveryCompany: 'qwe'
  }
]

const Express = (props: any) => {
  const [dataSource, setDataSource] = React.useState([] as DataType[])
  const [form] = Form.useForm()
  const columns = [
    {
      title: '模版名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '发货时间',
      dataIndex: 'deliveryDuration',
      key: 'deliveryDuration'
    },
    {
      title: '物流公司',
      dataIndex: 'deliveryCompany',
      key: 'deliveryCompany'
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => {
        // console.log('record========')
        // console.log(record)
        return dataSource.length >= 1 ? (
          <Button
            type="primary"
            onClick={() => {
              onEdit(record)
            }}
          >
            修改
          </Button>
        ) : null
      }
    }
  ]
  const goTemplate = () => {
    console.log('props======', props)
    // return <Redirect to="/order/expressTemplate/1017" />
  }
  const onEdit = (data: DataType) => {
    //传参数id
    // console.log('props======', props)
    // props.history.push('/register')
    // return <Redirect to="/order/expressTemplate" />
  }
  const onFinish = async (values: any) => {
    console.log('values====', values)
    getTableData(values)
  }
  const getTableData = async (props: object = {}) => {
    const result: any = await templateList({ ...props })
    console.log('result====', result)
    const data: DataType[] = result.data.items
    data.map((item) => {
      item.key = item.id.toString()
    })
    setDataSource(data)
  }
  React.useEffect(() => {
    getTableData()
  }, [])
  const id = '1007'
  return (
    <>
      <LayoutMenu>
        <ConfigProvider locale={zhCN}>
          <Form
            form={form}
            name="ant-advanced-search-form"
            onFinish={onFinish}
            className="ant-advanced-search-form"
          >
            <Row>
              <Col span={7}>
                <Form.Item name="name" label="模版名称">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item name="deliveryDuration" label="发货时间">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item name="deliveryCompany" label="物流公司">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
              </Col>
            </Row>
          </Form>
        </ConfigProvider>
        <div className="">
          <div>
            <Button type="primary" onClick={goTemplate}>
              添加运费模版
            </Button>
            {/* <Redirect to="/order/expressTemplate" /> */}
          </div>
          <Table columns={columns} dataSource={dataSource} bordered />
        </div>
      </LayoutMenu>
    </>
  )
}

export default Express
