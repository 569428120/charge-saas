import React, {Component} from "react";
import {DatePicker, Form, Input, Modal, Select} from "antd";

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
 *  消息类型
 * @returns {Array}
 */
const getMessageTypeOptions = () => {
  const messageTypes = [];
  messageTypes.push(<Option key="message_type_notice" value="message_type_notice">普通消息</Option>);
  messageTypes.push(<Option key="message_type_charge" value="message_type_charge">收费清单</Option>);
  return messageTypes;
};

/**
 *   props:
 *     visible
 *     onOk
 *     onCancel
 */
class NoticeModal extends Component {

  state = {
    messageType: null,
    testPlaceholder: null,
    textDisabled: false,
  };


  /**
   *   消息类型变动
   * @param messageType
   */
  onMessageTypeChange = (messageType) => {
    let textDisabled = false;
    let testPlaceholder = null;
    if (messageType === "message_type_charge") {
      textDisabled = true;
      testPlaceholder = "内容为收费清单";
    }
    this.setState({
      textDisabled,
      testPlaceholder,
      messageType
    })
  };

  render() {
    const {getFieldDecorator} = this.props.form;

    return <Modal
      title="通知"
      destroyOnClose={true}
      visible={this.props.visible}
      onOk={this.onModalOk}
      onCancel={this.props.onCancel}
    >
      <Form {...formItemLayout}>
        <Form.Item label="标题">
          {getFieldDecorator('title', {
            initialValue: null,
            rules: [
              {
                required: true,
                message: '标题不能为空'
              }
            ]
          })(<Input style={{width: '70%'}}/>)}
        </Form.Item>
        <Form.Item label="发送时间">
          {getFieldDecorator('sendTime', {
            initialValue: null,
            rules: [
              {
                required: true,
                message: '发送时间不能为空'
              }
            ]
          })(<DatePicker style={{width: '70%'}}/>)}
        </Form.Item>
        <Form.Item label="消息类型">
          {getFieldDecorator('messageType', {
            initialValue: "message_type_notice",
            rules: [
              {
                required: true,
                message: '消息类型不能为空'
              }
            ]
          })(<Select onChange={this.onMessageTypeChange} style={{width: '70%'}}>
            {getMessageTypeOptions()}
          </Select>)}
        </Form.Item>
        <Form.Item label="内容">
          {getFieldDecorator('description', {
            initialValue: this.state.textDisabled === true ? "" : null,
            rules: [
              {
                required: true,
                message: '内容不能为空'
              }
            ]
          })(<TextArea placeholder={this.state.testPlaceholder}
                       disabled={this.state.textDisabled} rows={4}
                       style={{width: '70%'}}/>)}
        </Form.Item>
      </Form>
    </Modal>;
  }
}

export default Form.create()(NoticeModal);
