import React, { useState, useEffect } from 'react'
import { Modal, Button, Checkbox, Row, Col, message } from 'antd'
import { region } from '../../../../api/order'
import { useDispatch, useSelector } from 'react-redux'
import { setExpressRegion, isExpressRegionModalShow } from '../../../../store/actions/order.actions'
import { ServerData, SubServerItem } from '../../../../store/models/order'
import { AppState } from '../../../../store/reduces'
import { OrderState } from '../../../../store/reduces/order.reducer'
import styles from '../../express/components/RegionModal.module.css'
const CheckboxGroup = Checkbox.Group

//页面渲染的数据结构
interface RegionData {
  indeterminate: boolean
  checkAll: boolean
  checkedList: string[]
  plainOptions: string[]
  [propName: string]: any
}
interface RegionModalProps {
  isVisible: boolean
  serverData?: ServerData[] | undefined
}

// const data = [
//   {
//     indeterminate: false, //判断生成
//     checkAll: false, //判断生成
//     checkedList: ['北京'], //选中的市--- //循环市数据生成
//     plainOptions: ['北京'], //转换生成
//     subRegionList: [
//       {
//         code: '1',
//         creater: 'A',
//         id: 1004,
//         level: 1,
//         name: '北京',
//         parentCode: '0',
//         subRegionList: null,
//         updator: 'B'
//       }
//     ], //所有的市，ajax请求
//     code: '1',
//     creater: 'A',
//     id: 1004, //循环省数据生成
//     level: 1,
//     name: '北京',
//     parentCode: '0',
//     updator: 'B'
//   }
// ]

