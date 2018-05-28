const fs = require("fs");
const util = require("util");
const stat = util.promisify(fs.stat);

module.exports = async (fsObj = {}, cb = async () => {}) => {
    const filepath = fsObj.path;
    const stats = await stat(filepath).catch(console.error);
    if (!stats.isFile()) {
        throw new Error(`${filepath} is not a file`);
    }
    let timeNow = undefined;
    return fs.watch(filepath, (event, filename) => {
        if (!timeNow) {
            timeNow = Date.now();
            return void cb(event, filename);
        }
        if (Date.now() - timeNow > 1000) {
            timeNow = Date.now();
            cb(event, filename);
        }
    });
};
