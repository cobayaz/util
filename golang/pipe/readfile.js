const fs = require("fs");

fs.readFileSync("./example")
  .toString()
  .split("\n")
  .reduce((res, _, index, arr) => {
    if ((index + 1) % 3 === 0) {
      return [...res, arr.filter((_, i) => index >= i && index - i < 3)];
    }
    return res;
  }, [])
  .map(async ele => ele.join("\n") + "\n")
  .forEach((ele, index) =>
    (time => setTimeout(console.log, time, ele))(index * 1000)
  );