const RegionModal: React.FC<RegionModalProps> = ({ isVisible, serverData }) => {
  const [isModalVisible, setIsModalVisible] = useState(isVisible)
  const [regionData, setRegionData] = useState([] as RegionData[]) //页面交互数据
  const [currentKey, setCurrentKey] = useState(0) //当前点击的省
  const order = useSelector<AppState, OrderState>((state) => state.order)
  // 获取dispatch
  const dispatch = useDispatch()
  //初始化regionData
  const initRegionData = async () => {
    //获取省
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
  //判断是否是直辖市
  const isMunicipality = (data: RegionData) => {
    const municipality = ['北京', '天津', '上海', '重庆'] //直辖市
    const targetIndex = municipality.findIndex((item) => {
      return item === data.name
    })
    return targetIndex > -1
  }
  //获取市区---存在时直接返回，不存在时调接口获取
  const resetRegionItem = async (subData: RegionData) => {
    // console.log('subData======', subData)
    if (subData.plainOptions.length) {
      return subData //已有市数据，不做任何处理，直接返回
    }
    if (isMunicipality(subData)) {
      return subData //是直辖市，不做任何处理，直接返回
    }
    let result: any = await region({
      parentCode: subData.code
    })
    if (result.code !== '000000') {
      //提示错误信息
      return subData
    }
    // console.log('result.data=====', result.data)
    // console.log('subData=====', subData)
    let subRegionList = result.data || []
    let plainOptions: string[] = []
    subRegionList.map((item: any) => {
      plainOptions.push(item.name)
    })
    Object.assign(subData, {
      subRegionList,
      plainOptions
    })
    return subData as RegionData
  }
  //编辑时，格式化后端返回的数据，数据回显
  const renderServerData = () => {
    // if (!serverData || !serverData.length) {
    //   let data = [...regionData]
    //   data.map((item) => {
    //     Object.assign(item, {
    //       indeterminate: false,
    //       checkAll: false,
    //       checkedList: []
    //     })
    //   })
    //   setRegionData(data)
    //   return
    // }
    // let dataFromServer: RegionData[] = []
    console.log('serverData==128==', serverData)
    let newRegionData = [...regionData]
    //渲染数据重置
    newRegionData.map((item) => {
      Object.assign(item, {
        indeterminate: false,
        checkAll: false,
        checkedList: []
      })
    })
    if (!serverData || !serverData.length) {
      return
    }
    serverData.map(async (item) => {
      const targetIndex = newRegionData.findIndex((regionItem) => {
        return item.regionCode === regionItem.code
      })
      if (targetIndex < 0) {
        return
      }
      //直辖市处理
      if (isMunicipality(newRegionData[targetIndex])) {
        Object.assign(newRegionData[targetIndex], {
          indeterminate: false, //判断生成
          checkAll: true, //判断生成
          checkedList: [], //选中的市--- //循环市数据生成
          plainOptions: []
        })
      } else {
        const plainOptions = await resetRegionItem(newRegionData[targetIndex])
        let checkedList: string[] = []
        item.subMerchantExpressTemplateItemRegionDetailList.map((subServerItem: SubServerItem) => {
          checkedList.push(subServerItem.regionName)
        })
        const checkAll = plainOptions.length === checkedList.length
        Object.assign(newRegionData[targetIndex], {
          indeterminate: !checkAll, //判断生成
          checkAll, //判断生成
          checkedList, //选中的市--- //循环市数据生成
          plainOptions
        })
      }
      setRegionData(newRegionData)
    })
    console.log('newRegionData=====153', newRegionData)
  }
  //格式化选中的省及其市区数据，传给后端接口
  const formetRegionData = () => {
    let mainData: ServerData[] = []
    regionData.map((item) => {
      let subData: SubServerItem[] = []
      // console.log('item====', item)
      //过滤未选中的省，且不是直辖市
      if (!item.checkAll && !item.indeterminate) {
        return
      }
      if (item.subRegionList && item.subRegionList.length) {
        item.subRegionList.map((subItem: RegionData) => {
          const checkedIndex = item.checkedList.findIndex((checkedItem) => {
            return checkedItem === subItem.name
          })
          if (checkedIndex > -1) {
            subData.push({
              ifSlected: checkedIndex > -1,
              regionCode: subItem.code,
              regionName: subItem.name
            })
          }
        })
      }
      mainData.push({
        ifSlected: !!item.checkedList.length || item.checkAll,
        regionCode: item.code,
        regionName: item.name,
        subMerchantExpressTemplateItemRegionDetailList: subData
      })
    })
    //生成展示值
    return mainData
  }
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
    const data = formetRegionData()
    let dataValues: string[] = []
    data.map((item) => {
      const subList = item.subMerchantExpressTemplateItemRegionDetailList
      if (subList.length) {
        subList.map((subItem) => {
          dataValues.push(subItem.regionName)
        })
      } else {
        dataValues.push(item.regionName)
      }
    })
    // console.log('dataValues====', dataValues.join(','))
    console.log('order.expressRegion===pop==save======', order.expressRegion)
    dispatch(setExpressRegion(data, dataValues.join(',')))
    dispatch(isExpressRegionModalShow(false))
    //数据转换成接口数据
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    dispatch(isExpressRegionModalShow(false))
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
  const spreadNode = (data: RegionData) => {
    return !isMunicipality(data) ? (
      <span
        onClick={() => {
          onOpenArea(data)
        }}
      >
        展开
      </span>
    ) : (
      ''
    )
  }
  // const resetRegionData = () => {
  //   if(!serverData.length){
  //     //重置regionData，不选择任何选项
  //   }
  // }
  useEffect(() => {
    initRegionData() //初始化渲染数据
  }, [])
  useEffect(() => {
    setIsModalVisible(isVisible)
  }, [isVisible])
  useEffect(() => {
    console.log('serverData===pop====', serverData)
    renderServerData() //回显server端数据
  }, [order.expressRegion.targetKey, order.expressRegion.renderData])
  // console.log('isVisible====', isVisible)
  // console.log('regionData===pop====', regionData)
  //存储生成的server端数据，及页面回显数据到store中，
  return (
    <Modal title="选择地区" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
              {spreadNode(item)}
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
