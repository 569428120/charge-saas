import React, {Component} from "react";
import {Button} from "antd";
import PropTypes from "prop-types";
import ClassDataSearch from "./ClassDataSearch";

/**
 * 操作按钮
 */
class OperationButtonList extends Component {

  render() {
    return <div>
      <Button onClick={this.props.onAdd}>新增</Button>
      <Button onClick={this.props.onUpdate}>编辑</Button>
      <Button onClick={this.props.onDelete}>删除</Button>
    </div>;
  }
}

OperationButtonList.propTypes = {
  onAdd: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func
};

OperationButtonList.defaultProps = {};

export default OperationButtonList;
