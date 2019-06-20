import React from 'react'
import {Route, Switch, Redirect, routerRedux} from 'dva/router'
import dynamic from 'dva/dynamic'
import App from './App'

const {ConnectedRouter} = routerRedux;

function RouterConfig({history, app}) {
    /**
     * 主页面
     */
    const IndexPage = dynamic({
        app,
        component: () => import('./chargeManagement/routes/IndexPage')
    });
    /**
     *  用户页面
     */
    const Users = dynamic({
        app,
        models: () => [import('./chargeManagement/models/users')],
        component: () => import('./chargeManagement/routes/Users')
    });
    /**
     * 收费项目
     */
    const ChargeProject = dynamic({
        app,
        models: () => [import('./chargeManagement/models/chargeProject')],
        component: () => import('./chargeManagement/routes/chargeProject/ChargeProject')
    });
    /**
     *  收费详情
     */
    const ChargeDetails = dynamic({
        app,
        models: () => [import('./chargeManagement/models/chargeDetails')],
        component: () => import('./chargeManagement/routes/chargeDetails/ChargeDetails')
    });

    /**
     *  收费人员详情
     */
    const ChargePersonnel = dynamic({
        app,
        models: () => [import('./chargeManagement/models/chargePersonnel')],
        component: () => import('./chargeManagement/routes/chargePersonnel/ChargePersonnel')
    });

    /**
     *  报表
     */
    const FinancialStatement = dynamic({
        app,
        models: () => [import('./chargeManagement/models/financialStatement')],
        component: () => import('./chargeManagement/routes/financialStatement/FinancialStatement')
    });

    const HomePage = dynamic({
        app,
        models: () => [import('./chargeManagement/models/homePage')],
        component: () => import('./chargeManagement/routes/home/HomePage')
    });

    return (
        <ConnectedRouter history={history}>
            <Switch>
                <App>
                    <Route path="/" exact component={IndexPage}/>
                    <Route path="/users" exact component={Users}/>
                    <Route path="/charge-project" exact component={ChargeProject}/>
                    <Route path="/charge-details" exact component={ChargeDetails}/>
                    <Route path="/charge-personnel" exact component={ChargePersonnel}/>
                    <Route path="/financial-statement" exact component={FinancialStatement}/>
                    <Route path="/home" exact component={HomePage}/>
                </App>
            </Switch>
        </ConnectedRouter>
    )
}

export default RouterConfig
