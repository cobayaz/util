const {
    spawn
} = require('child_process')

let arr = [null, null, null, 'x', '0', 'x', 0]
let go = spawn("go", ['run', 'index.go', JSON.stringify(arr)])
go.stdout.on('data', data => {
    console.log(data.toString())
})
go.stderr.on('error', (er) => {
    console.log(er)
})