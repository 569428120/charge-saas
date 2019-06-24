import React, {Component} from 'react'
import {Button} from 'antd'


/**
 * 搜索组件
 */
class OperationButtonList extends Component {


    render() {
        return <div>
            <Button onClick={this.props.onAdd}>新增</Button>
            <Button onClick={this.props.onUpdate}>编辑</Button>
            <Button onClick={this.props.onDelete}>删除</Button>
            <Button onClick={this.props.onDownload}>模板下载</Button>
        </div>
    }
}

export default OperationButtonList;