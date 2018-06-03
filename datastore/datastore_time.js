import DataStore from "./datastrore";

class AsyncDataStore extends DataStore {
    constructor(...arg) {
        super(...arg);
    }
    clearTimeout() {
        this.timeoutId ? clearTimeout(this.timeoutId) : void 0;
        return this;
    }
    clearInterval() {
        this.intervalId ? clearInterval(this.intervalId) : void 0;
        return this;
    }
    clearAllTimer() {
        this.timeoutId ? clearTimeout(this.timeoutId) : void 0;
        this.intervalId ? clearInterval(this.intervalId) : void 0;
        return this;
    }
    timeout(cb, time) {
        this.timeoutId = setTimeout(() => {
            cb(this);
        }, time);
        return this;
    }
    interval(cb, time) {
        this.intervalId = setInterval(() => {
            cb(this);
        }, time);
        return this;
    }
}
