// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/admin/checkLogin': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/admin/getProfile': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/admin/login': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/admin/logout': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/admin/updateProfile': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/roles': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/operation_logs': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/admin/getUsers': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/admin/modifyPassword': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/admin/addUser': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/admin/deleteUser': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/admin/restoreUser': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/admin/getToken': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/menu_has_privileges': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/roles/addRole': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/roles/deleteRole': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/admin/unlockAccount': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/role_has_privileges': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/role_has_privileges/getMenus': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/roles/getRole': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/roles/updateRole': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/privileges': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/privileges/addPrivilege': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/privileges/deletePrivilege': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/privileges/getPrivilege': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/privileges/updatePrivilege': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/menus': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/menus/addMenu': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/privileges/getPrivilegesNotInMenu': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/menus/getMenu': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/menus/updateMenu': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/app/sms_configs': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/app/sms_configs/addConfig': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/app/sms_configs/getConfig': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/app/sms_configs/updateConfig': {
        target: 'http://localhost',
        changeOrigin: true
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
