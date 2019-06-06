import React, {Component} from 'react'
import {connect} from 'dva'
import {withRouter} from 'dva/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import MainLayout from './components/common/MainLayout/MainLayout'

import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';


moment.locale('zh-cn');


let lastHref;

class App extends Component {
    render() {
        let {loading, children, location} = this.props;
        const {href} = window.location;
        if (lastHref !== href) {
            NProgress.start();
            if (!loading.global) {
                NProgress.done();
                lastHref = href
            }
        }
        return (<LocaleProvider locale={zh_CN}>
            <MainLayout location={location}>
                {children}
            </MainLayout>
        </LocaleProvider>)
    }
}

App.propTypes = {};

export default withRouter(
    connect(({app, loading}) => ({
        app,
        loading
    }))(App)
)
