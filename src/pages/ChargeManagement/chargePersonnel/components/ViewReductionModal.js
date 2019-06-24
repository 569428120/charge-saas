import React, {Component} from "react";
import {Modal, Popconfirm, Table} from "antd";

import app_styles from "../../../app.less";


/**
 *  表格参数
 * @param onRowDelete
 */
const tableColumns = (onRowDelete) => {
  return [
    {
      title: '操作人',
      dataIndex: 'studentId',
      key: 'studentId',
      width: '12%',
    },
    {
      title: '操作时间',
      dataIndex: 'gradeName',
      key: 'gradeName',
      width: '12%',
    },
    {
      title: '减免金额（元）',
      dataIndex: 'name',
      key: 'name',
      width: '8%',
    },
    {
      title: '描述',
      dataIndex: 'contactInfos',
      key: 'contactInfos',
      width: '30%',
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => <span>
         <Popconfirm
           title="确认删除?"
           onConfirm={() => {
             onRowDelete(record.projectId, text)
           }}
           onCancel={() => {
           }}
           okText="是"
           cancelText="否"
         >
                 <a href="#">删除</a>|
                </Popconfirm>
            </span>
    },
  ];
};

/**
 *   查看减免信息
 *   props
 *   visible
 *   loading
 *   dataSource
 *   onRowDelete
 *   onOk
 *   onCancel
 */
class ViewReductionModal extends Component {

  /**
   *  删除行数据
   */
  onRowDelete = (projectId, id) => {
    const {onRowDelete} = this.props;
    if (onRowDelete) {
      onRowDelete(projectId, id);
    }
  };

  render() {
    // 表格参数
    const tableProps = {
      className: app_styles.table,
      dataSource: this.props.dataSource,
      loading: this.props.loading,
      columns: tableColumns(this.onRowDelete),
      bordered: true,
      rowKey: "id",
    };

    return <Modal
      title="缴费人员"
      width={600}
      destroyOnClose={true}
      visible={this.props.visible}
      onOk={this.props.onOk}
      onCancel={this.props.onCancel}
    >
      <Table {...tableProps}/>
    </Modal>;
  }
}

export default ViewReductionModal
