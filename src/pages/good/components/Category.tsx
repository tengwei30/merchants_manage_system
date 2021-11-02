import { useState } from 'react'
import { Form, Row, Col, Input, Button, Cascader } from 'antd'
import { CascaderValueType, CascaderOptionType } from 'antd/lib/cascader'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from '../../../store/actions/good.actions'
const options = [
  {
    id: '003',
    parentId: null,
    specCollId: 1002,
    value: '衣服',
    label: '衣服',
    level: 1,
    sort: 0,
    status: 1,
    creater: null,
    updator: null,
    children: [
      {
        id: '003001',
        parentId: '003',
        specCollId: 1002,
        value: '上衣',
        label: '上衣',
        level: 2,
        sort: 0,
        status: 1,
        creater: null,
        updator: null,
        children: [
          {
            id: '003001001',
            parentId: '003001',
            specCollId: 1002,
            value: '卫衣',
            label: '卫衣',
            level: 3,
            sort: 0,
            status: 1,
            creater: null,
            updator: null,
            children: undefined
          }
        ]
      },
      {
        id: '003002',
        parentId: '003',
        specCollId: 1002,
        value: '裤子',
        label: '裤子',
        level: 2,
        sort: 0,
        status: 1,
        creater: null,
        updator: null,
        children: undefined
      }
    ]
  }
]

const Category = () => {
  const [categoryId, setCategoryId] = useState(NaN)
  // 获取dispatch
  const dispatch = useDispatch()
  //选择商品分类
  function onChange(value: CascaderValueType, selectedOptions?: CascaderOptionType[] | undefined) {
    if (selectedOptions && selectedOptions.length) {
      setCategoryId(selectedOptions[selectedOptions.length - 1].id)
    }
  }
  //提交Form表单
  const onFinish = (values: any) => {
    dispatch(setCategory(categoryId, values.category))
    // console.log('Success:', values)
  }
  //提交Form表单失败
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{ minHeight: '100vh' }}
    >
      <Form.Item
        label="商品分类"
        name="category"
        rules={[{ required: true, message: '请选择商品分类!' }]}
        style={{ margin: '100px 0' }}
      >
        <Cascader
          options={options}
          expandTrigger="hover"
          placeholder="请选择商品分类"
          onChange={onChange}
          style={{ width: '90%' }}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
        <Button type="primary" htmlType="submit">
          下一步
        </Button>
      </Form.Item>
    </Form>
  )
}
export default Category
