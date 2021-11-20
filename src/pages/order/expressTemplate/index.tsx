import React, { useState, useRef, useEffect, useContext } from 'react'
import { Form, Select, Row, Col, Input, Button, Cascader, Table, Popconfirm, Modal } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { withRouter, Link, RouteComponentProps } from 'react-router-dom'
import LayoutMenu from '../../../components/DashBoard'
import RegionModal from '../expressTemplate/components/RegionModal'
import { company } from '../../../api/order'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { AppState } from '../../../store/reduces'
import { OrderState } from '../../../store/reduces/order.reducer'
import { ServerData } from '../../../store/models/order'
import {
  setExpressRegion,
  isExpressRegionModalShow,
  setExpressRegionKey
} from '../../../store/actions/order.actions'
import { templateSave, templateDetail } from '../../../api/order'
import styles from '../expressTemplate/index.module.css'
const { Option } = Select
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}

// const regionData = [
//   {
//     ifSlected: false,
//     regionCode: '2',
//     regionName: '河北省',
//     subMerchantExpressTemplateItemRegionDetailList: [
//       {
//         ifSlected: false,
//         regionCode: '12',
//         regionName: '三河市'
//       }
//     ]
//   }
// ]

//-----------
const EditableContext = React.createContext<FormInstance<any> | null>(null)

interface Item {
  key: number
  regionArea: string
  firstCount: number
  firstPrice: number
  nextCount: number
  nextPrice: number
}

interface EditableRowProps {
  index: number
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: keyof Item
  record: Item
  handleSave: (record: Item) => void
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<Input>(null)
  const form = useContext(EditableContext)!

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()

      toggleEdit()
      console.log('values==================', values)
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}

type EditableTableProps = Parameters<typeof Table>[0]

interface DataType {
  key: React.Key
  regionArea: string
  firstCount: number
  firstPrice: number
  nextCount: number
  nextPrice: number
  ifDefault: number
  merchantExpressTemplateItemRegionDetailList: ServerData[]
  [propName: string]: any
}

