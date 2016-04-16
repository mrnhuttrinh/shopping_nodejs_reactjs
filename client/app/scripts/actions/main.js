import Constants from '../constants'
var ACTION = Constants.ACTION;

export function getMenu(data) {
    return {
        type: ACTION.GET_MENU,
        menus: data
    }
}