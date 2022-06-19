const express = require("express")
const bodyParser = require('body-parser')

const app = express()
app.listen(3000)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let userList = []

app.get('/', (req,res) =>{
    res.send(userList)
})

app.post('/', (req,res)=>{
    const name = req.body.name
    userList.push(name)
    res.send(userList)
})

app.put('/', (req,res)=>{
    const oldName = req.body.oldName
    const newName = req.body.newName
    let index = userList.indexOf(oldName)
    userList[index] = newName
    res.send(userList)
})

app.delete('/', (req,res)=>{
    const name = req.body.name
    const newArr = userList.filter((data) =>{
        return data!==name
    })
    userList = newArr
    res.send(newArr)
})
