// user api
import * as usersService from '../services/users'

export default {
    namespace: 'chargeProject',
    state: {
        // 数据
        chargeProjectData: [],
        total: 0,
        page: 0
    },
    reducers: {
        /**
         * test
         * @param {*} state
         * @param {*} param1
         */
        save(state, {payload: params}) {
            return {...state, ...params}
        }
    },
    effects: {

        // 打开弹窗
        * openModal({}, {call, put}) {
            yield put({
                type: 'save',
                payload: {
                    visible: true
                }
            })
        },
        // 关闭弹窗
        * closeModal({}, {call, put}) {
            yield put({
                type: 'save',
                payload: {
                    visible: false
                }
            })
        },

        * fetch({payload: {page}}, {call, put}) {
            const {data, headers} = yield call(usersService.fetch, {page});
            yield put({
                type: 'save',
                payload: {
                    chargeProjectData: data,
                    total: headers['x-total-count'],
                    page: parseInt(page, 10)
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
