import React, {Component} from "react";
import {Modal} from "antd";


/**
 *   props:
 *     visible
 *     loading
 *     dataSource
 *     onOk
 *     onCancel
 */
class ContactInfoModal extends Component {
    /**
     *  ok事件
     */
    onModalOk = () => {
        const {onOk} = this.props;
        if (onOk) {
            onOk({...values, id}, isEdit);
        }
    };

    render() {
        return <Modal
            title="减免"
            destroyOnClose={true}
            visible={this.props.visible}
            onOk={this.onModalOk}
            onCancel={this.props.onCancel}
        >

        </Modal>;
    }
}

export default ContactInfoModal;