interface EditableTableState {
  dataSource: DataType[]
  count: number
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>
//-----------
const ExpressTemplate = (props: any) => {
  const [companyData, setCompanyData] = useState([])
  const [dataSource, setDataSource] = useState([] as DataType[])
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [regionData, setRegionData] = useState([] as ServerData[])
  // const [initialValues, setInitialValues] = useState({})
  const [form] = Form.useForm()
  const order = useSelector<AppState, OrderState>((state) => state.order)
  // 获取dispatch
  const dispatch = useDispatch()
  const initDataSource = () => {
    form.setFieldsValue({
      name: '',
      deliveryCompany: 'EMS',
      deliveryDuration: '24小时内',
      firstCount: 0,
      firstPrice: 0,
      nextCount: 0,
      nextPrice: 0
    })
    //初始化‘指定城市, 区域运费’
    const tableData: DataType[] = [
      {
        key: count,
        regionArea: order.expressRegion.renderData,
        firstCount: 0,
        firstPrice: 0,
        nextCount: 0,
        nextPrice: 0,
        ifDefault: 0,
        merchantExpressTemplateItemRegionDetailList: []
      }
    ]
    setDataSource(tableData)
    setCount(count + 1)
  }
  //编辑地区
  const openRegionModal = (data: DataType) => {
    setIsVisible(true)
    // console.log('data========', data)
    // const indexs: any = data.key
    // console.log('dataSource=====', dataSource)
    const targetData: DataType | undefined = dataSource.find((item) => {
      return item.key === data.key
    })
    // console.log('targetData====', targetData)
    //设置弹窗初始值
    if (targetData) {
      setRegionData(targetData.merchantExpressTemplateItemRegionDetailList)
      dispatch(
        setExpressRegion(
          targetData.merchantExpressTemplateItemRegionDetailList,
          targetData.regionArea
        )
      )
    }
    // console.log('data.key====', data.key)
    dispatch(setExpressRegionKey(data.key as number))
    dispatch(isExpressRegionModalShow(true))
  }
  const columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: '运送到',
      dataIndex: 'regionArea',
      key: 'regionArea',
      width: 500,
      render: (_, record: any) => {
        return (
          <>
            <span>{record.regionArea}</span>
            <Button
              onClick={(e) => {
                openRegionModal(record as DataType)
              }}
            >
              编辑
            </Button>
          </>
        )
      }
    },
    {
      title: '首件数量',
      dataIndex: 'firstCount',
      key: 'firstCount',
      width: '10%',
      editable: true
    },
    {
      title: '首件费用',
      dataIndex: 'firstPrice',
      key: 'firstPrice',
      width: '10%',
      editable: true
    },
    {
      title: '续件数量',
      dataIndex: 'nextCount',
      key: 'nextCount',
      width: '10%',
      editable: true
    },
    {
      title: '续件费用',
      dataIndex: 'nextPrice',
      key: 'nextPrice',
      width: '10%',
      editable: true
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record: any) => {
        // console.log('record========')
        // console.log(record)
        return dataSource.length >= 1 ? (
          <Popconfirm title="确定删除吗?" onConfirm={() => handleDelete(record.key)}>
            <a>删除</a>
          </Popconfirm>
        ) : null
      }
    }
  ]
  const handleDelete = (key: React.Key) => {
    const data: DataType[] = [...dataSource]
    setDataSource(data.filter((item: DataType) => item.key !== key))
  }
  //增加运费区域配置
  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      regionArea: '',
      firstCount: 0,
      firstPrice: 0,
      nextCount: 0,
      nextPrice: 0,
      ifDefault: 0,
      merchantExpressTemplateItemRegionDetailList: []
    }
    setDataSource([...dataSource, newData])
    // console.log('add====', dataSource)
    setCount(count + 1)
  }

  const handleSave = (row: DataType) => {
    const newData = [...dataSource]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row
    })
    setDataSource(newData)
  }
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }
  const tableColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave
      })
    }
  })
  //表单提交方法
  const onFinish = async (values: any) => {
    const data = {
      id: parseInt(props.computedMatch.params.id) || NaN,
      name: values.name,
      deliveryCompany: values.deliveryCompany,
      deliveryDuration: values.deliveryDuration,
      merchantExpressTemplateItemList: [
        {
          firstCount: values.firstCount,
          firstPrice: values.firstPrice,
          ifDefault: 1,
          nextCount: values.nextCount,
          nextPrice: values.nextPrice,
          merchantExpressTemplateItemRegionDetailList: []
        },
        ...dataSource
      ]
    }
    // console.log('data====', data)
    const result: any = await templateSave(data)
    // console.log('result====', result)
    if (result.code === '000000') {
      props.history.push('/order/express')
    } else {
      console.log(result.msg || '出错了！')
    }
  }
  //配置默认提示语
  const validateMessages = {
    required: "'${label}' 是必填项"
    // ...
  }
  //表单提交失败方法
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  //根据id，获取模版详情数据,并初始化页面
  const getTemplateDetail = async (id: number) => {
    const result: any = await templateDetail({ id })
    if (result.code === '000000') {
      const itemList: DataType[] = result.data.merchantExpressTemplateItemList
      form.setFieldsValue({
        name: result.data.name,
        deliveryCompany: result.data.deliveryCompany,
        deliveryDuration: result.data.deliveryDuration,
        firstCount: itemList[0].firstCount,
        firstPrice: itemList[0].firstPrice,
        nextCount: itemList[0].nextCount,
        nextPrice: itemList[0].nextPrice
      })
      itemList.shift()
      let newServerItem: DataType[] = []
      itemList.map((item: DataType, index: number) => {
        let serverItem: DataType = {
          key: index,
          regionArea: '',
          firstCount: item.firstCount,
          firstPrice: item.firstPrice,
          nextCount: item.nextCount,
          nextPrice: item.nextPrice,
          ifDefault: 0,
          merchantExpressTemplateItemRegionDetailList: []
        }
        const detailList: ServerData[] = item.merchantExpressTemplateItemRegionDetailList
        let cities: string[] = []
        serverItem.merchantExpressTemplateItemRegionDetailList = detailList
        detailList.map((detailItem: any) => {
          if (detailItem.subMerchantExpressTemplateItemRegionDetailList.length) {
            detailItem.subMerchantExpressTemplateItemRegionDetailList.map(
              (tailItem: ServerData) => {
                cities.push(tailItem.regionName)
              }
            )
          } else {
            cities.push(detailItem.regionName)
          }
        })
        serverItem.regionArea = cities.join(',')
        newServerItem.push(serverItem)
      })
      setCount(newServerItem.length)
      setDataSource(newServerItem) //同时要存储到store的order中
    }
  }
  //当编辑地区时，更新dataSource
  useEffect(() => {
    let newData = [...dataSource]
    const targetIndex: number = newData.findIndex((item) => {
      return order.expressRegion.targetKey === item.key
    })
    if (targetIndex > -1) {
      Object.assign(newData[targetIndex], {
        regionArea: order.expressRegion.renderData as string,
        merchantExpressTemplateItemRegionDetailList: order.expressRegion.serverData
      })
      setDataSource(newData)
    }
  }, [order.expressRegion.targetKey, order.expressRegion.renderData])
  useEffect(() => {
    setIsVisible(order.expressRegion.isVisible)
  }, [order.expressRegion.isVisible])
  useEffect(() => {
    const getCompany = async () => {
      const data: any = await company()
      setCompanyData(data.data)
      //初始化页面渲染数据
      if (props.computedMatch.params.id) {
        //修改
        getTemplateDetail(props.computedMatch.params.id)
      } else {
        //添加
        initDataSource()
      }
    }
    getCompany()
  }, [])
  // console.log('initialValues====', initialValues)
  // console.log('order.expressRegion=====render====', order.expressRegion)
  // console.log('regionData===render====', regionData)
  return (
    <LayoutMenu>
      <Form
        {...layout}
        form={form}
        name="basicForm"
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        <div className={styles.basic}>
          <h2>基本信息</h2>
          <div className={styles.content}>
            <Form.Item
              name="name"
              label="模版名称"
              rules={[
                {
                  required: true,
                  message: `请输入‘模版名称’!`
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="deliveryCompany" label="物流公司名称">
              <Select style={{ width: 200 }}>
                {companyData.map((item, index) => {
                  return (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item name="deliveryDuration" label="发货时间">
              <Select style={{ width: 200 }}>
                <Option value="24小时内">24小时内</Option>
                <Option value="28小时内">48小时内</Option>
              </Select>
            </Form.Item>
          </div>
          <h2>运送方式</h2>
          <div className={styles.content}>
            <div className={styles.tip}>除指定地区外，其余地区的运费采用“默认运费”</div>
            <Form.Item label="默认运费">
              <Row>
                <Col span={5}>
                  <Form.Item name="firstCount" style={{ display: 'inline-block' }}>
                    <Input />
                  </Form.Item>
                  <span style={{ lineHeight: '30px' }}>件内</span>
                </Col>
                <Col span={6}>
                  <Form.Item name="firstPrice" style={{ display: 'inline-block' }}>
                    <Input />
                  </Form.Item>
                  <span style={{ lineHeight: '30px' }}>元，每增加</span>
                </Col>
                <Col span={7}>
                  <Form.Item name="nextCount" style={{ display: 'inline-block' }}>
                    <Input />
                  </Form.Item>
                  <span style={{ lineHeight: '30px' }}>件，增加运费</span>
                </Col>
                <Col span={6}>
                  <Form.Item name="nextPrice" style={{ display: 'inline-block' }}>
                    <Input />
                  </Form.Item>
                  <span style={{ lineHeight: '30px' }}>元</span>
                </Col>
              </Row>
            </Form.Item>
          </div>
          <h2>指定城市, 区域运费</h2>
          <div className={styles.content}>
            <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
              增加
            </Button>
            <Table
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={dataSource}
              columns={tableColumns as ColumnTypes}
            />
          </div>
        </div>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
      <RegionModal isVisible={isVisible} serverData={regionData} />
    </LayoutMenu>
  )
}
export default withRouter(ExpressTemplate)
