import React, { useState, useEffect } from 'react'
import { Modal, Button, Checkbox, Row, Col } from 'antd'
import { region } from '../../../api/order'
import styles from '../express/region.module.css'
const CheckboxGroup = Checkbox.Group
interface RegionModalProps {
  isVisible: boolean
}
const plainOptions = ['Apple', 'Pear', 'Orange']
const defaultCheckedList = ['Apple', 'Orange']
// code: "1"------
// creater: "A"
// id: 1004
// level: 1
// name: "北京"-----
// parentCode: "0"
// subRegionList: null
// updator: "B"
const dataSource = [
  {
    ifSlected: false,
    regionCode: '1',
    regionName: '北京',
    subMerchantExpressTemplateItemRegionDetailList: [
      {
        ifSlected: false,
        regionCode: '1',
        regionName: '北京'
      }
    ]
  }
]
const data = [
  {
    indeterminate: false, //判断生成
    checkAll: false, //判断生成
    checkedList: ['北京'], //选中的市--- //循环市数据生成
    plainOptions: [
      {
        label: '北京',
        value: '北京'
      }
    ], //转换生成
    subRegionList: [
      {
        code: '1',
        creater: 'A',
        id: 1004,
        level: 1,
        name: '北京',
        parentCode: '0',
        subRegionList: null,
        updator: 'B'
      }
    ], //所有的市，ajax请求
    code: '1',
    creater: 'A',
    id: 1004, //循环省数据生成
    level: 1,
    name: '北京',
    parentCode: '0',
    updator: 'B'
  }
]
const RegionModal: React.FC<RegionModalProps> = ({ isVisible }) => {
  const [isModalVisible, setIsModalVisible] = useState(isVisible)
  // const [mainData, setProvinceData] = useState([])
  const [checkedList, setCheckedList] = useState(defaultCheckedList)
  const [indeterminate, setIndeterminate] = useState(true)
  const [checkAll, setCheckAll] = useState(false)
  const [regionData, setRegionData] = useState(data) //页面交互数据
  const getProvince = async () => {
    let result: any = await region()
    result = result.data
    const subItems = {
      indeterminate: false, //判断生成
      checkAll: false, //判断生成
      checkedList: [], //选中的市--- //循环市数据生成
      plainOptions: []
    }
    result.map((item: object) => {
      Object.assign(item, subItems)
    })
    setRegionData(result)
  }
  useEffect(() => {
    getProvince()
  }, [])
  // const formetRegionData = () => {
  // }
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  //省多选择框
  function onMainChange(checkedValues: any) {
    // console.log('onMainChange => checked = ', checkedValues)
  }
  //市多选框
  function onCheckSubChange(list: any) {
    // console.log('onCheckSubChange => checked = ', list)
    setCheckedList(list)
    setIndeterminate(!!list.length && list.length < plainOptions.length)
    setCheckAll(list.length === plainOptions.length)
  }
  console.log('out ----- checkAll = ', checkAll)
  //全选省内所有的市
  const onCheckAllChange = (e: any, item: []) => {
    console.log('----66')
    setCheckedList(e.target.checked ? item.plainOptions : [])
    setIndeterminate(false)
    let data = [...regionData]
    // data.filter((item) => {
      
    // })
    setRegionData(e.target.checked)
  }
  const onOpenArea = () => {}

  return (
    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      {/* <CheckboxGroup style={{ width: '100%' }} onChange={onMainChange}> */}
      <Row>
        {regionData.map((item) => {
          return (
            <Col span={8} key={item.id}>
              <Checkbox
                // value="A"
                indeterminate={item.indeterminate}
                onChange={(e) => {
                  onCheckAllChange(e, item as [])
                }}
                checked={item.checkAll}
              >
                {item.name}
              </Checkbox>
              <span onClick={onOpenArea}>展开</span>
              <CheckboxGroup
                options={item.plainOptions}
                value={item.checkedList}
                onChange={onCheckSubChange}
              />
            </Col>
          )
        })}
        {/* <Col span={8}>
          <Checkbox
            // value="A"
            indeterminate={indeterminate}
            onChange={(e) => {
              onCheckAllChange(e, plainOptions as [])
            }}
            checked={checkAll}
          >
            A
          </Checkbox>
          <span onClick={onOpenArea}>展开</span>
          <CheckboxGroup options={plainOptions} value={checkedList} onChange={onCheckSubChange} />
        </Col>
        <Col span={8}>
          <Checkbox value="B">B</Checkbox>
          <span>展开</span>
        </Col>
        <Col span={8}>
          <Checkbox value="C">C</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="D">D</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="E">E</Checkbox>
        </Col> */}
      </Row>
      {/* </CheckboxGroup> */}
    </Modal>
  )
}
export default RegionModal
