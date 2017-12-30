const fs = require('fs');
const path = require('path');
const mime = require('mime');

const dir_info = {};
const get_dir_info = (dirname, object = dir_info) => {
    fs.readdir(dirname, (err, files) => {
        if (err) console.log(`err ${err}`);
        files.forEach(file => {
            if (file.startsWith('.')) {
                return;
            }
            const abs_path = path.join(dirname, file);
            fs.stat(abs_path, (err, stat) => {
                if (err) console.log(`err ${err}`);
                if (stat.isFile()) {
                    const type = mime.getType(abs_path);
                    object[file] = type;
                } else if (stat.isDirectory()) {
                    object[file] = {};
                    const obj_index = object[file];
                    get_dir_info(abs_path, obj_index);
                } else {
                    console.log(file);
                }
            });
        });
    });
};
console.time('cb');
get_dir_info('../');
process.on('exit', () => {
    console.timeEnd('cb');
});
