import Constants from '../constants'
var ACTION = Constants.ACTION;

export default { 
    getMenu: function(data) {
        return {
            type: ACTION.GET_MENU,
            menus: data
        }
    },

    getListNews: function(listNews) {
        return {
            type: ACTION.GET_LIST_NEWS,
            listNews: listNews
        }
    },

    updateCartItems: function(cartItems) {
        return {
            type: ACTION.UPDATE_CART_ITEMS,
            cartItems: cartItems
        }
    },

    userLogin: function(user) {
        return {
            type: ACTION.USER_LOGIN,
            user: user
        }
    },

    logOut: function() {
        return {
            type: ACTION.LOGOUT
        }
    }
}

