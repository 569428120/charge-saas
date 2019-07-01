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

class TrafficRouteModal extends Component {

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
    const {name, code, description} = this.props.dataSource;

    return <Modal
      title="交通路线"
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
                message: '名称不能为空'
              }
            ]
          })(<Input style={{width: '70%'}}/>)}
        </Form.Item>
        <Form.Item label="路线编号">
          {getFieldDecorator('code', {
            initialValue: code,
            rules: [
              {
                required: true,
                message: '路线编号不能为空'
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
    </Modal>
  }
}

TrafficRouteModal.propTypes = {
  visible: PropTypes.bool,
  dataSource: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
};

TrafficRouteModal.defaultProps = {
  visible: false,
  dataSource: {},
};

export default Form.create()(TrafficRouteModal)
