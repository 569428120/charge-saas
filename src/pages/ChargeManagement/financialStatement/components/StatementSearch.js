import React from "react";
import {Button, Form, DatePicker} from "antd";


const {MonthPicker} = DatePicker;

/**
 *  财务报表页面的搜索按钮
 */
class StatementSearch extends React.Component {

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

    onSearch = () => {
        const {getFieldsValue} = this.props.form;
        const {onSearch} = this.props;
        if (onSearch) {
            onSearch(getFieldsValue());
        }
    };

    /**
     * 重置
     */
    onReset = () => {
        this.props.form.resetFields();
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return <Form className="ant-advanced-search-form" layout="inline">
            <Form.Item label="开始时间">
                {getFieldDecorator('startTime', {
                    initialValue: null,
                })(
                    <MonthPicker disabledDate={this.disabledStartDate} placeholder="请选择开始时间" style={{width: 200}}/>
                )}
            </Form.Item>
            <Form.Item label="结束时间">
                {getFieldDecorator('endTime', {
                    initialValue: null,
                })(
                    <MonthPicker disabledDate={this.disabledEndDate} placeholder="请选择结束时间" style={{width: 200}}/>
                )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={this.onSearch}>
                    Search
                </Button>
            </Form.Item>
            <Form.Item>
                <Button onClick={this.onReset}>
                    Clear
                </Button>
            </Form.Item>
        </Form>;
    }

}

export default Form.create()(StatementSearch);