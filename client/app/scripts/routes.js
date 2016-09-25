import App from './views/App';
import Home from './views/Home';
import Category from './views/Category';
import Product from './views/Product';
import CartDetail from './views/CartDetail';
import News from './views/News';
import Login from './views/Login';
import Register from './views/Register';
import Payment from './views/Payment';
import Profile from './views/Profile';
import MyOrder from './views/MyOrder';
import Address from './views/Address';
import ChangePassword from './views/ChangePassword';

function enterOtherRouter(nextState, replace) {
    window.location = "/";
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
            path: ':category_link/:product_name',
            component: Product
        }, {
            path: 'cartdetail',
            component: CartDetail
        }, {
            path: 'news(/:news_id)',
            component: News
        }, {
            path: 'search/:search_value(/:sort(/:page))',
            component: News
        }, {
            path: 'checkout/cart',
            component: CartDetail
        }, {
            path: 'login(/:return_url)',
            component: Login
        }, {
            path: 'register',
            component: Register
        }, {
            path: 'payment',
            component: Payment
        }, {
            path: 'profile(/:sub_segment)',
            component: Profile
        }, {
            path: 'myorder(/:id)',
            component: MyOrder
        }, {
            path: 'address(/:id)',
            component: Address
        }, {
            path: 'changepassword',
            component: ChangePassword
        }, {
            path: ':category_link(/:sort(/:page))',
            component: Category
        }, {
            path: '*',
            component: Home,
            onEnter: enterOtherRouter
        }
    ]
}