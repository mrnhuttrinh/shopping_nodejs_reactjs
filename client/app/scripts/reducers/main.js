import _ from 'lodash'
import { actions } from '../constants'

export default function update(state = {}, action) {
    switch (action.type) {
        case actions.GET_MENU:
            return {
                menus: action.menus
            }
        default:
            return state;
    }
}
