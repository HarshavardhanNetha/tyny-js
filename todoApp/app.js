const express = require("express")

const app = express()

app.get('/', (req,res) =>{
    res.send("Home Page Get Request")
})

app.post('/', (req,res)=>{
    res.send("HOme Page POst Request")
})

// app.get('/new-blog')