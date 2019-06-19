import React from "react";
import {connect} from "dva";
import {message, Modal, Table} from "antd";
import * as config from "./chargeDetailsConfig";
import app_styles from "../../../app.less";
// 操作组件
import OperationButtonList from "../../components/chargeDetails/OperationButtonList";
// 收费类型弹窗
import ChargeTypeModal from "../../components/chargeDetails/ChargeTypeModal";
// 收费项弹窗组件
import ChargeItemModal from "../../components/chargeDetails/ChargeItemModal";
//搜索组件
import DetailsSearch from "../../components/chargeDetails/DetailsSearch";


/**
 *  收费详情页面
 */
class ChargeDetails extends React.Component {


    /**
     *   搜索
     * @param values
     */
    onDetailsSearch = (values) => {
        this.props.dispatch({
            type: "chargeDetails/queryDetails",
            payload: {
                ...values
            }
        });
    };

    /**
     *  重新查询数据
     * @param projectId
     */
    onSearchSelectChange = (projectId) => {
        this.props.dispatch({
            type: "chargeDetails/queryDetails",
            payload: {
                projectId,
                name: ""
            }
        });
    };

    /**
     *  新增分类
     */
    onAddType = () => {
        const {searchValues} = this.props;
        const {projectId} = searchValues;
        if (!projectId) {
            message.error("项目id不能为空")
            return;
        }

        this.openTypeModal();
    };

    /**
     * 新增收费项
     */
    onAddItem = () => {
        const {searchValues, chargeDetailsSelectedRows} = this.props;
        const {projectId} = searchValues;
        if (!projectId) {
            message.error("项目id不能为空");
            return;
        }

        if (chargeDetailsSelectedRows.length !== 1 || chargeDetailsSelectedRows[0].chargeType !== "charge_type") {
            message.info("新增收费项需选择收费类型（只能选择一条）！");
            return;
        }

        this.props.dispatch({
            type: "chargeDetails/setState",
            payload: {
                chargeTypeRecord: chargeDetailsSelectedRows[0]
            }
        });

        this.openItemModal();
    };

    /**
     *  更新按钮事件
     */
    onOperationUpdate = () => {
        const {chargeDetailsSelectedRows} = this.props;
        if (chargeDetailsSelectedRows.length <= 0) {
            message.info("请选择需要更新的项");
            return;
        }
        if (chargeDetailsSelectedRows.length > 1) {
            message.info("只允许对单条数据进行修改");
            return;
        }
        const row = chargeDetailsSelectedRows[0];
        // 收费类型
        if (row.chargeType === "charge_type") {
            this.openTypeModal(row.id);
            return;
        }

        this.openItemModal(row.id);

    };

    /**
     *  点击删除按钮
     */
    onOperationDelete = () => {
        const {chargeDetailsSelectedRows} = this.props;
        if (chargeDetailsSelectedRows.length <= 0) {
            message.info("请选择删除项");
            return;
        }

        Modal.confirm({
            title: '删除确认',
            content: '是否删除所选数据？',
            onOk: () => {
                this.props.dispatch({
                    type: "chargeDetails/deleteChargeDetails",
                    payload: {
                        detailIds: chargeDetailsSelectedRows.map(item => item.id),
                    }
                });
            }
        });
    };

    /**
     *   类型modal 确认回调
     */
    onTypeModalOk = (values, isEdit) => {
        console.log(values);
        if (isEdit) {
            this.props.dispatch({
                type: "chargeDetails/updateChargeDetails",
                payload: {
                    ...values
                }
            });
        } else {
            this.props.dispatch({
                type: "chargeDetails/createChargeDetails",
                payload: {
                    ...values
                }
            });
        }
        this.closeChargeDetailsModal();
    };

    /**
     *  item弹窗确认
     */
    onItemModalOk = (values, isEdit) => {
        // pid
        const {chargeDetailsSelectedRows} = this.props;
        console.log(values);
        //数据错误
        if (!isEdit && (chargeDetailsSelectedRows.length !== 1 || chargeDetailsSelectedRows[0].chargeType !== "charge_type")) {
            message.error("数据错误，没有选择收费类型");
            return;
        }
        // 设置pid
        values = {
            ...values,
            pid: chargeDetailsSelectedRows[0].id
        };

        if (isEdit) {
            this.props.dispatch({
                type: "chargeDetails/updateChargeDetails",
                payload: {
                    ...values
                }
            });
        } else {
            this.props.dispatch({
                type: "chargeDetails/createChargeDetails",
                payload: {
                    ...values
                }
            });
        }
        this.closeChargeDetailsModal();

    };

