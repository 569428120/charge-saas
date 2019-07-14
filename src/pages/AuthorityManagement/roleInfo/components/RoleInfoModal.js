import React, {Component} from "react";
import {Form, Input, Modal} from "antd";
import PropTypes from "prop-types";

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


class RoleInfoModal extends Component {

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

  /**
   *  验证名称不能重复
   * @param rule
   * @param value
   * @param callback
   */
  onValidatorName = (rule, value, callback) => {
    const {onValidatorName} = this.props;
    if (onValidatorName) {
      onValidatorName(rule, value, callback);
      return;
    }
    callback();
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {name, description} = this.props.dataSource;
    return <Modal
      title="角色信息"
      destroyOnClose={true}
      visible={this.props.visible}
      onOk={this.onModalOk}
      onCancel={this.props.onCancel}
    >
      <Form {...formItemLayout}>
        <Form.Item label="角色名称">
          {getFieldDecorator('name', {
            initialValue: name,
            rules: [
              {
                required: true,
                message: '名称不能为空'
              },
              {
                validator: this.onValidatorName
              }
            ]
          })(<Input style={{width: '70%'}}/>)}
        </Form.Item>

        <Form.Item label="描述">
          {getFieldDecorator('description', {
            initialValue: description,
          })(<TextArea rows={4} style={{width: '70%'}}/>)}
        </Form.Item>
      </Form>
    </Modal>;
  }
}

RoleInfoModal.propTypes = {
  visible: PropTypes.bool,
  dataSource: PropTypes.object,
  onValidatorName: PropTypes.func,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
};

RoleInfoModal.defaultProps = {
  visible: false,
  dataSource: {},
};

export default Form.create()(RoleInfoModal)
