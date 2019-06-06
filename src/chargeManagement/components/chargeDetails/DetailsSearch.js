import React from "react";
import {Button, Form, Input, Select} from "antd";


const {Option} = Select;


/**
 *  财务报表页面的搜索按钮
 */
class DetailsSearch extends React.Component {

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
            <Form.Item label="收费项目">
                {getFieldDecorator('startTime', {
                    initialValue: 'jack',
                })(
                    <Select style={{width: 200}}>
                        <Option value="jack">2019年收费项目</Option>
                        <Option value="lucy">2018年收费项目</Option>
                    </Select>
                )}
            </Form.Item>
            <Form.Item label="名称">
                {getFieldDecorator('name', {})(
                    <Input style={{width: 200}}/>
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

export default Form.create()(DetailsSearch);