import Constants from '../constants';
var API = Constants.API;
import Request from '../utils/request';

export default { 
    getGalleryByMenuId(id, cb) {
        var request = new Request();
        request
            .get(API.GET_GALLERY_BY_MENU_ID, {
                id: id
            })
            .then(function(err, res) {
                cb(err, res);
            });
    }
}