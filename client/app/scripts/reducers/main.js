import _ from 'lodash'
import Constants from '../constants'
var ACTION = Constants.ACTION;
import localItem from '../utils/localItem';
import locations from './locations';

var initialState = {
    menus: [],
    news: {
        listNews: []
    },
    cartItems: localItem.getItem("cartItems"),
    user: localItem.getItem("user"),
    locations: locations
};

export default function update(state = initialState, action) {
    var newState;
    switch (action.type) {
        case ACTION.GET_MENU:
            newState = _.cloneDeep(state);
            newState.menus = action.menus;
            return newState;
        case ACTION.GET_LIST_NEWS:
            newState = _.cloneDeep(state);
            newState.news.listNews = action.listNews;
            return newState;
        case ACTION.UPDATE_CART_ITEMS:
            newState = _.cloneDeep(state);
            newState.cartItems = action.cartItems;
            localItem.setItem("cartItems", action.cartItems);
            return newState;
        case ACTION.USER_LOGIN:
            newState = _.cloneDeep(state);
            localItem.setItem("user", action.user);
            newState.user = action.user;
            newState.cartItems = localItem.getItem("cartItems");
            return newState;
        case ACTION.LOGOUT:
            newState = _.cloneDeep(state);
            localItem.removeItem("user");
            localItem.removeItem("cartItems");
            localItem.removeItem("first_load");
            newState.user = null;
            newState.cartItems = null;
            return newState;
        default:
            return state;
    }
}
