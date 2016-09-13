export default {
    setItem: function(keyName, keyValue, expirationSec) {
        var objectStore = {
            value: keyValue
        };
        if (expirationSec) {
            var date = new Date();
            var schedule = Math.round((date.setSeconds(date.getSeconds() + expirationSec))/1000);
            objectStore.timestamp = schedule;
        }
        localStorage.setItem(keyName, JSON.stringify(objectStore));
    },
    getItem: function(keyName) {
        var value = localStorage[keyName];
        if (value) {
            var objectValue = JSON.parse(value);
            var timestamp = objectValue["timestamp"];
            if (timestamp) {
                timestamp = parseInt(timestamp);
                var date = new Date();
                var current = Math.round(+date/1000);
                if (timestamp < current) {
                    // Remove
                    this.removeItem(keyName);
                    return null;
                }
            }
            return objectValue["value"];
        }
        return null;
    },
    removeItem: function(keyName) {
        localStorage.removeItem(keyName);
    }
}