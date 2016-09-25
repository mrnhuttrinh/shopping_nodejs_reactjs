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
    },
    addMorePicture(data, cb) {
        var request = new Request();
        request
            .post(API.ADD_MORE_PICTURE, {
                data: data
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    getAllGalleriesMenu(cb) {
        var request = new Request();
        request
            .get(API.GET_ALL_GALLERIES_MENU)
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    deleteGalleryMenu(id, cb) {
        var request = new Request();
        request
            .post(API.DELETE_GALLERY_MENU, {
                id: id
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    editGalleryMenu(data, cb) {
        var request = new Request();
        request
            .post(API.EDIT_GALLERY_MENU, {
                data: data
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    updateLogoCategory(data, cb) {
        var request = new Request();
        request
            .post(API.UPDATE_LOGO_CATEGORY, {
                data: data
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    updateThumbnailCategory(data, cb) {
        var request = new Request();
        request
            .post(API.UPDATE_THUMBNAIL_CATEGORY, {
                data: data
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    }
}