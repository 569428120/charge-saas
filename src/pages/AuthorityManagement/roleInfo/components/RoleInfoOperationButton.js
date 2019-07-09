import React, {Component} from "react";
import {Button} from "antd";
import PropTypes from "prop-types";

/**
 * 操作按钮
 */
class RoleInfoOperationButton extends Component {

  render() {
    return <div>
      <Button onClick={this.props.onAdd}>新增</Button>
      <Button onClick={this.props.onUpdate}>编辑</Button>
      <Button onClick={this.props.onDelete}>删除</Button>
    </div>;
  }
}

RoleInfoOperationButton.propTypes = {
  onAdd: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func
};

RoleInfoOperationButton.defaultProps = {};

export default RoleInfoOperationButton;
