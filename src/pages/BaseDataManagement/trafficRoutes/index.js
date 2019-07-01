import {connect} from "dva";
import React from "react";
import {message} from "antd";
import TrafficRouteSearch from "./components/TrafficRouteSearch";
import TrafficRouteOperationButton from "./components/TrafficRouteOperationButton";
import TrafficRouteModal from "./components/TrafficRouteModal";
import TrafficRouteTable from "./components/TrafficRouteTable";


/**
 *  班级数据页面
 */
class ClassData extends React.Component {

  componentDidMount() {
    this.props.dispatch({
      type: "trafficRoutes/getTrafficRoutes",
      payload: {
        searchValues: {},
        page: 1,
        pageSize: 20
      }
    });
  }


  /**
   * 搜索
   * @param searchValues
   */
  onSearch = (searchValues) => {
    const {page, pageSize} = this.props;
    this.props.dispatch({
      type: "trafficRoutes/getTrafficRoutes",
      payload: {
        searchValues, page, pageSize
      }
    });
  };


  openAddTrafficRouteModal = (routeId) => {
    this.props.dispatch({
      type: "trafficRoutes/setState",
      payload: {
        modalVisible: true
      }
    });
    if (routeId) {
      this.props.dispatch({
        type: "trafficRoutes/getTrafficRouteByClassId",
        payload: {
          routeId
        }
      });
    }
  };

  openUpdateTrafficRouteModal = () => {
    const {selectedRows} = this.props;
    if (selectedRows.length <= 0) {
      message.info("请选择需要编辑的数据");
      return;
    }
    if (selectedRows.length !== 1) {
      message.info("只允许对一条数据进行编辑");
      return;
    }
    this.openAddTrafficRouteModal(selectedRows[0].id)
  };

  onDeleteTrafficRoute = () => {
    const {selectedRows} = this.props;
    if (selectedRows.length <= 0) {
      message.info("请选择需要删除的数据");
      return;
    }
    const routeIds = selectedRows.map(item => item.id);
    this.props.dispatch({
      type: "trafficRoutes/deleteTrafficRouteByIds",
      payload: {
        routeIds
      }
    });
  };


  onTrafficRouteModalOk = (values, isEdit) => {
    //更新
    if (isEdit) {
      this.props.dispatch({
        type: "trafficRoutes/updateTrafficRoute",
        payload: {
          values
        }
      });
      return;
    }
    //新增
    this.props.dispatch({
      type: "trafficRoutes/createTrafficRoute",
      payload: {
        values
      }
    });
  };

  closeTrafficRouteModalCancel = () => {
    //新增
    this.props.dispatch({
      type: "trafficRoutes/setState",
      payload: {
        modalVisible: false
      }
    });
  };

  onTableSelect = (selectedRows) => {
    this.props.dispatch({
      type: "trafficRoutes/setState",
      payload: {
        selectedRows
      }
    });
  };

  onTableSelectAll = (selectedRows) => {
    this.props.dispatch({
      type: "trafficRoutes/setState",
      payload: {
        selectedRows
      }
    });
  };

  onPaginationShowSizeChange = (pageSize) => {
    const {searchValues, page} = this.props;

    this.props.dispatch({
      type: "trafficRoutes/getTrafficRoutes",
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
      type: "trafficRoutes/getTrafficRoutes",
      payload: {
        searchValues,
        page,
        pageSize
      }
    });
  };


  render() {
    //搜索框参数
    const trafficRouteSearchProps = {
      dataSource: this.props.searchValues,
      onSearch: this.onSearch
    };
    //操作按钮
    const operationButtonListProps = {
      onAdd: this.openAddTrafficRouteModal,
      onUpdate: this.openUpdateTrafficRouteModal,
      onDelete: this.onDeleteTrafficRoute
    };

    // 班级弹窗
    const trafficRouteModalProps = {
      visible: this.props.modalVisible,
      dataSource: this.props.currData,
      onOk: this.onTrafficRouteModalOk,
      onCancel: this.closeTrafficRouteModalCancel
    };

    //表格参数
    const trafficRouteTableProps = {
      dataSource: this.props.trafficRouteList,
      loading: this.props.loading.effects['trafficRoutes/getTrafficRoutes'],
      total: this.props.total,
      current: this.props.page,
      pageSize: this.props.pageSize,
      selectedRowKeys: this.props.selectedRows.map(item => item.id),
      onTableSelect: this.onTableSelect,
      onTableSelectAll: this.onTableSelectAll,
      onPaginationShowSizeChange: this.onPaginationShowSizeChange,
      onPaginationChange: this.onPaginationChange,
    };

    return <div>
      <TrafficRouteSearch  {...trafficRouteSearchProps}/>
      <TrafficRouteOperationButton {...operationButtonListProps}/>
      <TrafficRouteModal {...trafficRouteModalProps}/>
      <TrafficRouteTable {...trafficRouteTableProps}/>
    </div>;
  }

}

function mapStateToProps(state) {
  // 得到modal中的state)
  const {trafficRoutes, loading} = state;
  return {...trafficRoutes, loading}
}

export default connect(mapStateToProps)(ClassData)
