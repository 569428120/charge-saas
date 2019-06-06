import React, {Component} from "react";
import {Form, Input, Modal} from "antd";


const {TextArea} = Input;

/**
 *  收费类型弹窗
 */
class ChargeItemModal extends Component {


    render() {

        const {getFieldDecorator} = this.props.form;
        const {name, desc} = this.props.record;


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

        return <Modal
            title="收费项"
            visible={this.props.visible}
            onOk={this.props.onOk}
            onCancel={this.props.onCancel}
        >
            <Form {...formItemLayout} onSubmit={() => {
            }}>
                <Form.Item label="分类名称">
                    {getFieldDecorator('name', {
                        initialValue: name,
                        rules: [
                            {required: true, message: '分类名称不能为空'}
                        ]
                    })(<Input style={{width: '70%'}}/>)}
                </Form.Item>
                <Form.Item label="分类描述">
                    {getFieldDecorator('desc', {
                        initialValue: desc,
                        rules: []
                    })(<TextArea rows={4} style={{width: '70%'}}/>)}
                </Form.Item>

            </Form>

        </Modal>;
    }
}

export default Form.create()(ChargeItemModal)