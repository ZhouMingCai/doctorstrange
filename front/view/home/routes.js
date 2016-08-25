'use strict'
import Home from './views/home';

module.exports = {
    path: '/',
    component: require('./views/app'),
    indexRoute: {
        component: Home // 首页的组件入口
    },
    childRoutes: [
        require('./routes/login_sign_up'),
        require('./routes/about'),
        require('./routes/help'),
    ]
}
