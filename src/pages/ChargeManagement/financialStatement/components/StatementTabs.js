import React from "react";
import {Table, Tabs} from "antd";
import app_styles from "../../../app.less";


const {TabPane} = Tabs;

/**
 *    收费明细表的Columns
 */
function detailTableColumns() {
    return [
        {
            title: '收费项目',
            dataIndex: 'studentId',
            key: 'studentId',
            width: '8%',
        },
        {
            title: '开始时间',
            dataIndex: 'gradeName',
            key: 'gradeName',
            width: '10%',
            render: (text, record) => {
                return (<span>
                    {
                        record.gradeName + "" + record.className
                    }
                </span>)
            }
        },
        {
            title: '结束时间',
            dataIndex: 'name',
            key: 'name',
            width: '8%',
        },
        {
            title: '应收总计（元）',
            dataIndex: 'contactInfos',
            key: 'contactInfos',
            width: '15%',
            render: (text, record) => {
                return (<span>
                    {
                        record.contactInfos[0].number
                    }
                    (<a href="#">{record.contactInfos.length}</a>)
                </span>)
            }
        },
        {
            title: '实收总计（元）',
            dataIndex: 'costNumber',
            key: 'costNumber',
            width: '15%',
            render: (text, record) => {
                return (<span>{record.costNumber} - <a href="#">{record.costReduction}</a></span>)
            }
        },
        {
            title: '减免（元）',
            dataIndex: 'other',
            key: 'other',
            width: '15%',
        },
        {
            title: '未收（元）',
            dataIndex: 'status',
            key: 'status',
            width: '8%',
        }
    ];
}

/**
 *  应收人员名单 表格属性
 */
function receivableTableColumns() {
    return [
        {
            title: '学号',
            dataIndex: 'studentId',
            key: 'studentId',
            width: '8%',
        },
        {
            title: '姓名',
            dataIndex: 'gradeName',
            key: 'gradeName',
            width: '10%',

        },
        {
            title: '班级',
            dataIndex: 'name',
            key: 'name',
            width: '8%',
        },
        {
            title: '应收总计（元）',
            dataIndex: 'contactInfos',
            key: 'contactInfos',
            width: '15%',
        }
    ];
}

/**
 * 减免人员名单 表格属性
 */
function remissionTableColumns() {
    return [
        {
            title: '学号',
            dataIndex: 'studentId',
            key: 'studentId',
            width: '8%',
        },
        {
            title: '姓名',
            dataIndex: 'gradeName',
            key: 'gradeName',
            width: '10%',

        },
        {
            title: '班级',
            dataIndex: 'name',
            key: 'name',
            width: '8%',
        },
        {
            title: '应收总计（元）',
            dataIndex: 'contactInfos',
            key: 'contactInfos1',
            width: '15%',
        },
        {
            title: '减免金额（元）',
            dataIndex: 'contactInfos1',
            key: 'contactInfos1',
            width: '15%',
        },
        {
            title: '描述',
            dataIndex: 'contactInfos2',
            key: 'contactInfos2',
            width: '15%',
        }
    ];
}

/**
 * 未交（或已经部分）人员名单
 */
function nonDeliveryTableColumns() {
    return [
        {
            title: '学号',
            dataIndex: 'studentId',
            key: 'studentId',
            width: '8%',
        },
        {
            title: '姓名',
            dataIndex: 'gradeName',
            key: 'gradeName',
            width: '10%',

        },
        {
            title: '班级',
            dataIndex: 'name',
            key: 'name',
            width: '8%',
        },
        {
            title: '应收总计（元）',
            dataIndex: 'contactInfos',
            key: 'contactInfos1',
            width: '15%',
        },
        {
            title: '已交（元）',
            dataIndex: 'contactInfos1',
            key: 'contactInfos1',
            width: '15%',
        },
        {
            title: '需交（元）',
            dataIndex: 'contactInfos2',
            key: 'contactInfos2',
            width: '15%',
        }
    ];
}


/**
 *  报表组件
 */
class StatementTabs extends React.Component {
    render() {
        return <Tabs defaultActiveKey="1" style={{height: "71vh"}}>
            <TabPane tab="收费明细表" key="1">
                <Table
                    className={app_styles.table}
                    dataSource={[]}
                    columns={detailTableColumns()}
                    bordered
                    style={{textAlign: 'center'}}
                    title={() => <span>XX学校2019年2月至2019年5月收费明细表</span>}
                    rowKey="id"
                    size='small'/>
            </TabPane>
            <TabPane tab="应收人员名单" key="2">
                <Table
                    className={app_styles.table}
                    dataSource={[]}
                    columns={receivableTableColumns()}
                    bordered
                    style={{textAlign: 'center'}}
                    title={() => <span>XX学校2019年2月至2019年5月应收人员名单</span>}
                    rowKey="id"
                    size='small'/>
            </TabPane>
            <TabPane tab="减免人员名单" key="3">
                <Table
                    className={app_styles.table}
                    dataSource={[]}
                    columns={remissionTableColumns()}
                    style={{textAlign: 'center'}}
                    bordered
                    title={() => <span>XX学校2019年2月至2019年5月减免人员名单</span>}
                    rowKey="id"
                    size='small'/>
            </TabPane>
            <TabPane tab="未交（或已经部分）人员名单" key="4">
                <Table
                    className={app_styles.table}
                    dataSource={[]}
                    columns={nonDeliveryTableColumns()}
                    bordered
                    style={{textAlign: 'center'}}
                    title={() => <span>XX学校2019年2月至2019年5月未交（或已经部分）人员名单</span>}
                    rowKey="id"
                    size='small'/>
            </TabPane>
        </Tabs>;
    }
}

export default StatementTabs;
