import {Popconfirm} from "antd";


/**
 * 参数设置
 * @returns {Array}
 */
export function chargeTableColumns(onRowUpdate, onRowDelete) {
    return [
        {
            title: '收费项名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '金额(元)',
            dataIndex: 'sumMoney',
            key: 'sumMoney',
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
            render: (text, record) => <span>
                <a href="#" onClick={() => {
                    onRowUpdate(record)
                }}>修改</a>|
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