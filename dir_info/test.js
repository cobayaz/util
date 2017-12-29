const fs = require('fs');
fs.readdir('.', (err, file) => {
    file.forEach(e => {
        fs.stat(e, (err, stat) => {
            console.log(stat.isFIFO);
        });
    });
});
