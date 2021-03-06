const fs = require('fs');
const path = require('path');
const mime = require('mime');

const dir_info = {};

const get_dir_info = (dirname, object = dir_info) => {
    const files = fs.readdirSync(dirname);
    files.forEach(file => {
        if (file.startsWith('.')) {
            return;
        }
        const abs_path = path.join(dirname, file);
        const stat = fs.statSync(abs_path);
        if (stat.isFile()) {
            const type = mime.getType(abs_path);
            object[file] = [type, abs_path];
        } else if (stat.isDirectory()) {
            object[file] = {};
            const obj_index = object[file];
            get_dir_info(abs_path, obj_index);
        } else {
            console.log(file);
        }
    });
    return dir_info;
};

module.exports = get_dir_info;
