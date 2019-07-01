// user api
import * as classDataService from "../services/classDataService"

export default {
  namespace: 'classData',
  state: {
    // 搜索条件
    searchValues: {},
    // 年级数据
    gradeList: [],
    classDataList: [],
    total: 0,
    page: 0,
    pageSize: 20,
    // 新增弹窗
    classDataModalVisible: false,
    //当前的数据
    currClassData: {},
    //选择的行
    classDataSelectedRows: [],
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
    * getClassDataList({payload: {searchValues, page, pageSize}}, {put, call}) {
      const {data} = yield call(classDataService.getClassDataList, searchValues, page, pageSize);
      yield put({
        type: "setState",
        payload: {
          classDataList: data.data,
          total: data.total,
          page,
          pageSize,
          searchValues
        }
      });
    },
    * getGradeList({payload: params}, {put, call}) {
      const {data: gradeList} = yield call(classDataService.getGradeList);
      yield put({
        type: "setState",
        payload: {
          gradeList
        }
      });
    },
    * getClassDataByClassId({payload: {classId}}, {put, call}) {
      const {data: currClassData} = yield call(classDataService.getClassDataByClassId, classId);
      yield put({
        type: "setState",
        payload: {
          currClassData
        }
      });
    },
    * deleteClassDataByIds({payload: {classIds}}, {select, put, call}) {
      yield call(classDataService.deleteClassDataByIds, classIds.join(","));

      const {searchValues, page, pageSize} = yield select(state => state.classData);
      yield put({
        type: "getClassDataList",
        payload: {searchValues, page, pageSize}
      });
    },
    * createClassData({payload: {values}}, {select, put, call}) {
      yield  call(classDataService.createClassData, values);

      yield put({
        type: "setState",
        payload: {
          classDataModalVisible: false
        }
      });

      const {searchValues, page, pageSize} = yield select(state => state.classData);
      yield put({
        type: "getClassDataList",
        payload: {searchValues, page, pageSize}
      });
    },
    * updateClassData({payload: {values}}, {select, put, call}) {
      yield  call(classDataService.updateClassData, values);

      yield put({
        type: "setState",
        payload: {
          classDataModalVisible: false
        }
      });

      const {searchValues, page, pageSize} = yield select(state => state.classData);
      yield put({
        type: "getClassDataList",
        payload: {searchValues, page, pageSize}
      });
    },
  },
}
