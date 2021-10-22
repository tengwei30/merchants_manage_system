import { useState } from 'react';
import {Form, Row, Col, Input, Button, Cascader} from 'antd';

const SearchForm = () =>{
    const [form] = Form.useForm();

    const onFinish = (values:any) =>{
        console.log(values);
    }
    return (
        <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
        >
           <Row gutter={24}>
                <Col span={6}>
                    <Form.Item
                        name="商品名称"
                        label="商品名称"
                    >
                        <Input placeholder="请输入商品名称"/>
                    </Form.Item>
                </Col>
           </Row> 
        </Form>
    )
}