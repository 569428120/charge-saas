// user api
import * as projectService from "../services/chargeProjectService"

export default {
    namespace: 'chargeProject',
    state: {
        // 是否初始化
        isInit: false,
        // 数据
        chargeProjectData: [],
        //选择的行
        projectSelectedRows: [],
        // 当前项目
        currProject: {},
        // 总数
        total: 0,
        //当前页
        page: 1,
        //每页数量
        pageSize: 20,
        //是否弹窗
        visible: false,
        // 报表是否显示
        chargeReportVisible: false,
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
        //初始化数据
        * initProjectData({payload: params}, {select, call, put}) {
            //存在数据则不查询
            const {isInit, page, pageSize} = yield select(state => state.chargeProject);
            if (isInit) {
                return;
            }
            yield put({
                type: "queryProject",
                payload: {
                    page,
                    pageSize
                }
            });
            yield put({
                type: 'setState',
                payload: {
                    isInit: true,
                }
            });

        },
        //查询收费项目
        * queryProject({payload: {values, page, pageSize}}, {call, put}) {
            const {data} = yield call(projectService.queryProject, values, page, pageSize);
            yield put({
                type: 'setState',
                payload: {
                    page,
                    pageSize,
                    chargeProjectData: data.data,
                    total: data.total
                }
            })
        },
        //创建收费项目
        * createProject({payload: values}, {select, call, put}) {
            yield call(projectService.createProject, values);
            //刷新数据
            const {page, pageSize} = yield select(state => state.chargeProject);
            yield put({
                type: "queryProject",
                payload: {
                    page,
                    pageSize
                }
            });
        },
        //更新项目
        * updateProject({payload: values}, {select, call, put}) {
            yield call(projectService.updateProject, values);
            //刷新数据
            const {page, pageSize} = yield select(state => state.chargeProject);
            yield put({
                type: "queryProject",
                payload: {
                    page,
                    pageSize
                }
            });
        },
        //删除收费项目
        * deleteProjects({payload: {page, pageSize, projectIds}}, {select, call, put}) {
            yield call(projectService.deleteProjects, projectIds.join(","));
            yield put({
                type: "setState",
                payload: {
                    projectSelectedRows: [],
                }
            });
            yield put({
                type: "queryProject",
                payload: {
                    page,
                    pageSize
                }
            });
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/charge-project') {
                    dispatch({type: 'initProjectData', payload: {}})
                }

            })
        }
    }
}
