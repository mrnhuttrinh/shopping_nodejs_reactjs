import Constants from '../constants';

export default { 
    getMenu(db) {
        return $.getJSON(Constants.apis.getMenu).done((data) => {
            return data; 
        });
    }
}