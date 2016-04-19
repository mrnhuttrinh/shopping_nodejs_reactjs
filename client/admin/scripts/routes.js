import _ from 'lodash'
import App          from './views/App';
import Dashboard    from './views/Dashboard';
import NotFound     from './views/NotFound';
import Login        from './views/Login';
import Inbox        from './views/Inbox';
import About        from './views/About';
import Product      from './views/Product';
import ListUser         from './views/ListUser';
import MyProfile    from './views/MyProfile';
import ProductDetail from './views/ProductDetail';

import localItem from './utils/localItem';

function requireAuth(nextState, replace) {
    if (_.isEmpty(localItem.getItem("token"))) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
    // else occurs loop infinite
}

export default {
    path: '/',
    component: App,
    indexRoute: {
        component: Dashboard
    },
    childRoutes: [
        {
            path: 'dashboard',
            component: Dashboard,
            onEnter: requireAuth
        }, {
            path: 'login',
            component: Login
        }, {
            path: 'product',
            component: Product,
            onEnter: requireAuth
        }, {
            path: 'inbox',
            component: Inbox,
            onEnter: requireAuth
        }, {
            path: 'about',
            component: About,
            onEnter: requireAuth
        }, {
            path: 'listuser',
            component: ListUser,
            onEnter: requireAuth
        }, {
            path: 'product/:id',
            component: ProductDetail,
            onEnter: requireAuth
        }, {
            path: 'myprofile',
            component: MyProfile,
            onEnter: requireAuth
        }, {
            component: NotFound,
            path: '*'
        }
    ]
}