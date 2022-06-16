const fs = require("fs")

fs.readFile('./textfile.txt', (err, data) => {
    if (err) console.log(err);
    console.log(data.toString());
    let newData = data.toString()
    let replacedData = newData.replace(/tyny/g, "TYNYBAY PRIVATE LIMITED");
    console.log(replacedData);
    fs.writeFile('./textfile.txt', replacedData, () => {
        console.log("File Written");
    })
})


// let data = "this string contains tyny of the tyny"

// let newData = data.replace("tyny", "TYNYBAY PVT LTD")
// console.log(newData);