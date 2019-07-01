export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {path: '/user', redirect: '/user/login'},
      {path: '/user/login', component: './User/Login'},
      {path: '/user/register', component: './User/Register'},
      {path: '/user/register-result', component: './User/RegisterResult'},
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    // Routes: ['src/pages/Authorized'],
    //   authority: ['admin', 'user'],
    routes: [
      {path: '/', redirect: '/home/home'},
      // 收费管理
      {
        path: '/charge-system/charge-management',
        icon: 'user',
        name: '收费管理',
        level: '1',
        routes: [
          {
            path: '/charge-system/charge-management/charge-project',
            name: '收费项目',
            component: './ChargeManagement/chargeProject/index',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/home/home',
                name: 'Home',
                component: './Home/Home',
              }
            ],
          },
          {
            path: '/charge-system/charge-management/charge-details',
            name: '收费详情',
            component: './ChargeManagement/chargeDetails/index',
          },
          {
            path: '/charge-system/charge-management/charge-personnel',
            name: '收费人员',
            component: './ChargeManagement/chargePersonnel/index',
          },

        ],
      },
      //财务管理
      {
        path: '/charge-system/financial-management',
        icon: 'laptop',
        name: '财务管理',
        level: '1',
        routes: [
          {
            path: '/charge-system/financial-management/charge-project',
            name: '财务报表',
            component: './ChargeManagement/financialStatement/index',
          }
        ],
      },
      //基础数据
      {
        path: '/base-data/data-management',
        icon: 'laptop',
        name: '基础数据',
        level: '1',
        routes: [
          {
            path: '/base-data/data-management/class-data',
            name: '班级数据',
            component: './BaseDataManagement/classData/index',
          },
          {
            path: '/base-data/data-management/traffic-routes',
            name: '交通路线',
            component: './BaseDataManagement/trafficRoutes/index',
          }
        ],
      },
      //租户管理
      {
        path: '/authority-management/tenant-management',
        icon: 'user',
        name: '租户管理',
        level: '1',
        routes: [
          {
            path: '/authority-management/tenant-management/tenant-info',
            name: '租户信息',
            component: './BaseDataManagement/classData/index',
          },
        ],
      },
      // 权限管理
      {
        path: '/authority-management/authority-data',
        icon: 'laptop',
        name: '权限管理',
        level: '1',
        routes: [
          {
            path: '/authority-management/authority-data/user-authority',
            name: '用户权限',
            component: './BaseDataManagement/trafficRoutes/index',
          },
          {
            path: '/authority-management/authority-data/tenant-info',
            name: '角色信息',
            component: './BaseDataManagement/classData/index',
          },
          {
            path: '/authority-management/authority-data/tenant-user',
            name: '权限信息',
            component: './BaseDataManagement/trafficRoutes/index',
          }
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
