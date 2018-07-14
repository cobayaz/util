//promise 创建即运行，所以需要使用构造的方式创建promise
const events = require("events");
const ev = new events();

let result = [];

const _makePromise = (z, constr) => {
    if (typeof z === "function") {
        if (constr) {
            return new Promise((resolve, reject) => {
                z(resolve, reject);
            });
        } else {
            return z();
        }
    }
};

let eventLimit;

ev.on("start", e => {
    eventLimit = e;
});

let count = 0;

function _next(arr, constr) {
    if (arr.length !== 0) {
        const p = _makePromise(arr.shift(), constr);
        p.then(e => {
            result.push(e);
            _next(arr, constr);
        });
    } else {
        count++;
        if (count === eventLimit) {
            ev.emit("end");
        }
    }
}

module.exports = async (arr, limit, constr = false) => {
    ev.emit("start", limit);
    if (limit < arr.length) {
        for (let i of [...Array(limit).keys()]) {
            const p = _makePromise(arr.shift(), constr);
            p.then(e => {
                result.push(e);
                _next(arr, constr);
            });
        }
    } else if (limit >= arr.length) {
        for (let p of arr) {
            const p = _makePromise(p, constr);
            p.then(e => {
                result.push(e);
            });
        }
    }
    const r = await new Promise((resolve, reject) => {
        ev.on("end", () => {
            resolve(result);
        });
    });
    return Promise.resolve(r);
};
