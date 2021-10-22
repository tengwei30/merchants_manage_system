import { useState } from 'react'
import { Table, Button, Space, Modal, Input, Row, Col, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons';

import LayoutMenu from '../../../components/DashBoard'
const dataList = [
  {
    key: 1,
    name: '小米',
    status: '审核中',
    validTime: '2019-02-26 --- 2020-05-29'
  },
  {
    key: 2,
    name: '华为',
    status: '审核通过',
    validTime: '2020-02-26 --- 2020-05-29'
  },
  {
    key: 3,
    name: '苹果',
    status: '审核中',
    validTime: '2018-02-26 --- 2020-05-29'
  },
]
const columns = [
  {
    title: '品牌名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '品牌有效期',
    dataIndex: 'validTime',
    key: 'validTime'
  },
]
const Brand = () => {
  const [isShowBand, setIsShowBand] = useState(false)
  const [imgList, setImgList] = useState([])
  // 上传按钮
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{marginTop: '8px'}}>上传资质</div>
    </div>
  );
  // 上传图片
  const  handleChangeImg = (res: any) => {
    console.log(res.fileList);
    setImgList(res.fileList)
  }
  // 预览图片
  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <LayoutMenu>
      <div>品牌授权</div>
      <Space style={{ width: '100%', margin: '10px 0' }}>
        <Button
          type="primary"
          onClick={() => setIsShowBand(true)}
        >
          申请品牌授权
        </Button>
      </Space>
      <Table
        bordered
        dataSource={dataList}
        columns={columns}
      />
      <Modal
        title='申请品牌授权'
        okText='保存'
        cancelText='取消'
        centered
        visible={isShowBand}
        onOk={() => setIsShowBand(false)}
        onCancel={() => setIsShowBand(false)}
      >
        <Row align='middle'>
          <Col span={4}>
            品牌名称
          </Col>
          <Col span={12}>
            <Input style={{ width: '100%' }} />
          </Col>
        </Row>
        <Row style={{margin: '20px 0'}}>品牌资质：(请上传200kb以内的图片，格式为jpg,gif,png,bmp)</Row>
        <Row>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            maxCount={1}
            fileList={imgList}
            onChange={handleChangeImg}
            onPreview={onPreview}
          >
            {uploadButton}
          </Upload>
        </Row>
      </Modal>
    </LayoutMenu>
  )
}

export default Brand