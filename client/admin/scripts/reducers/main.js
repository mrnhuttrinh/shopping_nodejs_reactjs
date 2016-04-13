import { GET_GROUP, GET_CATEGORIES } from '../constants'
import _ from 'lodash'

export default function update(state = {}, action) {
    switch (action.type) {
        case GET_GROUP:
            return {
                data_group: action.data_group
            };
        case GET_CATEGORIES: 
            let newState = _.cloneDeep(state);
            newState.categories = action.categories;
            return newState;
        default:
            return state;
    }
}
