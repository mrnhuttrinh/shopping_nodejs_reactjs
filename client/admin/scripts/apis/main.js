import Constants from '../constants';
var API = Constants.API;
import Request from '../utils/request';

export default { 
    signIn(username, password, cb) {
        var request = new Request();
        request
            .post(API.SIGN_IN)
            .params({
                username: username,
                password: password
            })
            .then(function(err, res) {
                cb(err, res);
            });
    },
    getMe(cb) {
        var request = new Request();
        request
            .get(API.GET_ME)
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    getAllUser(cb) {
        var request = new Request();
        request
            .get(API.GET_ALL_USER)
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    }
}