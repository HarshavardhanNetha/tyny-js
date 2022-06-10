// non blocking code
let fs = require("fs")

let dataAsync = fs.readFile("./test.txt", (err, data) => {
    if(err){
        console.log("Error"+err.stack)
    }
    console.log(data.toString())
})

console.log("Ended Twice")
