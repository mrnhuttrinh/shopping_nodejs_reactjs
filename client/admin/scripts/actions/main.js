import Constants from '../constants'
import apis from '../apis/main';
var ACTION = Constants.ACTION;

export default {
    signIn: function (user) {
        return {
            type: ACTION.SIGN_IN,
            user: user
        }
    },
    getAllUser: function(allUser, typeUpdate) {
        return {
            type: ACTION.GET_ALL_USER,
            allUser: allUser,
            typeUpdate: typeUpdate
        }
    },
    setToken: function(token) {
        return {
            type: ACTION.SET_TOKEN,
            token: token
        }
    },
    logOut: function() {
        return {
            type: ACTION.LOG_OUT
        }
    },
    gettingMenu: function() {
        return function(dispatch, getState) {
            dispatch({
                type: ACTION.GETTING_MENU
            })
            apis.getMenu(function(err, res) {
                if (err) {
                } else {
                    if (res.status === 200) {
                        return dispatch({
                            type: ACTION.GET_MENU,
                            menus: res.body.data
                        })
                    }
                }
            })
        }
    },
    getListProduct: function(listproducts) {
        return {
            type: ACTION.GET_LIST_PRODUCT,
            listProduct: listproducts
        }
    },
    getTotalProduct: function(totalProduct) {
        return {
            type: ACTION.GET_TOTAL_PRODUCT,
            totalProduct: totalProduct
        }
    },
    setTabDashboard: function(tabSelected) {
        return {
            type: ACTION.TAB_SELECTED_DASHBOARD,
            tabSelected: tabSelected
        }
    },
    getProduct: function(product) {
        return {
            type: ACTION.GET_PRODUCT,
            product: product
        }
    },
    getListNews: function(listNews, typeUpdate) {
        return {
            type: ACTION.GET_LIST_NEWS,
            listNews: listNews,
            typeUpdate: typeUpdate
        }
    },
    getListTradeMark: function(listTrademark) {
        return {
            type: GET_LIST_TRADEMARK,
            listTrademark: listTrademark
        }
    }
}
