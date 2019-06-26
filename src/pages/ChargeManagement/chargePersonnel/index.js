import React from "react";
import {connect} from "dva";
import SearchList from "./components/SearchList";
import OperationButtonList from "./components/OperationButtonList";

import {Pagination, Table, message, Modal} from 'antd'
import * as config from "./ChargePersonnelConfig";
import PersonnelModal from "./components/PersonnelModal";
import ChargeInventoryModal from "./components/ChargeInventoryModal";
import app_styles from "../../app.less";
import ReductionModal from "./components/ReductionModal";
import ViewReductionModal from "./components/ViewReductionModal";
import ContactInfoModal from "./components/ContactInfoModal";
import ViewContactInfoModal from "./components/ViewContactInfoModal";
import NoticeModal from "./components/NoticeModal";

/**
 * 收费人员详情
 */
class ChargeProject extends React.Component {


  componentDidMount() {
    //初始化数据
    this.props.dispatch({
      type: "chargePersonnel/initData",
      payload: {}
    });
  };

  /**
   *  搜索
   * @param values
   */
  onSearch = (values) => {
    const {projectId, personnelPage, personnelPageSize} = this.props;
    this.props.dispatch({
      type: "chargePersonnel/getChargePersonnels",
      payload: {
        projectId,
        personnelPage,
        personnelPageSize,
        searchValues: values,
      }
    });
  };

  /**
   *  选择项目
   */
  onSearchProjectSelectChange = (projectId) => {
    const {searchValues, personnelPageSize} = this.props;
    this.props.dispatch({
      type: "chargePersonnel/getChargePersonnels",
      payload: {
        projectId,
        searchValues: {...searchValues, projectId},
        personnelPage: 1,
        personnelPageSize
      }
    });
  };

  /**
   *  增加减免信息
   */
  onReductionModalOk = (values) => {
    const {personnelSelectedRows} = this.props;
    const personnelIds = personnelSelectedRows.map(item => item.id);
    this.props.dispatch({
      type: "chargePersonnel/addReductions",
      payload: {
        personnelIds,
        values
      }
    });
  };

  /**
   *   关闭窗口
   */
  onReductionModalCancel = () => {
    this.props.dispatch({
      type: "chargePersonnel/setState",
      payload: {
        rductionModalVisible: false
      }
    });
  };


  /**
   *  删除减免信息
   */
  onViewReductionModalRowDelete = (personnelId, reductionId) => {
    this.props.dispatch({
      type: "chargePersonnel/deleteReduction",
      payload: {
        personnelId,
        reductionId
      }
    });
  };

  /**
   *  添加联系人
   * @param values
   */
  onContactInfoModalOk = (values) => {
    const {personnelSelectedRows} = this.props;
    if (personnelSelectedRows <= 0) {
      message.warn("没有选择人员");
      return
    }
    this.props.dispatch({
      type: "chargePersonnel/addContactInfo",
      payload: {
        personnelId: personnelSelectedRows[0].id,
        values
      }
    });
  };

  /**
   *  关闭
   */
  onContactInfoModalCancel = () => {
    this.props.dispatch({
      type: "chargePersonnel/setState",
      payload: {
        contactInfoModalVisible: false,
        currPersonnelRecord: {}
      }
    });
  };

  /**
   *  删除联系人
   * @param personnelId
   * @param contactInfoId
   */
  onViewContactInfoModalRowDelete = (personnelId, contactInfoId) => {
    this.props.dispatch({
      type: "chargePersonnel/deleteContactInfo",
      payload: {
        personnelId,
        contactInfoId
      }
    });
  };

  /**
   *   发送消息
   * @param values
   */
  onNoticeModalOk = (values) => {

  };


  /**
   *  关闭弹窗
   */
  onNoticeModalCancel = () => {
    this.props.dispatch({
      type: "chargePersonnel/setState",
      payload: {
        noticeModalVisible: false
      }
    });
  };

  /**
   * 点击更新
   * @param value 需要更新的对象
   * @param id 需要更新的id
   */
  onRowUpdate = (value, id) => {
    this.props.dispatch({
      type: "chargePersonnel/setState",
      payload: {
        personnelModalVisible: true
      }
    });
  };

  /**
   *
   * @param id
   */
  onView = (id) => {
    this.setState({
      chargeInventoryModal: true,
      isChargeInventoryCheck: false
    })
  };


  /**
   * 导入按钮回调
   */
  onImport = () => {

  };

  /**
   * 新增按钮回调
   */
  onAddPersonnel = () => {
    this.openPersonnelModal();
  };

  /**
   *  编辑
   */
  onUpdatePersonnel = () => {
    const {personnelSelectedRows} = this.props;
    if (personnelSelectedRows.length <= 0) {
      message.info("请选择需要编辑的人员信息");
      return;
    }
    if (personnelSelectedRows.length !== 1) {
      message.info("只允许选择一条人员信息进行编辑");
      return;
    }

    this.openPersonnelModal(personnelSelectedRows[0].id);
  };

