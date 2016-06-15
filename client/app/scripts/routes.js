import App from './views/App';
import Home from './views/Home';
import Category from './views/Category';
import Product from './views/Product';

function enterOtherRouter(nextState, replace) {
    window.location = "/#/";
}

export default {
    path: '/',
    component: App,
    indexRoute: {
        component: Home
    },
    childRoutes: [
        {
            path: 'trang-chu',
            component: Home
        }, {
            path: 'category/:category_link(/:sort(/:page))',
            component: Category
        }, {
            path: 'product/:product_name',
            component: Product
        }, {
            path: '*',
            component: Home,
            onEnter: enterOtherRouter
        }
    ]
}