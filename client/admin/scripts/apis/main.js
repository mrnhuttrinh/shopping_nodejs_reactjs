import Constants from '../constants';
var API = Constants.API;
import Request from '../utils/request';

export default { 
    signIn(username, password, checked, cb) {
        var request = new Request();
        request
            .post(API.SIGN_IN, {
                username: username,
                password: password,
                checked: checked
            })
            .then(function(err, res) {
                cb(err, res);
            });
    },
    getMe(cb) {
        var request = new Request();
        request
            .get(API.GET_ME)
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    getAllUser(cb) {
        var request = new Request();
        request
            .get(API.GET_ALL_USER)
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    updateEmployerPhoto(image, cb) {
        var request = new Request();
        request.post(API.UPDATE_EMPLOYER_PHOTO, {
                image: image
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            }) 
    },
    createEmployer(newUser, cb) {
        var request = new Request();
        request.post(API.CREATE_EMPLOYER, {
                newuser: newUser
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            }) 
    },
    getMenu(cb) {
        var request = new Request();
        request
            .get(API.GET_MENU)
            .then(function(err, res) {
                cb(err, res);
            });
    },
    createProduct(product, gallerys, cb) {
        var request = new Request();
        request
            .post(API.CREATE_PRODUCT, {
                product: product,
                gallerys: gallerys
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    getListProduct(type, page, quantity , cb) {
        var request = new Request();
        request
            .get(API.GET_LIST_PRODUCT, {
                type: type,
                page: page,
                quantity: quantity
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    getTotalProduct(type, cb) {
        var request = new Request();
        request
            .get(API.GET_TOTAL_PRODUCT, {
                type: type
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    getProduct(id, cb) {
        var request = new Request();
        request
            .get(API.GET_PRODUCT, {
                id: id
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    deleteProduct(data, cb) {
        var request = new Request();
        request
            .post(API.DELETE_PRODUCT, {
                data: data
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    },
    updateProduct(id, field, data, cb) {
        var request = new Request();
        request
            .post(API.UPDATE_PRODUCT, {
                id: id,
                field: field,
                data: data
            })
            .authorized()
            .then(function(err, res) {
                cb(err, res);
            });
    }
}