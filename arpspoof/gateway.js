const os = require('os');
const info = os.networkInterfaces();
const w = info.wlan0 || info.wlp3s0;
const [gatewayIp] = w.map(e => {
    if (e.family === 'IPv4') {
        const address = e.address;
        return address.replace(/\.\d+$/, '.');
    }
});
const gateway = gatewayIp + '1';
module.exports = { gateway, gatewayIp };
