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
     * 下来选择事件
     * @param value
     */
    onSelectChange = (value) => {
        const {onSelectChange} = this.props;
        if (onSelectChange) {
            onSelectChange(value);
        }
        this.props.form.resetFields(["name"]);
    };


    /**
     * 重置
     */
    onReset = () => {
        this.props.form.resetFields();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {projectData} = this.props;
        //历史数据
        const {projectId, name} = this.props.dataSource;

        return <Form className="ant-advanced-search-form" layout="inline">
            <Form.Item label="收费项目">
                {getFieldDecorator('projectId', {
                    initialValue: projectId,
                })(
                    <Select onChange={this.onSelectChange} style={{width: 200}}>
                        {
                            projectData.map(item => {
                                return <Option key={item.id} value={item.id}>{item.name}</Option>
                            })
                        }
                    </Select>
                )}
            </Form.Item>
            <Form.Item label="名称">
                {getFieldDecorator('name', {
                    initialValue: name,
                })(
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