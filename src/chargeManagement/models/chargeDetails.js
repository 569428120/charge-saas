// user api
import * as chargeDetailsService from '../services/chargeDetailsService'
import * as projectService from "../services/chargeProjectService";

export default {
    namespace: 'chargeDetails',
    state: {
        // 是否初始化
        isInit: false,
        //项目id
        projectId: "",
        //搜索条件
        searchValues: {},
        // 下拉框选择数据
        projectSelectedData: [],
        // 收费项目数据
        chargeDetailsData: [],
        // 选择的数据
        chargeDetailsSelectedRows: [],
        // 收费类型弹窗
        chargeTypeModalVisible: false,
        // 收费项弹窗
        chargeItemModalVisible: false,
        // 当前的类型
        chargeRecord: {},
        // 选择的收费类型
        chargeTypeRecord: {},
        // 寄读方式
        boardingData: [],
        // 乘车路线
        routeData: [],
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
        * initData({payload: {projectId, name}}, {select, call, put}) {
            //存在数据则不查询
            const {isInit} = yield select(state => state.chargeDetails);
            // 初始化选择库数据
            const {data} = yield call(projectService.queryProject, {}, 1, 20);
            yield put({
                type: "setState",
                payload: {
                    projectSelectedData: data.data
                }
            });
            // 已经初始化过了则跳出
            if (isInit) {
                return;
            }
            if (!projectId && data.data.length > 0) {
                projectId = data.data[0].id;
            }
            // 查询收费项目详情
            yield put({
                type: "queryDetails",
                payload: {
                    projectId,
                    name
                }
            });

        },
        // 查询收费详情
        * queryDetails({payload: {projectId, name}}, {select, call, put}) {
            const {data: chargeDetailsData} = yield call(chargeDetailsService.queryDetails, projectId, name);
            yield put({
                type: 'setState',
                payload: {
                    isInit: true,
                    projectId,
                    searchValues: {
                        projectId,
                        name
                    },
                    chargeDetailsData
                }
            });
        },
        // 创建收费项
        * createChargeDetails({payload: values}, {select, call, put}) {
            const {searchValues: {projectId, name}} = yield select(state => state.chargeDetails);
            if (values) {
                values = {
                    ...values,
                    projectId
                }
            }
            yield call(chargeDetailsService.createChargeDetails, values);
            // 查询收费项目详情
            yield put({
                type: "queryDetails",
                payload: {
                    projectId,
                    name
                }
            });
        },
        // 更新
        * updateChargeDetails({payload: values}, {select, call, put}) {
            yield call(chargeDetailsService.updateChargeDetails, values);
            const {searchValues: {projectId, name}} = yield select(state => state.chargeDetails);
            // 查询收费项目详情
            yield put({
                type: "queryDetails",
                payload: {
                    projectId,
                    name
                }
            });
        },
        // 删除收费项
        * deleteChargeDetails({payload: {detailIds}}, {select, call, put}) {
            yield call(chargeDetailsService.deleteChargeDetails, detailIds);
            const {searchValues: {projectId, name}} = yield select(state => state.chargeDetails);
            // 查询收费项目详情
            yield put({
                type: "queryDetails",
                payload: {
                    projectId,
                    name
                }
            });

        },
        // 打开修改弹窗
        * openChargeDetailsModal({payload: {chargeDetailsId, chargeTypeModalVisible, chargeItemModalVisible}}, {select, call, put}) {

            let chargeRecord = {};
            if (chargeDetailsId) {
                const {data} = yield call(chargeDetailsService.getDetailsById, chargeDetailsId);
                chargeRecord = data;
            }
            // 查询寄读方式
            const {data: boardingData} = yield call(chargeDetailsService.getSysBoardingData);
            // 查询路线
            const {data: routeData} = yield call(chargeDetailsService.getSysRouteData);
            yield put({
                type: 'setState',
                payload: {
                    chargeRecord,
                    boardingData,
                    routeData,
                    chargeTypeModalVisible,
                    chargeItemModalVisible
                }
            });
            const {searchValues: {projectId, name}} = yield select(state => state.chargeDetails);
            // 查询收费项目详情
            yield put({
                type: "queryDetails",
                payload: {
                    projectId,
                    name
                }
            });
        },

    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/charge-details') {
                    dispatch({type: 'initData', payload: {}})
                }
            })
        }
    }
}
