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
  Popconfirm,
  Radio,
  Checkbox
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
import Uploader from './Uploader'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../../../store/reduces'
import { GoodsState } from '../../../../../store/reduces/goods.reducer'
import {
  listSpecByCategoryId,
  publish,
  pageByCondition,
  brandList,
  payTypes
} from '../../../../../api/goods'
import { templateList } from '../../../../../api/order'
import useDeepCompareEffect from 'use-deep-compare-effect'
import SkuTable from './SkuTable'
import Item from 'antd/lib/list/Item'
import { setExpressRegion } from '../../../../../store/actions/order.actions'
const { Option } = Select
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}
interface subListSpec {
  id: number
  specColleId: number
  specId: number
  value: string
}
interface ListSpec {
  creater: string
  id: number
  name: string
  sort: number
  specColleId: number
  type: number
  updator: string
  value: subListSpec[]
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

//基础form表单
const GoodsForm = ({ actionType }: any, ref: any) => {
  // console.log('listSpec=======', listSpec)
  // 设置编辑器初始内容
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState('<p></p>'))
  const [sort, setSort] = useState('') //美妆>护肤品>官方直售
  const [expressTemplate, setExpressTemplate] = useState([] as object[])
  // const [imageUrl, setImageUrl] = useState('')
  // const [mainFile, setMainFile] = useState([]) //已上传的主图片
  // const [files, setFiles] = useState([]) //已上传的图片列表
  // const [previewImg, setPreviewImg] = useState({
  //   previewImage: '',
  //   previewVisible: false,
  //   previewTitle: ''
  // }) //图片预览
  const [specKey, setSpecKey] = useState(NaN) //当前操作的规格数组下标
  const [listSpec, setListSpec] = useState([] as ListSpec[]) //规格--销售属性
  const [normalListSpec, setNormalListSpec] = useState([] as ListSpec[]) //规格--普通属性
  const [brands, setBrands] = useState([]) //商品品牌集
  const [payPlainOptions, setPayPlainOptions] = useState([] as string[])
  const [payCheckedList, setPayCheckedList] = useState([] as string[])
  const [payCheckAll, setPayCheckAll] = useState(false)
  // const [updataTime, setUpdataTime] = useState(new Date()) //当规格值变化时，控制sku表格更新
  // 获取结果
  const goods = useSelector<AppState, GoodsState>((state) => state.goods)
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
  //运费模版
  const Express = () => {
    const [expressType, setExpressType] = useState('')
    const onExpressChange = (field: any) => {
      setExpressType(field.target.value)
    }
    const SuperimposedUi = () => {
      return (
        <Form.Item name="ifSuperimposed">
          <Checkbox.Group>
            <Checkbox value="1">叠加运费</Checkbox>
          </Checkbox.Group>
        </Form.Item>
      )
    }
    const expressUI = () => {
      if (expressType === '1') {
        return (
          <>
            <SuperimposedUi />
            <Form.Item name="fixedExpressPrice" label="固定运费价格">
              <Input />
            </Form.Item>
          </>
        )
      } else if (expressType === '2') {
        return (
          <>
            <SuperimposedUi />
            <Form.Item name="expressTemplateId" label="运费模版">
              <Select>
                {expressTemplate.map((item: any) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
          </>
        )
      }
    }
    useEffect(() => {
      //
    }, [expressType])
    return (
      <div className="basic">
        <h2>商品物流信息</h2>
        <div className="content">
          <Form.Item label="运费类型">
            <Form.Item name="expressType">
              <Radio.Group onChange={onExpressChange}>
                <Radio value="1">固定运费</Radio>
                <Radio value="2">使用运费模版</Radio>
                <Radio value="3">免运费</Radio>
              </Radio.Group>
            </Form.Item>
            {expressUI()}
          </Form.Item>
        </div>
      </div>
    )
  }
  //支付方式
  const onPayChange = (list: any) => {
    setPayCheckedList(list)
    setPayCheckAll(list.length === payPlainOptions.length)
  }
  const onPayCheckAllChange = (e: any) => {
    setPayCheckedList(e.target.checked ? payPlainOptions : [])
    setPayCheckAll(e.target.checked)
  }
  //返回商品普通属性UI
  const normalListSpecFormList = () => {
    // console.log('field===2222====', normalListSpec)
    const subUI = (key: number) => {
      const values = normalListSpec[key].value
      if (normalListSpec[key].value.length) {
        return (
          <Select style={{ width: 200 }}>
            {values.map((item, index) => {
              console.log(item)
              return (
                <Option key={item.id} value={item.id}>
                  {item.value}
                </Option>
              )
            })}
          </Select>
        )
      } else {
        return <Input />
      }
    }
    return (
      <Form.List name={'normalListSpec'}>
        {(fields) => (
          <>
            {fields.map((field) => {
              // console.log('field=======', field)
              return (
                <Space
                  key={field.key}
                  style={{ width: '100%', display: 'block', marginRight: 30 }}
                  align="baseline"
                >
                  <Form.Item label={normalListSpec[field.key].name} rules={[{ required: true }]}>
                    {subUI(field.key)}
                  </Form.Item>
                </Space>
              )
            })}
          </>
        )}
      </Form.List>
    )
  }
  //返回商品规格UI
  const listSpecFormList = () => {
    return (
      <Form.List name={'listSpec'}>
        {(fields) => (
          <>
            {fields.map((field) => (
              <Space
                key={field.key}
                style={{ width: '100%', display: 'block', marginRight: 30 }}
                align="baseline"
              >
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
  const onSave = async (values: any) => {
    console.log('values=====', values)
    const data = {
      brandId: values.brandId,
      categoryId: goods.category.id,
      contentList: [
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      ],
      desciption: values.desciption,
      expressTemplateId: values.expressTemplateId, //
      expressType: values.expressType,
      fixedExpressPrice: values.fixedExpressPrice,
      headImageUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      id: '',
      ifSuperimposed: values.ifSuperimposed,
      keyword: values.keyword,
      merchantGoodsImgsReqList: [
        {
          ifViedo: 0,
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }
      ],
      merchantGoodsSkuReqList: goods.skuList, //[...]
      merchantGoodsSkuSpecValueReqList: normalListSpec, //[...]
      name: values.name,
      payType: payCheckedList, //[]
      title: values.title,
      type: values.type,
      unit: values.unit
    }
    console.log('data======', data)
    // const result = await publish(data)
  }
  //form表单提交方法
  const onFormFinish = (name: string, { values, forms }: any) => {
    console.log('forms====', forms)
    if (name === 'skuForm') {
      const { basicForm, skuForm } = forms
      let listSpec = basicForm.getFieldValue('listSpec') || []
      // const sku = skuForm.getFieldValue('skuValue') || ''
      // let currentSpecValue = listSpec[specKey].value
      // console.log('currentSpecValue=======')
      // console.log(currentSpecValue)
      // currentSpecValue.push(Object.assign({}, currentSpecValue[0], { id: '', value: sku }))
      // basicForm.setFieldsValue({ listSpec })
      // console.log(basicForm.getFieldValue('listSpec'))
      // listSpec = basicForm.getFieldValue('listSpec') || []
      // console.log('listSpec===form====', listSpec)
      const newListSpec = [...listSpec]
      setListSpec(newListSpec)
      setSkuFormVisible(false)
    }
    if (name === 'basicForm') {
      console.log('values=======', values)
      onSave(values)
    }
  }
  //根据分类获取规格
  const initData = async () => {
    const brandResult: any = await brandList()
    if (brandResult.code === '000000') {
      setBrands(brandResult.data)
    }
    const payResult: any = await payTypes()
    if (payResult.code === '000000') {
      let plainOptions: string[] = []
      payResult.data.shift()
      payResult.data.map((item: any) => {
        plainOptions.push(item.value as string)
      })
      setPayPlainOptions(plainOptions)
    }
    const expressResult: any = await templateList()
    if (expressResult.code === '000000' && expressResult.data.items.length) {
      setExpressTemplate(expressResult.data.items)
    }
    setSort(goods.category.value.join('>'))
    //根据分类id，查询商品属性（包括：0-普通属性；1-销售属性）
    const result: any = await listSpecByCategoryId({
      categoryId: goods.category.id
    })
    if (result.code === '000000') {
      // const newData = result.data
      //假数据
      const newData = [
        {
          creater: '',
          id: 2,
          name: '颜色',
          sort: 0,
          specColleId: 1,
          type: 1,
          updator: '',
          value: [
            {
              id: 201,
              specColleId: 1,
              specId: 2,
              value: '黑色'
            },
            {
              id: 202,
              specColleId: 1,
              specId: 2,
              value: '红色'
            }
          ]
        },
        {
          creater: '',
          id: 3,
          name: '尺码',
          sort: 0,
          specColleId: 1,
          type: 1,
          updator: '',
          value: [
            {
              id: 301,
              specColleId: 1,
              specId: 3,
              value: 'S'
            },
            {
              id: 302,
              specColleId: 1,
              specId: 3,
              value: 'M'
            },
            {
              id: 303,
              specColleId: 1,
              specId: 3,
              value: 'L'
            }
          ]
        },
        {
          creater: '',
          id: 4,
          name: '内存',
          sort: 0,
          specColleId: 1,
          type: 1,
          updator: '',
          value: [
            {
              id: 400,
              specColleId: 1,
              specId: 4,
              value: '126G'
            },
            {
              id: 401,
              specColleId: 1,
              specId: 4,
              value: '256G'
            },
            {
              id: 402,
              specColleId: 1,
              specId: 4,
              value: '516G'
            }
          ]
        },
        {
          creater: '',
          id: 5,
          name: '材质',
          sort: 0,
          specColleId: 1,
          type: 0,
          updator: '',
          value: [
            {
              id: 500,
              specColleId: 1,
              specId: 5,
              value: '红木'
            },
            {
              id: 501,
              specColleId: 1,
              specId: 5,
              value: '橡木'
            },
            {
              id: 502,
              specColleId: 1,
              specId: 5,
              value: '谭木'
            }
          ]
        },
        {
          creater: '',
          id: 6,
          name: '质检标准',
          sort: 0,
          specColleId: 1,
          type: 0,
          updator: '',
          value: []
        }
      ]
      let listSpecData: ListSpec[] = []
      let normalListSpecData: ListSpec[] = []
      newData.map((item: ListSpec) => {
        if (item.type === 1) {
          listSpecData.push(item)
        } else {
          normalListSpecData.push(item)
        }
      })
      setListSpec(listSpecData)
      setNormalListSpec(normalListSpecData)
    }
  }
  useEffect(() => {
    initData()
  }, [])
  useEffect(() => {
    form.setFieldsValue({ listSpec, normalListSpec })
  }, [listSpec.length])
  useEffect(() => {}, [payPlainOptions.length])
  useDeepCompareEffect(() => {
    console.log('更新==object=======')
  }, [listSpec])
  console.log('ListSpec==111==', listSpec)
  // console.log('goods=====', goods)
  return (
    <Form.Provider
      onFormFinish={onFormFinish}
      onFormChange={(formName, { changedFields, forms }) => {
        if (formName === 'basicForm') {
          // console.log('changedFields========427', changedFields)
          if (!changedFields.length) {
            return
          }
          const field: any = changedFields[0]
          if (field.name[0] === 'listSpec') {
            const { basicForm } = forms
            const listSpec = basicForm.getFieldValue('listSpec') || []
            // console.log('skuDataSource========429')
            // console.log('listSpec=======form ======', listSpec)
            const newListSpec = [...listSpec]
            setListSpec(newListSpec)
          }
        }
      }}
    >
      <Form
        {...layout}
        form={form}
        name="basicForm"
        initialValues={{
          listSpec,
          normalListSpec
        }}
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        <div className={styles.basic}>
          <h2>商品基本信息</h2>
          <div className={styles.content}>
            <Form.Item label="商品分类">{sort}</Form.Item>
            <Form.Item
              name="name"
              label="商品名称"
              rules={[{ required: true }]}
              extra="商品标题名称长度至少3个字符，最长50个字符"
            >
              <Input maxLength={50} allowClear />
            </Form.Item>
            <Form.Item name="brandId" label="品牌">
              <Select onChange={onBrandChange}>
                {brands.map((item: any) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item name="type" label="商品类型">
              <Select>
                <Option value="1">普通实体商品</Option>
                <Option value="2">虚拟卡</Option>
                <Option value="3">充值类</Option>
              </Select>
            </Form.Item>
            <Form.Item name="unit" label="单位">
              <Input />
            </Form.Item>
            {/* <Form.Item name="code" label="商家货号" rules={[{ required: true }]}>
              <Input allowClear />
            </Form.Item> */}
            <Form.Item
              label="商品图片"
              rules={[{ required: true }]}
              extra="上传商品默认主图，如多规格值时将默认使用该图或分规格上传各规格主图；支持jpg、gif、png格式上传或从图片空间中选择，建议使用尺寸800x800像素以上、大小不超过1M的正方形图片"
            >
              <Uploader fieldData={[]} />
            </Form.Item>
            {normalListSpecFormList()}
            {listSpecFormList()}
            <Form.Item label="库存配置">
              <SkuTable currentListSpec={listSpec} />
            </Form.Item>
            <Form.Item label="支付方式">
              <Checkbox onChange={onPayCheckAllChange} checked={payCheckAll}>
                全部
              </Checkbox>
              <Checkbox.Group
                options={payPlainOptions}
                value={payCheckedList}
                onChange={onPayChange}
              />
            </Form.Item>
          </div>
        </div>
        <div className="basic">
          <h2>商品详情</h2>
          <div className="content">
            <Form.Item label="商品描述" rules={[{ required: true }]}>
              <Uploader fieldData={[]} />
            </Form.Item>
          </div>
        </div>
        <Express />
        <div className="basic">
          <h2>页面SEO</h2>
          <div className="">
            <Form.Item name="title" label="SEO标题" rules={[{ required: true }]}>
              <Input maxLength={50} allowClear />
            </Form.Item>
            <Form.Item name="keyword" label="SEO关键字" rules={[{ required: true }]}>
              <Input maxLength={50} allowClear />
            </Form.Item>
            <Form.Item name="desciption" label="SEO描述" rules={[{ required: true }]}>
              <Input maxLength={50} allowClear />
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
export default GoodsForm
