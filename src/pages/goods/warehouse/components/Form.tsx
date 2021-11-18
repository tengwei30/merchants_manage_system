import { useState } from 'react'
import { Form, Row, Col, Input, Button, Cascader } from 'antd'
// import { callbackify } from 'util'

const SearchForm = () => {
  const [form] = Form.useForm()
  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake'
            }
          ]
        }
      ]
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men'
            }
          ]
        }
      ]
    }
  ]
  const onFinish = (values: any) => {
    console.log(values)
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const onChange = (values: any) => {
    console.log(values)
  }
  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item name="商品名称" label="商品名称">
            <Input placeholder="请输入商品名称" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="商品类目" label="商品类目">
            <Cascader options={options} onChange={onChange} placeholder="请选择" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="价格" style={{ marginBottom: 0 }}>
            <Form.Item name="price" style={{ display: 'inline-block', width: 'calc(40%-8px)' }}>
              <Input placeholder="" />
            </Form.Item>
            <Form.Item
              style={{ display: 'inline-block', padding: '0 8px', width: 'calc(10%-8px)' }}
            >
              到
            </Form.Item>
            <Form.Item name="price" style={{ display: 'inline-block', width: 'calc(40%-8px)' }}>
              <Input placeholder="" />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="总销量" style={{ marginBottom: 0 }}>
            <Form.Item name="num" style={{ display: 'inline-block', width: 'calc(40%-8px)' }}>
              <Input placeholder="" />
            </Form.Item>
            <Form.Item
              style={{ display: 'inline-block', padding: '0 8px', width: 'calc(10%-8px)' }}
            >
              到
            </Form.Item>
            <Form.Item name="num" style={{ display: 'inline-block', width: 'calc(40%-8px)' }}>
              <Input placeholder="" />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button
            style={{ margin: '0 10px' }}
            onClick={() => {
              form.resetFields()
            }}
          >
            重置
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
export default SearchForm