  /**
   *  删除
   */
  onDeletePersonnel = () => {
    const {personnelSelectedRows} = this.props;
    if (personnelSelectedRows.length <= 0) {
      message.info("请选择需要删除的人员信息");
      return;
    }
    const personnelIds = personnelSelectedRows.map(item => item.id);
    Modal.confirm({
      title: '删除确认',
      content: '是否删除所选数据？',
      onOk: () => {
        this.props.dispatch({
          type: "chargePersonnel/deletePersonnels",
          payload: {
            personnelIds
          }
        });
      }
    });
  };

  /**
   * 减免按钮回调
   */
  onReduction = () => {
    const {personnelSelectedRows} = this.props;

    if (personnelSelectedRows.length <= 0) {
      message.info("请选择需要减免的人员信息");
      return;
    }

    this.openReductionModal();
  };

  /**
   * 联系方式按钮回调
   */
  onContactInfo = () => {
    const {personnelSelectedRows} = this.props;
    if (personnelSelectedRows.length <= 0) {
      message.info("请选择人员信息");
      return;
    }
    if (personnelSelectedRows.length !== 1) {
      message.info("只允许给单个人员添加联系方式");
      return;
    }
    this.props.dispatch({
      type: "chargePersonnel/setState",
      payload: {
        contactInfoModalVisible: true,
        currPersonnelRecord: personnelSelectedRows[0],
      }
    });
  };

  /**
   *  发送通知按钮
   */
  onSendNotice = () => {
    const {personnelSelectedRows} = this.props;
    if (personnelSelectedRows.length <= 0) {
      message.info("请选择人员信息");
      return;
    }
    this.props.dispatch({
      type: "chargePersonnel/setState",
      payload: {
        noticeModalVisible: true,
      }
    });
  };

  /**
   *  新增人员弹窗确认回调
   */
  onPersonnelModalOk = (values, isEdit) => {
    const {projectId} = this.props;
    if (!projectId) {
      message.warn("请选择项目");
      return;
    }
    // 编辑
    if (isEdit) {
      this.props.dispatch({
        type: "chargePersonnel/updateChargePersonnel",
        payload: {
          values,
          personnelModalVisible: false
        }
      });
      return;
    }
    //新增
    this.props.dispatch({
      type: "chargePersonnel/createChargePersonnel",
      payload: {
        projectId,
        values,
        personnelModalVisible: false
      }
    });
  };


  /**
   * 新增人员弹窗取消回调
   */
  onPersonnelModalCancel = () => {
    this.props.dispatch({
      type: "chargePersonnel/setState",
      payload: {
        personnelModalVisible: false
      }
    });
  };

  /**
   *  收费清单确认按钮
   */
  omChargeInventoryModalOk = () => {

    this.setState({
      chargeInventoryModal: false
    })

  };


  /**
   *  打开收费清单
   */
  onOpenChargeInventory = () => {
    this.setState({
      chargeInventoryModal: true,
      isChargeInventoryCheck: true
    })
  };


  /**
   * 收费清单取消按钮
   */
  onChargeInventoryModalCancel = () => {
    this.setState({
      chargeInventoryModal: false
    })
  };


  /**
   * 打开窗口
   * @param personnelId
   */
  openPersonnelModal = (personnelId) => {
    this.props.dispatch({
      type: "chargePersonnel/openPersonnelModal",
      payload: {
        personnelId
      }
    });
  };

  /**
   *   减免弹窗
   */
  openReductionModal = () => {
    this.props.dispatch({
      type: "chargePersonnel/setState",
      payload: {
        rductionModalVisible: true,
      }
    });
  };

  /**
   *  查看减免信息
   * @param personnelId
   */
  openViewReductionModal = (personnelId) => {
    //打开窗口
    this.props.dispatch({
      type: "chargePersonnel/setState",
      payload: {
        viewReductionModalVisible: true,
      }
    });
    // 查询数据
    this.props.dispatch({
      type: "chargePersonnel/getReductionsByPersonnelId",
      payload: {
        personnelId
      }
    });
  };

  /**
   *  查看
   * @param personnelId
   */
  openViewContactInfoModal = (personnelId) => {
    this.props.dispatch({
      type: "chargePersonnel/setState",
      payload: {
        viewContactInfoModalVisible: true,
      }
    });
    this.props.dispatch({
      type: "chargePersonnel/getContactInfoByPersonnelId",
      payload: {
        personnelId,
      }
    });
  };

  /**
   *  关闭联系人
   */
  closeViewContactInfoModal = () => {
    this.props.dispatch({
      type: "chargePersonnel/setState",
      payload: {
        viewContactInfoModalVisible: false,
        contactInfoList: [],
      }
    });
  };

  closeViewReductionModal = () => {
    this.props.dispatch({
      type: "chargePersonnel/setState",
      payload: {
        viewReductionModalVisible: false,
        reductionList: [],
      }
    });
  };

