// user api
import * as roleInfoService from "../services/roleInfoService"

export default {
  namespace: 'roleInfo',
  state: {
    // 搜索条件
    searchValues: {},
    // 数据
    roleInfoList: [],
    total: 0,
    page: 0,
    pageSize: 20,
    // 新增弹窗
    modalVisible: false,
    //设置权限弹窗
    settingRoleModalVisible: false,
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
      const {data: roleInfoList, total} = yield call(roleInfoService.getRoleInfos, searchValues, page, pageSize);
      yield put({
        type: "setState",
        payload: {
          roleInfoList,
          total,
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

    * validatorName({payload: {value, callback}}, {select, put, call}) {
      const {data: isExist} = yield  call(roleInfoService.validatorName, value);
      if (isExist) {
        callback(`名称${value}已经存在`);
        return
      }
      callback();
    },

    * createRoleInfo({payload: {values}}, {select, put, call}) {
      yield call(roleInfoService.createRoleInfo, values);
      const {searchValues, page, pageSize} = yield select(state => state.roleInfo);
      yield put({
        type: "getRoleInfos",
        payload: {
          searchValues,
          page,
          pageSize
        }
      });
    },

    * updateRoleInfo({payload: {values}}, {select, put, call}) {
      yield call(roleInfoService.updateRoleInfo, values);
      const {searchValues, page, pageSize} = yield select(state => state.roleInfo);
      yield put({
        type: "getRoleInfos",
        payload: {
          searchValues,
          page,
          pageSize
        }
      });
    },

    * enableRoleInfoById({payload: {roleInfoId, checked}}, {select, put, call}) {
      yield call(roleInfoService.enableRoleInfoById, roleInfoId, checked);
      const {searchValues, page, pageSize} = yield select(state => state.roleInfo);
      yield put({
        type: "getRoleInfos",
        payload: {
          searchValues,
          page,
          pageSize
        }
      });
    },

    * deleteRoleInfoByIds({payload: {roleIds}}, {select, put, call}) {
      yield call(roleInfoService.deleteRoleInfoByIds, roleIds.join(","));
      const {searchValues, page, pageSize} = yield select(state => state.roleInfo);
      yield put({
        type: "getRoleInfos",
        payload: {
          searchValues,
          page,
          pageSize
        }
      });
    }
  },
}
