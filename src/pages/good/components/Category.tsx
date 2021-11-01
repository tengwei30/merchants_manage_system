import { useState } from 'react'
import { Form, Row, Col, Input, Button, Cascader } from 'antd'
import { CascaderValueType } from 'antd/lib/cascader'

const options = [
  {
    id: '003',
    parentId: null,
    specCollId: 1002,
    value: '衣服',
    label: 1,
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
        label: 2,
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
            label: 3,
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
        label: 2,
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
  function onChange(value: CascaderValueType) {
    console.log(value)
  }
  // Just show the latest item.
  function displayRender(label: any) {
    console.log(label)
    return label[label.length - 1]
  }
  return (
    <div>
      <Cascader
        options={options}
        expandTrigger="hover"
        displayRender={displayRender}
        onChange={onChange}
      />
    </div>
  )
}
export default Category
