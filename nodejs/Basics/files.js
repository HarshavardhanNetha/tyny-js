const { log } = require('console');
const fs = require('fs')

// readfile
fs.readFile("./files/blog.txt",(err, data)=>{
    if(err){
        console.log(err);
    }
    console.log(data);
    console.log(data.toString());
})

// // this happens asynchornously so below line executes first
// console.log("Async Line")

// writingfile
// three args (path, data, callback)

let data = "New Blog Content\n".repeat(1000)

fs.writeFile("./files/blog2.txt", data,()=>{
    console.log("File written"); 
})

// // create directry

// if(!fs.existsSync('./assets')){
//     fs.mkdir('./assets', (err)=>{
//         if (err){
//             console.log(err);
//         }
//         console.log("Folder created");
//     })
// }
// else{
//     fs.rmdir('./assets', (err)=>{
//         if(err) console.log(err);
//         console.log("Deleted");
//     })
// }
// delete file if exists
// if(fs.existsSync('./files/delete.txt')){
//     fs.unlink('./files/delete.txt',(err) =>{
//         if(err) console.log(err);
//         console.log("deleted");
//     })
// }

// how to update and append data