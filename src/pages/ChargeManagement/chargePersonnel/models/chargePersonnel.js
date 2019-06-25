import {message} from 'antd';
// user api
import * as personnelService from '../services/chargePersonnelService'
import * as projectService from "../../chargeProject/services/chargeProjectService";
import * as sysDataService from "../services/sysDataService";

export default {
  namespace: 'chargePersonnel',
  state: {
    //项目id
    projectId: null,
    // 下拉框选择数据
    projectSelectedData: [],
    //搜索条件
    searchValues: {},
    // 新增人员弹窗
    personnelModalVisible: false,
    // 减免信息弹窗
    rductionModalVisible: false,
    //查看减免信息弹窗
    viewReductionModalVisible: false,
    // 联系人弹窗
    contactInfoModalVisible: false,
    // 个人收费清单弹窗
    chargeInventoryModal: false,
    // 个人收费清单弹窗是否支持选择
    isChargeInventoryCheck: false,
    // 人员数据
    personnelData: [],
    //总数
    personnelTotal: 0,
    // 当前页
    personnelPage: 0,
    // 每页显示的大小
    personnelPageSize: 20,
    // 选择的人员
    personnelSelectedRows: [],
    // 当前的人员
    currPersonnelRecord: {},
    // 减免数据列表
    reductionList: [],
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
    * initData({payload: {projectId}}, {select, call, put}) {
      //存在数据则不查询
      const {searchValues, personnelPage, personnelPageSize} = yield select(state => state.chargePersonnel);
      // 初始化选择库数据
      const {data} = yield call(projectService.queryProject, {}, 1, 20);
      yield put({
        type: "setState",
        payload: {
          projectSelectedData: data.data
        }
      });

      if (!projectId && data.data.length > 0) {
        projectId = data.data[0].id;
      }
      // 查询收费项目详情
      yield put({
        type: "getChargePersonnels",
        payload: {
          projectId,
          searchValues: {...searchValues, projectId},
          personnelPage,
          personnelPageSize
        }
      });

    },
    // 查询人员信息
    * getChargePersonnels({payload: {projectId, searchValues, personnelPage, personnelPageSize}}, {select, call, put}) {
      const {data: {data, total}} = yield call(personnelService.getChargePersonnels, projectId, searchValues, personnelPage, personnelPageSize);
      yield put({
        type: 'setState',
        payload: {
          projectId,
          searchValues,
          personnelPage,
          personnelPageSize,
          personnelData: data,
          personnelTotal: total
        }
      })
    },
    // 新增人员信息
    * createChargePersonnel({payload: {projectId, values, personnelModalVisible}}, {select, call, put}) {
      yield call(personnelService.createPersonnel, projectId, values);
      // 关闭窗口
      yield put({
        type: 'setState',
        payload: {
          personnelModalVisible
        }
      });
      const {searchValues, personnelPage, personnelPageSize} = yield select(state => state.chargePersonnel);
      // 刷新数据
      yield put({
        type: 'getChargePersonnels',
        payload: {
          projectId,
          searchValues,
          personnelPage,
          personnelPageSize
        }
      })
    },
    // 更新人员信息
    * updateChargePersonnel({payload: {values, personnelModalVisible}}, {select, call, put}) {
      yield call(personnelService.updateChargePersonnel, values);
      // 关闭窗口
      yield put({
        type: 'setState',
        payload: {
          personnelModalVisible
        }
      });
      const {projectId, searchValues, personnelPage, personnelPageSize} = yield select(state => state.chargePersonnel);
      // 刷新数据
      yield put({
        type: 'getChargePersonnels',
        payload: {
          projectId,
          searchValues,
          personnelPage,
          personnelPageSize
        }
      })
    },
    * deletePersonnels({payload: {personnelIds}}, {select, call, put}) {
      const {projectId, searchValues, personnelPage, personnelPageSize} = yield select(state => state.chargePersonnel);
      yield call(personnelService.deletePersonnels, personnelIds.join(","));
      yield put({
        type: "getChargePersonnels",
        payload: {
          projectId,
          searchValues,
          personnelPage,
          personnelPageSize,
          personnelSelectedRows: [],
        }
      });
    },
    // 增加减免信息
    * addReductions({payload: {personnelIds, values}}, {select, call, put}) {
      yield call(personnelService.addReductions, personnelIds.join(","), values);
      yield put({
        type: 'setState',
        payload: {
          rductionModalVisible: false
        }
      });
      const {projectId, searchValues, personnelPage, personnelPageSize} = yield select(state => state.chargePersonnel);
      // 刷新数据
      yield put({
        type: 'getChargePersonnels',
        payload: {
          projectId,
          searchValues,
          personnelPage,
          personnelPageSize
        }
      })

    },

    // 打开查看减免信息弹窗
    * getReductionsByPersonnelId({payload: {personnelId}}, {select, call, put}) {
      const {data: reductionList} = yield call(personnelService.getReductionsByPersonnelId, personnelId);
      yield put({
        type: 'setState',
        payload: {
          reductionList
        }
      });
    },

    // 删除减免信息
    * deleteReduction({payload: {personnelId, reductionId}}, {select, call, put}) {
      yield call(personnelService.deleteReduction, reductionId);
      yield put({
        type: 'getReductionsByPersonnelId',
        payload: {
          personnelId
        }
      });
    },

    // 打开人员窗口
    * openPersonnelModal({payload: {personnelId}}, {select, call, put}) {
      let currPersonnelRecord = {};
      if (personnelId) {
        const {data} = yield call(personnelService.getChargePersonnelById, personnelId);
        currPersonnelRecord = data;
      }
      // 查询寄读方式,查询路线,班级
      const {data: {boardingData, routeData, classData}} = yield call(sysDataService.getSysRouteAndBoardingAndClassData);
      yield put({
        type: 'setState',
        payload: {
          currPersonnelRecord,
          boardingData,
          routeData,
          classData,
          personnelModalVisible: true
        }
      });
    },


    // 打开联系人弹窗
    * openContactInfoModal({payload: {personnelId}}, {select, call, put}) {
      let contactInfoList = [];
      if (personnelId) {
        contactInfoList = yield call(personnelService.getContactInfosByPersonnelId, personnelId);
      }
      yield put({
        type: 'setState',
        payload: {
          contactInfoList,
          contactInfoModalVisible: true
        }
      });
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {

      })
    }
  }
}
