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
      {
        component: '404',
      },
    ],
  },
];
