import _ from 'lodash'
import Constants from '../constants'
var ACTION = Constants.ACTION;
import localItem from '../utils/localItem';
var initialState = {
    menus: [],
    news: {
        listNews: []
    }
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
        default:
            return state;
    }
}
