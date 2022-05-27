const http = require('http')
const fs = require('fs')
const _ = require('lodash')

const server = http.createServer((req, res)=>{
    // console.log("Req Made");
    console.log(req.url, req.method);
    
    // lodash
    const num = _.random(0,20)
    console.log(num);
    
    res.setHeader('Content-Type','text/html')

    let path = "./views/"

    switch(req.url){
        case '/':
            path += 'index.html'
            res.statusCode = 200
            break
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break
        case '/about-us':
            res.statusCode = 301
            res.setHeader('Location','/about')
            break 
        default:
            res.statusCode = 404
            path += '404.html'
            break
    }

    fs.readFile(path, (err, data) => {
        // res.write(data)
        if(err) res.end()
        res.end(data)
    })    
});

server.listen(3000, 'localhost', ()=>{
    console.log("Listening for reqs on 3000");
})

