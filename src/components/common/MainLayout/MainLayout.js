import React, {Component} from 'react'
import {Layout, Menu, Breadcrumb, PageHeader, Tabs, Button, Icon, Row, Col} from 'antd';
import Headers from "./Headers";
import MenuLayout from "./MenuLayout";
import {connect} from "dva";
import Login from "../Login";
import {Link} from "react-router-dom";
import styles from '../../../app.less'
import {routerRedux} from "dva/router";

const {Content} = Layout;

const {TabPane} = Tabs;


class MainLayout extends Component {

    state = {
        //系统列表
        systems: this.props.subSystems,
        // 菜单
        menus: this.props.menuList,
        // 是否展开菜单
        collapsed: false,
        // 系统选择
        headerSelectedKey: "system2",
        // 历
        oldMenuOpenKeys: [],
        // 菜单展开
        menuOpenKeys: ["subMenu1"],
        // 菜单选择的项
        menuSelectedKey: "/home",
        // 选择的标签
        tabActiveKey: "/home",
        // 标签页
        pageTabPanes: [this.props.routeMap.get("/home")],
    };

    /**
     *  点击菜单栏
     */
    onMenusSelect = (key) => {
        const {routeMap} = this.props;
        const routeInfo = routeMap.get(key);
        if (!routeInfo) {
            return;
        }
        // 跳转路由
        this.props.dispatch(routerRedux.push(key));
        //增加标签页面
        const {pageTabPanes} = this.state;
        // 不包含需要添加
        if (pageTabPanes.findIndex(item => item.path === key) === -1) {
            pageTabPanes.push(routeInfo);
        }
        this.setState({
            pageTabPanes,
            tabActiveKey: key,
            menuSelectedKey: key
        })
    };

    onMenusOpenChange = (openKeys) => {
        this.setState({
            menuOpenKeys: openKeys
        })
    };

    /**
     *   标签页切换事件
     */
    onTabChange = (path) => {
        const {routeMap} = this.props;
        const routeInfo = routeMap.get(path);
        // 跳转路由
        this.props.dispatch(routerRedux.push(path));
        // 选中对应的头菜单,对应的菜单
        this.setState({
            tabActiveKey: path,
            menuOpenKey: routeInfo.menuId,
            menuSelectedKey: path,
            headerSelectedKey: routeInfo.systemId
        })
    };


    /**
     *  选择头事件
     */
    onHeaderSelect = ({key}) => {
        const {menuList} = this.props;
        const menus = menuList.filter(item => {
            return item.parentId === key;
        });
        this.setState({
            menus,
            headerSelectedKey: key,
        });
    };


    /**
     *  删除标签页
     */
    onTabEdit = (targetKey, action) => {
        const {pageTabPanes} = this.state;
        const newPageTabPanes = pageTabPanes.filter(item => item.path !== targetKey);
        if (newPageTabPanes.length <= 0) {
            return;
        }
        const lastInfo = newPageTabPanes[newPageTabPanes.length - 1];
        this.onTabChange(lastInfo.path);
        this.setState({
            pageTabPanes: newPageTabPanes,
        })
    };

    /**
     *  登录
     */
    onLogin = () => {
        this.props.dispatch({
            type: "context/setState",
            payload: {
                isLogin: true
            }
        })
    };

    /**
     *   菜单栏搜奇
     */
    toggleCollapsed = () => {
        const {menuOpenKeys, oldMenuOpenKeys} = this.state;
        let oldTmpMenuOpenKeys = [];
        let newMenuOpenKeys = [];
        // 如果打开则讲open也打开
        if (!this.state.collapsed) {
            oldTmpMenuOpenKeys = menuOpenKeys;
        } else {
            newMenuOpenKeys = oldMenuOpenKeys;
        }
        this.setState({
            menuOpenKeys: newMenuOpenKeys,
            oldMenuOpenKeys: oldTmpMenuOpenKeys,
            collapsed: !this.state.collapsed,
        });
    };

    render() {

        const {children, location} = this.props;

        // 跳转到登录页面
        if (!this.props.isLogin) {
            return <Login onLogin={this.onLogin}/>
        }

        return (<Layout style={{padding: '0 0px'}}>
            <Headers headers={this.state.systems}
                     selectedKey={this.state.headerSelectedKey}
                     onSelect={this.onHeaderSelect}
            />
            <Layout>
                {
                    // 显示菜单
                    this.state.menus.length > 0 ?
                        <MenuLayout collapsed={this.state.collapsed}
                                    menus={this.state.menus}
                                    openKeys={this.state.menuOpenKeys}
                                    selectedKey={this.state.menuSelectedKey}
                                    onOpenChange={this.onMenusOpenChange}
                                    onSelect={this.onMenusSelect}
                        /> : null
                }
                <Layout style={{padding: '0 0px 0px'}}>
                    <Content
                        className={styles.context}
                        style={{
                            background: '#fff',
                            padding: 5,
                            margin: 0,
                            minHeight: 280,
                        }}>

                        <Button type="primary" onClick={this.toggleCollapsed}
                                style={{width: 20}}>
                            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}/>
                        </Button>
                        <Tabs style={{marginTop: -37, marginLeft: 44}}
                              defaultActiveKey="1"
                              size="small"
                              type="editable-card"
                              hideAdd={true}
                              activeKey={this.state.tabActiveKey}
                              onChange={this.onTabChange}
                              onEdit={this.onTabEdit}
                        >
                            {
                                this.state.pageTabPanes.map(item => {
                                    if ("/home" === item.path) {
                                        return <TabPane closable={false} tab={<span>{item.name}</span>}
                                                        key={item.path}/>
                                    }
                                    return <TabPane tab={<span>{item.name}</span>} key={item.path}/>
                                })
                            }
                        </Tabs>

                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>)
    }
}


export default connect(
    (
        state
    ) => {
        const {
            context
        }

            = state;
        return {...context}
    })
(MainLayout);

