import {Popconfirm} from "antd";
import React from "react";



/**
 * 参数设置
 * @returns {Array}
 */
export function projectColumns(onRowUpdate, onRowDelete) {
    return [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: 150,
        },
        {
            title: '总金额(元)',
            dataIndex: 'sumMoney',
            key: 'sumMoney',
            width: 100,
        },
        {
            title: '人数',
            dataIndex: 'number',
            key: 'number',
            width: 100,
        },
        {
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
            width: 150,
        },
        {
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
            width: 150,
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            width: 250,
        },
        {
            title: '操作',
            dataIndex: 'id',
            key: 'id',
            render: text => <span>
                <a href="#" onClick={onRowUpdate}>收费详情</a>|
                <Popconfirm
                    title="Are you sure delete this task?"
                    onConfirm={() => {
                        onRowDelete(text)
                    }}
                    onCancel={() => {
                    }}
                    okText="Yes"
                    cancelText="No"
                >
                  <a href="#">人员详情</a>
                </Popconfirm>
            </span>
        },
    ];
}