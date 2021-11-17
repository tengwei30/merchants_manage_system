import { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { Form, Row, Col, Input, Button, Cascader } from 'antd'
import GoodForm from '../properties/components/Form'
const Properties = ({ actionType }: any) => {
  return <div>{<GoodForm actionType={actionType} />}</div>
}
export default Properties
