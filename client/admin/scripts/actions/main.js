import Constants from '../constants'
var ACTION = Constants.ACTION;

export default {
    signIn: function (user) {
        return {
            type: ACTION.SIGN_IN,
            user: user
        }
    },
    getAllUser: function(allUser) {
        return {
            type: ACTION.GET_ALL_USER,
            allUser: allUser
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
    getMenu: function(data) {
        return {
            type: ACTION.GET_MENU,
            menus: data
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
    }
}
