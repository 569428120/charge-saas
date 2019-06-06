import React, {Component} from 'react'
import {Form, Button, Row, Col, Input} from 'antd'


/**
 * 搜索组件
 */
class SearchList extends Component {

    /**
     *  点击搜索按钮事件回调
     */
    onSearch = () => {
        this.props.form.getFieldsValue();
    };

    /**
     *  点击重置按钮回调
     */
    onReset = () => {
        //将搜索条件清空
        this.props.form.resetFields();
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        return <Form className="ant-advanced-search-form" style={{textAlign: 'left'}} layout="inline"
                     onSubmit={this.onSearch}>
            <Row span={24}>
                <Col span={18}>
                    <Form.Item label="名称">
                        {getFieldDecorator('email', {})(<Input/>)}
                    </Form.Item>
                    <Form.Item label="开始时间">
                        {getFieldDecorator('email', {})(<Input/>)}
                    </Form.Item>
                </Col>
                <Col span={6} style={{textAlign: 'left'}}>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                    <Button style={{marginLeft: 8}}>
                        Clear
                    </Button>
                </Col>
            </Row>
        </Form>
    }
}


export default Form.create()(SearchList)