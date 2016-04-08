import { GET_GROUP, GET_CATEGORIES } from '../constants'
import apis from '../apis/main';

export function getGroup() {
    return (dispatch) => {
        apis.getGroup((data_group) => {
            dispatch({
                type: GET_GROUP,
                data_group: data_group
            })
        })
    }
}

export function getCategories() {
    return (dispatch) => {
        apis.getCategory((categories) => {
            dispatch({
                type: GET_CATEGORIES,
                categories: categories
            })
        })
    }
}
