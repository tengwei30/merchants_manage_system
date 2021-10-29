/*
 * @Author: your name
 * @Date: 2021-10-28 19:51:30
 * @LastEditTime: 2021-10-28 19:54:27
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /content_manage_system/src/pages/good/components/properties/index.tsx
 */
import { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { Form, Row, Col, Input, Button, Cascader } from 'antd'
import GoodForm from './components/GoodForm'
// import './index.css'
const Properties = ({ actionType }: any) => {
  console.log(actionType)
  return (
    <div>
      <GoodForm />
    </div>
  )
}
export default Properties
