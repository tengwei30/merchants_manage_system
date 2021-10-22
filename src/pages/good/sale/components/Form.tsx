import { useState } from 'react';
import { Form, Row, Col, Input, Button, Cascader } from 'antd';
// import { DownOutlined, UpOutlined } from '@ant-design/icons';

const options = [{
  value: '一级类目',
  label: '一级类目',
  children: [
    {
      value: '二级类目',
      label: '二级类目',
      children: [
        {
          value: '三级类目',
          label: '三级类目',
        },
      ],
    },
  ],
}]

const SearchForm = () => {
  // const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();
  // const [options] = useState([{
  //   value: '一级类目',
  //   label: '一级类目',
  //   children: [
  //     {
  //       value: '二级类目',
  //       label: '二级类目',
  //       children: [
  //         {
  //           value: '三级类目',
  //           label: '三级类目',
  //         },
  //       ],
  //     },
  //   ],
  // }])
  const onChange = (value:any):void => {
    console.log(value)
  }

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item
              name="商品名称"
              label="商品名称"
            >
              <Input placeholder="请输入商品名称" />
            </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="类目选择"
            label="类目选择"
          >
            <Cascader options={options} onChange={onChange} placeholder="Please select" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="价格" style={{ marginBottom: 0 }}>
            <Form.Item
              name="year"
              rules={[{ required: true }]}
              style={{ display: 'inline-block', width: 'calc(40% - 8px)' }}
            >
              <Input placeholder="请输入价格" />
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', paddingLeft:'15px', width: 'calc(10% - 8px)' }}>
              到
            </Form.Item>
            <Form.Item
              name="month"
              rules={[{ required: true }]}
              style={{ display: 'inline-block', width: 'calc(45% - 8px)', margin: '0 8px' }}
            >
              <Input placeholder="请输入价格" />
            </Form.Item>
          </Form.Item>
        </Col>
        {/* <Col span={6}>
          <Form.Item
              name="商品名称"
              label="商品名称"
            >
              <Input placeholder="请输入商品名称" />
            </Form.Item>
        </Col> */}
      </Row>
      {/* <Row gutter={24}>{getFields()}</Row> */}
      <Row gutter={24}>
        {/* <Col span={24}> */}
        <Col span={10}>
          <Form.Item label="总销量" style={{ marginBottom: 0 }}>
            <Form.Item
              name="year"
              rules={[{ required: false }]}
              style={{ display: 'inline-block', width: 'calc(40% - 8px)' }}
            >
              <Input placeholder="请输入销量" />
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', paddingLeft:'15x', width: 'calc(10% - 8px)' }}>
              到
            </Form.Item>
            <Form.Item
              name="month"
              rules={[{ required: false }]}
              style={{ display: 'inline-block', width: 'calc(45% - 8px)', margin: '0 8px' }}
            >
              <Input placeholder="请输入销量" />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col span={13} style={{ textAlign: 'left' }}>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              form.resetFields();
            }}
          >
            清除
          </Button>
        </Col>
        {/* </Col> */}
      </Row>
    </Form>

  )
}

export default SearchForm