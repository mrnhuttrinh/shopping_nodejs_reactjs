export default {
    setItem: function(keyName, keyValue) {
        localStorage.setItem(keyName, keyValue);
    },
    getItem: function(keyName) {
        return localStorage[keyName];
    },
    removeItem: function(keyName) {
        localStorage.removeItem(keyName);
    }
}