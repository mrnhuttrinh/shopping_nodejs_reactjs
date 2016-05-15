import Constants from '../constants';
var API = Constants.API;
import Request from '../utils/request';

export default { 
    getListNews(data, cb) {
        var request = new Request();
        request
            .get(API.GET_LIST_NEWS, data)
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
    },
    getNewsById(id, cb) {
        var request = new Request();
        request
            .get(API.GET_NEWS_BY_ID, {
                id
            })
            .then(function(err, res) {
                cb(err, res);
            })
    },
    deleteNews(id, cb) {
        var request = new Request();
        request
            .post(API.DELETE_NEWS, {
                id
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res)
            })
    },
    getTotalNews(data, cb) {
        var request = new Request();
        request
            .get(API.GET_TOTAL_NEWS, data)
            .authorized()
            .then(function(err, res) {
                cb(err, res)
            })
    },
    changeStatusShowOnTop(data, cb) {
        var request = new Request();
        request
            .post(API.CHANGE_SHOW_ON_TOP, {
                id: data.id,
                show_on_top: data.show_on_top
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    }
}