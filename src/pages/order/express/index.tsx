import { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { Form, Select, Row, Col, Input, Button, Cascader, Table } from 'antd'
import { FormInstance } from 'antd/lib/form'
import LayoutMenu from '../../../components/DashBoard'
import styles from '../express/index.module.css'
const { Option } = Select
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}
const Express = () => {
  const [form] = Form.useForm()
  //表单提交方法
  const onFinish = (values: any) => {
    console.log(values)
  }
  //配置默认提示语
  const validateMessages = {
    required: "'${label}' 是必填项"
    // ...
  }
  //表单提交失败方法
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const onCompanyChange = () => {
    //
  }
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
      render: (fields: any) => {
        return (
          <>
            {/* {fields.map((item: any) => {
              return <img key={item.url} src={item.url} alt="" width="100px" />
            })} */}
            <input />
          </>
        )
      }
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }
  ]

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address'
    }
  ]
  return (
    <LayoutMenu>
      <Form
        {...layout}
        form={form}
        name="basicForm"
        // initialValues={}
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        <div className={styles.basic}>
          <h2>基本信息</h2>
          <div className={styles.content}>
            <Form.Item label="模版名称">
              <input />
            </Form.Item>
            <Form.Item label="物流公司名称">
              <Select onChange={onCompanyChange} style={{ width: 200 }}>
                <Option value="1">欧莱雅</Option>
                <Option value="2">雅诗兰黛</Option>
                <Option value="3">兰蔻</Option>
              </Select>
            </Form.Item>
            <Form.Item label="发货时间">
              <Select style={{ width: 200 }}>
                <Option value="24h">24小时</Option>
                <Option value="48h">48小时</Option>
              </Select>
            </Form.Item>
          </div>
          <h2>运送方式</h2>
          <div className={styles.content}>
            <Form.Item label="默认运费">
              <Row>
                <Col span={5}>
                  <Form.Item name="" style={{ display: 'inline-block' }}>
                    <input />
                  </Form.Item>
                  <span style={{ lineHeight: '30px' }}>件内</span>
                </Col>
                <Col span={6}>
                  <Form.Item name="" style={{ display: 'inline-block' }}>
                    <input />
                  </Form.Item>
                  <span style={{ lineHeight: '30px' }}>元，每增加</span>
                </Col>
                <Col span={7}>
                  <Form.Item name="" style={{ display: 'inline-block' }}>
                    <input />
                  </Form.Item>
                  <span style={{ lineHeight: '30px' }}>件，增加运费</span>
                </Col>
                <Col span={6}>
                  <Form.Item name="" style={{ display: 'inline-block' }}>
                    <input />
                  </Form.Item>
                  <span style={{ lineHeight: '30px' }}>元</span>
                </Col>
              </Row>
            </Form.Item>
          </div>
          <h2>指定城市, 区域运费</h2>
          <div className={styles.content}>
            {
              //
            }
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </div>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </LayoutMenu>
  )
}
export default Express
