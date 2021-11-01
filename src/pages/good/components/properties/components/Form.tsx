import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  Upload,
  message,
  Modal,
  Space,
  Avatar,
  Typography
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
// import { RSA_NO_PADDING } from 'constants'
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
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}
//商品图片上传--头图
function getBase64(file: any, callback: any) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(file)
}
//商品图片上传--普通
const getOtherBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
//商品图片上传--上传校验
function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}
//sku相关
interface SkuType {
  skuValue: string
}
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
//添加sku值的form表单
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
    <Modal title="Basic Drawer" visible={visible} onOk={onOk} onCancel={onCancel}>
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
const GoodForm = (props: any, ref: any) => {
  // 设置编辑器初始内容
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState('<p></p>'))
  const [sort, setSort] = useState('美妆>护肤品>官方直售')
  const [expressTemplate, setExpressTemplate] = useState('运费模版')
  // const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [mainFile, setMainFile] = useState([]) //已上传的主图片
  const [files, setFiles] = useState([]) //已上传的图片列表
  const [previewImg, setPreviewImg] = useState({
    previewImage: '',
    previewVisible: false,
    previewTitle: ''
  }) //图片预览
  // const [previewVisible, setPreviewVisible] = useState(false) //是否显示图片预览弹窗
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
  //主图片上传
  const handleMainUploadChange = (info: any) => {
    if (info.file.status === 'uploading') {
      // setLoading(true)
      return
    }
    console.log(info.file)
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, (imageUrl: string) => {
      //   // setImageUrl(imageUrl)
      // })
      console.log(info.fileList)
      // setLoading(false)
      setMainFile(info.fileList)
    }
  }
  //非主图片上传
  const handleOtherUploadChange = ({ file, fileList }: any) => {
    console.log(file)
    if (file.status === 'done') {
      console.log(fileList.concat(files))
      setFiles(fileList.concat(files))
    }
  }
  //图片预览
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getOtherBase64(file.originFileObj)
    }
    setPreviewImg({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    })
  }
  //关闭图片预览弹窗
  const handleModalCancel = () => {
    // setPreviewVisible(false)
    setPreviewImg(Object.assign({}, previewImg, { previewVisible: false }))
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  )
  //sku相关--start
  const [skuFormVisible, setSkuFormVisible] = useState(false)

  const showSkuForm = () => {
    setSkuFormVisible(true)
  }

  const hideSkuForm = () => {
    setSkuFormVisible(false)
  }
  //sku相关--end
  return (
    <Form.Provider
      onFormFinish={(name, { values, forms }) => {
        if (name === 'skuForm') {
          console.log(name)
          const { basicForm } = forms
          const skus = basicForm.getFieldValue('skus') || []
          basicForm.setFieldsValue({ skus: [...skus, values] })
          // console.log(values)
          // console.log(skus)
          setSkuFormVisible(false)
        }
        if (name === 'basicForm') {
          console.log('237')
          console.log(values)
        }
      }}
    >
      <Form
        {...layout}
        form={form}
        name="basicForm"
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        <div className={styles.basic}>
          <h2>商品基本信息</h2>
          <div className={styles.content}>
            <Form.Item label="颜色">
              <Form.List name="skus">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Space key={key} style={{ width: '12%', marginRight: 30 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'skuValue']}
                          fieldKey={[fieldKey, 'skuValue']}
                        >
                          <Input />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item style={{ width: '20%', display: 'inline-block' }}>
                      <Button onClick={showSkuForm}>+添加规格值</Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
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
