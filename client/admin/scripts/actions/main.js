import Constants from '../constants'
var ACTION = Constants.ACTION;

export default {
    signIn: function (user) {
        return {
            type: ACTION.SIGN_IN,
            user: user
        }
    },
    navigation: function(path) {
        return {
            type: ACTION.NAVIGATION,
            path: path
        }
    }
}
