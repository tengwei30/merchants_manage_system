import * as React from 'react'
import { Button, Table, Row, Col, Form, Input, Select, ConfigProvider } from 'antd'
// import zhCN from 'antd/es/locale/zh_CN'
// import moment from 'moment'
// import 'moment/locale/zh-cn'
// moment.locale('zh-cn')
import LayoutMenu from '../../../components/DashBoard'
import { withRouter, Link } from 'react-router-dom'
// import { Redirect } from 'react-router'
// import styles from '.'
// import { useStore } from 'react-redux'
import { templateList, company } from '../../../api/order'
const { Option } = Select
interface DataType {
  key: React.Key
  name: string
  deliveryDuration: string
  deliveryCompany: string
  [propName: string]: any
}
// const data: DataType[] = [
//   {
//     key: '1',
//     name: 'John Brown',
//     deliveryDuration: '24h',
//     deliveryCompany: 'qwe'
//   },
//   {
//     key: '2',
//     name: 'John Brown2',
//     deliveryDuration: '24h',
//     deliveryCompany: 'qwe'
//   }
// ]

const Express = (props: any) => {
  const [dataSource, setDataSource] = React.useState([] as DataType[])
  const [companyData, setCompanyData] = React.useState([])
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
  //添加模版
  const goTemplate = () => {
    console.log('props======', props)
    props.history.push('/order/expressTemplate')
  }
  //修改模版
  const onEdit = (data: DataType) => {
    //传参数id
    // console.log('data======', data)
    props.history.push('/order/expressTemplate/' + data.id)
  }
  const onFinish = async (values: any) => {
    console.log('values====', values)
    getTableData(values)
  }
  const getTableData = async (props: object = {}) => {
    const result: any = await templateList({ ...props })
    // console.log('result====', result)
    if (!result.data.items.length) {
      return
    }
    const data: DataType[] = result.data.items
    data.map((item) => {
      item.key = item.id.toString()
    })
    setDataSource(data)
  }
  React.useEffect(() => {
    const getCompany = async () => {
      const data: any = await company()
      setCompanyData(data.data)
    }
    getCompany()
    getTableData()
  }, [])
  return (
    <>
      <LayoutMenu>
        {/* <ConfigProvider locale={zhCN}> */}
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
                <Select style={{ width: 200 }}>
                  <Option value="24小时内">24小时内</Option>
                  <Option value="48小时内">48小时内</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item name="deliveryCompany" label="物流公司">
                <Select style={{ width: 200 }}>
                  {companyData.map((item, index) => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Col>
          </Row>
        </Form>
        {/* </ConfigProvider> */}
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

export default withRouter(Express)
