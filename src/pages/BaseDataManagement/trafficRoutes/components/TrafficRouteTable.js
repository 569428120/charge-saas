import React, {Component} from "react";
import CommonTable from "../../../../components/CommonTable";
import PropTypes from "prop-types";


const tableColumns = () => {
  return [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: "30%",
    },
    {
      title: '路线编号',
      dataIndex: 'code',
      key: 'code',
      width: "30%",
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    }
  ];
};

class TrafficRouteTable extends Component {

  render() {

    const commonTableProps = {
      columns: tableColumns(),
      dataSource: this.props.dataSource,
      loading: this.props.loading,
      total: this.props.total,
      current: this.props.current,
      pageSize: this.props.pageSize,
      selectedRowKeys: this.props.selectedRowKeys,
      onTableSelect: this.props.onTableSelect,
      onTableSelectAll: this.props.onTableSelectAll,
      onPaginationShowSizeChange: this.props.onPaginationShowSizeChange,
      onPaginationChange: this.props.onPaginationChange,
    };

    return <CommonTable {...commonTableProps}/>
  }
}

TrafficRouteTable.propTypes = {
  dataSource: PropTypes.object,
  loading: PropTypes.bool,
  total: PropTypes.number,
  current: PropTypes.number,
  pageSize: PropTypes.number,
  selectedRowKeys: PropTypes.array,
  onTableSelect: PropTypes.func,
  onTableSelectAll: PropTypes.func,
  onPaginationShowSizeChange: PropTypes.func,
  onPaginationChange: PropTypes.func,
};

TrafficRouteTable.defaultProps = {
  dataSource: {},
  loading: false,
  total: 0,
  current: 1,
  pageSize: 20,
  selectedRowKeys: [],

};

export default TrafficRouteTable;
