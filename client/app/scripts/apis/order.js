import Constants from '../constants';
var API = Constants.API;
import Request from '../utils/request';

export default { 
    createNewOrder(data, cb) {
        var request = new Request();
        request
            .post(API.CREATE_NEW_ORDER, data)
            .then(function(err, res) {
                cb(err, res);
            });
    },
    getListYourOrder(data, cb) {
        var request = new Request();
        request
            .get(API.GET_YOUR_ORDER, data)
            .then(function(err, res) {
                cb(err, res);
            });
    }
}