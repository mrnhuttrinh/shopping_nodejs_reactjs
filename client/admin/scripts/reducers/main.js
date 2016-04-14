import Constants from '../constants'
import _ from 'lodash';
var ACTION = Constants.ACTION;
import localItem from '../utils/localItem';

var initialState = {
    user: {}
}

export default function update(state = initialState, action) {
    var newState;
    switch (action.type) {
        case ACTION.SIGN_IN:
            localItem.setItem("token", action.user.token);
            newState = _.cloneDeep(state);
            newState.user = action.user;
            return newState;
        default:
            return state;
    }
}
