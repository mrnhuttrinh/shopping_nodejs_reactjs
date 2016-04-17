import Constants from '../constants';
var API = Constants.API;
import Request from '../utils/request';

export default { 
    signIn(username, password, checked, cb) {
        var request = new Request();
        request
            .post(API.SIGN_IN)
            .params({
                username: username,
                password: password,
                checked: checked
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
    },
    updateEmployerPhoto(image, cb) {
        var request = new Request();
        request.post(API.UPDATE_EMPLOYER_PHOTO)
            .params({
                image: image
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            }) 
    },
    createEmployer(newUser, cb) {
        var request = new Request();
        request.post(API.CREATE_EMPLOYER)
            .params({
                newuser: newUser
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            }) 
    },
    getMenu(cb) {
        var request = new Request();
        request
            .get(API.GET_MENU)
            .then(function(err, res) {
                cb(err, res);
            });
    }
}