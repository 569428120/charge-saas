import React from 'react'
import {connect} from 'dva'
import {Table, message, Pagination} from 'antd'
import SearchList from '../../components/chargeProject/SearchList'
import OperationButtonList from "../../components/chargeProject/OperationButtonList";
import FromModal from "../../components/chargeProject/FromModal";
import app_styles from "../../../app.less"


import * as params from './chargeProjectParams'


/***
 *   收费项目管理页面
 */
class ChargeProject extends React.Component {

    state = {
        //是否弹窗
        visible: false,
        // 报表是否显示
        chargeReportVisible: false
    };
    /**
     *   点击增加按钮实践回调
     */
    onOperationAdd = () => {
        this.setState({
            visible: true
        })
    };

    /**
     * 点击下载按钮事件回调
     */
    onOperationDownload = () => {

    };

    /**
     *   新增弹窗ok按钮回调
     */
    onModalOk = (values) => {
        this.props.dispatch({
            type: "chargeProject/createProject",
            payload: {
                ...values
            }
        });
        this.setState({
            visible: false
        })
    };

    /**
     *  新增弹窗取消按钮回调
     */
    onModalCancel = () => {
        this.setState({
            visible: false
        })
    };


    /**
     * 点击更新
     * @param value 需要更新的对象
     * @param id 需要更新的id
     */
    onRowUpdate = (value, id) => {
        this.setState({
            visible: true
        })
    };

    /**
     * 点击删除
     * @param id 需要删除的id
     */
    onRowDelete = (id) => {
        message.success('删除成功');
    };

    /**
     *  搜索方法
     */
    onSearch = (values) => {
        const {page, pageSize} = this.props;
        this.props.dispatch({
            type: "chargeProject/queryProject",
            payload: {
                values,
                page,
                pageSize
            }
        });
    };


    render() {

        const rowSelection = {
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
        };

        return <div>
            <SearchList onSearch={this.onSearch}/>
            <FromModal visible={this.state.visible} onOk={this.onModalOk} onCancel={this.onModalCancel}/>
            <OperationButtonList onAdd={this.onOperationAdd} onDownload={this.onOperationDownload}/>
            <Table
                className={app_styles.table}
                dataSource={this.props.chargeProjectData}
                columns={params.projectColumns(this.onRowUpdate, this.onRowDelete)}
                loading={this.props.loading.effects['chargeProject/queryProject']}
                bordered
                pagination={false}
                style={{height: '68vh'}}
                scroll={{y: '68vh'}}
                rowSelection={rowSelection}
            />
            <div className={app_styles.bottom_context}>
                <Pagination defaultCurrent={1} total={this.props.total}/>
            </div>
        </div>
    }
}

function mapStateToProps(state) {
    // 得到modal中的state)
    const {chargeProject, loading} = state;

    return {
        ...chargeProject,
        loading
    }
}

export default connect(mapStateToProps)(ChargeProject)