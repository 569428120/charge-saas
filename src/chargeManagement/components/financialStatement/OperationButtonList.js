import React from "react";
import {Button} from "antd";


/**
 *  操作按钮
 */
class OperationButtonList extends React.Component {

    render() {
        return <div style={{textAlign: 'right'}}>
            <Button onClick={this.props.onExport}>导出</Button>
            <Button onClick={this.props.onPrint}>打印</Button>
        </div>;
    }
}

export default OperationButtonList;