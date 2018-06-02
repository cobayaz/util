export default class DataProxy {
    constructor() {
        this._data = Object.create(null);
    }
    set(key, val) {
        setTimeout(this.setCB.bind(this));
        this._data[key] = val;
    }
    get(key) {
        setTimeout(this.getCB.bind(this));
        return this._data[key];
    }
    setCB() {}
    getCB() {}
}
