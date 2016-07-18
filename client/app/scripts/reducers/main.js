import _ from 'lodash'
import Constants from '../constants'
var ACTION = Constants.ACTION;
import localItem from '../utils/localItem';

var initialState = {
    menus: [],
    news: {
        listNews: []
    },
    cartItems: localItem.getItem("cartItems")
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
            return newState;
        default:
            return state;
    }
}
