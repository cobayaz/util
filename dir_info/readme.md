### 当你使用时候

```javascript
const main = async () => {
    const dirPath = './';
    const getDirInfo = require('./index.js');
    const dir = await getDirInfo(dirPath);
    console.log(dir);
};

main();
```

> 需要注意的是，这是一个 async 函数，所以，需要使用`await`才能正常运行,输出的结果是一个 json 数据
