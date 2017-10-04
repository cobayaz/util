# util

写一些有趣的js工具，等待重构项目结构，先写一个实现promise.map的工具占个坑。实现promise并发数目的控制

怎么使用？
```javascript
    const p = require('./promise.limit');
    //p函数默认传入你的promise构造函数即可

    //最大并发数目是3
    const concurrent=3

    //第一种使用方法
    let makePromise1=function(){return new Promise.resolve('test1')}
    let makePromise2=function(){return new Promise.resolve('test2')}
    let makePromise3=function(){return new Promise.resolve('test3')}
    let makePromise4=function(){return new Promise.resolve('test4')}

    p([makePromise1,makePromise2,makePromise3,makePromise4],3)
    .then(result=>{console.log(result)})

    //运行的promise数目最大就是3
```
还有一种方法，使用我指定的写法

```javascript
    const p = require('./promise.limit');

    const makePromise1=(res, rej) => {
        setTimeout(function() {
            console.log(`第1个开始了${new Date().toLocaleTimeString()}`);
            setTimeout(function() {
                res(`第1个结束了${new Date().toLocaleTimeString()}`);
            }, 1000);
        }, 1000);
    } 
    const makePromise2=(res, rej) => {
        setTimeout(function() {
            console.log(`第1个开始了${new Date().toLocaleTimeString()}`);
            setTimeout(function() {
                res(`第1个结束了${new Date().toLocaleTimeString()}`);
            }, 1000);
        }, 1000);
    }
    const makePromise3=(res, rej) => {
        setTimeout(function() {
            console.log(`第1个开始了${new Date().toLocaleTimeString()}`);
            setTimeout(function() {
                res(`第1个结束了${new Date().toLocaleTimeString()}`);
            }, 1000);
        }, 1000);
    }

    //res,rej代表promise的resolve,reject
    //当你需要使用这种方法时候，第三个隐藏参数需要设置成true
    p([makePromise],2,true)
    .then(re=>{console.log(re)})
```

具体的测试可以看当前目录下的test.js，运行它就可以看到结果
