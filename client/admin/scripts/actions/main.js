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
    getListProduct: function(listproducts, page) {
        return {
            type: ACTION.GET_LIST_PRODUCT,
            listProduct: listproducts,
            page: page
        }
    },
    getTotalProduct: function(totalProduct) {
        return {
            type: ACTION.GET_TOTAL_PRODUCT,
            totalProduct: totalProduct
        }
    },
    getProduct: function(product) {
        return {
            type: ACTION.GET_PRODUCT,
            product: product
        }
    }
}