    onItemModalCancel = () => {
        this.closeChargeDetailsModal();
    };

    /**
     * 类型modal 取消回调
     */
    onTypeModalCancel = () => {
        this.closeChargeDetailsModal();
    };

    /**
     *   打开类型弹窗
     * @param chargeDetailsId
     */
    openTypeModal = (chargeDetailsId) => {
        // 刷新当前数据
        this.props.dispatch({
            type: "chargeDetails/openChargeDetailsModal",
            payload: {
                chargeDetailsId,
                chargeTypeModalVisible: true,
                chargeItemModalVisible: false,
            }
        });
    };

    /**
     *  打开收费项弹窗
     * @param chargeDetailsId
     */
    openItemModal = (chargeDetailsId) => {
        // 刷新当前数据
        this.props.dispatch({
            type: "chargeDetails/openChargeDetailsModal",
            payload: {
                chargeDetailsId,
                chargeTypeModalVisible: false,
                chargeItemModalVisible: true,
            }
        });
    };

    /**
     *  关闭弹窗
     */
    closeChargeDetailsModal = () => {
        this.props.dispatch({
            type: "chargeDetails/setState",
            payload: {
                chargeRecord: {},
                chargeTypeModalVisible: false,
                chargeItemModalVisible: false,
            }
        });
    };

    render() {

        // 搜索框参数
        const detailsSearchProps = {
            //项目下拉列表数据
            projectData: this.props.projectSelectedData,
            // 历史搜索数据
            dataSource: this.props.searchValues,
            // 项目下拉选择
            onSelectChange: this.onSearchSelectChange,
            // 搜索
            onSearch: this.onDetailsSearch
        };

        // 操作按钮参数
        const operationButtonListProps = {
            // 添加类型
            onAddType: this.onAddType,
            // 增加收费项
            onAddItem: this.onAddItem,
            // 更新
            onUpdate: this.onOperationUpdate,
            // 删除
            onDelete: this.onOperationDelete,
        };

        // 收费类型弹窗参数
        const chargeTypeModalProps = {
            // 是否展示
            visible: this.props.chargeTypeModalVisible,
            // 回显数据
            dataSource: this.props.chargeRecord,
            // 寄读方式下拉数据
            boardingData: this.props.boardingData,
            // 确实事件
            onOk: this.onTypeModalOk,
            //取消事件
            onCancel: this.onTypeModalCancel
        };

        const chargeItemModalProps = {
            // 是否展示
            visible: this.props.chargeItemModalVisible,
            // 回显数据
            dataSource: this.props.chargeRecord,
            // 收费类型
            typeSource: this.props.chargeTypeRecord,
            // 寄读方式下拉数据
            boardingData: this.props.boardingData,
            //交通路线
            routeData: this.props.routeData,
            // 确实事件
            onOk: this.onItemModalOk,
            //取消事件
            onCancel: this.onItemModalCancel
        };

        // 表格参数
        const tableProps = {
            className: app_styles.table,
            dataSource: this.props.chargeDetailsData,
            rowKey: "id",
            loading: this.props.loading.effects['chargeDetails/queryDetails'],
            columns: config.chargeTableColumns(),
            rowSelection: {
                selectedRowKeys: this.props.chargeDetailsSelectedRows.map(item => item.id),
                onChange: (selectedRowKeys, selectedRows) => {
                    this.props.dispatch({
                        type: "chargeDetails/setState",
                        payload: {
                            chargeDetailsSelectedRows: selectedRows,
                        }
                    });
                },
                onSelectAll: (selected, selectedRows, changeRows) => {
                    this.props.dispatch({
                        type: "chargeDetails/setState",
                        payload: {
                            chargeDetailsSelectedRows: selectedRows,
                        }
                    });
                },
            }
        };


        return <div>
            <DetailsSearch {...detailsSearchProps}/>
            <OperationButtonList {...operationButtonListProps}/>
            <ChargeTypeModal {...chargeTypeModalProps}/>
            <ChargeItemModal {...chargeItemModalProps}/>
            <Table  {...tableProps}
                    scroll={{y: 370}}
                    bordered
                    pagination={false}
            />
            <div>
                <label>总计：</label>
            </div>
        </div>;
    }
}


function mapStateToProps(state) {
    // 得到modal中的state)
    const {chargeDetails, loading} = state;
    return {
        ...chargeDetails,
        loading
    }
}

export default connect(mapStateToProps)(ChargeDetails)