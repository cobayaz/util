class dataStore {
    constructor(obj = {}) {
        this.data = new Map();
        for (const x in obj) {
            this.data.set(x, obj[x]);
        }
    }
    set(keyOrObject, value) {
        if (typeof keyOrObject === "object" && !Array.isArray(keyOrObject)) {
            const object = keyOrObject;
            for (x in object) {
                this.data.set(x, object[x]);
            }
        } else {
            const key = keyOrObject;
            this.data.set(key, value);
        }
        return this;
    }
    get(key) {
        return this.data.get(key);
    }
    clear() {
        this.data.clear();
        return this;
    }
    print(key) {
        console.log(this.data.get(key));
        return this;
    }
    static getInstance() {
        if (dataStore.instance) {
            return dataStore.instance;
        }
        return (dataStore.instance = dataStore.create());
    }
    static create(arg) {
        return new dataStore(arg);
    }
}
