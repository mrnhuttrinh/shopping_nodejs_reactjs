import Constants from '../constants';
var API = Constants.API;
import Request from '../utils/request';

export default { 
    getListTrademark(cb) {
        var request = new Request();
        request
            .get(API.GET_LIST_TRADEMARK)
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    getListTrademarkMini(cb) {
        var request = new Request();
        request
            .get(API.GET_LIST_TRADEMARK_MINI)
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    createTrademark(data, cb) {
        var request = new Request();
        request
            .post(API.CREATE_TRADEMARK, {
                data
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            }); 
    },
    getTrademarkById(id, cb) {
        var request = new Request();
        request
            .get(API.GET_TRADEMARK_BY_ID, {
                id
            })
            .then(function(err, res) {
                cb(err, res);
            })
    },
    deleteTrademark(data, cb) {
        var request = new Request();
        request
            .post(API.DELETE_TRADEMARK, {
                data
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res)
            })
    },
    updateTrademark(data, cb) {
        var request = new Request();
        request
            .post(API.UPDATE_TRADEMARK, {
                data
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            }); 
    }
}