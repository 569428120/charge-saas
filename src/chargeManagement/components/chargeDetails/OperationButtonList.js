import React, {Component} from "react";
import {Button} from "antd";

/**
 * 操作按钮
 */
class OperationButtonList extends Component {


    render() {
        return <div>
            <Button onClick={this.props.onAddType}>新增分类</Button>
            <Button onClick={this.props.onAddItem}>新增收费项</Button>
            <Button onClick={this.props.onUpdate}>更新</Button>
            <Button onClick={this.props.onDelete}>删除</Button>
        </div>;
    }
}

export default OperationButtonList;