import React, {Component} from "react";
import {Modal, Popconfirm, Table} from "antd";

import app_styles from "../../../app.less";

const map = new Map();

map.set("relation_oneself", "本人");
map.set("relation_father", "父亲");
map.set("relation_mother", "母亲");
map.set("relation_other", "其他");


map.set("contact_wechat", "微信");
map.set("contact_phone", "手机");
map.set("contact_other", "其他");

/**
 *  表格参数
 * @param onRowDelete
 */
const tableColumns = (onRowDelete) => {
  return [
    {
      title: '关系',
      dataIndex: 'relation',
      key: 'relation',
      width: '12%',
      render: text => map.get(text)
    },
    {
      title: '联系人名称',
      dataIndex: 'relationName',
      key: 'relationName',
      width: '12%',
    },
    {
      title: '通讯类型',
      dataIndex: 'contactType',
      key: 'contactType',
      width: '8%',
      render: text => map.get(text)
    },
    {
      title: '号码',
      dataIndex: 'number',
      key: 'number',
      width: '10%',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: '20%',
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => <span>
         <Popconfirm
           title="确认删除?"
           onConfirm={() => {
             onRowDelete(record.personnelId, text)
           }}
           onCancel={() => {
           }}
           okText="是"
           cancelText="否"
         >
                 <a href="#">删除</a>
                </Popconfirm>
            </span>
    },
  ];
};

/**
 *   查看联系人
 *   props
 *   visible
 *   loading
 *   dataSource
 *   onRowDelete
 *   onOk
 *   onCancel
 */
class ViewContactInfoModal extends Component {

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
      title="联系人信息"
      width={600}
      destroyOnClose={true}
      visible={this.props.visible}
      onOk={this.props.onOk}
      onCancel={this.props.onCancel}
    >
      <Table {...tableProps} pagination={false}/>
    </Modal>;
  }
}

export default ViewContactInfoModal
