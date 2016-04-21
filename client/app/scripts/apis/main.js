import Constants from '../constants';
var API = Constants.API;
import Request from '../utils/request';

export default { 
    getMenu(cb) {
        var request = new Request();
        request
            .get(API.GET_MENU)
            .then(function(err, res) {
                cb(err, res);
            });
    }
}