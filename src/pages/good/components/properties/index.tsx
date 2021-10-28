import { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { Form, Row, Col, Input, Button, Cascader } from 'antd'
import GoodForm from './components/Form'
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
