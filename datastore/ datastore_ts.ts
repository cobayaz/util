class DataStore {
    //两个都不对外开放的属性,保护数据
    private static instances: object = Object.create(null);
    private _data: { [propname: string]: any } = Object.create(null);

    //可以是对象,数组和{字符串:any}
    public set(param: object | string, val?: any): DataStore {
        if (!param) return this;
        if (Array.isArray(param)) {
            for (const index in param) {
                this._data[index] = param[index];
            }
        } else if (typeof param === "object") {
            for (const attr in param) {
                this._data[attr] = param[attr];
            }
        } else {
            this._data[param] = val;
        }
        return this;
    }
    //has与get融合一体,对值进行处理
    //success都可以返回值,对这个key做处理
    public hasKey(
        key: string
    ): (success: (val: any) => any, failed?: () => any) => DataStore {
        const solve = (success: (val: any) => any, failed?: () => any) => {
            if (this._data[key]) {
                const data = success(this._data[key]);
                data ? (this._data[key] = data) : void 0;
            } else {
                const data = failed();
                data ? (this._data[key] = data) : void 0;
            }
            return this;
        };
        return solve;
    }
    //将数据处理完毕后返回新的数据进行更新数据状态
    public hasKeys(keys: Array<string>) {
        const getKeyVal: (key: string) => [string, any] = (key: string) => {
            return [key, this._data[key]];
        };
        const keyVals = keys.map(getKeyVal);
        const solve: (
            setData: (keyVals: Array<[string, any]>) => object
        ) => DataStore = (
            setData: (oldData: Array<[string, any]>) => object
        ) => {
            const data = setData(keyVals);
            if (data) {
                for (const attr in data) {
                    this._data[attr] = data[attr];
                }
            }
            return this;
        };

        return solve;
    }
    public add(key: string, val: any) {
        this._data[key] = val;
        return this;
    }
    public rm(key: string) {
        this._data[key] = null;
        return this;
    }
    //打印一个或者一组数据结构
    public print = (key: string | Array<string>) => {
        if (typeof key === "string") {
            console.log(this._data[key]);
        } else if (Array.isArray(key)) {
            console.log(key.map(key => this._data[key]));
        }
        return this;
    };
    public printAll() {
        console.log(this._data);
        return this;
    }
    //私有的方法
    private static create(): DataStore {
        return new DataStore();
    }
    //共有的方法
    public static getInstance(id: string = "main"): DataStore {
        return DataStore.instances[id]
            ? DataStore.instances[id]
            : (DataStore.instances[id] = DataStore.create());
    }
}

export { DataStore };

DataStore.getInstance()
    .set({ key: "value" })
    .printAll()
    .set("hh", "ijhijb")
    .add("val", "cdcd")
    .hasKey("key")(val => {
        console.log(val);
    })
    .set([0, 1, 1])
    .print("0")
    .hasKeys(["1", "hh"])(val => {
    console.log(val);
    return null;
});