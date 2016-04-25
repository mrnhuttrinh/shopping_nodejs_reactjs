import Constants from '../constants';
var API = Constants.API;
import Request from '../utils/request';

export default { 
    getListNews(page, cb) {
        var request = new Request();
        request
            .get(API.GET_LIST_NEWS, {
                page: page
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    createNews(data, cb) {
        var request = new Request();
        request
            .post(API.CREATE_NEWS, {
                data
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            }); 
    }
}