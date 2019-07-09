// user api
import * as roleInfoService from "../services/roleInfoService"

export default {
  namespace: 'roleInfo',
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
    * getRoleInfos({payload: {searchValues, page, pageSize}}, {put, call}) {
      const {data} = yield call(roleInfoService.getRoleInfos, searchValues, page, pageSize);
      yield put({
        type: "setState",
        payload: {
          roleInfosList: data.data,
          total: data.total,
          page,
          pageSize,
          searchValues
        }
      });
    },

    * getRoleInfoById({payload: {roleId}}, {put, call}) {
      const {data: currData} = yield call(roleInfoService.getRoleInfoById, roleId);
      yield put({
        type: "setState",
        payload: {
          currData
        }
      });
    },

    * deleteRoleInfoByIds({payload: {roleIds}}, {select, put, call}) {
      yield call(roleInfoService.deleteRoleInfoByIds, roleIds.join(","));
      const {searchValues, page, pageSize} = yield select(state => state.roleInfo);
      yield put({
        type: "getRoleInfos",

      });
    }
  },
}
