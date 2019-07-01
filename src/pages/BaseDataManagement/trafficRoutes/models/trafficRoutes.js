// user api
import * as trafficRouteService from "../services/trafficRouteService"

export default {
  namespace: 'trafficRoutes',
  state: {
    // 搜索条件
    searchValues: {},
    // 数据
    trafficRouteList: [],
    total: 0,
    page: 0,
    pageSize: 20,
    // 新增弹窗
    modalVisible: false,
    //当前的数据
    currData: {},
    //选择的行
    selectedRows: [],
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
    * getTrafficRoutes({payload: {searchValues, page, pageSize}}, {put, call}) {
      const {data} = yield call(trafficRouteService.getTrafficRoutes, searchValues, page, pageSize);
      yield put({
        type: "setState",
        payload: {
          trafficRouteList: data.data,
          total: data.total,
          page,
          pageSize,
          searchValues
        }
      });
    },

    * getTrafficRouteById({payload: {routeId}}, {put, call}) {
      const {data: currData} = yield call(trafficRouteService.getTrafficRouteById, routeId);
      yield put({
        type: "setState",
        payload: {
          currData
        }
      });
    },

    * deleteTrafficRouteByIds({payload: {routeIds}}, {select, put, call}) {
      yield call(trafficRouteService.deleteTrafficRouteByIds, routeIds.join(","));

      const {searchValues, page, pageSize} = yield select(state => state.trafficRoutes);
      yield put({
        type: "getTrafficRoutes",
        payload: {searchValues, page, pageSize}
      });
    },
    * createTrafficRoute({payload: {values}}, {select, put, call}) {
      yield  call(trafficRouteService.createTrafficRoute, values);

      yield put({
        type: "setState",
        payload: {
          modalVisible: false
        }
      });

      const {searchValues, page, pageSize} = yield select(state => state.classData);
      yield put({
        type: "getTrafficRoutes",
        payload: {searchValues, page, pageSize}
      });
    },
    * updateTrafficRoute({payload: {values}}, {select, put, call}) {
      yield  call(trafficRouteService.updateTrafficRoute, values);

      yield put({
        type: "setState",
        payload: {
          modalVisible: false
        }
      });

      const {searchValues, page, pageSize} = yield select(state => state.classData);
      yield put({
        type: "getTrafficRoutes",
        payload: {searchValues, page, pageSize}
      });
    },
  },
}
