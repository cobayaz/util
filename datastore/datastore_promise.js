class DataStore {
    constructor() {
        this._data = Object.create(null);
    }
    add(key, val) {
        if (!val) {
            for (const attr in key) {
                this._data[attr] = key[attr];
            }
            return true;
        } else {
            this._data[key] = val;
            return true;
        }
        return false;
    }
    has(key) {
        if (key in this._data && this._data[key]) {
            return true;
        } else {
            return false;
        }
    }
    rm(key) {
        if (this._data[key]) {
            this._data[key] = null;
            return true;
        }
        return false;
    }
    val(key) {
        return this._data[key];
    }
}
