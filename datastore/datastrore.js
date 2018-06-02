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
            if (newData) {
                this.data.set(key, newData);
            }
            return this;
        };
        solve.solve = solve; //取 改 写
        return solve;
    }
    setData(objOrFn) {
        if (objOrFn) {
            if (typeof objOrFn === "function") {
                const fn = objOrFn;
                fn(this.data);
            } else if (typeof objOrFn === "object" && !Array.isArray(objOrFn)) {
                const newData = objOrFn;
            }
        } else {
            throw Error("not a argument");
        }
    }
    getVal(key) {
        return this.data.get(key);
    }
    has(key) {
        if (this.data.has(key)) {
        }
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
    async() {}
    timeout(key, time) {}
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

let data = DataStore.getInstance();

data
    .set("keyss", "valss")
    .set({ keysss: "valsss", keysssss: "valsssss" })
    .printAll()
    .print("keyss")
    .get("keyss")(data => {
        console.log(data);
    })
    .get("keyss")
    .solve(data => {
        console.log("thisi is solve");
    })
    .print("keyss")
    .set("key", "cdcd");

data
    .get("key")(function(val) {
        console.log(val);
        return val + "xsxs" + "xsxs";
    })
    .setData()
    .print("key");

data
    .get("key")
    .solve(function(val) {
        console.log(val);
        return val + "xcd" + "cd";
    })
    .print("key");
