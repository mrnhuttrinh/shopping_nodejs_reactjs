import Constants from '../constants'
import _ from 'lodash';
var ACTION = Constants.ACTION;
import localItem from '../utils/localItem';

var initialState = {
    user: {},
    token: "",
    menus: [],
    // for view dashboard
    dashboard: {
        listProduct: [],
        totalProduct: 0
    },
    // for view product
    product: {},
    firstRequest: true,
    // for news page
    news: {
        listNews: [],
        total: 0
    },
    // for list employers page
    users: {
        listUsers: [],
        total: 0
    },
    // for trademark page
    trademark: {
        listTrademark: [],
        total: 0
    }
}

export default function update(state = initialState, action) {
    var newState;
    switch (action.type) {
        case ACTION.LOG_OUT:
            localItem.removeItem("token");
            state = initialState;
            return state;
        case ACTION.GET_LIST_PRODUCT:
            newState = _.cloneDeep(state);
            newState.dashboard.listProduct = action.listProduct;
            return newState;
        case ACTION.GET_TOTAL_PRODUCT:
            newState = _.cloneDeep(state);
            newState.dashboard.totalProduct = action.totalProduct;
            return newState;
        case ACTION.SIGN_IN:
            newState = _.cloneDeep(state);
            newState.token = localItem.getItem("token");
            newState.user = action.user;
            return newState;
        case ACTION.GET_ALL_USER:
            newState = _.cloneDeep(state);
            if (action.typeUpdate === "list") {
                newState.users.listUsers = action.allUser;
            } else if (action.typeUpdate === "total") {
                newState.users.total = action.allUser;
            }
            return newState;
        case ACTION.SET_TOKEN: 
            localItem.setItem("token", action.token);
            newState = _.cloneDeep(state);
            newState.token = action.token;
            return newState;
        case ACTION.GET_MENU:
            newState = _.cloneDeep(state);
            newState.menus = action.menus;
            newState.firstRequest = false;
            return newState;
        case ACTION.GETTING_MENU:
            newState = _.cloneDeep(state);
            newState.firstRequest = false;
            return newState;
        case ACTION.GET_PRODUCT:
            newState = _.cloneDeep(state);
            newState.product = action.product;
            return newState;
        case ACTION.GET_LIST_NEWS:
            newState = _.cloneDeep(state);
            if (action.typeUpdate === "list") {
                newState.news.listNews = action.listNews;
            } else if (action.typeUpdate === "total") {
                newState.news.total = action.listNews;
            }
            return newState;
        case ACTION.GET_LIST_TRADEMARK:
            newState = _.cloneDeep(state);
            newState.trademark.listTrademark = action.listTrademark;
            newState.trademark.total = action.listTrademark.length;
            return newState;
        default:
            return state;
    }
}
