import React, {Component} from "react";
import {connect} from "dva";


/**
 *  路由挑战组件
 */
class CommonLink extends Component {

    /**
     *  跳转路由
     */
    toRouter = () => {

    };

    render() {
        return <span onClick={this.toRouter}>
            {this.props.children}
        </span>;
    }
}

function mapStateToProps(state) {
    // 得到modal中的state)
    const {context} = state;

    return {
        ...context
    }
}

export default connect(mapStateToProps)(CommonLink)
