export default {
    setItem: function(keyName, keyValue) {
        sessionStorage.setItem(keyName, keyValue);
    },
    getItem: function(keyName) {
        return sessionStorage[keyName];
    },
    removeItem: function(keyName) {
        sessionStorage.removeItem(keyName);
    }
}