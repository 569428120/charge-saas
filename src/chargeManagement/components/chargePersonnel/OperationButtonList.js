import React, {Component} from "react";
import {Button, Col, Row} from "antd";
import ImportModal from "./ImportModal";

/**
 * 操作按钮
 */
class OperationButtonList extends Component {

    render() {
        return <div>
            <ImportModal>
                <Button>导入</Button>
            </ImportModal>
            <div style={{marginLeft: '68px', marginTop: '-32px'}}>
                <Button onClick={this.props.onAddPersonnel}>新增</Button>
                <Button onClick={this.props.onDelete}>删除</Button>
                <Button onClick={this.props.onReduction}>减免</Button>
                <Button onClick={this.props.onInform}>通知</Button>
            </div>
        </div>;
    }
}

export default OperationButtonList;