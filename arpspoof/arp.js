const readline = require('readline');
const arp = require('./arp_shell');
const { gatewayIp, gateway } = require('./gateway');
const arpList = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const util = require('util');

const push = (ip, kill) => {
    arpList.push({ id: ip, kill });
};
const stop = ip => {
    let id;
    if (/\./.test(ip)) {
        id = ip;
    } else {
        id = gatewayIp + ip;
    }
    arpList.forEach(e => {
        if (e.id === id) {
            e.kill();
        }
    });
};

const question = str => {
    return new Promise(res =>
        rl.question(str, answer => {
            res(answer);
        })
    ).catch(e => console.log(e));
};

const makeArp = async () => {
    const answer = await question('输入你想要处理的ip地址或者终止口令\n');
    if (/\s*stop\s*/.test(answer)) {
        if (/stop\s+\d+/.test(answer)) {
            const ip = /stop\s+(\d+)/.exec(answer)[1];
            stop(ip);
        } else {
            console.log('停止所有进程。。。');
            process.exit(0);
        }
    } else if (answer) {
        if (/\s/.test(answer)) {
            const ipList = answer
                .replace(/\s+/g, ' ')
                .split(' ')
                .map(e => {
                    if (e !== '') {
                        return [e];
                    }
                });
            ipList.forEach(([e]) => {
                //存在点就是直接ip
                if (/\./.test(e)) {
                    const ip = e;
                    const kill = arp(ip, gateway);
                    push(ip, kill);
                } else {
                    const ip = gatewayIp + e;
                    const kill = arp(ip, gateway);
                    push(ip, kill);
                }
            });
        } else {
            if (/\./.test(answer)) {
                const ip = answer;
                const kill = arp(ip, gateway);
                push(ip, kill);
            } else {
                const ip = gatewayIp + answer;
                const kill = arp(ip, gateway);
                push(ip, kill);
            }
        }
    }
    makeArp();
};
module.exports = makeArp;
