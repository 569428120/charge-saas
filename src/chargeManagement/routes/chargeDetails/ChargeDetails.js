import React from "react";
import {connect} from "dva";
import {message, Table} from "antd";
import OperationButtonList from "../../components/chargeDetails/OperationButtonList";
import ChargeTypeModal from "../../components/chargeDetails/ChargeTypeModal";
import * as config from "./chargeDetailsConfig";
import ChargeItemModal from "../../components/chargeDetails/ChargeItemModal";
import DetailsSearch from "../../components/chargeDetails/DetailsSearch";
import app_styles from "../../../app.less";


/**
 *  收费详情页面
 */
class ChargeDetails extends React.Component {

    state = {
        // 收费类型弹窗
        chargeTypeModalVisible: false,
        // 收费项弹窗
        chargeItemModalVisible: false,
        // 当前的类型
        chargeRecord: {}
    };


    /**
     *  新增分类
     */
    onAddType = () => {
        this.setState({
            chargeTypeModalVisible: true,
        })
    };

    /**
     * 新增收费项
     */
    onAddItem = () => {
        this.setState({
            chargeItemModalVisible: true,
        })
    };

    /**
     *   类型modal 确认回调
     */
    onTypeModalOk = () => {
        this.setState({
            chargeTypeModalVisible: false,
            chargeItemModalVisible: false,
        })
    };

    /**
     * 类型modal 取消回调
     */
    onTypeModalCancel = () => {
        this.setState({
            chargeTypeModalVisible: false,
            chargeItemModalVisible: false,
        })
    };

    /**
     *  点击更新
     * @param record
     */
    onRowUpdate = (record) => {
        console.log(record);
        // 收费分类
        if (record.type === 0) {
            this.setState({
                chargeRecord: record,
                chargeTypeModalVisible: true,
            })
        } else {//收费项
            this.setState({
                chargeRecord: record,
                chargeItemModalVisible: true,
            })
        }

    };

    /**
     *  点击删除
     */
    onRowDelete = (id) => {
        console.log(id);
        message.success('删除成功');
    };

    render() {
        const dataSource = [
            {
                id: '1',
                name: '学杂费',
                sumMoney: 500,
                number: 50,
                type: 0,
                startTime: '2019-4-5',
                endTime: '2019-5-1',
                desc: '西湖区湖底公园1号',
                children: [
                    {
                        id: '2',
                        name: '书本费',
                        sumMoney: 500,
                        number: 50,
                        type: 1,
                        startTime: '2019-4-5',
                        endTime: '2019-5-1',
                        desc: '西湖区湖底公园1号'
                    },
                ]
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
            <DetailsSearch/>
            <OperationButtonList onAddType={this.onAddType}
                                 onAddItem={this.onAddItem}/>
            <ChargeTypeModal visible={this.state.chargeTypeModalVisible}
                             record={this.state.chargeRecord}
                             onOk={this.onTypeModalOk}
                             onCancel={this.onTypeModalCancel}/>
            <ChargeItemModal visible={this.state.chargeItemModalVisible}
                             record={this.state.chargeRecord}
                             onOk={this.onTypeModalOk}
                             onCancel={this.onTypeModalCancel}
            />
            <Table
                className={app_styles.table}
                rowSelection={rowSelection}
                dataSource={dataSource}
                columns={config.chargeTableColumns(this.onRowUpdate, this.onRowDelete)}
                rowKey="id"
                bordered
            />
        </div>;
    }
}


function mapStateToProps(state) {
    // 得到modal中的state)
    const {list, total, page} = state.chargeDetails;
    return {
        loading: state.loading.models.chargeDetails,
        list,
        total: parseInt(total, 10),
        page
    }
}

export default connect(mapStateToProps)(ChargeDetails)