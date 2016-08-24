'use strict'
import Home from './views/Home';

module.exports = {
    path: '/',
    component: require('./views/app'),
    indexRoute: {
        component: Home // 首页的组件入口
    },
    childRoutes: [
        require('./routes/add_app'),
        require('./routes/app_list'),
    ]
}
