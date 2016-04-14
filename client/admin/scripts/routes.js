// import App from './components/App';
// import Dashboard from './components/Dashboard';
// import About from './components/About';
// import Inbox from './components/Inbox';
// import Message from './components/Message';
// import Products from './components/Products';
// import NotFound from './components/NotFound';
// import Categories from './components/Categories';
// import CategoryDetail from './components/categories/Detail';
// import Login from './components/Login';

// function requireAuth(nextState, replace) {
//     if (localStorage.token !== "haslogin") {
//         replace({
//             pathname: '/login',
//             state: { nextPathname: nextState.location.pathname }
//         })
//     }
//     // else occurs loop infinite
// }

// export default {
//     path: '/',
//     component: App,
//     indexRoute: {
//         component: Login
//     },
//     childRoutes: [
//         {
//             path: 'dashboard',
//             component: Dashboard,
//             onEnter: requireAuth
//         }, {
//             path: 'login',
//             component: Login
//         }, {
//             path: 'categories/:group',
//             component: Categories,
//             onEnter: requireAuth
//         }, {
//             path: 'categories/detail/:id',
//             component: CategoryDetail,
//             onEnter: requireAuth
//         }, {
//             path: 'about',
//             component: About 
//         }, {
//             path: 'inbox',
//             component: Inbox,
//             childRoutes: [{
//                 path: 'messages(/:id)',
//                 onEnter: ({ params }, replace) => replace(`/messages/${params.id}`)
//             }],
//             onEnter: requireAuth
//         }, {
//             component: Inbox,
//             childRoutes: [{
//                 path: 'messages(/:id)',
//                 component: Message
//             }],
//             onEnter: requireAuth
//         }, {
//             component: Products,
//             path: 'products',
//             onEnter: requireAuth
//         }, {
//             component: NotFound,
//             path: '*'
//         }
//     ]
// }
// 
// 
// 
import _ from 'lodash'
import App          from './views/App';
import Dashboard    from './views/Dashboard';
import NotFound     from './views/NotFound';
import Login        from './views/Login';
import Inbox        from './views/Inbox';
import About        from './views/About';
import Product      from './views/Product';

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
            component: NotFound,
            path: '*'
        }
    ]
}