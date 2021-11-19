import { useEffect, useState } from 'react'
import { Form, Row, Col, Input, Button, Cascader } from 'antd'
import { pageByCondition, getAllCategory, brandList } from '../../../../api/goods'
// import { DownOutlined, UpOutlined } from '@ant-design/icons';

const SearchForm = () => {
  const [options, setOptions] = useState([] as object[])
  const [brands, setBrands] = useState([]) //商品品牌集
  const [form] = Form.useForm()
  const onChange = (value: any): void => {
    console.log(value)
  }

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }
  const initData = async () => {
    //启用假数据
    // const optionsData: object[] = [
    //   {
    //     id: '003',
    //     parentId: null,
    //     specCollId: 1002,
    //     value: '衣服',
    //     label: '衣服',
    //     level: 1,
    //     sort: 0,
    //     status: 1,
    //     creater: null,
    //     updator: null,
    //     children: [
    //       {
    //         id: '003001',
    //         parentId: '003',
    //         specCollId: 1002,
    //         value: '上衣',
    //         label: '上衣',
    //         level: 2,
    //         sort: 0,
    //         status: 1,
    //         creater: null,
    //         updator: null,
    //         children: [
    //           {
    //             id: '003001001',
    //             parentId: '003001',
    //             specCollId: 1002,
    //             value: '卫衣',
    //             label: '卫衣',
    //             level: 3,
    //             sort: 0,
    //             status: 1,
    //             creater: null,
    //             updator: null,
    //             children: undefined
    //           }
    //         ]
    //       },
    //       {
    //         id: '003002',
    //         parentId: '003',
    //         specCollId: 1002,
    //         value: '裤子',
    //         label: '裤子',
    //         level: 2,
    //         sort: 0,
    //         status: 1,
    //         creater: null,
    //         updator: null,
    //         children: undefined
    //       }
    //     ]
    //   }
    // ]
    // setOptions(optionsData)
    const result: any = await getAllCategory()
    if ((result.code = '000000')) {
      setOptions(result.data)
    }
    const brandResult: any = await brandList()
    if (brandResult.code === '000000') {
      setBrands(brandResult.data)
    }
  }
  useEffect(() => {
    initData()
  }, [])
  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item name="商品名称" label="商品名称">
            <Input placeholder="请输入商品名称" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="商品分类" label="商品分类">
            <Cascader options={options} onChange={onChange} placeholder="Please select" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="brandId" label="品牌">
            {/* <Select onChange={onBrandChange}>
              {brands.map((item: any) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                )
              })}
            </Select> */}
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
            <Form.Item
              style={{ display: 'inline-block', paddingLeft: '15px', width: 'calc(10% - 8px)' }}
            >
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
      </Row>
      <Row gutter={24}>
        <Col span={13} style={{ textAlign: 'left' }}>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              form.resetFields()
            }}
          >
            清除
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchForm
