const fs = require('fs');
const path = require('path');
const util = require('util');
const mime = require('mime');

const readDir = util.promisify(fs.readdir);
const fileStat = util.promisify(fs.stat);

const dir_info = {};

const get_dir_info = async (dirname, object = dir_info) => {
    const files = await readDir(dirname);
    for (file of files) {
        if (file.startsWith('.')) {
            continue;
        }
        const abs_path = path.join(dirname, file);
        const stat = await fileStat(abs_path);
        if (stat.isFile()) {
            const type = mime.getType(abs_path);
            object[file] = type;
        } else if (stat.isDirectory()) {
            object[file] = {};
            const obj_index = object[file];
            await get_dir_info(abs_path, obj_index);
        } else {
            console.log(file);
        }
    }
    return dir_info;
};
module.exports = get_dir_info;
