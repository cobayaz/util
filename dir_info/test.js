const main = async () => {
    const dirPath = './';
    const getDirInfo = require('./index.js');
    const dir = await getDirInfo(dirPath);
    console.log(dir);
};
main();
