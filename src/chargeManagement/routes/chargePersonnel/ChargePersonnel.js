import React from "react";
import {connect} from "dva";
import SearchList from "../../components/chargePersonnel/SearchList";
import OperationButtonList from "../../components/chargePersonnel/OperationButtonList";

import {Table} from 'antd'
import * as config from "./ChargePersonnelConfig";
import PersonnelModal from "../../components/chargePersonnel/PersonnelModal";
import ChargeInventoryModal from "../../components/chargePersonnel/ChargeInventoryModal";
import app_styles from "../../../app.less";

/**
 * 收费人员详情
 */
class ChargeProject extends React.Component {
    state = {
        // 新增人员弹窗
        personnelModalVisible: false,
        // 个人收费清单弹窗
        chargeInventoryModal: false,
        // 个人收费清单弹窗是否支持选择
        isChargeInventoryCheck: false
    };

    /**
     * 点击更新
     * @param value 需要更新的对象
     * @param id 需要更新的id
     */
    onRowUpdate = (value, id) => {
        this.setState({
            personnelModalVisible: true
        })
    };

    /**
     *
     * @param id
     */
    onView = (id) => {
        this.setState({
            chargeInventoryModal: true,
            isChargeInventoryCheck: false
        })
    };


    /**
     * 导入按钮回调
     */
    onImport = () => {

    };

    /**
     * 新增按钮回调
     */
    onAddPersonnel = () => {
        this.setState({
            personnelModalVisible: true
        })
    };

    /**
     * 减免按钮回调
     */
    onReduction = () => {

    };

    /**
     * 联系方式按钮回调
     */
    onContactInfo = () => {

    };


    /**
     * 其他按钮回调
     */
    onOther = () => {

    };

    /**
     *  新增人员弹窗确认回调
     */
    onPersonnelModalOk = () => {
        this.setState({
            personnelModalVisible: false
        })
    };


    /**
     * 新增人员弹窗取消回调
     */
    onPersonnelModalCancel = () => {
        this.setState({
            personnelModalVisible: false
        })
    };

    /**
     *  收费清单确认按钮
     */
    omChargeInventoryModalOk = () => {

        this.setState({
            chargeInventoryModal: false
        })

    };


    /**
     *  打开收费清单
     */
    onOpenChargeInventory = () => {
        this.setState({
            chargeInventoryModal: true,
            isChargeInventoryCheck: true
        })
    };

    /**
     * 收费清单取消按钮
     */
    onChargeInventoryModalCancel = () => {
        this.setState({
            chargeInventoryModal: false
        })
    };

    render() {

        const dataSource = [
            {
                id: '1',
                studentId: '102202',
                gradeName: '一年级',
                className: '1002班',
                classNumber: '1002',
                status: '已通知，未交费',
                name: '曹小琴',
                contactInfos: [
                    {
                        id: 1,
                        typeName: '手机',
                        subordinateId: '',
                        subordinateName: '',
                        relation: 'Own',
                        number: '13203317971'
                    },
                    {
                        id: 2,
                        typeName: '手机',
                        subordinateId: '',
                        subordinateName: '',
                        relation: 'Father',
                        number: '13203317971'
                    }
                ],
                costNumber: 500,
                costReduction: 200,
                other: '全托，无需乘车',
                startTime: '2019-4-5',
                endTime: '2019-5-1',
                desc: '西湖区湖底公园1号',
            },
            {
                id: '2',
                studentId: '102202',
                gradeName: '一年级',
                className: '1002班',
                classNumber: '1002',
                name: '曹小琴',
                contactInfos: [
                    {
                        id: 3,
                        typeName: '手机',
                        subordinateId: '',
                        subordinateName: '',
                        relation: 'Own',
                        number: '13203317971'
                    },
                    {
                        id: 4,
                        typeName: '手机',
                        subordinateId: '',
                        subordinateName: '',
                        relation: 'Father',
                        number: '13203317971'
                    }
                ],
                costNumber: 500,
                costReduction: 200,
                other: '全托，无需乘车',
                startTime: '2019-4-5',
                endTime: '2019-5-1',
                desc: '西湖区湖底公园1号',
            },
        ];

        const rowSelection = {

            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
        };

        return <div>
            <SearchList/>
            <OperationButtonList onImport={this.onImport}
                                 onAddPersonnel={this.onAddPersonnel}
                                 onReduction={this.onReduction}
                                 onContactInfo={this.onContactInfo}
                                 onOther={this.onOther}
            />
            <PersonnelModal visible={this.state.personnelModalVisible}
                            onOk={this.onPersonnelModalOk}
                            onCancel={this.onPersonnelModalCancel}
            />
            <ChargeInventoryModal visible={this.state.chargeInventoryModal}
                                  isCheck={this.state.isChargeInventoryCheck}
                                  onOk={this.omChargeInventoryModalOk}
                                  onCancel={this.onChargeInventoryModalCancel}/>
            <Table
                className={app_styles.table}
                dataSource={dataSource}
                columns={config.tableColumns(this.onRowUpdate, this.onView, this.onOpenChargeInventory)}
                bordered
                rowKey="id"
                rowSelection={rowSelection}
            />
        </div>;
    }
}

function mapStateToProps(state) {
    // 得到modal中的state)
    const {list, total, page} = state.chargePersonnel;
    return {
        loading: state.loading.models.chargePersonnel,
        list,
        total: parseInt(total, 10),
        page
    }
}

export default connect(mapStateToProps)(ChargeProject)