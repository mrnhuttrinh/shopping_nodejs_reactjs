import Constants from '../constants'
import _ from 'lodash';
var ACTION = Constants.ACTION;
import localItem from '../utils/localItem';

var initialState = {
    user: {},
    allUser: [],
    token: "",
    menus: [],
    listProduct: [],
    totalProduct: 0
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
            newState.listProduct = action.listProduct;
            return newState;
        case ACTION.GET_TOTAL_PRODUCT:
            newState = _.cloneDeep(state);
            newState.totalProduct = action.totalProduct;
            return newState;
        case ACTION.SIGN_IN:
            newState = _.cloneDeep(state);
            newState.token = localItem.getItem("token");
            newState.user = action.user;
            return newState;
        case ACTION.GET_ALL_USER:
            newState = _.cloneDeep(state);
            newState.allUser = action.allUser;
            return newState;
        case ACTION.SET_TOKEN: 
            localItem.setItem("token", action.token);
            newState = _.cloneDeep(state);
            newState.token = action.token;
            return newState;
        case ACTION.GET_MENU:
            newState = _.cloneDeep(state);
            newState.menus = action.menus;
            return newState;
        default:
            return state;
    }
}
