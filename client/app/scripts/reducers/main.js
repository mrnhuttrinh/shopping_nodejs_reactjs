import _ from 'lodash'
import Constants from '../constants'
var ACTION = Constants.ACTION;
import localItem from '../utils/localItem';
var initialState = {
    menus: []
};

export default function update(state = {}, action) {
    var newState;
    switch (action.type) {
        case ACTION.GET_MENU:
            newState = _.cloneDeep(state);
            newState.menus = action.menus;
            return newState;
        default:
            return state;
    }
}
