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
        <TreeNode  value="二年级" title="二年级" key="0-2">
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
        this.props.form.getFieldsValue();
    };

    /**
     *  点击重置按钮回调
     */
    onReset = () => {
        //将搜索条件清空
        this.props.form.resetFields();
    };

    onChange = value => {
        console.log(value);
        this.setState({classValue: value});
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        return <Form className="ant-advanced-search-form" style={{textAlign: 'left'}} layout="inline"
                     onSubmit={this.onSearch}>
            <Row span={24} style={{textAlign: 'center'}}>
                <Col span={18}>
                    <Row span={18}>
                        <Col span={6}>
                            <Form.Item label="学号">
                                {getFieldDecorator('email', {})(
                                    <Input style={{width: 130}}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <label>
                                班级:
                            </label>
                            <ClassTreeSelect value={this.state.classValue} onChange={this.onChange}/>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="姓名">
                                {getFieldDecorator('email', {})(
                                    <Input style={{width: 130}}/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row span={18}>
                        <Col span={6}>
                            <Form.Item label="减免">
                                {getFieldDecorator('email', {})(
                                    <Input style={{width: 130}}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="状态">
                                {getFieldDecorator('status', {})(
                                    <Select defaultValue="lucy" allowClear={true} style={{ width: 130 }} onChange={()=>{}}>
                                        <Option value="jack">已通知</Option>
                                        <Option value="lucy">未通知</Option>
                                        <Option value="Yiminghe">已缴费</Option>
                                        <Option value="Yiminghe1">未缴费</Option>
                                        <Option value="Yiminghe1">部分交费</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item label="其他">
                                {getFieldDecorator('email', {})(
                                    <Input style={{width: 130}}/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
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