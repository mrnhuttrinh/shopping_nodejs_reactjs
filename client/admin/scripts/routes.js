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
import Menu from './views/Menu';
import News from './views/News';
import Size from './views/Size';
import Order from './views/Order';
import ViewUser from './views/ViewUser';
import TradeMark from './views/TradeMark';
import localItem from './utils/localItem';

function requireAuth(nextState, replace) {
    if (_.isEmpty(localItem.getItem("token"))) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
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
            path: 'dashboard(/:category(/:page(/:search)))',
            component: Dashboard,
            onEnter: requireAuth
        }, {
            path: 'login',
            component: Login
        }, {
            path: 'inbox',
            component: Inbox,
            onEnter: requireAuth
        }, {
            path: 'about',
            component: About,
            onEnter: requireAuth
        }, {
            path: 'listuser(/:page(/:search(/:search_page)))',
            component: ListUser,
            onEnter: requireAuth
        }, {
            path: 'viewuser(/:id)',
            component: ViewUser,
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
            path: 'menu',
            component: Menu,
            onEnter: requireAuth
        }, {
            path: 'order(/:id)',
            component: Order,
            onEnter: requireAuth
        }, {
            path: 'size_type',
            component: Size,
            onEnter: requireAuth
        }, {
            path: 'news(/:page(/:search(/:search_page)))',
            component: News,
            onEnter: requireAuth
        }, {
            path: 'trademark(/:page(/:search(/:search_page)))',
            component: TradeMark,
            onEnter: requireAuth
        }, {
            component: NotFound,
            path: '*'
        }
    ]
}