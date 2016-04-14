import Constants from '../constants';
var API = Constants.API;
import request from '../utils/request';

export default { 
    signIn(username, password, cb) {
        request.post(API.SIGN_IN).params({
            username: username,
            password: password
        }).then(function(err, res) {
            cb(err, res);
        })
    }
}