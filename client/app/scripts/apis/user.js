import Constants from '../constants';
var API = Constants.API;
import Request from '../utils/request';

export default { 
    registerUser(data, cb) {
        var request = new Request();
        request
            .post(API.REGISTER_USER, data)
            .then(function(err, res) {
                cb(err, res);
            });
    },
    loginUser(data, cb) {
        var request = new Request();
        request
            .post(API.LOGIN_USER, data)
            .then(function(err, res) {
                cb(err, res);
            });
    }
}