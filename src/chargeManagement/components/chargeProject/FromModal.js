import React, {Component} from "react";
import {Button, Form, Input, Modal, Icon, DatePicker,} from "antd";

const {TextArea} = Input;

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
 *  新增更新弹窗
 */
class FromModal extends Component {

    /**
     *  提交表单
     */
    onModalOk = () => {
        const {onOk} = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                onOk(values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return <Modal
            title="增加"
            visible={this.props.visible}
            onOk={this.onModalOk}
            onCancel={this.props.onCancel}
        >
            <Form {...formItemLayout} onSubmit={() => {
            }}>
                <Form.Item label="项目名称">
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: '请输入项目名称'
                            }
                        ]
                    })(
                        <Input style={{width: '70%'}}/>)}
                </Form.Item>

                <Form.Item label="开始时间">
                    {getFieldDecorator('startTime', {
                        rules: [
                            {
                                required: true,
                                message: '请选择开始时间'
                            }
                        ]
                    })(<DatePicker style={{width: '70%'}}/>)}
                </Form.Item>
                <Form.Item label="结束时间">
                    {getFieldDecorator('endTime', {
                        rules: [
                            {
                                required: true,
                                message: '请选择结束时间'
                            }
                        ]
                    })(<DatePicker style={{width: '70%'}}/>)}
                </Form.Item>

                <Form.Item label="导入模板">
                    {getFieldDecorator('mob', [])(
                        <Button style={{width: '70%'}}>
                            <Icon type="upload"/> Click to Upload
                        </Button>)
                    }
                </Form.Item>

                <Form.Item label="描述">
                    {getFieldDecorator('description', {
                        rules: []
                    })(<TextArea rows={4} style={{width: '70%'}}/>)}
                </Form.Item>

            </Form>
        </Modal>
    }

}

export default Form.create()(FromModal)