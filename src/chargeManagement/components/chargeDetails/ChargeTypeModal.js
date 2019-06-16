import React, {Component} from "react";
import {Checkbox, Form, Input, Modal, Radio} from "antd";


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
 *  收费类型弹窗
 */
class ChargeTypeModal extends Component {

    /**
     *  ok事件
     */
    onModalOk = () => {
        const {onOk} = this.props;
        const {id} = this.props.dataSource;
        const chargeType = "charge_type";
        const isEdit = !!id;
        if (onOk) {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    onOk({...values, id, chargeType}, isEdit);
                }
            });
        }
    };

    render() {

        const {getFieldDecorator} = this.props.form;
        const {id, name, traffic, description, boardingCodes} = this.props.dataSource;

        const {boardingData} = this.props;

        let disabled = false;
        if (id) {
            disabled = true;
        }


        return <Modal
            title="分类"
            destroyOnClose={true}
            visible={this.props.visible}
            onOk={this.onModalOk}
            onCancel={this.props.onCancel}
        >
            <Form {...formItemLayout} >
                <Form.Item label="名称">
                    {getFieldDecorator('name', {
                        initialValue: name,
                        rules: [
                            {
                                required: true,
                                message: '名称不能为空'
                            }
                        ]
                    })(<Input style={{width: '70%'}}/>)}
                </Form.Item>

                <Form.Item label="交通费">
                    {getFieldDecorator('traffic', {
                        initialValue: traffic === 1 ? "1" : "0",
                        rules: [
                            {
                                required: true,
                                message: '费用类型不能为空'
                            }
                        ]
                    })(
                        <Radio.Group>
                            <Radio disabled={disabled} value="0">否</Radio>
                            <Radio disabled={disabled} value="1">是</Radio>
                        </Radio.Group>)}
                </Form.Item>

                <Form.Item label="收费范围">
                    {getFieldDecorator('boardingCodes', {
                        initialValue: boardingCodes ? boardingCodes.split(",") : boardingData.map(item => item.code),
                        rules: [
                            {required: true, message: '收费范围不能为空'}
                        ]
                    })(
                        <Checkbox.Group>
                            {
                                boardingData.map(item => {
                                    return <Checkbox disabled={disabled}
                                                     key={item.id}
                                                     value={item.code}>
                                        {item.name}
                                    </Checkbox>
                                })
                            }
                        </Checkbox.Group>)}
                </Form.Item>

                <Form.Item label="描述">
                    {getFieldDecorator('description', {
                        initialValue: description,
                        rules: []
                    })(<TextArea rows={4} style={{width: '70%'}}/>)}
                </Form.Item>

            </Form>

        </Modal>;
    }
}

export default Form.create()(ChargeTypeModal)