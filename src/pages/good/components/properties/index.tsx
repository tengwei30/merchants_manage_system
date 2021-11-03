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
