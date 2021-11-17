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
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../../../store/reduces'
import { GoodState } from '../../../../../store/reduces/good.reducer'
import { listSpecByCategoryId, publish, pageByCondition } from '../../../../../api/good'
import useDeepCompareEffect from 'use-deep-compare-effect'
import SkuTable from '../components/SkuTable'
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
const GoodForm = ({ actionType }: any, ref: any) => {
  // console.log('listSpec=======', listSpec)
  // 设置编辑器初始内容
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState('<p></p>'))
  const [sort, setSort] = useState('') //美妆>护肤品>官方直售
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
  const [listSpec, setListSpec] = useState([] as ListSpec[]) //当前商品规格集
  // const [currentListSpec, setCurrentListSpec] = useState([]) //当前商品规格集
  const [updataTime, setUpdataTime] = useState(new Date()) //当规格值变化时，控制sku表格更新
  // 获取结果
  const good = useSelector<AppState, GoodState>((state) => state.good)
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
  //form表单提交方法
  const onFormFinish = (name: string, { values, forms }: any) => {
    console.log('forms====', forms)
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
      // console.log(basicForm.getFieldValue('listSpec'))
      listSpec = basicForm.getFieldValue('listSpec') || []
      // console.log('listSpec===form====', listSpec)
      const newListSpec = [...listSpec]
      setListSpec(newListSpec)
      setSkuFormVisible(false)
      // setUpdataTime(new Date())
    }
    if (name === 'basicForm') {
      console.log('values=======', values)
      //
    }
  }
  //根据分类获取规格
  const initData = async () => {
    // console.log(good.category)
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
      }
    ]
    setSort(good.category.value.join('>'))
    // const result: any = await listSpecByCategoryId({
    //   categoryId: good.category.id
    // })
    // if (result.code === '000000') {
    //   const newData = result.data.filter((item: any) => {
    //     return item.type === 0
    //   })
    //   console.log('newData====', newData)
    //   setListSpec(newData)
    // }
    //启用假数据
    setListSpec(newData)
  }
  useEffect(() => {
    initData()
  }, [])
  useEffect(() => {
    // console.log('更新=======')
    form.setFieldsValue({ listSpec })
  }, [listSpec.length])
  // useDeepCompareEffect(() => {
  //   // console.log('更新==object=======')
  //   // form.setFieldsValue({ listSpec })
  // }, [listSpec])
  console.log('ListSpec==111==', listSpec)
  return (
    <Form.Provider
      onFormFinish={onFormFinish}
      onFormChange={(formName, { changedFields, forms }) => {
        if (formName === 'basicForm') {
          console.log('changedFields========427', changedFields)
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
          listSpec
        }}
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        <div className={styles.basic}>
          <h2>商品基本信息</h2>
          <div className={styles.content}>
            <Form.Item label="商品分类">{sort}</Form.Item>
            <Form.Item
              name="goodName"
              label="商品名称"
              rules={[{ required: true }]}
              extra="商品标题名称长度至少3个字符，最长50个字符"
            >
              <Input maxLength={50} allowClear />
            </Form.Item>
            <Form.Item name="brandId" label="品牌">
              <Select onChange={onBrandChange}>
                <Option value="1">欧莱雅</Option>
                <Option value="2">雅诗兰黛</Option>
                <Option value="3">兰蔻</Option>
              </Select>
            </Form.Item>
            <Form.Item name="code" label="商家货号" rules={[{ required: true }]}>
              <Input allowClear />
            </Form.Item>
            <Form.Item name="minPrice" label="最低价格">
              <Input />
            </Form.Item>
            <Form.Item
              name="goodPrice"
              label="商品价格"
              rules={[{ required: true }]}
              extra="价格必须是0.01~9999999之间的数字，且不能高于市场价。 <br />
                    此价格为商品实际销售价格，如果商品存在规格，该价格显示最低价格。"
            >
              <Input style={{ width: '20%' }} suffix="¥" />
            </Form.Item>
            <Form.Item
              label="商品图片"
              rules={[{ required: true }]}
              extra="上传商品默认主图，如多规格值时将默认使用该图或分规格上传各规格主图；支持jpg、gif、png格式上传或从图片空间中选择，建议使用尺寸800x800像素以上、大小不超过1M的正方形图片"
            >
              <Uploader fieldData={[]} />
            </Form.Item>
            {listSpecFormList()}
            <Form.Item label="库存配置">
              <SkuTable currentListSpec={listSpec} />
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
        <div className="basic">
          <h2>商品物流信息</h2>
          <div className="content">
            <Form.Item label="运费">
              <span>{expressTemplate}</span>
              <Button>确定</Button>
            </Form.Item>
          </div>
        </div>
        <div className="basic">
          <h2>页面SEO</h2>
          <div className="">
            <Form.Item name="title" label="SEO标题" rules={[{ required: true }]}>
              <Input maxLength={50} allowClear />
            </Form.Item>
            <Form.Item name="keyword" label="SEO关键字" rules={[{ required: true }]}>
              <Input maxLength={50} allowClear />
            </Form.Item>
            <Form.Item name="description" label="SEO描述" rules={[{ required: true }]}>
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
export default GoodForm
