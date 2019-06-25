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
 *   props:
 *     visible
 *     loading
 *     dataSource
 *     onOk
 *     onCancel
 */
class ContactInfoModal extends Component {
  /**
   *  ok事件
   */
  onModalOk = () => {
    const {onOk} = this.props;
    if (onOk) {
      onOk({...values});
    }
  };

  render() {

    const {getFieldDecorator} = this.props.form;
    const amount = null;
    return <Modal
      title="联系人"
      destroyOnClose={true}
      visible={this.props.visible}
      onOk={this.onModalOk}
      onCancel={this.props.onCancel}
    >
      <Form {...formItemLayout}>
        <Form.Item label="关系">
          {getFieldDecorator('amount', {
            initialValue: amount,
            rules: [
              {
                required: true,
                message: '关系不能为空'
              }
            ]
          })(<InputNumber min={0} max={100000} step={0.1} style={{width: '70%'}}/>)}
        </Form.Item>
        <Form.Item label="联系人名称">
          {getFieldDecorator('relationName', {
            initialValue: amount,
            rules: [
              {
                required: true,
                message: '联系人名称不能为空'
              }
            ]
          })(<InputNumber min={0} max={100000} step={0.1} style={{width: '70%'}}/>)}
        </Form.Item>
        <Form.Item label="通讯方式">
          {getFieldDecorator('contactType', {
            initialValue: amount,
            rules: [
              {
                required: true,
                message: '通讯方式不能为空'
              }
            ]
          })(<InputNumber min={0} max={100000} step={0.1} style={{width: '70%'}}/>)}
        </Form.Item>
        <Form.Item label="通讯号码">
          {getFieldDecorator('number', {
            initialValue: amount,
            rules: [
              {
                required: true,
                message: '通讯号码不能为空'
              }
            ]
          })(<InputNumber min={0} max={100000} step={0.1} style={{width: '70%'}}/>)}
        </Form.Item>
        <Form.Item label="描述">
          {getFieldDecorator('description', {
            initialValue: null,
          })(<TextArea rows={4} style={{width: '70%'}}/>)}
        </Form.Item>
      </Form>

    </Modal>;
  }
}

export default ContactInfoModal;
