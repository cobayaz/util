const fs = require("fs");

//fsObject {filepath  string ,close fn, ok bool}

module.exports = (fsObject, cb) => {
    const filepath = fsObject.filepath;
    fs.stat(filepath, (err, stats) => {
        if (err) {
            throw err;
        } else if (!stats.isFile()) {
            throw new Error(`${filepath} is not a file`);
        } else {
            let timeNow = undefined;
            const fsWatcher = fs.watch(filepath, (event, filename) => {
                if (!timeNow) {
                    timeNow = Date.now();
                    return void cb();
                }
                if (Date.now() - timeNow > 1000) {
                    timeNow = Date.now();
                    return void cb();
                }
            });
            fsObject.cancel
                ? (fsObject.cancel = () => {
                      fsWatcher.close();
                  })
                : void 0;
            fsObject.ok ? (fsObject.ok = true) : void 0;
        }
    });
};
