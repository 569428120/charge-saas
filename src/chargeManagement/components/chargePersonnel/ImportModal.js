import React, {Component} from "react";
import {Button, Icon, message, Modal, Upload} from 'antd'


/**
 * 导入弹窗
 */
class ImportModal extends Component {

    state = {
        fileList: [],
        visible: false,
        uploading: false,
    };

    /**
     * 关闭窗口
     */
    onClose = () => {
        this.setState({
            visible: false,
            fileList: [],
            uploading: false,
        })
    };

    /**
     * 取消按钮
     */
    onCancel = () => {
        this.onClose();
    };


    handleUpload = () => {
        const {fileList} = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files[]', file);
        });

        this.setState({
            uploading: true,
        });

        this.setState({
            fileList: [],
            uploading: false,
        });
        message.success('upload successfully.');
        this.onClose();

    };

    render() {
        const {uploading, fileList} = this.state;
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };

        return (<div>
            <span onClick={() => {
                this.setState({
                    visible: true,
                })
            }}>
                {this.props.children}
            </span>
            <Modal
                title="导入"
                visible={this.state.visible}
                onOk={this.handleUpload}
                onCancel={this.onCancel}
                style={{textAlign:'center'}}
            >
                <Upload {...props}>
                    <Button disabled={this.state.fileList.length > 0}>
                        <Icon type="upload"/> Select File
                    </Button>
                </Upload>

            </Modal>
        </div>);
    }
}

export default ImportModal;