export default [
  { path: '/login', component: resolve => require(['./components/Login.vue'], resolve) },
  {
    path: '/main',
    component: resolve => require(['./components/Main.vue'], resolve),
    children: [
      { path: 'operation_data', component: resolve => require(['./components/OperationData.vue'], resolve) },
      {path: 'user_account_management', component: resolve => require(['./components/UserAccountManagement.vue'], resolve)},
      { path: 'user_management', component: resolve => require(['./components/UserManagement.vue'], resolve) },
      { path: 'add_user', component: resolve => require(['./components/AddUser.vue'], resolve) },
      { path: 'deleted_users', component: resolve => require(['./components/DeletedUsers.vue'], resolve) },
      { path: 'role_management', component: resolve => require(['./components/RoleManagement.vue'], resolve) },
      { path: 'add_role', component: resolve => require(['./components/AddRole.vue'], resolve) },
      { path: 'modify_role', component: resolve => require(['./components/ModifyRole.vue'], resolve) },
      { path: 'privilege_management', component: resolve => require(['./components/PrivilegeManagement.vue'], resolve) },
      { path: 'add_privilege', component: resolve => require(['./components/AddPrivilege.vue'], resolve) },
      { path: 'modify_privilege', component: resolve => require(['./components/ModifyPrivilege.vue'], resolve) },
      { path: 'menu_management', component: resolve => require(['./components/MenuManagement.vue'], resolve) },
      { path: 'add_menu', component: resolve => require(['./components/AddMenu.vue'], resolve) },
      { path: 'modify_menu', component: resolve => require(['./components/ModifyMenu.vue'], resolve) },
      { path: 'unlock_account', component: resolve => require(['./components/UnlockAccount.vue'], resolve) },
      { path: 'operation_log', component: resolve => require(['./components/OperationLog.vue'], resolve) },
      { path: 'sms_interface', component: resolve => require(['./components/app/SmsInterface.vue'], resolve) },
      { path: 'add_sms_config', component: resolve => require(['./components/app/AddSmsConfig.vue'], resolve) },
      { path: 'modify_sms_config', component: resolve => require(['./components/app/ModifySmsConfig.vue'], resolve) },
      { path: '', component: resolve => require(['./components/OperationData.vue'], resolve) }
    ]
  },
  { path: '/', redirect: '/login' }
]
