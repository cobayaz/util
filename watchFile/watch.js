const fs = require('fs')

//fsObject {filepath  string ,close fn, ok bool}

module.exports = (fsObject, cb) => {
    const filepath = fsObject.filepath;
    fs.stat(filepath, (err, stats) => {
        if (err) {
            throw err
        } else if (!stats.isFile()) {
            throw new Error(`${filepath} is not a file`)
        } else {
            let timeNow = undefined
            const fsWatcher = fs.watch(filepath, (event, filename) => {
                if (!timeNow) {
                    timeNow = Date.now()
                    return afterChange()
                }
                if (Date.now() - timeNow > 1000) {
                    timeNow = Date.now()
                    afterChange()
                }
            })
            fsObject.close = () => {
                fsWatcher.close()
            }
            fsObject.ok = true
        }
    })
}