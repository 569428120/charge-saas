import React, {Component} from "react";
import {Pagination, Table} from "antd";
import PropTypes from "prop-types";
import app_styles from "../../pages/app.less";


class CommonTable extends Component {


  render() {

    const {onTableSelect, onTableSelectAll, onPaginationShowSizeChange, onPaginationChange} = this.props;

    // 表格参数
    const tableProps = {
      className: app_styles.table,
      pagination: false,
      bordered: true,
      rowKey: "id",
      dataSource: this.props.dataSource,
      loading: this.props.loading,
      columns: this.props.columns,
      rowSelection: {
        selectedRowKeys: this.props.selectedRowKeys,
        onSelect: (record, selected, selectedRows) => {
          onTableSelect(selectedRows)
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          onTableSelectAll(selectedRows)
        },
      }
    };

    // 分页组件参数
    const paginationProps = {
      defaultCurrent: 1,
      showSizeChanger: true,
      size: 'small',
      pageSizeOptions: ["20", "50", "100"],
      showTotal: (total, range) => `总数 ${total} 当前${range[0]}-${range[1]} 共 ${total} 条`,
      total: this.props.total,
      current: this.props.current,
      pageSize: this.props.pageSize,
      onShowSizeChange: onPaginationShowSizeChange,
      onChange: onPaginationChange
    };

    return <div>
      <Table {...tableProps}/>
      <div className={app_styles.bottom_context}>
        <Pagination {...paginationProps}/>
      </div>
    </div>
  }
}

CommonTable.propTypes = {
  dataSource: PropTypes.object,
  loading: PropTypes.bool,
  total: PropTypes.number,
  current: PropTypes.number,
  pageSize: PropTypes.number,
  columns: PropTypes.array,
  selectedRowKeys: PropTypes.array,
  onTableSelect: PropTypes.func,
  onTableSelectAll: PropTypes.func,
  onPaginationShowSizeChange: PropTypes.func,
  onPaginationChange: PropTypes.func,
};

CommonTable.defaultProps = {
  dataSource: {},
  loading: false,
  total: 0,
  current: 1,
  pageSize: 20,
  columns: [],
  selectedRowKeys: [],

};


export default CommonTable;
