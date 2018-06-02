const isSameType = (a, b) => {
    if (!a) {
        //null undefined
        return b ? false : true;
    } else if (Array.isArray(a)) {
        //数组
        return Array.isArray(b) ? true : false;
    } else if (typeof a === typeof b) {
        //string number bool function object
        return true;
    } else {
        return false;
    }
};

const isObject = param => {
    return param && typeof param === "object" && !Array.isArray(param)
        ? true
        : false;
};

const isSameType = (a, b) => {
    if (!a) {
        //null undefined
        return b ? false : true;
    } else if (Array.isArray(a)) {
        //数组
        return Array.isArray(b) ? true : false;
    } else if (typeof a === typeof b) {
        //string number bool function object
        return true;
    } else {
        return false;
    }
};
