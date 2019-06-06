import * as Config from '../services/appConfig'
import {routerRedux} from "dva/router";
import {message} from "antd"

export default {
    namespace: 'context',
    state: {
        //是否登录
        isLogin: true,
        //当前用户信息
        loginUser: {},
        // 子系统列表
        subSystems: Config.getSystems(),
        // 菜单列表
        menuList: Config.getSubMenus(),
        //路由map
        routeMap: Config.routeMap(),
        //当前的位置 默认打开首页
        currPage: {
            systemId: "system1",
            menuId: "subMenu1",
            menuOpenId: "menu1"
        },
        cacheMap: new Map(),
        // 标签页
        pageTabPanes: [],
    },
    reducers: {
        /**
         * test
         * @param {*} state
         * @param {*} param1
         */
        setState(state, {payload: params}) {
            return {...state, ...params}
        }
    },
    effects: {

        * refreshSystemMenus({payload: {path}}, {select, call, put}) {
            if (!path) {
                return
            }
            //shuax
            const {routeMap, pageTabPanes, cacheMap} = yield select(state => state.context);
            const routeInfo = routeMap.get(path, null);
            if (!routeInfo) {
                return
            }
            if (cacheMap.has(path)) {
                return
            }
            cacheMap.set(path, null);
            pageTabPanes.push(routeInfo);
            yield put({
                type: "setState",
                payload: {
                    pageTabPanes,
                    currPage: {
                        systemId: routeInfo.systemId,
                        menuId: routeInfo.menuId,
                        menuOpenId: routeInfo.id
                    }
                }
            })

        },

        // 路由跳转
        * toRouter({payload: {path}}, {select, put}) {

            const {routeMap, pageTabPanes, cacheMap} = yield select(state => state.context);

            const routeInfo = routeMap.get(path);
            if (!routeInfo) {
                message.error("跳转错误");
                return;
            }

            if (!cacheMap.has(path)) {
                pageTabPanes.push(routeInfo);
                cacheMap.set(path, "");
            }
            // 更新标签页
            yield put({
                type: "setState",
                payload: {
                    pageTabPanes
                }
            });
            //跳转
            yield put(routerRedux.push(path));
        },

        * fetch({payload: {page}}, {call, put}) {

        },
        //登陆方法
        * login({payload: params}, {call, put}) {
            // 获取登陆名称和密码
            const {username, password, verificationCode} = params;


        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                /*
                dispatch({
                    type: "refreshSystemMenus",
                    payload: {
                        path: pathname,
                    }
                });

                 */
            })
        }
    }
}
