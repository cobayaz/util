"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataStore {
    constructor() {
        this._data = Object.create(null);
        //打印一个或者一组数据结构
        this.print = key => {
            if (typeof key === "string") {
                console.log(this._data[key]);
            } else if (Array.isArray(key)) {
                console.log(key.map(key => this._data[key]));
            }
            return this;
        };
    }
    //可以是对象,数组和{字符串:any}
    set(param, val) {
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
    hasKey(key) {
        const solve = (success, failed) => {
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
    hasKeys(keys) {
        const getKeyVal = key => {
            return [key, this._data[key]];
        };
        const keyVals = keys.map(getKeyVal);
        const solve = setData => {
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
    add(key, val) {
        this._data[key] = val;
        return this;
    }
    rm(key) {
        this._data[key] = null;
        return this;
    }
    printAll() {
        console.log(this._data);
        return this;
    }
    //私有的方法
    static create() {
        return new DataStore();
    }
    //共有的方法
    static getInstance(id = "main") {
        return DataStore.instances[id]
            ? DataStore.instances[id]
            : (DataStore.instances[id] = DataStore.create());
    }
}
//两个都不对外开放的属性,保护数据
DataStore.instances = Object.create(null);
exports.DataStore = DataStore;
