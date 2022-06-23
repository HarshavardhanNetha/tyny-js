const express = require("express")
const bodyParser = require('body-parser')
const Blog = require("./blog")

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
    console.log(req.body)
    const blog = new Blog(req.body)
    blog.save()
        .then((result => {
            // res.send(result)
            res.redirect("/")
        }))
        .catch((error => {
            res.send(error)
        }))
})

app.put('/', (req,res)=>{
    const id = req.body.id
    // console.log(id);
    const newData = req.body
    // console.log(newData);
    Blog.findByIdAndUpdate(id, newData, function (err,docs){
        if(err){
            console.log("Error");
        }
        else{
            res.send(docs)
        }
    })
})

app.delete('/', (req,res)=>{
    const id = req.body.id
    Blog.findByIdAndDelete(id, function (err,docs) {
        if(err){
            console.log("Error");
        }
        else{
            // res.redirect("/")
            console.log(docs);
            res.send(docs)
        }
    })
})
