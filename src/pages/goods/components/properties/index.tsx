import { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { Form, Row, Col, Input, Button, Cascader } from 'antd'
import GoodsForm from './components/Form'
const Properties = ({ actionType }: any) => {
  return <div>{<GoodsForm actionType={actionType} />}</div>
}
export default Properties
