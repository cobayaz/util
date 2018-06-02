const isSameBaseType = (a, b) => {
    switch (typeof a) {
        case "string":
            return typeof b === "string" ? true : false;
        case "boolean":
            return typeof b === "boolean" ? true : false;
        case "number":
            return typeof b === "number" ? true : false;
    }
};

const isObject = param => {
    return param && typeof param === "object" && !Array.isArray(param)
        ? true
        : false;
};

class DataStore {
    constructor(obj = {}) {
        this.data = new Map();
        for (const attr in obj) {
            this.data.set(attr, obj[attr]);
        }
    }
    set(keyOrObject, value) {
        if (typeof keyOrObject === "object" && !Array.isArray(keyOrObject)) {
            const object = keyOrObject;
            for (const x in object) {
                this.data.set(x, object[x]);
            }
        } else {
            const key = keyOrObject;
            this.data.set(key, value);
        }
        return this;
    }
    get(key) {
        const val = this.data.get(key);
        const solve = fn => {
            const newData = fn(val);
            isSameBaseType(newData, val)
                ? this.data.set(key, newData)
                : isObject(newData)
                    ? (() => {
                          for (const attr in newData) {
                              this.data.set(attr, newData[attr]);
                          }
                      })()
                    : void 0;
            return this;
        };
        solve.solve = solve; //取 改 写
        return solve;
    }
    getVal(key) {
        return this.data.get(key);
    }
    has(key) {
        const solve = (succCB, errCB) => {
            this.data.has(key) ? succCB(this.data.get(key)) : errCB();
            return this;
        };
        solve.solve = solve;
        return solve;
    }
    rm(key) {
        this.data.delete(key);
        return this;
    }
    clear() {
        this.data.clear();
        return this;
    }
    print(key) {
        console.log(this.data.get(key));
        return this;
    }
    printAll() {
        console.log(this.data);
        return this;
    }
    static getInstance(id = "boss") {
        if (DataStore.instance) {
            return DataStore.instance;
        }
        return (DataStore.instance = DataStore.create());
    }
    static create(arg) {
        return new DataStore(arg);
    }
}
