const fs = require('fs')

const readStream = fs.createReadStream('./files/blog2.txt', {encoding: 'utf8'});
const writeStream = fs.createWriteStream('./files/stream.txt')

// readStream.on('data', (chunk) => {
//     console.log("CHUNK")
//     console.log(chunk)
//     writeStream.write("\nCHUNK\n")
//     writeStream.write(chunk)
// })

readStream.pipe(writeStream)