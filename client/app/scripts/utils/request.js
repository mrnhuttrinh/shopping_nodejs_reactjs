import superagent from  'superagent';
import localItem from './localItem';

function Request() {
    this.request = superagent;
    this._method;
    this._params;
    this.get = function(url, params) {
        if (params) {
            var querystring = "?";
            for (var key in params) {
                querystring += key + "=" + params[key] + "&";
            }
            url = url + querystring;
        }
        this._method = this.request.get(url);
        return this;
    },
    this.post = function(url, params) {
        this._method = this.request.post(url);
        if (params) {
            this._method.send(params).set('Accept', 'application/json');
        }
        return this;
    },
    this.authorized = function() {
        var token = localItem.getItem("token");
        this._method.set('Authorization', 'Bearer ' + token);
        return this;
    },
    this.then = function(cb) {
        if (this._params) {
            this._params.end(cb);
        } else {
            this._method.end(cb);
        }
        
        return this;
    }
}
export default Request;
