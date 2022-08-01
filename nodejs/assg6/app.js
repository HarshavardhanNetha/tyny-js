const express = require("express")
const bodyParser = require('body-parser');
const { stat } = require("fs");
// const path = require('path')

const app = express()
app.listen(3000)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let productList = []
// name*, price, size and colour

function checkExistence(name){
    // let flag = 0
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            productList.forEach((listItem) =>{
                if(listItem.name === name){
                    // flag = 1
                    console.log("Item found. Exiting.");
                    reject (true)
                }
            })
            // if(flag == 0)
            // console.log("Item not found, so adding...");
            resolve (false)
        }, 1500)
    })
}

function addToList(name,price,size,color){
    // let flag = 0
    console.log("Item not found, so adding...");
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            let product = {"name":name, "price":price, "size":size,color}
            productList.push(product)
            console.log("Item Added");
            resolve ("Item Added")
        }, 1500)
    })
}


function updateInList(name,price,size,color){
    // let flag = 0
    // console.log("Item found, updating...");
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            productList.forEach((item) => {
                if(item.name === name){
                    item.price = price
                    item.size = size
                    item.color = color

                    console.log("Value Updated");
                    
                    resolve(true)
                }
            })
            reject(false)
        }, 1500)
    })
}

function getItem(name){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            productList.forEach((item)=>{
                if(item.name === name)
                    resolve (item)
            })
            reject ("Item not found")
        }, 1500)
    })
}

function deleteItem(name){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            productList.forEach((item, index)=>{
                if(item.name === name)
                    // delete productList[index]
                    productList.splice(index, 1)
                    resolve ("Deleted")
            })
            reject ("Item not found")
        }, 1500)
    })
}

app.get('/', (req,res) =>{
    res.status(200).send(productList)
})

app.post("/", (req,res)=>{
    let name = req.query.name
    let price = req.query.price
    let size = req.query.size
    let color = req.query.color

    if(name === undefined || name === "" || price === undefined || price === "" || size === undefined || size === "" || color===undefined || color === "")
        res.send("Enter all required values.")
    
    async function result() {
        try{
            await checkExistence(name);
            await addToList(name,price,size,color);
            console.log(productList);
            res.status(200).send("Product Added Successfully.") 
        }
        catch{
            res.status(400).send("Item name should be unique.")
        }
    }
    result()
})

app.put("/", (req,res)=>{
    let name = req.query.name
    let price = req.query.price
    let size = req.query.size
    let color = req.query.color

    if(name === undefined || name === "" || price === undefined || price === "" || size === undefined || size === "" || color===undefined || color === "")
        res.send("Enter all required values.")
    
    async function result() {
        try{
            await updateInList(name,price,size,color);
            console.log(productList);
            res.status(200).send("Product updated.") 
        }
        catch{
            res.status(400).send("Item does not exist.")
        }
    }
    result()
})

app.get("/product", (req,res)=>{
    let name = req.query.name

    if(name === undefined || name === "" )
        res.send("Name is required.")
    
    async function result() {
        try{
            let result = await getItem(name)
            // console.log(productList);
            res.status(200).send(result)
        }
        catch{
            res.status(400).send("Item not found.")
        } 
    }

    result()
    // let isThere = await checkExistence(name);
})

app.delete("/product", (req,res)=>{
    let name = req.query.name

    if(name === undefined || name === "" )
        res.send("Name is required.")
    
    async function result() {
        try{
            let result = await deleteItem(name)
            // console.log(productList);
            res.status(200).send(result)
        }
        catch{
            res.status(400).send("Item not found.")
        } 
    }

    result()
    // let isThere = await checkExistence(name);
})