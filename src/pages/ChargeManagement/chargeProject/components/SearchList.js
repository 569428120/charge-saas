import React, {Component} from 'react'
import {Form, Button, Input, DatePicker} from 'antd'


/**
 * 搜索组件
 */
class SearchList extends Component {

    disabledStartDate = startValue => {
        const endValue = this.props.form.getFieldValue("endTime");
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = endValue => {
        const startValue = this.props.form.getFieldValue("startTime");
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    /**
     *  点击搜索按钮事件回调
     */
    onSearch = () => {
        const {getFieldsValue} = this.props.form;
        const {onSearch} = this.props;
        if (onSearch) {
            onSearch(getFieldsValue());
        }
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
        return <Form className="ant-advanced-search-form" layout="inline">
            <Form.Item label="名称">
                {getFieldDecorator('name', {})(<Input style={{width: 150}}/>)}
            </Form.Item>
            <Form.Item label="时间段">
                {getFieldDecorator('startTime', {
                    initialValue: null,
                })(
                    <DatePicker disabledDate={this.disabledStartDate} placeholder="请选择开始时间" style={{width: 150}}/>
                )}
            </Form.Item>
            <Form.Item>
                -
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('endTime', {
                    initialValue: null,
                })(
                    <DatePicker disabledDate={this.disabledEndDate} placeholder="请选择结束时间" style={{width: 150}}/>
                )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={this.onSearch}>
                    Search
                </Button>
            </Form.Item>
            <Form.Item>
                <Button onClick={this.onReset}>
                    Clear
                </Button>
            </Form.Item>
        </Form>
    }
}


export default Form.create()(SearchList)