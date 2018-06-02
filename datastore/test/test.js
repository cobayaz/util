let data = DataStore.getInstance();

data
    .set("keyss", "valss")
    .set({ keysss: "valsss", keysssss: "valsssss" })
    .printAll()
    .print("keyss")
    .get("keyss")(data => {
        console.log(data);
    })
    .get("keyss")
    .solve(data => {
        console.log("thisi is solve");
    })
    .print("keyss")
    .set("key", "cdcd");

data
    .get("key")(function(val) {
        console.log(val);
        return val + "xsxs" + "xsxs";
    })
    .print("key");

data
    .get("key")
    .solve(function(val) {
        console.log(val);
        return val + "xcd" + "cd";
    })
    .has("key")(val => {
        console.log(val);
    })
    .print("key")
    .getVal("key");
