import React from "react";
import {Button, Form, Input} from "antd";
import PropTypes from "prop-types";


/**
 * 搜索框
 */
class RoleInfoSearch extends React.Component {

  /**
   *  点击搜索按钮事件回调
   */
  onSearch = () => {
    const {getFieldsValue} = this.props.form;
    const {onSearch} = this.props;
    if (onSearch) {
      onSearch(getFieldsValue());
    }
  };

  /**
   *  点击重置按钮回调
   */
  onReset = () => {
    //将搜索条件清空
    this.props.form.resetFields();
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {name, code} = this.props.dataSource;

    return <Form className="ant-advanced-search-form" layout="inline">
      <Form.Item label="角色名称">
        {getFieldDecorator('name', {
          initialValue: name,
        })(<Input style={{width: 150}}/>)}
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={this.onSearch}>
          查询
        </Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={this.onReset}> 重置</Button>
      </Form.Item>
    </Form>;
  }
}

RoleInfoSearch.propTypes = {
  dataSource: PropTypes.object,
  onSearch: PropTypes.func
};

RoleInfoSearch.defaultProps = {
  dataSource: {},
};

export default Form.create()(RoleInfoSearch);
