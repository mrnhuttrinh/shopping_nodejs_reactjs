import { actions } from '../constants'
import apis from '../apis/main';

export function getMenu() {
    return (dispatch) => {
        apis.getMenu().then((data) => {
            dispatch({
                type: actions.GET_MENU,
                menus: data
            })
        })
    }
}