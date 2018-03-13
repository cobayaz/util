const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
mongoose.connect('mongodb://localhost/tutorial')

const schemal = new mongoose.Schema({
    filename: String,
    type: String,
    path: String,
    content: Array,
    buffer: Buffer,
})

const dirInfo = mongoose.model('dirinfo', schemal)

const dirpath = '/home/swnb/Documents/some-notes'

const r = () => {
    fs.readdir(dirpath, (err, files) => {
        if (err) {
            return console.error(err);
        }
        files.forEach(file => {
            const filepath = path.join(dirpath, file)
            fs.stat(filepath, (err, stats) => {
                if (err) {
                    return console.error(err)
                }
                if (stats.isDirectory()) {
                    const ele = new dirInfo({
                        filename: file,
                        type: 'dir',
                        path: filepath,
                        content: [],
                        buffer: null,
                    })
                    ele.save((err) => {
                        if (err) console.error(err)
                        console.log(filepath)
                    })
                } else if (stats.isFile()) {
                    fs.readFile(filepath, (err, data) => {
                        const ele = new dirInfo({
                            filename: file,
                            type: 'file',
                            path: filepath,
                            content: null,
                            buffer: data,
                        });
                        ele.save((err) => {
                            if (err) console.error(err)
                            console.log(filepath)
                        })
                    })
                }
            })
        })
    })
}

const add = () => {
    dirInfo.find({
        type: "dir"
    }).exec((err, collec) => {
        if (err) console.error(err)
        collec.forEach((ele, i) => {
            if (ele.filename.startsWith('.')) return
            const dirpath = ele.path
            dirInfo.findOne({
                path: dirpath
            }, (err, dirObj) => {
                fs.readdir(dirpath, (err, files) => {
                    if (err) console.error(err)
                    files.forEach(file => {
                        const filepath = path.join(dirpath, file);
                        fs.stat(filepath, (err, stats) => {
                            if (err) {
                                return console.error(err)
                            }
                            if (stats.isDirectory()) {} else if (stats.isFile()) {
                                fs.readFile(filepath, (err, data) => {
                                    const fileinfo = {
                                        filename: file,
                                        type: 'file',
                                        path: filepath,
                                        content: null,
                                        buffer: data,
                                    }
                                    dirObj['content'].push(fileinfo)
                                    dirObj.save((err) => {
                                        if (err) console.error(err);
                                    })
                                })
                            }
                        })
                    })
                })
            })
        })
    })
}


r()
add()