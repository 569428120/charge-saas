import React from "react";
import {Button, Form, Input, Select} from "antd";
import PropTypes from "prop-types";

const Option = Select.Option;


/**
 *
 * @param gradeList
 */
const getGradeOptions = gradeList => {
  if (!gradeList || gradeList.length <= 0) {
    return null;
  }
  return gradeList.map(item => {
    return <Option key={item.id} value={item.name}>{item.name}</Option>
  })
};

/**
 * 搜索框
 */
class ClassDataSearch extends React.Component {

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
    const {gradeList} = this.props;
    const {grade, className, classCode} = this.props.dataSource;

    return <Form className="ant-advanced-search-form" layout="inline">
      <Form.Item label="年级">
        {getFieldDecorator('grade', {
          initialValue: grade,
        })(<Select style={{width: 150}}>
          {getGradeOptions(gradeList)}
        </Select>)}
      </Form.Item>

      <Form.Item label="班级名称">
        {getFieldDecorator('className', {
          initialValue: className,
        })(<Input style={{width: 150}}/>)}
      </Form.Item>
      <Form.Item label="班级编码">
        {getFieldDecorator('classCode', {
          initialValue: classCode,
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

ClassDataSearch.propTypes = {
  dataSource: PropTypes.object,
  gradeList: PropTypes.array,
  onSearch: PropTypes.func
};

ClassDataSearch.defaultProps = {
  dataSource: {},
  gradeList: [],
};

export default Form.create()(ClassDataSearch);
