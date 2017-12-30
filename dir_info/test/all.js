const { spawn } = require('child_process');
const time = Number(process.argv[3]);
let count = time;
let avg = 0;
const script = process.argv[2];
const main = () => {
    const x = spawn('node', [script]);
    x.stdout.on('data', data => {
        let str = data.toString();
        const res = /\d+\.\d+/.exec(str)[0];
        avg += Number(res);
        end();
    });
};

const end = () => {
    count--;
    if (count > 0) {
        main();
    }
};
main();

process.on('exit', () => {
    console.log(`avg ${avg / time}`);
});
