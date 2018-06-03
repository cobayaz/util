const p = require('./promise.limit');

p(
    [
        (res, rej) => {
            setTimeout(function() {
                console.log(`第1个开始了${new Date().toLocaleTimeString()}`);
                setTimeout(function() {
                    res(`第1个结束了${new Date().toLocaleTimeString()}`);
                }, 1000);
            }, 1000);
        },
        (res, rej) => {
            setTimeout(function() {
                console.log(`第2个开始了${new Date().toLocaleTimeString()}`);
                setTimeout(function() {
                    res(`第2个结束了${new Date().toLocaleTimeString()}`);
                }, 1000);
            }, 1000);
        },
        (res, rej) => {
            setTimeout(function() {
                console.log(`第3个开始了${new Date().toLocaleTimeString()}`);
                setTimeout(function() {
                    res(`第3个结束了${new Date().toLocaleTimeString()}`);
                }, 1000);
            }, 1000);
        },
        (res, rej) => {
            setTimeout(function() {
                console.log(`第4个开始了${new Date().toLocaleTimeString()}`);
                setTimeout(function() {
                    res(`第4个结束了${new Date().toLocaleTimeString()}`);
                }, 1000);
            }, 1000);
        },
        (res, rej) => {
            setTimeout(function() {
                console.log(`第5个开始了${new Date().toLocaleTimeString()}`);
                setTimeout(function() {
                    res(`第5个结束了${new Date().toLocaleTimeString()}`);
                }, 1000);
            }, 1000);
        },
        (res, rej) => {
            setTimeout(function() {
                console.log(`第6个开始了${new Date().toLocaleTimeString()}`);
                setTimeout(function() {
                    res(`第6个结束了${new Date().toLocaleTimeString()}`);
                }, 1000);
            }, 1000);
        },
        (res, rej) => {
            setTimeout(function() {
                console.log(`第7个开始了${new Date().toLocaleTimeString()}`);
                setTimeout(function() {
                    res(`第7个结束了${new Date().toLocaleTimeString()}`);
                }, 1000);
            }, 1000);
        },
        (res, rej) => {
            setTimeout(function() {
                console.log(`第8个开始了${new Date().toLocaleTimeString()}`);
                setTimeout(function() {
                    res(`第8个结束了${new Date().toLocaleTimeString()}`);
                }, 1000);
            }, 1000);
        },
        (res, rej) => {
            setTimeout(function() {
                console.log(`第9个开始了${new Date().toLocaleTimeString()}`);
                setTimeout(function() {
                    res(`第9个结束了${new Date().toLocaleTimeString()}`);
                }, 1000);
            }, 1000);
        },
        (res, rej) => {
            setTimeout(function() {
                console.log(`第10个开始了${new Date().toLocaleTimeString()}`);
                setTimeout(function() {
                    res(`第10个结束了${new Date().toLocaleTimeString()}`);
                }, 1000);
            }, 1000);
        },
        (res, rej) => {
            setTimeout(function() {
                console.log(`第11个开始了${new Date().toLocaleTimeString()}`);
                setTimeout(function() {
                    res(`第11个结束了${new Date().toLocaleTimeString()}`);
                }, 1000);
            }, 1000);
        },
        (res, rej) => {
            setTimeout(function() {
                console.log(`第12个开始了${new Date().toLocaleTimeString()}`);
                setTimeout(function() {
                    res(`第12个结束了${new Date().toLocaleTimeString()}`);
                }, 1000);
            }, 1000);
        },
        (res, rej) => {
            setTimeout(function() {
                console.log(`第13个开始了${new Date().toLocaleTimeString()}`);
                setTimeout(function() {
                    res(`第13个结束了${new Date().toLocaleTimeString()}`);
                }, 1000);
            }, 1000);
        },
        (res, rej) => {
            setTimeout(function() {
                console.log(`第14个开始了${new Date().toLocaleTimeString()}`);
                setTimeout(function() {
                    res(`第14个结束了${new Date().toLocaleTimeString()}`);
                }, 1000);
            }, 1000);
        },
        (res, rej) => {
            setTimeout(function() {
                console.log(`第15个开始了${new Date().toLocaleTimeString()}`);
                setTimeout(function() {
                    res(`第15个结束了${new Date().toLocaleTimeString()}`);
                }, 1000);
            }, 1000);
        },
        (res, rej) => {
            setTimeout(function() {
                console.log(`第16个开始了${new Date().toLocaleTimeString()}`);
                setTimeout(function() {
                    res(`第16个结束了${new Date().toLocaleTimeString()}`);
                }, 1000);
            }, 1000);
        },
        (res, rej) => {
            setTimeout(function() {
                console.log(`第17个开始了${new Date().toLocaleTimeString()}`);
                setTimeout(function() {
                    res(`第17个结束了${new Date().toLocaleTimeString()}`);
                }, 1000);
            }, 1000);
        },
        (res, rej) => {
            setTimeout(function() {
                console.log(`第18个开始了${new Date().toLocaleTimeString()}`);
                setTimeout(function() {
                    res(`第18个结束了${new Date().toLocaleTimeString()}`);
                }, 1000);
            }, 1000);
        },
        (res, rej) => {
            setTimeout(function() {
                console.log(`第19个开始了${new Date().toLocaleTimeString()}`);
                setTimeout(function() {
                    res(`第19个结束了${new Date().toLocaleTimeString()}`);
                }, 1000);
            }, 1000);
        },
        (res, rej) => {
            setTimeout(function() {
                console.log(`第20个开始了${new Date().toLocaleTimeString()}`);
                setTimeout(function() {
                    res(`第20个结束了${new Date().toLocaleTimeString()}`);
                }, 1000);
            }, 1000);
        }
    ],
    5,
    true
).then(ele => {
    console.log(ele);
});
