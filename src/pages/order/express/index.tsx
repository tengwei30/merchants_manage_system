import React, { useState, useRef, useEffect, useContext } from 'react'
import { Form, Select, Row, Col, Input, Button, Cascader, Table, Popconfirm, Modal } from 'antd'
import { FormInstance } from 'antd/lib/form'
import LayoutMenu from '../../../components/DashBoard'
import RegionModal from '../express/regionModal'
import { company } from '../../../api/order'
import styles from '../express/index.module.css'
const { Option } = Select
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}

//-----------
const EditableContext = React.createContext<FormInstance<any> | null>(null)

interface Item {
  key: string
  name: string
  age: string
  address: string
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
}

interface EditableTableState {
  dataSource: DataType[]
  count: number
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>
//-----------
const Express: React.FC<EditableTableProps> = () => {
  const tableData: DataType[] = [
    {
      key: 0,
      regionArea: '',
      firstCount: 0,
      firstPrice: 0,
      nextCount: 0,
      nextPrice: 0
    }
  ]
  const [companyData, setCompanyData] = useState([])
  const [dataSource, setDataSource] = useState(tableData)
  const [count, setCount] = useState(tableData.length)
  const [form] = Form.useForm()
  const columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: '运送到',
      dataIndex: 'regionArea',
      key: 'regionArea',
      render: (_, record: any) => {
        // console.log('record========')
        // console.log(record)
        return <Button>编辑</Button>
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
    // console.log('key=====')
    // console.log(key)
    const data: DataType[] = [...dataSource]
    setDataSource(data.filter((item: DataType) => item.key !== key))
  }

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      regionArea: '',
      firstCount: 0,
      firstPrice: 0,
      nextCount: 0,
      nextPrice: 0
    }
    setDataSource([...dataSource, newData])
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

  useEffect(() => {
    const getCompany = async () => {
      const data: any = await company()
      setCompanyData(data.data)
    }
    getCompany()
  }, [companyData.length])
  //表单提交方法
  const onFinish = (values: any) => {
    console.log('values=========')
    console.log(values)
    console.log('dataSource=========')
    console.log(dataSource)
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
  const onCompanyChange = () => {
    //
  }
  console.log(companyData[0])
  return (
    <LayoutMenu>
      <Form
        {...layout}
        form={form}
        name="basicForm"
        initialValues={{
          deliveryCompany: 'EMS',
          deliveryDuration: '24h',
          firstCount: 0,
          firstPrice: 0,
          nextCount: 0,
          nextPrice: 0
        }}
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
              <input />
            </Form.Item>
            <Form.Item name="deliveryCompany" label="物流公司名称">
              <Select onChange={onCompanyChange} style={{ width: 200 }}>
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
                <Option value="24h">24小时</Option>
                <Option value="48h">48小时</Option>
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
                    <input />
                  </Form.Item>
                  <span style={{ lineHeight: '30px' }}>件内</span>
                </Col>
                <Col span={6}>
                  <Form.Item name="firstPrice" style={{ display: 'inline-block' }}>
                    <input />
                  </Form.Item>
                  <span style={{ lineHeight: '30px' }}>元，每增加</span>
                </Col>
                <Col span={7}>
                  <Form.Item name="nextCount" style={{ display: 'inline-block' }}>
                    <input />
                  </Form.Item>
                  <span style={{ lineHeight: '30px' }}>件，增加运费</span>
                </Col>
                <Col span={6}>
                  <Form.Item name="nextPrice" style={{ display: 'inline-block' }}>
                    <input />
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
      <RegionModal isVisible={true} />
    </LayoutMenu>
  )
}
export default Express
