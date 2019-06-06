import React, {Component} from 'react'
import {Button} from 'antd'


/**
 * 搜索组件
 */
class OperationButtonList extends Component {

    /**
     *  新增
     */
    onAdd = () => {
        const {onAdd} = this.props;
        if (onAdd) {
            onAdd();
        }
    };

    /**
     *   下载
     */
    onDownload = () => {

    };

    render() {
        return <div>
            <Button onClick={() => {
                this.onAdd();
            }}>新增</Button>
            <Button onClick={() => {
            }}>查看报表</Button>
            <Button onClick={() => {
                this.onDownload();
            }}>模板下载</Button>
        </div>
    }
}

export default OperationButtonList;