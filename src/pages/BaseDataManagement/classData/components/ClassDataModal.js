import React, {Component} from "react";
import {Form, Input, Modal} from "antd";
import PropTypes from "prop-types";
import ClassDataSearch from "./ClassDataSearch";


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

class ClassDataModal extends Component {

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
    const {grade, className, classCode} = this.props.dataSource;

    return <Modal
      title="班级信息"
      destroyOnClose={true}
      visible={this.props.visible}
      onOk={this.onModalOk}
      onCancel={this.props.onCancel}
    >
      <Form {...formItemLayout}>
        <Form.Item label="年级">
          {getFieldDecorator('grade', {
            initialValue: grade,
            rules: [
              {
                required: true,
                message: '年级不能为空'
              }
            ]
          })(<Input style={{width: '70%'}}/>)}
        </Form.Item>
        <Form.Item label="班级名称">
          {getFieldDecorator('className', {
            initialValue: className,
            rules: [
              {
                required: true,
                message: '班级名称不能为空'
              }
            ]
          })(<Input style={{width: '70%'}}/>)}
        </Form.Item>
        <Form.Item label="班级编码">
          {getFieldDecorator('classCode', {
            initialValue: classCode,
            rules: [
              {
                required: true,
                message: '班级编码不能为空'
              }
            ]
          })(<Input style={{width: '70%'}}/>)}
        </Form.Item>
      </Form>
    </Modal>
  }
}

ClassDataModal.propTypes = {
  visible: PropTypes.bool,
  dataSource: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
};

ClassDataModal.defaultProps = {
  visible: false,
  dataSource: {},
};

export default Form.create()(ClassDataModal)
