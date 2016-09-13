import Constants from '../constants';
var API = Constants.API;
import Request from '../utils/request';

export default { 
    filterOrder(data, cb) {
        var request = new Request();
        request
            .post(API.FILTER_ORDER, data)
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    getOrderById(data, cb) {
        var request = new Request();
        request
            .get(API.GET_ORDER_BY_ID, data)
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    markCompletedOrder(data, cb) {
        var request = new Request();
        request
            .post(API.MARK_COMPLETED_ORDER, data)
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    createNewOrder(data, cb) {
        var request = new Request();
        request
            .post(API.CREATE_NEW_ORDER, data)
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    cancelOrder(data, cb) {
        var request = new Request();
        request
            .post(API.CANCEL_ORDER, data)
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    reportOrder(data, cb) {
        var request = new Request();
        request
            .post(API.REPORT_ORDER, data)
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    }
}