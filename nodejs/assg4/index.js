const express = require("express")
const bodyParser = require('body-parser')
// const path = require('path')

const app = express()
app.listen(3000)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let userList = []

app.get('/', (req,res) =>{
    res.send(userList)
})

app.post("/", (req,res)=>{
    const name = req.query.name
    // console.log("test" + name);
    if(name === undefined || name===""){
        res.send("Name is required.")
    }
    else{
    userList.push(name)
    res.send(userList)}
})

app.put('/', (req,res)=>{
    const oldName = req.query.oldName
    const newName = req.query.newName
    if(newName==="" || newName === undefined || oldName===undefined || oldName===""){
        res.send("Requires oldName and newName path params.")
    }
    else{
    let index = userList.indexOf(oldName)
    userList[index] = newName
    res.send(userList)}
})

app.delete('/', (req,res)=>{
    const name = req.query.name
    if(name===undefined || name===""){
        res.send("Name path param is required.")
    }
    else{
    const newArr = userList.filter((data) =>{
        return data!==name
    })
    userList = newArr
    res.send(newArr)}
})
