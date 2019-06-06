import React from "react";
import {connect} from "dva";
import StatementSearch from "../../components/financialStatement/StatementSearch";
import StatementTabs from "../../components/financialStatement/StatementTabs";
import OperationButtonList from "../../components/financialStatement/OperationButtonList";
import app_styles from "../../../app.less";
import {Pagination} from "antd";


/**
 * 财务报表页面
 */
class FinancialStatement extends React.Component {

    /**
     *  点击搜索按钮
     */
    onButtonSearch = (values) => {
        console.log(values)
    };

    /**
     *  导出按钮
     */
    onButtonExport = () => {

    };

    /**
     *   打印按钮
     */
    onButtonPrint = () => {

    };

    render() {
        return <div>
            <StatementSearch onSearch={this.onButtonSearch}/>
            <StatementTabs/>

            <div className={app_styles.bottom_context}>
                <OperationButtonList onExport={this.onButtonExport}
                                     onPrint={this.onButtonPrint}
                />
            </div>
        </div>;
    }
}

function mapStateToProps(state) {
    // 得到modal中的state)
    const chargePersonnel = state.chargePersonnel;
    return {...chargePersonnel}
}

export default connect(mapStateToProps)(FinancialStatement)