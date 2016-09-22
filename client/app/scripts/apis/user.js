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
    },
    getUserAddresses(data, cb) {
        var request = new Request();
        request
            .get(API.GET_USER_ADDRESSES, data)
            .then(function(err, res) {
                cb(err, res);
            });
    },
    addNewAddress(data, cb) {
        var request = new Request();
        request
            .post(API.ADD_NEW_ADDRESS, data)
            .then(function(err, res) {
                cb(err, res);
            });
    },
    updateAddress(data, cb) {
        var request = new Request();
        request
            .post(API.UPDATE_ADDRESS, data)
            .then(function(err, res) {
                cb(err, res);
            });
    },
    getUserInfo(data, cb) {
        var request = new Request();
        request
            .get(API.GET_USER_INFO, data)
            .then(function(err, res) {
                cb(err, res);
            });
    },
    getAddressById(data, cb) {
        var request = new Request();
        request
            .get(API.GET_ADDRESS_BY_ID, data)
            .then(function(err, res) {
                cb(err, res);
            });
    }
}