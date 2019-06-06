import {Link} from "react-router-dom";
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
            render: text => <Link to={"/charge-details?projectId" + text}>{text}</Link>
        },
        {
            title: '总金额(元)',
            dataIndex: 'sumMoney',
            key: 'sumMoney',
        },
        {
            title: '人数',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: '描述',
            dataIndex: 'desc',
            key: 'desc',
            width: '30%',
        },
        {
            title: '操作',
            dataIndex: 'id',
            key: 'id',
            render: text => <span>
                <a href="#" onClick={onRowUpdate}>修改</a>|
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
                  <a href="#">删除</a>
                </Popconfirm>
            </span>
        },
    ];
}