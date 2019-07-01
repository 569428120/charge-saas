import React, {Component} from 'react'
import {Form, Button, Row, Col, Input, TreeSelect, Select} from 'antd'



const Option = Select.Option;



/**
 * 搜索组件
 */
class SearchList extends Component {

    state = {
        classValue: null
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

    onChange = value => {
        this.setState({classValue: value});
    };

    /**
     * 下来选择事件
     * @param value
     */
    onProjectSelectChange = (value) => {
        const {onProjectSelectChange} = this.props;
        if (onProjectSelectChange) {
            onProjectSelectChange(value);
        }
        this.props.form.resetFields(["name"]);
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const {projectData} = this.props;
        //历史数据
        const {projectId, studentId, name} = this.props.dataSource;

        return <Form className="ant-advanced-search-form" layout="inline">

            <Form.Item label="收费项目">
                {getFieldDecorator('projectId', {
                    initialValue: projectId,
                })(
                    <Select onChange={this.onProjectSelectChange} style={{width: 200}}>
                        {
                            projectData.map(item => {
                                return <Option key={item.id} value={item.id}>{item.name}</Option>
                            })
                        }
                    </Select>
                )}
            </Form.Item>

            <Form.Item label="学号">
                {getFieldDecorator('studentId', {
                    initialValue: studentId,
                })(
                    <Input style={{width: 200}}/>
                )}
            </Form.Item>
            <Form.Item label="姓名">
                {getFieldDecorator('name', {
                    initialValue: name,
                })(
                    <Input style={{width: 200}}/>
                )}
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={this.onSearch}>
                    查询
                </Button>
            </Form.Item>
            <Form.Item>
                <Button onClick={this.onReset}> 重置</Button>
            </Form.Item>
        </Form>
    }
}


export default Form.create()(SearchList)
