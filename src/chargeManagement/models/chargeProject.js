// user api
import * as projectService from "../services/chargeProjectService"

export default {
    namespace: 'chargeProject',
    state: {
        // 数据
        chargeProjectData: [],
        // 总数
        total: 0,
        //当前页
        page: 1,
        //每页数量
        pageSize: 20
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
        //查询收费项目
        * queryProject({payload: {values, page, pageSize}}, {call, put}) {
            const {data} = yield call(projectService.queryProject, values, page, pageSize);
            yield put({
                type: 'setState',
                payload: {
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
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                /*
                console.log("aaaa");
                if (pathname === '/charge-project') {
                    console.log('/charge-project');
                    console.log(query);
                    dispatch({type: 'fetch', payload: {page: 1}})
                }

                 */
            })
        }
    }
}
