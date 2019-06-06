import React, {Component} from "react";
import {Button} from "antd";

/**
 * 操作按钮
 */
class OperationButtonList extends Component {


    /**
     *  新增分类
     */
    onAddType = () => {
        const {onAddType} = this.props;
        if (onAddType) {
            onAddType();
        }
    };

    /**
     * 新增收费项
     */
    onAddItem = () => {
        const {onAddItem} = this.props;
        if (onAddItem) {
            onAddItem();
        }
    };


    render() {
        return <div>
            <Button onClick={() => {
                this.onAddType();
            }}>新增分类</Button>
            <Button onClick={() => {
                this.onAddItem();
            }}>新增收费项</Button>
        </div>;
    }
}

export default OperationButtonList;