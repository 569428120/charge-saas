import {Popconfirm} from "antd";
import React from "react";


/**
 * 参数设置
 * @returns {Array}
 */
export function tableColumns(onRowUpdate, onView, onOpenChargeInventory) {
    return [
        {
            title: '学号',
            dataIndex: 'studentId',
            key: 'studentId',
            width: '8%',
        },
        {
            title: '班级',
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
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width: '8%',
        },
        {
            title: '联系方式（及家属）',
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
            title: '费用（及减免）',
            dataIndex: 'costNumber',
            key: 'costNumber',
            width: '15%',
            render: (text, record) => {
                return (<span>{record.costNumber} - <a href="#">{record.costReduction}</a></span>)
            }
        },
        {
            title: '其他',
            dataIndex: 'other',
            key: 'other',
            width: '15%',
        },
        {
            title: '收费状态',
            dataIndex: 'status',
            key: 'status',
            width: '8%',
        },
        {
            title: '操作',
            dataIndex: 'id',
            key: 'id',
            render: text => <span>
                <a href="#" onClick={onOpenChargeInventory}>收费</a>|
                <a href="#" onClick={onRowUpdate}>修改</a>|
                <a href="#" onClick={onView}>查看</a>
            </span>
        },
    ];
}