  render() {

    // 搜索组建参数
    const searchListProps = {
      dataSource: this.props.searchValues,
      projectData: this.props.projectSelectedData,
      onSearch: this.onSearch,
      onProjectSelectChange: this.onSearchProjectSelectChange,
    };

    // 减免弹窗
    const reductionModalProps = {
      visible: this.props.rductionModalVisible,
      dataSource: {},
      onOk: this.onReductionModalOk,
      onCancel: this.onReductionModalCancel
    };

    // 查看减免弹窗
    const viewReductionModalProps = {
      visible: this.props.viewReductionModalVisible,
      dataSource: this.props.reductionList,
      loading: this.props.loading.effects['chargePersonnel/getReductionsByPersonnelId'],
      onRowDelete: this.onViewReductionModalRowDelete,
      onOk: this.closeViewReductionModal,
      onCancel: this.closeViewReductionModal
    };

    // 联系人添加窗口参数
    const contactInfoModalProps = {
      visible: this.props.contactInfoModalVisible,
      dataSource: this.props.currPersonnelRecord,
      onOk: this.onContactInfoModalOk,
      onCancel: this.onContactInfoModalCancel
    };

    // 联系人查看窗口参数
    const viewContactInfoModalProps = {
      visible: this.props.viewContactInfoModalVisible,
      loading: this.props.loading.effects['chargePersonnel/getContactInfoByPersonnelId'],
      dataSource: this.props.contactInfoList,
      onRowDelete: this.onViewContactInfoModalRowDelete,
      onOk: this.closeViewContactInfoModal,
      onCancel: this.closeViewContactInfoModal
    };

    // 通知弹窗
    const noticeModalProps = {
      visible: this.props.noticeModalVisible,
      onOk: this.onNoticeModalOk,
      onCancel: this.onNoticeModalCancel
    };

    // 表格参数
    const tableProps = {
      className: app_styles.table,
      dataSource: this.props.personnelData,
      pagination: false,
      loading: this.props.loading.effects['chargePersonnel/getChargePersonnels'],
      columns: config.tableColumns(this.onView, this.onOpenChargeInventory, this.openViewReductionModal, this.openViewContactInfoModal),
      bordered: true,
      rowKey: "id",
      rowSelection: {
        selectedRowKeys: this.props.personnelSelectedRows.map(item => item.id),
        onSelect: (record, selected, selectedRows) => {
          this.props.dispatch({
            type: "chargePersonnel/setState",
            payload: {
              personnelSelectedRows: selectedRows,
            }
          });
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          this.props.dispatch({
            type: "chargePersonnel/setState",
            payload: {
              personnelSelectedRows: selectedRows,
            }
          });
        },
      }
    };
    //分页组件参数
    const paginationProps = {
      showSizeChanger: true,
      size: "small",
      defaultCurrent: 1,
      pageSizeOptions: ["20", "50", "100"],
      showTotal: (total, range) => `总数 ${total} 当前${range[0]}-${range[1]} 共 ${total} 条`,
      current: this.props.personnelPage,
      total: this.props.personnelTotal,
      pageSize: this.props.personnelPageSize,
      onShowSizeChange: () => {
      },
      onChange: this.onPageChange,
    };

    return <div>
      <SearchList {...searchListProps}/>
      <ReductionModal {...reductionModalProps} />
      <ViewReductionModal {...viewReductionModalProps} />
      <ContactInfoModal {...contactInfoModalProps}/>
      <ViewContactInfoModal {...viewContactInfoModalProps}/>
      <NoticeModal {...noticeModalProps} />
      <OperationButtonList onImport={this.onImport}
                           onImportContactInfo={this.onImportContactInfo}
                           onAddPersonnel={this.onAddPersonnel}
                           onUpdatePersonnel={this.onUpdatePersonnel}
                           onDeletePersonnel={this.onDeletePersonnel}
                           onReduction={this.onReduction}
                           onContactInfo={this.onContactInfo}
                           onSendNotice={this.onSendNotice}
      />
      <PersonnelModal visible={this.props.personnelModalVisible}
                      dataSource={this.props.currPersonnelRecord}
                      boardingData={this.props.boardingData}
                      routeData={this.props.routeData}
                      classData={this.props.classData}
                      onOk={this.onPersonnelModalOk}
                      onCancel={this.onPersonnelModalCancel}
      />
      <ChargeInventoryModal visible={this.props.chargeInventoryModal}
                            isCheck={this.props.isChargeInventoryCheck}
                            onOk={this.omChargeInventoryModalOk}
                            onCancel={this.onChargeInventoryModalCancel}/>
      <Table {...tableProps}/>
      <div className={app_styles.bottom_context}>
        <Pagination {...paginationProps}/>
      </div>
    </div>;
  }
}

function mapStateToProps(state) {
  // 得到modal中的state)
  const {chargePersonnel, loading} = state;

  return {
    ...chargePersonnel,
    loading
  }
}

export default connect(mapStateToProps)(ChargeProject)
