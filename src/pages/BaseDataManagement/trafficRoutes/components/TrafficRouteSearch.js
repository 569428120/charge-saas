import React from "react";
import {Button, Form, Input, Select} from "antd";
import PropTypes from "prop-types";


/**
 * 搜索框
 */
class TrafficRouteSearch extends React.Component {

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
      <Form.Item label="名称">
        {getFieldDecorator('name', {
          initialValue: name,
        })(<Input style={{width: 150}}/>)}
      </Form.Item>

      <Form.Item label="路线编码">
        {getFieldDecorator('code', {
          initialValue: code,
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

TrafficRouteSearch.propTypes = {
  dataSource: PropTypes.object,
  onSearch: PropTypes.func
};

TrafficRouteSearch.defaultProps = {
  dataSource: {},
};

export default Form.create()(TrafficRouteSearch);
