import React, {Component} from "react";
import {Checkbox, Form, Input, InputNumber, Modal, Select} from "antd";


const {TextArea} = Input;

const {Option} = Select;

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
class ChargeItemModal extends Component {

    /**
     *  ok事件
     */
    onModalOk = () => {
        const {onOk} = this.props;
        const {id} = this.props.dataSource;
        const chargeType = "charge_item";
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
        const {routeData, boardingData} = this.props;
        const {name, traffic: oldTraffic, routesCode, amount, description} = this.props.dataSource;
        const {traffic, boardingCodes} = this.props.typeSource;
        //是否展示交通路线
        const isTraffic = traffic === 1 || oldTraffic === 1;
        return <Modal
            title="收费项"
            destroyOnClose={true}
            visible={this.props.visible}
            onOk={this.onModalOk}
            onCancel={this.props.onCancel}
        >
            <Form {...formItemLayout}>
                <Form.Item label="名称">
                    {getFieldDecorator('name', {
                        initialValue: name,
                        rules: [
                            {
                                required: true,
                                message: '收费项名称不能为空'
                            }
                        ]
                    })(<Input style={{width: '70%'}}/>)}
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
                                    return <Checkbox disabled key={item.id} value={item.code}>{item.name}</Checkbox>
                                })
                            }
                        </Checkbox.Group>)}
                </Form.Item>
                {
                    !isTraffic ? null :
                        <Form.Item label="路线">
                            {getFieldDecorator('routesCode', {
                                initialValue: routesCode,
                                rules: [
                                    {
                                        required: true,
                                        message: '路线不能为空'
                                    }
                                ]
                            })(<Select style={{width: '70%'}}>
                                {
                                    routeData.map(item => {
                                        return <Option key={item.id} value={item.code}>{item.name}</Option>
                                    })
                                }
                            </Select>)}
                        </Form.Item>
                }

                <Form.Item label="金额(元)">
                    {getFieldDecorator('amount', {
                        initialValue: amount,
                        rules: [
                            {
                                required: true,
                                message: '金额不能为空'
                            }
                        ]
                    })(<InputNumber min={0} max={100000} step={0.1} style={{width: '70%'}}/>)}
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

export default Form.create()(ChargeItemModal)