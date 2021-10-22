import React, { useState } from 'react';
import { Table, Radio, Divider } from 'antd';

const columns = [
  {
    title: '商品编码',
    dataIndex: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '产品名称',
    dataIndex: 'age',
    editable: true,
  },
  {
    title: '审核状态',
    dataIndex: 'age',
  },
  {
    title: '是否支持分期',
    dataIndex: 'address',
  },
  {
    title: '单价',
    dataIndex: 'address',
  },
  {
    title: '库存',
    dataIndex: 'address',
  },
  {
    title: '总销量',
    dataIndex: 'address',
  },
  {
    title: '发布时间',
    dataIndex: 'address',
  },
  {
    title: '总销量',
    dataIndex: 'address',
  }
];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

const List = () => {

  return (
    <div>
      <Divider />
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default List
