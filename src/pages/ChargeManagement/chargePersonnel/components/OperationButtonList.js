import React, {Component} from "react";
import {Button, Col, Row} from "antd";

/**
 * 操作按钮
 */
class OperationButtonList extends Component {

    render() {
        return <div>
            <Button onClick={this.props.onImport}>导入</Button>
            <Button onClick={this.props.onImportContactInfo}>导入联系人</Button>
            <Button onClick={this.props.onAddPersonnel}>新增</Button>
            <Button onClick={this.props.onUpdatePersonnel}>编辑</Button>
            <Button onClick={this.props.onDeletePersonnel}>删除</Button>
            <Button onClick={this.props.onContactInfo}>联系人</Button>
            <Button onClick={this.props.onReduction}>减免</Button>
            <Button onClick={this.props.onSendNotice}>通知</Button>
        </div>;
    }
}

export default OperationButtonList;