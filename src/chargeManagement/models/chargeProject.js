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

        * queryProject({payload: params}, {call, put}) {
            const {values, page, pageSize} = params;
            const {data} = yield call(projectService.queryProject, values, page, pageSize);
            yield put({
                type: 'setState',
                payload: {
                    chargeProjectData: data.data,
                    total: data.total
                }
            })
        }
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
