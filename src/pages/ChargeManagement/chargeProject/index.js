import React from 'react'
import {connect} from 'dva'
import {Table, message, Modal, Pagination, Button} from 'antd'
import SearchList from './components/SearchList'
import OperationButtonList from "./components/OperationButtonList";
import FromModal from "./components/FromModal";
import app_styles from "../../app.less"


import * as params from './chargeProjectParams'


import styles from "../../Forms/style.less";


function getFooterToolbarWidth() {
  const sider = document.querySelectorAll('.ant-layout-sider')[0];
  const width = `calc(100% - ${sider.style.width})`;
  return {width: width}
}

/***
 *   收费项目管理页面
 */
class ChargeProject extends React.Component {

  /**
   *   点击增加按钮实践回调
   */
  onOperationAdd = () => {
    this.openModal({});
  };

  /**
   * 删除按钮
   */
  onOperationDelete = () => {
    const {projectSelectedRows, page, pageSize} = this.props;
    if (projectSelectedRows.length <= 0) {
      message.info("请选择删除项");
      return;
    }

    Modal.confirm({
      title: '删除确认',
      content: '是否删除所选数据？',
      onOk: () => {
        this.props.dispatch({
          type: "chargeProject/deleteProjects",
          payload: {
            page,
            pageSize,
            projectIds: projectSelectedRows.map(item => item.id),
          }
        });
      }
    });

  };

  /**
   *  更新数据
   */
  onOperationUpdate = () => {
    const {projectSelectedRows} = this.props;
    if (projectSelectedRows.length <= 0) {
      message.info("请选择需要更新的项目");
      return;
    }
    if (projectSelectedRows.length > 1) {
      message.info("只允许对单条数据进行修改");
      return;
    }
    this.openModal(projectSelectedRows[0]);
  };

  /**
   * 点击下载按钮事件回调
   */
  onOperationDownload = () => {
    const {onHandlePage} = this.props.location;
    console.log(onHandlePage);
    onHandlePage({key:'/charge-system/charge-management/charge-details'});
  };

  /**
   *   新增弹窗ok按钮回调
   */
  onModalOk = (values, isEdit) => {
    if (isEdit) {
      this.props.dispatch({
        type: "chargeProject/updateProject",
        payload: {
          ...values
        }
      });
    } else {
      this.props.dispatch({
        type: "chargeProject/createProject",
        payload: {
          ...values
        }
      });
    }
    this.closeModal();
  };

  /**
   *  新增弹窗取消按钮回调
   */
  onModalCancel = () => {
    this.closeModal();
  };


  /**
   *  搜索方法
   */
  onSearch = (values) => {
    const {pageSize} = this.props;
    this.props.dispatch({
      type: "chargeProject/queryProject",
      payload: {
        values,
        page: 1,
        pageSize
      }
    });
  };

  /**
   * 翻页
   */
  onPageChange = (page) => {
    const {pageSize} = this.props;
    this.props.dispatch({
      type: "chargeProject/queryProject",
      payload: {
        values: {},
        page: page,
        pageSize
      }
    });
  };

  /**
   *  打开弹窗
   */
  openModal = (currProject) => {
    this.props.dispatch({
      type: "chargeProject/setState",
      payload: {
        currProject,
        visible: true
      }
    });
  };

  /**
   *  关闭弹窗
   */
  closeModal = () => {
    this.props.dispatch({
      type: "chargeProject/setState",
      payload: {
        projectSelectedRows: [],
        currProject: {},
        visible: false
      }
    });
  };


  render() {

    const rowSelection = {
      selectedRowKeys: this.props.projectSelectedRows.map(item => item.id),
      onSelect: (record, selected, selectedRows) => {
        this.props.dispatch({
          type: "chargeProject/setState",
          payload: {
            projectSelectedRows: selectedRows,
          }
        });
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        this.props.dispatch({
          type: "chargeProject/setState",
          payload: {
            projectSelectedRows: selectedRows,
          }
        });
      },
    };

    return <div>
      <SearchList onSearch={this.onSearch}/>
      <FromModal visible={this.props.visible}
                 dataSource={this.props.currProject}
                 onOk={this.onModalOk}
                 onCancel={this.onModalCancel}/>
      <OperationButtonList
        onAdd={this.onOperationAdd}
        onDelete={this.onOperationDelete}
        onUpdate={this.onOperationUpdate}
        onDownload={this.onOperationDownload}/>
      <Table
        className={this.props.total > 0 ? app_styles.table : app_styles.table_no_height}
        dataSource={this.props.chargeProjectData}
        columns={params.projectColumns(this.onRowUpdate, this.onRowDelete)}
        loading={this.props.loading.effects['chargeProject/queryProject']}
        bordered
        rowKey="id"
        scroll={{y: 370}}
        pagination={false}
        rowSelection={rowSelection}
      />
      <div className={app_styles.bottom_context}>
        <Pagination defaultCurrent={1}
                    showSizeChanger={true}
                    size="small"
                    pageSizeOptions={["20", "50", "100"]}
                    showTotal={(total, range) => `总数 ${total} 当前${range[0]}-${range[1]} 共 ${total} 条`}
                    total={this.props.total}
                    pageSize={this.props.pageSize}
                    onShowSizeChange={() => {
                    }}
                    onChange={this.onPageChange}/>
      </div>

    </div>
  }
}

function mapStateToProps(state) {
  // 得到modal中的state)
  const {chargeProject, loading} = state;
  return {
    ...chargeProject,
    loading
  }
}

export default connect(mapStateToProps)(ChargeProject)
