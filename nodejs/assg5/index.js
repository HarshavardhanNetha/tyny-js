const express = require("express")
const bodyParser = require('body-parser')
const Blog = require("./blog")
// const path = require('path')

const app = express()
const mongoose = require('mongoose')

const dbURL = "mongodb+srv://tyny:rgukt123@cluster0.zqrjahw.mongodb.net/tyny?retryWrites=true&w=majority"


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dbURL)
.then((res) =>{
    console.log("Connected to DB");
    app.listen(3000)
})
.catch(() =>{
    console.log("Error Connection");
})


app.get('/', (req,res) =>{
    Blog.find()
    .then((result) =>{
        res.send(result)
    })
    .catch((err) => console.log(err))
})

app.post('/', (req,res)=>{
    // console.log(req.body)
    const title = req.body.title
    const content = req.body.content
    console.log(title + content);
    if(req.body.title==="" || req.body.title === undefined){
        console.log("Title required.");
        res.send("Title cannot be empty.")
    }
    else{

    const blog = new Blog(req.body)
    blog.save()
        .then((result => {
            res.send(result)
            // res.redirect("/")
        }))
        .catch((error => {
            res.status(400).send(error)
        }))
    }

})

app.put('/', (req,res)=>{
    const id = req.query.id
    // console.log(id);
    if(id===undefined || id===""){
        res.send("Path param ID is required.")
    }
    // console.log(id);
    else{
    const newData = req.body
    const title = req.body.title
    if(req.body.title==="" || req.body.title === undefined){
        console.log("Title required.");
        res.send("Title cannot be empty.")
    }
    // console.log(newData);
    else{
    Blog.findByIdAndUpdate(id, newData, function (err,docs){
        if(err){
            console.log("Error");
            res.status(400).send(err)
        }
        else{
            res.send(docs)
        }
    })}}
})

app.delete('/', (req,res)=>{
    const id = req.query.id
    if(id===undefined || id===""){
        res.send("Path param ID is required.")
    }
    else{
    Blog.findByIdAndDelete(id, function (err,docs) {
        if(err){
            console.log("Error");
            res.status(400).send(err)
        }
        else{
            // res.redirect("/")
            console.log(docs);
            res.send(docs)
        }
    })}
})

// https://stackoverflow.com/questions/70654429/mongooseerror-query-was-already-executed
// https://www.geeksforgeeks.org/mongoose-findbyidanddelete-function/?ref=rp
// https://www.geeksforgeeks.org/mongoose-findbyidandupdate-function/
// feedback
// send response codes 
// send as path params rather body
// check whether required params are received