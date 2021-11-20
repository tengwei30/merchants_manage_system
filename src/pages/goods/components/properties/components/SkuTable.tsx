import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import {
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Button,
  Select,
  Upload,
  message,
  Modal,
  Space,
  Avatar,
  Typography,
  Table,
  Popconfirm
} from 'antd'
import {
  LoadingOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  SmileOutlined,
  UserOutlined
} from '@ant-design/icons'
import { FormInstance } from 'antd/lib/form'
import 'braft-editor/dist/index.css'
// import styles from '../components/Form.module.css'
import Uploader from './Uploader'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../../../store/reduces'
import { GoodsState } from '../../../../../store/reduces/goods.reducer'
import { SkuList, ListSpec, SubListSpec } from '../../../../../store/models/goods'
import { setSkuList } from '../../../../../store/actions/goods.actions'
// import { listSpecByCategoryId, publish, pageByCondition } from '../../../../../api/goods'
import useDeepCompareEffect from 'use-deep-compare-effect'

// interface SubParentData {
//   id: number
//   specColleId: number
//   specId: number
//   value: string
// }
// interface ParentData {
//   id: number
//   name: string
//   sort: number
//   specColleId: number
//   type: number
//   updator: string
//   value: SubParentData[]
//   [propName: string]: any
// }
//定义sku表格列接口
interface SkuColumns {
  name: string
  id: number
  value: []
  editable: boolean
  dataIndex: string
  title: string
  inputType: string
}
//定义sku表格数据项接口
interface SkuDataSource {
  key: string
  costPrice: number
  stock: number
  alertStock: number
  marketPrice: number
  salePrice: number
  [propName: string]: any
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: 'number' | 'text' | 'upload'
  record: SkuDataSource
  index: number
  children: React.ReactNode
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

interface SkuTableFormProps {
  currentListSpec: ListSpec[]
}
interface SubSkuSpec {
  indexNum: number
  specColleId: number
  specId: number
  value: string
  type: number
  name: string
}
//输出sku表格UI
const SkuTable: React.FC<SkuTableFormProps> = ({ currentListSpec }) => {
  const [form] = Form.useForm()
  const [skuColumns, setSkuColumns] = useState([] as SkuColumns[]) //sku表格列--渲染数据
  const [skuDataSource, setSkuDataSource] = useState([] as SkuDataSource[]) //sku表格数据--渲染数据
  const [editingKey, setEditingKey] = useState('')
  //获取dispatch
  const dispatch = useDispatch()
  const isEditing = (record: SkuDataSource) => record.key === editingKey

  const edit = (record: Partial<SkuDataSource> & { key: React.Key }) => {
    form.setFieldsValue({
      costPrice: 0,
      stock: 0,
      alertStock: 0,
      marketPrice: 0,
      salePrice: 0,
      width: 0,
      height: 0,
      length: 0,
      weight: 0,
      ...record
    })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as SkuDataSource

      const newData = [...skuDataSource]
      const index = newData.findIndex((item) => key === item.key)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row
        })
        setSkuDataSource(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setSkuDataSource(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      // setIsDataChanged(false)
      console.log('Validate Failed:', errInfo)
    }
  }
  //生成table的columns数据
  const getSkuColumns = (listSpec: ListSpec[]) => {
    let arr: any = []
    listSpec.map((item: ListSpec, index) => {
      if (!item.value.length) {
        return
      }
      arr.push({
        title: item.name,
        dataIndex: 'value_' + item.id,
        key: 'value_' + item.id,
        fixed: 'left',
        width: 80
      })
    })
    const subArr = [
      {
        title: '销售价格',
        dataIndex: 'salePrice',
        key: 'salePrice',
        editable: true,
        width: 100
      },
      {
        title: '市场价格',
        dataIndex: 'marketPrice',
        key: 'marketPrice',
        editable: true,
        width: 100
      },
      {
        title: '成本价格',
        dataIndex: 'costPrice',
        key: 'costPrice',
        editable: true,
        width: 100
      },
      {
        title: '库存',
        dataIndex: 'stock',
        key: 'stock',
        editable: true
      },
      {
        title: '库存预警',
        dataIndex: 'alertStock',
        key: 'alertStock',
        editable: true
      },
      {
        title: '宽度(M)',
        dataIndex: 'width',
        key: 'width',
        editable: true
      },
      {
        title: '高度(M)',
        dataIndex: 'height',
        key: 'height',
        editable: true
      },
      {
        title: '长度(M)',
        dataIndex: 'length',
        key: 'length',
        editable: true
      },
      {
        title: '重量(KG)',
        dataIndex: 'weight',
        key: 'weight',
        editable: true
      },
      {
        title: '头图',
        dataIndex: 'firstImg',
        key: 'firstImg',
        inputType: 'upload',
        render: (fields: any) => {
          return (
            <>
              {/* {fields.map((item: any) => {
                return <img key={item.url} src={item.url} alt="" width="100px" />
              })} */}
              <Uploader fieldData={fields} />
            </>
          )
        }
      },
      {
        title: '图片集',
        dataIndex: 'imgs',
        key: 'imgs',
        inputType: 'upload',
        render: (fields: any) => {
          return (
            <>
              {/* {fields.map((item: any) => {
                return <img key={item.url} src={item.url} alt="" width="100px" />
              })} */}
              <Uploader fieldData={fields} />
            </>
          )
        }
      },
      {
        title: '操作',
        key: 'action',
        render: (_: any, record: SkuDataSource) => {
          const editable = isEditing(record)
          return editable ? (
            <span>
              <Button type="primary" onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                确定
              </Button>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <Button>取消</Button>
              </Popconfirm>
            </span>
          ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              编辑
            </Typography.Link>
          )
        }
      }
    ]
    arr = arr.concat(subArr)
    // console.log(arr)
    return arr
  }
  //将规格组合并转成table数据
  const getSkuDataSource = (listSpec: ListSpec[], data: SkuDataSource[]) => {
    //将多个数组实现排列组合
    const tailFn = () => {
      let arrs: any = []
      let specNameArr: string[] = []
      for (let i = 0; i < listSpec.length; i++) {
        if (!listSpec[i].value.length) {
          continue
        }
        arrs.push(listSpec[i].value)
        specNameArr.push(listSpec[i].name)
      }
      console.log('arrs=======', arrs)
      var sarr = [[]]
      for (var i = 0; i < arrs.length; i++) {
        var tarr = []
        for (var j = 0; j < sarr.length; j++) {
          for (let k: number = 0; k < arrs[i].length; k++) {
            Object.assign(arrs[i][k], { indexNum: k, name: specNameArr[i] })
            tarr.push(sarr[j].concat(arrs[i][k]))
          }
        }
        sarr = tarr
      }
      return sarr
    }
    let totalArr = tailFn()
    let mainArr: any = []
    totalArr.map((item: any, index) => {
      let subObj: any = {}
      let subSkuSpec: object[] = []
      // console.log('item=============', item)
      item.map((subItem: any, index: number) => {
        // console.log('subItem=============')
        // console.log(subItem)
        subObj['value_' + subItem.specId] = subItem.value
        //生成每个sku的属性集：subSkuSpec
        subSkuSpec.push({
          indexNum: subItem.indexNum,
          specColleId: subItem.specColleId,
          specId: subItem.specId,
          value: subItem.value,
          type: 1, //1:商品属性 0:普通属性
          name: subItem.name
        })
      })
      subObj['subSkuSpec'] = subSkuSpec
      // console.log('subObj=======', subObj)
      let itemIndex = -1
      //判断记录是否存在
      if (data && data.length) {
        itemIndex = data.findIndex((dataItem) => {
          let isExit = false
          const specValues: SubSkuSpec[] = subObj.subSkuSpec
          if (!dataItem.subSkuSpec.length || dataItem.subSkuSpec.length !== specValues.length) {
            return false
          }
          // console.log('dataItem====', dataItem)
          // console.log('specValues======', specValues)
          for (let i = 0; i < specValues.length; i++) {
            if (dataItem.subSkuSpec[i].indexNum !== specValues[i].indexNum) {
              isExit = false
              break
            } else {
              isExit = true
            }
          }
          return isExit
        })
      }
      let obj: object = {}
      if (itemIndex > -1) {
        //记录存在-->更新
        obj = Object.assign({}, data[itemIndex], subObj)
      } else {
        obj = {
          key: index.toString(),
          costPrice: 0,
          stock: 0,
          alertStock: 0,
          marketPrice: 0,
          salePrice: 0,
          width: 0,
          height: 0,
          length: 0,
          weight: 0,
          imgs: [
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            }
          ],
          firstImg: [
            {
              uid: '-2',
              name: 'image.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            }
          ]
        }
        Object.assign(obj, subObj)
      }
      mainArr.push(obj)
    })
    // console.log(mainArr)
    return mainArr
  }
  const setServerData = () => {
    let merchantGoodsSkuReqList: SkuList[] = []
    skuDataSource.map((item: any) => {
      let data: SkuList = {
        costPrice: item.costPrice,
        stock: item.stock,
        alertStock: item.alertStock,
        marketPrice: item.marketPrice,
        salePrice: item.salePrice,
        width: item.width,
        height: item.height,
        length: item.length,
        weight: item.weight,
        merchantGoodsSkuSpecValueReqList: item.subSkuSpec,
        merchantGoodsImgsReqList: []
      }
      item.firstImg.map((imgItem: any) => {
        data.merchantGoodsImgsReqList.push({
          ifViedo: 1,
          url: imgItem.url
        })
      })
      item.imgs.map((imgItem: any) => {
        data.merchantGoodsImgsReqList.push({
          ifViedo: 0,
          url: imgItem.url
        })
      })
      merchantGoodsSkuReqList.push(data)
    })
    // console.log('merchantGoodsSkuReqList=====', merchantGoodsSkuReqList)
    //存储数据
    dispatch(setSkuList(merchantGoodsSkuReqList))
  }
  //生成当前sku表格的渲染数据（列和数据）
  useDeepCompareEffect(() => {
    console.log('currentListSpec===111111111====', currentListSpec)
    setSkuColumns(getSkuColumns(currentListSpec))
    setSkuDataSource(getSkuDataSource(currentListSpec, skuDataSource))
  }, [currentListSpec])
  useDeepCompareEffect(() => {
    // console.log('skuDataSource=======', skuDataSource)
    //处理数据
    setServerData()
  }, [skuDataSource])

  // console.log('skuDataSource=========', skuDataSource)
  const mergedColumns = skuColumns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: SkuDataSource) => ({
        record,
        inputType: col.inputType === 'upload' ? 'upload' : 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })
  // console.log('updata=================')
  return (
    <Form name="skuTableForm" form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell
          }
        }}
        bordered
        dataSource={skuDataSource}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel
        }}
        scroll={{ x: 1500, y: 600 }}
      />
    </Form>
  )
}
export default SkuTable
//sku相关--end
