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
import GoodForm from '../properties/components/Form'
// import './index.css'
const Properties = ({ actionType, listSpec = {} }: any) => {
  return (
    <div>
      <GoodForm actionType={actionType} listSpec={listSpec} />
    </div>
  )
}
export default Properties
