import superagent from  'superagent';
import localItem from './localItem';

function Request() {
    this.request = superagent;
    this._method;
    this._params;
    this.get = function(url) {
        this._method = this.request.get(url);
        return this;
    },
    this.post = function(url) {
        this._method = this.request.post(url);
        return this;
    },
    this.params = function(params) {
        this._params = this._method.send(params).set('Accept', 'application/json');
        return this;
    },
    this.authorized = function() {
        var token = localItem("token");
        this._params.set('Authorization', token);
        return this;
    },
    this.then = function(cb) {
        this._params.end(cb);
        return this;
    }
}
export default (new Request());
