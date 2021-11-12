import React, { useState, useEffect } from 'react'
import { Modal, Button, Checkbox, Row, Col } from 'antd'
import { region } from '../../../api/order'
import styles from '../express/regionModal.module.css'
const CheckboxGroup = Checkbox.Group
interface RegionModalProps {
  isVisible: boolean
}
const plainOptions = ['Apple', 'Pear', 'Orange']
const defaultCheckedList = ['Apple', 'Orange']

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
    plainOptions: ['北京'], //转换生成
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
const municipality = ['北京', '天津', '上海', '重庆']
interface RegionData {
  indeterminate: boolean
  checkAll: boolean
  checkedList: string[]
  plainOptions: string[]
  [propName: string]: any
}
const RegionModal: React.FC<RegionModalProps> = ({ isVisible }) => {
  const [isModalVisible, setIsModalVisible] = useState(isVisible)
  const [regionData, setRegionData] = useState(data as RegionData[]) //页面交互数据
  const [currentKey, setCurrentKey] = useState(NaN) //当前点击的省
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
  //格式化选中的省及其市区数据，传给后端接口
  const formetRegionData = () => {
    let mainData: object[] = []
    regionData.map((item) => {
      let subData: object[] = []
      //只过滤已选中的省市
      if (!item.checkedList.length) {
        return
      }
      item.subRegionList.map((subItem: RegionData) => {
        const checkedIndex = item.checkedList.findIndex((checkedItem) => {
          return checkedItem === subItem.name
        })
        subData.push({
          ifSlected: checkedIndex > -1,
          regionCode: subItem.code,
          regionName: subItem.name
        })
      })
      mainData.push({
        ifSlected: !!item.checkedList.length,
        regionCode: item.code,
        regionName: item.name,
        subMerchantExpressTemplateItemRegionDetailList: subData
      })
    })
    //生成展示值
    console.log('mainData=====', mainData)
    return mainData
  }
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
    const data = formetRegionData()
    console.log('data======', data)
    //数据转换成接口数据
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  //省多选择框
  function onMainChange(checkedValues: any) {
    // console.log('onMainChange => checked = ', checkedValues)
  }
  //市多选框
  function onCheckSubChange(list: any, subData: RegionData) {
    let newData = [...regionData]
    const targetIndex: number = newData.findIndex((item) => {
      return subData.id === item.id
    })
    Object.assign(subData, {
      indeterminate: !!list.length && list.length < subData.plainOptions.length,
      checkAll: list.length === subData.plainOptions.length,
      checkedList: list //选中的市
    })
    newData[targetIndex] = subData as RegionData
    setRegionData(newData)
  }
  //获取市区---存在时直接返回，不存在时调接口获取
  const resetRegionItem = async (subData: RegionData) => {
    console.log('subData======', subData)
    if (subData.plainOptions.length) {
      return subData
    }
    let result: any = await region({
      parentCode: subData.code
    })
    if (result.code !== '000000') {
      //提示错误信息
      return subData
    }
    const cities = result.data
    let targetPlainOptions: string[] = []
    cities.map((item: any) => {
      targetPlainOptions.push(item.name)
    })
    Object.assign(subData, {
      subRegionList: cities,
      plainOptions: targetPlainOptions
    })
    return subData as RegionData
  }
  //全选省内所有的市
  const onCheckAllChange = async (e: any, subData: RegionData) => {
    const data: any = await resetRegionItem(subData)
    Object.assign(data, {
      indeterminate: false,
      checkAll: e.target.checked,
      checkedList: e.target.checked ? data.plainOptions : [] //选中的市
    })
    let newData = [...regionData]
    const targetIndex: number = newData.findIndex((item) => {
      return subData.id === item.id
    })
    newData[targetIndex] = data as RegionData
    setRegionData(newData)
  }
  //展开省的所有市区
  const onOpenArea = async (subData: RegionData) => {
    const keyValue = subData.id !== currentKey ? subData.id : NaN
    // console.log('currentKey=====', currentKey)
    // console.log('keyValue=====', keyValue)
    setCurrentKey(keyValue)
    const newSubData: any = await resetRegionItem(subData)
    // console.log('newSubData====', newSubData)
    let newData = [...regionData]
    const targetIndex: number = newData.findIndex((item) => {
      return subData.id === item.id
    })
    newData[targetIndex] = newSubData as RegionData
    setRegionData(newData)
  }
  return (
    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Row>
        {regionData.map((item) => {
          return (
            <Col
              span={8}
              key={item.id}
              className={`${styles['province']} ${
                currentKey === item.id ? styles['province-on'] : ''
              }`}
            >
              <Checkbox
                indeterminate={item.indeterminate}
                onChange={(e) => {
                  onCheckAllChange(e, item as RegionData)
                }}
                checked={item.checkAll}
              >
                {item.name}
              </Checkbox>
              <span
                onClick={() => {
                  onOpenArea(item)
                }}
              >
                展开
              </span>
              <CheckboxGroup
                className={`${styles['cities']} ${
                  currentKey === item.id ? styles['cities-on'] : ''
                }`}
                options={item.plainOptions}
                value={item.checkedList}
                onChange={(list) => {
                  onCheckSubChange(list, item)
                }}
              />
            </Col>
          )
        })}
      </Row>
    </Modal>
  )
}
export default RegionModal
