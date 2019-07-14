import React from "react";
import {Button, message, Switch} from "antd";
import {connect} from "dva";
import RoleInfoSearch from "./components/RoleInfoSearch";
import RoleInfoOperationButton from "./components/RoleInfoOperationButton";
import CommonTable from "../../../components/CommonTable";
import RoleInfoModal from "./components/RoleInfoModal";
import PropTypes from "prop-types";
import SettingRoleModal from "./components/SettingRoleModal";


/***
 * 角色管理页面
 */
class RoleInfo extends React.Component {

  onSearch = (searchValues) => {
    const {page, pageSize} = this.props;
    this.props.dispatch({
      type: "roleInfo/getRoleInfos",
      payload: {
        searchValues, page, pageSize
      }
    });
  };

  onOperationButtonAdd = () => {
    this.openRoleInfoModal();
  };

  onOperationButtonUpdate = () => {
    const {selectedRows} = this.props;
    if (selectedRows.length <= 0) {
      message.info("请选择需要编辑的数据");
      return;
    }
    if (selectedRows.length > 1) {
      message.info("只允许选择编辑一条数据");
      return;
    }
    this.openRoleInfoModal(selectedRows[0].id);
  };

  onOperationButtonDelete = () => {
    const {selectedRows} = this.props;
    if (selectedRows.length < 0) {
      message.info("请选择需要删除的数据");
      return;
    }
    const roleIds = selectedRows.map(item => item.id);
    this.props.dispatch({
      type: "roleInfo/deleteRoleInfoByIds",
      payload: {
        roleIds
      }
    });

  };

  onTableSelect = (selectedRows) => {
    this.props.dispatch({
      type: "roleInfo/setState",
      payload: {
        selectedRows
      }
    });
  };

  onPaginationShowSizeChange = (pageSize) => {
    const {page, searchValues} = this.props;
    this.props.dispatch({
      type: "roleInfo/getRoleInfos",
      payload: {
        searchValues, page, pageSize
      }
    });
  };

  onPaginationChange = (page) => {
    const {pageSize, searchValues} = this.props;
    this.props.dispatch({
      type: "roleInfo/getRoleInfos",
      payload: {
        searchValues, page, pageSize
      }
    });
  };

  onValidatorName = (rule, value, callback) => {
    this.props.dispatch({
      type: "roleInfo/validatorName",
      payload: {
        value,
        callback
      }
    });
  };


  onRoleInfoModalOk = (values, isEdit) => {
    this.closeRoleInfoModal();
    // 更新
    if (isEdit) {
      this.props.dispatch({
        type: "roleInfo/updateRoleInfo",
        payload: {
          values
        }
      });
      return;
    }

    this.props.dispatch({
      type: "roleInfo/createRoleInfo",
      payload: {
        values
      }
    });
  };


  openRoleInfoModal = (roleId) => {
    if (roleId) {
      this.props.dispatch({
        type: "roleInfo/getRoleInfoById",
        payload: {
          roleId
        }
      });
    }
    this.props.dispatch({
      type: "roleInfo/setState",
      payload: {
        modalVisible: true
      }
    });
  };

  closeRoleInfoModal = () => {
    this.props.dispatch({
      type: "roleInfo/setState",
      payload: {
        modalVisible: false
      }
    });
  };

  onEnable = (record, checked) => {
    this.props.dispatch({
      type: "roleInfo/enableRoleInfoById",
      payload: {
        roleInfoId: record.id,
        checked
      }
    });
  };

  openSettingRoleModal = (roleInfoId) => {
    this.props.dispatch({
      type: "roleInfo/setState",
      payload: {
        settingRoleModalVisible: true
      }
    });
  };

  tableColumns = () => {
    return [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: "20%",
      },
      {
        title: '启用',
        dataIndex: 'enable',
        key: 'enable',
        width: "10%",
        render: (text, record) => {
          return <Switch checked={text} onChange={(checked) => this.onEnable(record, checked)}/>
        }
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        width: "40%",
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        render: (text, record) => {
          return <Button type="link" onClick={() => this.openSettingRoleModal(text)}>设置权限</Button>
        }
      },

    ];
  };

  render() {
    //搜索参数
    const roleInfoSearchProps = {
      dataSource: this.props.searchValues,
      onSearch: this.onSearch
    };

    // 操作按钮
    const roleInfoOperationButtonProps = {
      onAdd: this.onOperationButtonAdd,
      onUpdate: this.onOperationButtonUpdate,
      onDelete: this.onOperationButtonDelete
    };

    const commonTableProps = {
      columns: this.tableColumns(),
      dataSource: this.props.roleInfoList,
      loading: this.props.loading.effects['roleInfo/getRoleInfos'],
      total: this.props.total,
      current: this.props.page,
      pageSize: this.props.pageSize,
      selectedRowKeys: this.props.selectedRows.map(item => item.id),
      onTableSelect: this.onTableSelect,
      onPaginationShowSizeChange: this.onPaginationShowSizeChange,
      onPaginationChange: this.onPaginationChange,
    };

    const roleInfoModalProps = {
      visible: this.props.modalVisible,
      dataSource: this.props.currData,
      onValidatorName: this.onValidatorName,
      onOk: this.onRoleInfoModalOk,
      onCancel: this.closeRoleInfoModal,
    };

    const settingRoleModalProps = {
      visible: this.props.settingRoleModalVisible,
    };

    return <div>
      <RoleInfoModal {...roleInfoModalProps} />
      <SettingRoleModal {...settingRoleModalProps}/>
      <RoleInfoSearch {...roleInfoSearchProps}/>
      <RoleInfoOperationButton {...roleInfoOperationButtonProps}/>
      <CommonTable {...commonTableProps} />
    </div>;
  }
}

function mapStateToProps(state) {
  // 得到modal中的state)
  const {roleInfo, loading} = state;
  return {...roleInfo, loading}
}

export default connect(mapStateToProps)(RoleInfo)
