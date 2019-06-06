import React, {Component} from "react";
import {Button, Cascader, Form, Icon, Input, Modal, Radio, Select} from "antd";

const {Option, OptGroup} = Select;

const InputGroup = Input.Group;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

/**
 *   增加收费人员
 */
class PersonnelModal extends Component {
    render() {
        const {getFieldDecorator} = this.props.form;

        const options = [
            {
                value: '1',
                label: '无需乘车',
            },
            {
                value: '2',
                label: '需乘车',
                children: [
                    {
                        value: '01',
                        label: '路线1ds',
                    },
                    {
                        value: '02',
                        label: '路线2ssssssss',
                    }
                ],
            },
        ];

        return <Modal
            title="缴费人员"
            width={700}
            visible={this.props.visible}
            onOk={this.props.onOk}
            onCancel={this.props.onCancel}
        >
            <Form {...formItemLayout} onSubmit={() => {
            }}>
                <Form.Item label="姓名">
                    {getFieldDecorator('name', {
                        initialValue: null,
                        rules: [
                            {required: true, message: '分类名称不能为空'}
                        ]
                    })(<Input style={{width: '70%'}}/>)}
                </Form.Item>

                <Form.Item label="学号">
                    {getFieldDecorator('studentId', {
                        initialValue: null,
                        rules: [
                            {required: true, message: '分类名称不能为空'}
                        ]
                    })(<Input style={{width: '70%'}}/>)}
                </Form.Item>

                <Form.Item label="班级">
                    {getFieldDecorator('class', {
                        initialValue: 'jack',
                        rules: [
                            {required: true, message: '分类名称不能为空'}
                        ]
                    })(<Select defaultValue="lucy" style={{width: '70%'}}>
                            <OptGroup label="一年级">
                                <Option value="jack">1002班</Option>
                                <Option value="lucy">1003班</Option>
                            </OptGroup>
                            <OptGroup label="二年级">
                                <Option value="Yiminghe" title="二年级2001班">2001班</Option>
                            </OptGroup>
                        </Select>
                    )}
                </Form.Item>

                <Form.Item label="寄读方式">
                    {getFieldDecorator('other1', {
                        initialValue: "a",
                        rules: [
                            {required: true, message: '分类名称不能为空'}
                        ]
                    })(<Radio.Group style={{width: '90%'}}>
                        <Radio value="a">全托</Radio>
                        <Radio value="b">半托</Radio>
                        <Radio value="c">走读</Radio>
                    </Radio.Group>)}
                </Form.Item>

                <Form.Item label="是否乘车">
                    {getFieldDecorator('other211', {
                        initialValue: ['1'],
                        rules: [
                            {required: true, message: '分类名称不能为空'}
                        ]
                    })(<Cascader options={options} placeholder="Please select" style={{width: '70%'}}/>)}
                </Form.Item>


                <Form.Item label="联系方式">

                    {getFieldDecorator('contactInfos', {
                        initialValue: null,
                        rules: [
                            {required: true, message: '分类名称不能为空'}
                        ]
                    })(<InputGroup compact style={{width: '85%'}}>
                        <Select defaultValue="Zhejiang" style={{width: '23%'}}>
                            <Option value="Zhejiang">本人</Option>
                            <Option value="Jiangsu">父亲</Option>
                            <Option value="Jiangsu1">母亲</Option>
                            <Option value="Jiangsu2">其他</Option>
                        </Select>
                        <Select defaultValue="Zhejiang" style={{width: '23%'}}>
                            <Option value="Zhejiang">微信</Option>
                            <Option value="Jiangsu">手机</Option>
                            <Option value="Jiangsu2">其他</Option>
                        </Select>

                        <Input style={{width: '54%'}}/></InputGroup>
                    )}
                    <Button type="dashed" onClick={() => {
                    }}>
                        <Icon type="plus"/>
                    </Button>
                </Form.Item>

                <Form.Item label="减免">
                    {getFieldDecorator('other2111', {
                        initialValue: ['1'],
                    })(<div/>)}
                    <Button type="dashed" onClick={() => {
                    }}>
                        <Icon type="plus"/> 增加
                    </Button>
                </Form.Item>
            </Form>
        </Modal>;
    }
}

export default Form.create()(PersonnelModal);