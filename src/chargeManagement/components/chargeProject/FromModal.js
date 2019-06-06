import React, {Component} from "react";
import {Button, Form, Input, Modal, Select, Icon, DatePicker,} from "antd";


const Option = Select.Option;

/**
 *  新增更新弹窗
 */
class FromModal extends Component {

    render() {
        const config = {
            rules: [{type: 'object', required: true, message: 'Please select time!'}],
        };
        const {getFieldDecorator} = this.props.form;

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


        const children = [];
        for (let i = 10; i < 36; i++) {
            children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        }


        return <Modal
            title="增加"
            visible={this.props.visible}
            onOk={this.props.onOk}
            onCancel={this.props.onCancel}
        >
            <Form {...formItemLayout} onSubmit={() => {
            }}>
                <Form.Item label="项目名称">
                    {getFieldDecorator('name', config)(<Input style={{width: '70%'}}/>)}
                </Form.Item>

                <Form.Item label="开始时间">
                    {getFieldDecorator('startTime', config)(<DatePicker style={{width: '70%'}}/>)}
                </Form.Item>
                <Form.Item label="结束时间">
                    {getFieldDecorator('endTime', config)(<DatePicker style={{width: '70%'}}/>)}
                </Form.Item>

                <Form.Item label="选择班级">
                    {getFieldDecorator('banji', config)(<Select mode="multiple"
                                                                style={{width: '70%'}}
                                                                placeholder="Please select"
                                                                defaultValue={['a10', 'c12']}
                                                                onChange={(value) => {
                                                                    console.log(value)
                                                                }}
                    >
                        {children}
                    </Select>)}
                </Form.Item>

                <Form.Item label="导入模板">
                    {getFieldDecorator('mob', config)(
                        <Button style={{width: '70%'}}>
                            <Icon type="upload"/> Click to Upload
                        </Button>)
                    }
                </Form.Item>


            </Form>
        </Modal>
    }

}

export default Form.create()(FromModal)