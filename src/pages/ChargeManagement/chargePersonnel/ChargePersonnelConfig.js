import {Popconfirm} from "antd";
import React from "react";
import tagMap from "../../utils/TagConfig"


/**
 * 参数设置
 * @returns {Array}
 */
export function tableColumns(onView, onOpenChargeInventory, onViewReduction) {
  return [
    {
      title: '学号',
      dataIndex: 'studentId',
      key: 'studentId',
      width: '8%',
    },
    {
      title: '班级',
      dataIndex: 'className',
      key: 'className',
      width: '10%',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: '8%',
    },
    {
      title: '联系方式（及家属）',
      dataIndex: 'contacts',
      key: 'contacts',
      width: '15%',
      render: (text, record) => {
        if (!record.contacts || record.contacts.length <= 0) {
          return <span style={{color: "red"}}>
                    无联系人
                </span>
        }
        return (<span>
                    {
                      record.contacts[0].number
                    }
          (<a href="#">{record.contacts.length}</a>)
                </span>)
      }
    },
    {
      title: '费用（及减免）',
      dataIndex: 'amountSum',
      key: 'amountSum',
      width: '15%',
      render: (text, record) => {
        let tabs = [];
        tabs.push(record.amountSum);
        if (record.reductionAmountSum) {
          tabs.push("-");
          tabs.push(<a href="#" onClick={() => onViewReduction(record.id)}>{record.reductionAmountSum}</a>);
        }
        return (<span>{tabs}</span>)
      }
    },
    {
      title: '其他',
      dataIndex: 'other',
      key: 'other',
      width: '15%',
      render: (text, record) => {
        let tabs = [];
        tabs.push(tagMap.get("ride_" + record.ride));
        tabs.push(tagMap.get(record.boardingCode));
        return (<span>{tabs}</span>)
      }
    },
    {
      title: '状态',
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
                <a href="#" onClick={onView}>查看</a>
            </span>
    },
  ];
}
