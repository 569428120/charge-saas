const systemData = [
  {
    name: "收费系统",
    key: "/charge-system",
    icon: '',
    path: "/charge-system/charge-management/charge-project"
  },
  {
    name: "基础数据",
    key: "/base-data",
    icon: '',
    path: "/base-data/data-management/class-data"
  },
  {
    name: "权限管理",
    key: "/authority-management",
    icon: '',
    path: "/authority-management/charge-management/charge-project"
  },
];

export default {
  namespace: 'system',

  state: {
    systemList: []
  },

  effects: {
    * getSystemList({payload}, {put}) {
      // 服务器端获取菜单数据
      yield put({
        type: 'save',
        payload: {
          systemList: systemData
        },
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
