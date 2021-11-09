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
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import styles from '../components/Form.module.css'
import Uploader from '../../../components/properties/components/Uploader'
const data = [
  {
    creater: '',
    id: 1,
    name: '颜色',
    sort: 0,
    specColleId: 10,
    type: 1,
    updator: '',
    value: [
      {
        id: 1,
        specColleId: 10,
        specId: 2,
        value: '白色'
      }
    ]
  },
  {
    creater: '',
    id: 2,
    name: '尺寸',
    sort: 0,
    specColleId: 12,
    type: 1,
    updator: '',
    value: [
      {
        id: 2,
        specColleId: 12,
        specId: 3,
        value: 'L'
      }
    ]
  }
]
const { Option } = Select
let skuTableData = {}
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}

//定义添加规格值from表单参数接口--sku相关
interface SkuFormProps {
  visible: boolean
  onCancel: () => void
}
// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, visible }: { form: FormInstance; visible: boolean }) => {
  const prevVisibleRef = useRef<boolean>()
  useEffect(() => {
    prevVisibleRef.current = visible
  }, [visible])
  const prevVisible = prevVisibleRef.current

  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields()
    }
  }, [visible])
}
//添加sku值的form表单组件
const SkuForm: React.FC<SkuFormProps> = ({ visible, onCancel }) => {
  const [form] = Form.useForm()
  useResetFormOnCloseModal({
    form,
    visible
  })
  const onOk = () => {
    form.submit()
  }
  return (
    <Modal title="添加规格值" visible={visible} onOk={onOk} onCancel={onCancel}>
      <Form form={form} name="skuForm">
        <Form.Item
          name="skuValue"
          style={{ width: '40%', display: 'inline-block', marginRight: '10px' }}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
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
  price: number
  stock: number
  alertStock: number
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
  currentListSpec: SkuColumns[]
  updataTime: Date
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
const SkuTable: React.FC<SkuTableFormProps> = ({ currentListSpec, updataTime }) => {
  let skuColumns: SkuColumns[] = [] //sku表格列--渲染数据
  let skuDataSource: SkuDataSource[] = [] //sku表格数据--渲染数据
  const [form] = Form.useForm()
  const [data, setData] = useState(skuDataSource)
  const [editingKey, setEditingKey] = useState('')
  const [isDataChanged, setIsDataChanged] = useState(false)
  const isEditing = (record: SkuDataSource) => record.key === editingKey

  const edit = (record: Partial<SkuDataSource> & { key: React.Key }) => {
    form.setFieldsValue({ price: 0, stock: 0, alertStock: 0, ...record })
    setEditingKey(record.key)
    setIsDataChanged(false)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as SkuDataSource

      const newData = [...data]
      const index = newData.findIndex((item) => key === item.key)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row
        })
        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      setIsDataChanged(false)
      console.log('Validate Failed:', errInfo)
    }
  }
  //生成table的columns数据
  const getSkuColumns = (listSpec: SkuColumns[]) => {
    let arr: any = []
    listSpec.map((item: SkuColumns, index) => {
      arr.push({
        title: item.name,
        dataIndex: 'value_' + item.id,
        key: 'value_' + item.id,
        fixed: 'left',
        width: 100
      })
    })
    const subArr = [
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        editable: true,
        width: 100
      },
      {
        title: '库存',
        dataIndex: 'stock',
        key: 'stock',
        editable: true,
        width: 100
      },
      {
        title: '库存预警',
        dataIndex: 'alertStock',
        key: 'alertStock',
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
  const getSkuDataSource = (listSpec: SkuColumns[], data: SkuDataSource[]) => {
    //将多个数组实现排列组合
    const tailFn = () => {
      let arrs: [][] = []
      let specNameArr: string[] = []
      for (let i = 0; i < listSpec.length; i++) {
        arrs.push(listSpec[i].value)
        specNameArr.push(listSpec[i].name)
      }
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
      // console.log('item=============')
      // console.log(item)
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
      let itemIndex = -1
      //判断记录是否存在
      if (data.length) {
        itemIndex = data.findIndex((item) => {
          let isExit = false
          const specValues: SubSkuSpec[] = subObj.subSkuSpec
          for (let i = 0; i < specValues.length; i++) {
            if (item.subSkuSpec[i].indexNum !== specValues[i].indexNum) {
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
          price: 0,
          stock: 0,
          alertStock: 0,
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
  //生成当前sku表格的渲染数据（列和数据）
  const setSkuTableData = (listSpec: SkuColumns[]) => {
    skuColumns = getSkuColumns(listSpec)
    skuDataSource = getSkuDataSource(listSpec, data)
  }
  setSkuTableData(currentListSpec)
  useEffect(() => {
    setData(skuDataSource)
  }, [updataTime])
  console.log('data=========1111')
  console.log(data)
  skuTableData = data
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
        dataSource={data}
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
//sku相关--end
//基础form表单
const GoodForm = ({ actionType, listSpec = {} }: any, ref: any) => {
  // 设置编辑器初始内容
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState('<p></p>'))
  const [sort, setSort] = useState('美妆>护肤品>官方直售')
  const [expressTemplate, setExpressTemplate] = useState('运费模版')
  // const [imageUrl, setImageUrl] = useState('')
  // const [mainFile, setMainFile] = useState([]) //已上传的主图片
  // const [files, setFiles] = useState([]) //已上传的图片列表
  // const [previewImg, setPreviewImg] = useState({
  //   previewImage: '',
  //   previewVisible: false,
  //   previewTitle: ''
  // }) //图片预览
  const [specKey, setSpecKey] = useState(NaN) //当前操作的规格数组下标
  const [currentListSpec, setCurrentListSpec] = useState(listSpec) //当前商品规格集
  const [updataTime, setUpdataTime] = useState(new Date()) //当规格值变化时，控制sku表格更新
  const [form] = Form.useForm()
  //表单提交方法
  const onFinish = (values: any) => {
    console.log(values)
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
  //选择品牌
  const onBrandChange = (value: string): void => {
    console.log(value)
  }
  // 编辑内容触发
  const handleChange = (editorState: any) => {
    setEditorState(editorState)
  }
  // //spu主图片上传
  // const handleMainUploadChange = (info: any) => {
  //   if (info.file.status === 'uploading') {
  //     // setLoading(true)
  //     return
  //   }
  //   console.log(info.file)
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     // getBase64(info.file.originFileObj, (imageUrl: string) => {
  //     //   // setImageUrl(imageUrl)
  //     // })
  //     console.log(info.fileList)
  //     // setLoading(false)
  //     setMainFile(info.fileList)
  //   }
  // }
  // //spu非主图片上传
  // const handleOtherUploadChange = ({ file, fileList }: any) => {
  //   console.log(file)
  //   if (file.status === 'done') {
  //     console.log(fileList.concat(files))
  //     setFiles(fileList.concat(files))
  //   }
  // }
  // //图片预览
  // const handlePreview = async (file: any) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getOtherBase64(file.originFileObj)
  //   }
  //   setPreviewImg({
  //     previewImage: file.url || file.preview,
  //     previewVisible: true,
  //     previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
  //   })
  // }
  // //关闭图片预览弹窗
  // const handleModalCancel = () => {
  //   // setPreviewVisible(false)
  //   setPreviewImg(Object.assign({}, previewImg, { previewVisible: false }))
  // }
  // const uploadButton = (
  //   <div>
  //     <PlusOutlined />
  //     <div style={{ marginTop: 8 }}>上传图片</div>
  //   </div>
  // )
  //sku相关--start
  //规格--控制‘添加规格’弹窗显示隐藏变量
  const [skuFormVisible, setSkuFormVisible] = useState(false)

  const showSkuForm = (key: number) => {
    setSpecKey(key) //保存当前操作的规格数组下标
    setSkuFormVisible(true)
  }

  const hideSkuForm = () => {
    setSkuFormVisible(false)
  }
  //返回商品规格UI
  const listSpecFormList = () => {
    // console.log('==========243')
    // console.log(listSpec)
    return (
      <Form.List name={'listSpec'}>
        {(fields) => (
          <>
            {fields.map((field) => (
              <Space key={field.key} style={{ width: '100%', marginRight: 30 }} align="baseline">
                <Form.Item label={listSpec[field.key].name}>
                  <Form.List name={[field.name, 'value']}>
                    {(subFields, { add, remove }) => (
                      <>
                        {subFields.map(({ key, name, fieldKey, ...restField }) => (
                          <Space
                            key={key}
                            style={{ width: '120px', marginRight: 30 }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              name={[name, 'value']}
                              fieldKey={[fieldKey, 'value']}
                            >
                              <Input />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item style={{ width: '', display: 'inline-block' }}>
                          <Button onClick={() => showSkuForm(field.key)}>+添加规格值</Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form.Item>
              </Space>
            ))}
          </>
        )}
      </Form.List>
    )
  }
  return (
    <Form.Provider
      onFormFinish={(name, { values, forms }) => {
        if (name === 'skuForm') {
          const { basicForm, skuForm } = forms
          let listSpec = basicForm.getFieldValue('listSpec') || []
          const sku = skuForm.getFieldValue('skuValue') || ''
          // console.log(sku)
          // console.log('specKey=====')
          // console.log(specKey)
          const currentSpecValue = listSpec[specKey].value
          // console.log('currentSpecValue=======')
          // console.log(currentSpecValue)
          currentSpecValue.push(Object.assign({}, currentSpecValue[0], { id: '', value: sku }))
          basicForm.setFieldsValue({ listSpec })
          console.log('414=============')
          // console.log(basicForm.getFieldValue('listSpec'))
          listSpec = basicForm.getFieldValue('listSpec') || []
          setCurrentListSpec(listSpec)
          setSkuFormVisible(false)
          setUpdataTime(new Date())
        }
        if (name === 'basicForm') {
          console.log('skuTableData=======')
          console.log(skuTableData)
          // console.log(values)
        }
      }}
      onFormChange={(formName, { changedFields, forms }) => {
        if (formName === 'basicForm') {
          console.log('changedFields========427')
          console.log(changedFields)
          if (!changedFields.length) {
            return
          }
          const { basicForm } = forms
          const listSpec = basicForm.getFieldValue('listSpec') || []
          // console.log('skuDataSource========429')
          // console.log(listSpec)
          setCurrentListSpec(listSpec)
          setUpdataTime(new Date())
        }
      }}
    >
      <Form
        {...layout}
        form={form}
        name="basicForm"
        initialValues={{
          listSpec
        }}
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        <div className={styles.basic}>
          <h2>商品基本信息</h2>
          <div className={styles.content}>
            <Form.Item style={{ width: '100%' }}>{listSpecFormList()}</Form.Item>
            <Form.Item label="库存配置">
              {/* <Table columns={skuColumns} dataSource={skuDataSource} /> */}
              {/* <SkuTable columns={skuColumns} dataSource={skuDataSource} /> */}
              <SkuTable currentListSpec={currentListSpec} updataTime={updataTime} />
            </Form.Item>
          </div>
        </div>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
      <SkuForm visible={skuFormVisible} onCancel={hideSkuForm} />
    </Form.Provider>
  )
}
export default GoodForm
