import Constants from '../constants';
var API = Constants.API;
import Request from '../utils/request';

export default { 
    getListProduct(data, cb) {
        var request = new Request();
        request
            .get(API.GET_LIST_PRODUCT, data)
            .then(function(err, res) {
                cb(err, res);
            });
    }
}