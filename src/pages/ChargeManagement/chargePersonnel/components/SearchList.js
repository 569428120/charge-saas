import React, {Component} from 'react'
import {Form, Button, Row, Col, Input, TreeSelect, Select} from 'antd'


const TreeNode = TreeSelect.TreeNode;

const Option = Select.Option;

/**
 *   班级选择框
 * @constructor
 */
function ClassTreeSelect({value, onChange}) {
    return (<TreeSelect
        showSearch
        style={{width: 130}}
        value={value}
        dropdownStyle={{maxHeight: 300, overflow: 'auto'}}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={onChange}
    >
        <TreeNode value="一年级" title="一年级" key="0-1">
            <TreeNode value="1002班" title="1002班" key="random"/>
            <TreeNode value="1003班" title="1003班" key="random1"/>
        </TreeNode>
        <TreeNode value="二年级" title="二年级" key="0-2">
            <TreeNode value="2003班" title="2003班" key="random3"/>
            <TreeNode value="2004班" title="2004班" key="random4"/>
        </TreeNode>
    </TreeSelect>);
}


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