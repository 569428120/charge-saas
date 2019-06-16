import React, {Component} from "react";
import {Button, Form, Input, Modal, Icon, DatePicker,} from "antd";
import moment from "moment";

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
        const {id} = this.props.dataSource;
        const isEdit = !!id;

        this.props.form.validateFields((err, values) => {
            if (!err) {
                onOk({...values, id}, isEdit);
            }
        });
    };

    disabledStartDate = startValue => {
        const endValue = this.props.form.getFieldValue("endTime");
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = endValue => {
        const startValue = this.props.form.getFieldValue("startTime");
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const {id, name, startTime, endTime, description} = this.props.dataSource;
        return <Modal
            title={id ? "编辑" : "增加"}
            destroyOnClose={true}
            visible={this.props.visible}
            onOk={this.onModalOk}
            onCancel={this.props.onCancel}
        >
            <Form {...formItemLayout} onSubmit={() => {
            }}>
                <Form.Item label="项目名称">
                    {getFieldDecorator('name', {
                        initialValue: name,
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
                        initialValue: startTime ? moment(startTime, "YYYY-MM-DD") : null,
                        rules: [
                            {
                                required: true,
                                message: '请选择开始时间'
                            }
                        ]
                    })(<DatePicker disabledDate={this.disabledStartDate} style={{width: '70%'}}/>)}
                </Form.Item>
                <Form.Item label="结束时间">
                    {getFieldDecorator('endTime', {
                        initialValue: endTime ? moment(endTime, "YYYY-MM-DD") : null,
                        rules: [
                            {
                                required: true,
                                message: '请选择结束时间'
                            }
                        ]
                    })(<DatePicker disabledDate={this.disabledEndDate} style={{width: '70%'}}/>)}
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
                        initialValue: description,
                        rules: []
                    })(<TextArea rows={4} style={{width: '70%'}}/>)}
                </Form.Item>

            </Form>
        </Modal>
    }

}

export default Form.create()(FromModal)