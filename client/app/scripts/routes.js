import App from './views/App';
import Home from './views/Home';

export default {
    path: '/',
    component: App,
    indexRoute: {
        component: Home
    },
    childRoutes: [
        {
            path: 'home',
            component: Home
        }
    ]
}