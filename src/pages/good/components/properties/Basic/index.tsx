import { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { Form, Row, Col, Input, Button, Cascader } from 'antd'
import './index.css'
const Basic = (props: any, ref: any) => {
  const [sort, setSort] = useState('美妆>护肤品>官方直售')
  const [goodName, setGoodName] = useState('')
  const [message, setMessage] = useState('')
  const [weight, setWeight] = useState('0.00')
  const [marketPrice, setMarketPrice] = useState('0.00')
  const [goodPrice, setGoodPrice] = useState('0.00')
  const [costPrice, setCostPrice] = useState('0.00')
  let basic = {
    data: {
      sort,
      goodName,
      message,
      weight,
      marketPrice,
      goodPrice,
      costPrice
    },
    checkValuesFn: () => {
      if (!goodName) {
        alert('请输入商品名称')
        return false
      }
    }
  }
  useImperativeHandle(ref, () => ({
    basicFields: basic
  }))
  return (
    <div className="basic">
      <h2>商品基本信息</h2>
      <div className="">
        {/* <Row>
          <Col span={16}>
            <Form.Item name="goodSort" label="商品分类">
              {sort}
            </Form.Item>
          </Col>
        </Row> */}
        {/* <Row>
          <Col span={16}>
            <Form.Item name="goodName" label="商品名称" rules={[{ required: true }]}>
              <Input maxLength={50} allowClear />
              <div className="txt-tip">商品标题名称长度至少3个字符，最长50个字符</div>
            </Form.Item>
          </Col>
        </Row> */}
        {/* <Row>
          <Col span={16}>
            <Form.Item name="message" label="广告词" rules={[{ required: true }]}>
              <Input maxLength={50} allowClear />
              <div className="txt-tip">广告词最长不能超过50个字符</div>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Form.Item name="weight" label="重量">
              <Input />
              <div className="txt-tip">运费模板是重量单位时必填项,单位:千克（Kg）</div>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Form.Item name="marketPrice" label="市场价" rules={[{ required: true }]}>
              <Input style={{ width: '20%' }} suffix="¥" />
              <div className="txt-tip">
                价格必须是0.01~9999999之间的数字
                ，此价格仅为市场参考售价，请根据该实际情况认真填写。
              </div>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Form.Item name="goodPrice" label="商品价格" rules={[{ required: true }]}>
              <Input style={{ width: '20%' }} suffix="¥" />
              <div className="txt-tip">
                价格必须是0.01~9999999之间的数字，且不能高于市场价。 <br />
                此价格为商品实际销售价格，如果商品存在规格，该价格显示最低价格。
              </div>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Form.Item name="costPrice" label="成本价">
              <Input style={{ width: '20%' }} suffix="¥" />
              <div className="txt-tip">
                价格必须是0.00~9999999之间的数字，此价格为商户对所销售的商品实际成本价格进行备注记录，非必填选项，不会在前台销售页面中显示。
              </div>
            </Form.Item>
          </Col>
        </Row> */}
      </div>
    </div>
  )
}
export default forwardRef(Basic)
