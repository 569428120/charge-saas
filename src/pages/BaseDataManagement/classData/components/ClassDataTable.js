import React, {Component} from "react";
import CommonTable from "../../../../components/CommonTable";
import PropTypes from "prop-types";


const tableColumns = () => {
  return [
    {
      title: '年级',
      dataIndex: 'grade',
      key: 'grade',
      width: "30%",
    },
    {
      title: '班级名称',
      dataIndex: 'className',
      key: 'className',
      width: "30%",
    },
    {
      title: '班级编码',
      dataIndex: 'classCode',
      key: 'classCode',
    }
  ];
};

class ClassDataTable extends Component {

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

ClassDataTable.propTypes = {
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

ClassDataTable.defaultProps = {
  dataSource: {},
  loading: false,
  total: 0,
  current: 1,
  pageSize: 20,
  selectedRowKeys: [],

};

export default ClassDataTable;
