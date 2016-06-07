import App from './views/App';
import Home from './views/Home';
import Category from './views/Category';

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
            path: 'category/:category_link(/:child_category_link)',
            component: Category
        }, {
            path: '*',
            component: Home
        }
    ]
}