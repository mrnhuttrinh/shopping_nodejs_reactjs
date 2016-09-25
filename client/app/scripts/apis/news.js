import Constants from '../constants';
var API = Constants.API;
import Request from '../utils/request';

export default { 
    getList(cb) {
        var request = new Request();
        request
            .get(API.GET_LIST_NEWS)
            .then(function(err, res) {
                cb(err, res);
            });
    },
    getNewsOnTop(cb) {
        var request = new Request();
        request
            .get(API.GET_NEWS_ON_TOP)
            .then(function(err, res) {
                cb(err, res);
            });
    },
    getNewsById(data, cb) {
        var request = new Request();
        request
            .get(API.GET_NEWS_BY_ID, data)
            .then(function(err, res) {
                cb(err, res);
            });
    }
}