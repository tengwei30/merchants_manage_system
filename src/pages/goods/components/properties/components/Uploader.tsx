import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import styles from './Uploader.module.css'

function getBase64(file: any, callback: any) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(file)
}
const getOtherBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
//上传校验
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
interface FileProps {
  keys: string
  uid: string
  name: string
  [propName: string]: any
}
interface UploaderProps {
  fieldData: FileProps[]
}
//基础form表单
const Uploader: React.FC<UploaderProps> = ({ fieldData }) => {
  const [files, setFiles] = React.useState([] as FileProps[]) //已上传的图片列表
  const [previewImg, setPreviewImg] = useState({
    previewImage: '',
    previewVisible: false,
    previewTitle: ''
  }) //图片预览
  useEffect(() => {
    setFiles(fieldData)
    // console.log(fieldData)
  }, [])
  //图片上传
  const handleChange = ({ file, fileList }: any) => {
    console.log(file)
    if (file.status === 'uploading') {
      // setLoading(true)
      return
    }
    if (file.status === 'done') {
      console.log(fileList.concat(files))
      setFiles(fileList.concat(files))
    }
  }
  //sku图片预览
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
  const handleCancel = () => {
    setPreviewImg(Object.assign({}, previewImg, { previewVisible: false }))
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  )
  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={files}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {files.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewImg.previewVisible}
        title={previewImg.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImg.previewImage} />
      </Modal>
    </>
  )
}
export default Uploader
