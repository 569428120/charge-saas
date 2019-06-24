// user api

export default {
    namespace: 'financialStatement',
    state: {
        // 数据
        list: [],
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
