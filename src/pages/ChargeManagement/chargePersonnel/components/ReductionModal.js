import React, {Component} from "react";
import {Form, Input, InputNumber, Modal} from "antd";

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
 *   props：
 *     visible
 *     dataSource
 *     onOk
 *     onCancel
 */
class ReductionModal extends Component {

    /**
     *  ok事件
     */
    onModalOk = () => {
        const {onOk} = this.props;
        const {id} = this.props.dataSource;
        const isEdit = !!id;
        if (onOk) {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    onOk({...values, id}, isEdit);
                }
            });
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        const {amount, description} = this.props.dataSource;

        return <Modal
            title="减免"
            destroyOnClose={true}
            visible={this.props.visible}
            onOk={this.onModalOk}
            onCancel={this.props.onCancel}
        >
            <Form {...formItemLayout}>
                <Form.Item label="减免金额">
                    {getFieldDecorator('amount', {
                        initialValue: amount,
                        rules: [
                            {
                                required: true,
                                message: '减免金额不能为空'
                            }
                        ]
                    })(<InputNumber min={0} max={100000} step={0.1}  style={{width: '70%'}}/>)}
                </Form.Item>
                <Form.Item label="减免原因">
                    {getFieldDecorator('description', {
                        initialValue: description,
                        rules: [
                            {
                                required: true,
                                message: '减免原因不能为空'
                            }
                        ]
                    })(<TextArea rows={4} style={{width: '70%'}}/>)}
                </Form.Item>
            </Form>
        </Modal>
    }
}

export default Form.create()(ReductionModal);
