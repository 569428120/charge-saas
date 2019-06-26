import React, {Component} from "react";
import {Form, Input, InputNumber, Modal, Radio, Select} from "antd";


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
 *   关系类型
 */
const getRelationTypeDataOptions = () => {
  let relationTypes = [];
  relationTypes.push(<Option key="relation_oneself" value="relation_oneself">本人</Option>);
  relationTypes.push(<Option key="relation_father" value="relation_father">父亲</Option>);
  relationTypes.push(<Option key="relation_mother" value="relation_mother">母亲</Option>);
  relationTypes.push(<Option key="relation_other" value="relation_other">其他</Option>);
  return relationTypes;
};

/**
 *  通讯方式
 */
const getContactTypeDataRadio = () => {
  let contactTypes = [];
  contactTypes.push(<Radio key="contact_wechat" value="contact_wechat">微信</Radio>);
  contactTypes.push(<Radio key="contact_phone" value="contact_phone">手机</Radio>);
  contactTypes.push(<Radio key="contact_other" value="contact_other">其他</Radio>);
  return contactTypes;
};


/**
 *   props:
 *     visible
 *     dataSource
 *     onOk
 *     onCancel
 */
class ContactInfoModal extends Component {

  state = {
    relation: "relation_oneself",
  };

  /**
   *  ok事件
   */
  onModalOk = () => {
    const {onOk} = this.props;
    if (onOk) {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          onOk(values);
        }
      });
    }
  };

  /**
   *   关系变动
   * @param value
   */
  onRelationChange = (value) => {
    this.setState({
      relation: value,
    })
  };

  render() {

    const {getFieldDecorator} = this.props.form;
    const {name} = this.props.dataSource;

    return <Modal
      title="联系人"
      destroyOnClose={true}
      visible={this.props.visible}
      onOk={this.onModalOk}
      onCancel={this.props.onCancel}
    >
      <Form {...formItemLayout}>
        <Form.Item label="关系">
          {getFieldDecorator('relation', {
            initialValue: "relation_oneself",
            rules: [
              {
                required: true,
                message: '关系不能为空'
              }
            ]
          })(<Select onChange={this.onRelationChange} style={{width: '70%'}}>
            {getRelationTypeDataOptions()}
          </Select>)}
        </Form.Item>
        <Form.Item label="联系人名称">
          {getFieldDecorator('relationName', {
            initialValue: this.state.relation === "relation_oneself" ? name : "",
            rules: [
              {
                required: true,
                message: '联系人名称不能为空'
              }
            ]
          })(<Input style={{width: '70%'}}/>)}
        </Form.Item>
        <Form.Item label="通讯方式">
          {getFieldDecorator('contactType', {
            initialValue: "contact_wechat",
            rules: [
              {
                required: true,
                message: '通讯方式不能为空'
              }
            ]
          })(<Radio.Group style={{width: '70%'}}>
            {getContactTypeDataRadio()}
          </Radio.Group>)}
        </Form.Item>
        <Form.Item label="通讯号码">
          {getFieldDecorator('number', {
            initialValue: null,
            rules: [
              {
                required: true,
                message: '通讯号码不能为空'
              }
            ]
          })(<Input style={{width: '70%'}}/>)}
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

export default Form.create()(ContactInfoModal);
