import {connect} from "dva";
import React from "react";
import {message} from "antd";
import ClassDataSearch from "./components/ClassDataSearch";
import OperationButtonList from "./components/OperationButtonList";
import ClassDataModal from "./components/ClassDataModal";
import ClassDataTable from "./components/ClassDataTable";


/**
 *  班级数据页面
 */
class ClassData extends React.Component {

  componentDidMount() {
    this.props.dispatch({
      type: "classData/getClassDataList",
      payload: {
        searchValues: {},
        page: 1,
        pageSize: 20
      }
    });

    this.props.dispatch({
      type: "classData/getGradeList",
      payload: {}
    });
  }


  /**
   * 搜索
   * @param searchValues
   */
  onSearch = (searchValues) => {
    const {page, pageSize} = this.props;
    this.props.dispatch({
      type: "classData/getClassDataList",
      payload: {
        searchValues, page, pageSize
      }
    });
  };


  openAddClassDataModal = (classId) => {
    this.props.dispatch({
      type: "classData/setState",
      payload: {
        classDataModalVisible: true
      }
    });
    if (classId) {
      this.props.dispatch({
        type: "classData/getClassDataByClassId",
        payload: {
          classId
        }
      });
    }
  };

  openUpdateClassDataModal = () => {
    const {classDataSelectedRows} = this.props;
    if (classDataSelectedRows.length <= 0) {
      message.info("请选择需要编辑的数据");
      return;
    }
    if (classDataSelectedRows.length !== 1) {
      message.info("只允许对一条数据进行编辑");
      return;
    }
    this.openAddClassDataModal(classDataSelectedRows[0].id)
  };

  onDeleteClassData = () => {
    const {classDataSelectedRows} = this.props;
    if (classDataSelectedRows.length <= 0) {
      message.info("请选择需要删除的数据");
      return;
    }
    const classIds = classDataSelectedRows.map(item => item.id);
    this.props.dispatch({
      type: "classData/deleteClassDataByIds",
      payload: {
        classIds
      }
    });
  };


  onClassDataModalOk = (values, isEdit) => {
    //更新
    if (isEdit) {
      this.props.dispatch({
        type: "classData/updateClassData",
        payload: {
          values
        }
      });
      return;
    }
    //新增
    this.props.dispatch({
      type: "classData/createClassData",
      payload: {
        values
      }
    });
  };

  closeClassDataModalCancel = () => {
    //新增
    this.props.dispatch({
      type: "classData/setState",
      payload: {
        classDataModalVisible: false
      }
    });
  };

  onTableSelect = (selectedRows) => {
    this.props.dispatch({
      type: "classData/setState",
      payload: {
        classDataSelectedRows: selectedRows
      }
    });
  };

  onTableSelectAll = (selectedRows) => {
    this.props.dispatch({
      type: "classData/setState",
      payload: {
        classDataSelectedRows: selectedRows
      }
    });
  };

  onPaginationShowSizeChange = (pageSize) => {
    const {searchValues, page} = this.props;

    this.props.dispatch({
      type: "classData/getClassDataList",
      payload: {
        searchValues,
        page,
        pageSize
      }
    });
  };

  onPaginationChange = (page) => {
    const {searchValues, pageSize} = this.props;

    this.props.dispatch({
      type: "classData/getClassDataList",
      payload: {
        searchValues,
        page,
        pageSize
      }
    });
  };


  render() {
    //搜索框参数
    const classDataSearchProps = {
      dataSource: this.props.searchValues,
      gradeList: this.props.gradeList,
      onSearch: this.onSearch
    };
    //操作按钮
    const operationButtonListProps = {
      onAdd: this.openAddClassDataModal,
      onUpdate: this.openUpdateClassDataModal,
      onDelete: this.onDeleteClassData
    };

    // 班级弹窗
    const classDataModalProps = {
      visible: this.props.classDataModalVisible,
      dataSource: this.props.currClassData,
      onOk: this.onClassDataModalOk,
      onCancel: this.closeClassDataModalCancel
    };

    //表格参数
    const classDataTableProps = {
      dataSource: this.props.classDataList,
      loading: this.props.loading.effects['classData/getClassDataList'],
      total: this.props.total,
      current: this.props.page,
      pageSize: this.props.pageSize,
      selectedRowKeys: this.props.classDataSelectedRows.map(item => item.id),
      onTableSelect: this.onTableSelect,
      onTableSelectAll: this.onTableSelectAll,
      onPaginationShowSizeChange: this.onPaginationShowSizeChange,
      onPaginationChange: this.onPaginationChange,
    };

    return <div>
      <ClassDataSearch  {...classDataSearchProps}/>
      <OperationButtonList {...operationButtonListProps}/>
      <ClassDataModal {...classDataModalProps}/>
      <ClassDataTable {...classDataTableProps}/>
    </div>;
  }

}

function mapStateToProps(state) {
  // 得到modal中的state)
  const {classData, loading} = state;
  return {...classData, loading}
}

export default connect(mapStateToProps)(ClassData)
