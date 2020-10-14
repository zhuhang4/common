import App from '../App.vue'

var editHome = r => require.ensure([], () => r(require('../vuepages/Edit.vue')), 'editHome');

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/editHome'
        },
        {
            path: '/editHome',
            component: editHome,
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
    ]
}]
