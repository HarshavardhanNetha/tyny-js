const productModel = require("./model").productModel
// const bcrypt = require('bcrypt');
// const jwt = require("jsonwebtoken")
// const saltRounds = 10;

exports.createProduct = async (req,res) => {
    try{
        let body = req.body 
        // console.log(body.name)
        if(!body.name){
            res.status(200).send({msg:"Name is mandatory."})
        }
        else if(!body.color){
            res.status(200).send({msg: "Color is mandatory."})
        }
        else if(!body.category){
            res.status(200).send({msg: "Category is mandatory."})
        }
        else if(!body.size){
            res.status(200).send({msg:"Size is mandatory."})
        }
        else if(!body.price){
            res.status(200).send({msg:"Price is mandatory."})
        }
        else{
            let isProductPresent = await productModel.findOne({name: req.body.name})
            if(!isProductPresent){
                // console.log("Before hashing "+body.password);
                // body.password = await bcrypt.hash(body.password , saltRounds)
                let createProduct = await productModel.create(body)
                res.send({msg:"User created successfully."})
                // console.log("After hashing "+body.password);
            }
            else{
                res.send({msg:"User already exists."})
            }
        }
    }
    catch (err) {
        res.status(400).send({msg: "Internal Server Error" + err.message})
    }
}

exports.category = async (req,res) => {
    try{
        let body = req.body 
        // console.log(body.name)
        if(!body.category){
            res.status(200).send({msg: "Category is mandatory."})
        }
        else{
            let categoryProducts = await productModel.find({category:req.body.category})
            // let isProductPresent = await productModel.findOne({email: req.body.name})
            res.status(200).send(categoryProducts)
        }
    }
    catch (err) {
        res.status(400).send({msg: "Internal Server Error" + err.message})
    }
}

exports.colour = async (req,res) => {
    try{
        let body = req.body 
        // console.log(body.name)
        if(!body.colour){
            res.status(200).send({msg: "Colour is mandatory."})
        }
        else if(!body.size){
            res.status(200).send({msg: "Size is mandatory."})
        }
        else{
            let colourProducts = await productModel.find({colour:req.body.colour,size:req.body.size})
            // let isProductPresent = await productModel.findOne({email: req.body.name})
            res.status(200).send(colourProducts)
        }
    }
    catch (err) {
        res.status(400).send({msg: "Internal Server Error" + err.message})
    }
}

exports.topFive = async (req,res) => {
    try{
        let body = req.body 
       
        let topFiveProducts = await productModel.aggregate([{$sort:{"price":-1}},{$limit:5},{$project: {name:true,price:true}}])
        // let isProductPresent = await productModel.findOne({email: req.body.name})
        res.status(200).send(topFiveProducts)
    }
    catch (err) {
        res.status(400).send({msg: "Internal Server Error" + err.message})
    }
}

exports.nthHighestProductsList = async (req,res) => {
    try{
        let body = req.body
        if(!body.n){
            res.send("N is mandatory")
        }
        else{
            let n = req.body.n
            let nthProducts = await productModel.aggregate([{$group: {"_id":"$price","name": {$push: "$name"}}},{$sort: {"_id":-1}},{$skip: n-1},{$limit: 1}])
            res.send(nthProducts)
        } 
    }
    catch (err) {
        res.status(400).send({msg: "Internal Server Error" + err.message})
    }
}


exports.productList = async (req,res, next) =>{
    try{
        let response = await productModel.find()
        res.send(response)
    }
    catch(err){
        res.send(err)
    }
}


exports.profilePic = async (req,res) =>{
    try{
        console.log(req.files);
        let response = req.files
        res.send(response)
    }
    catch(err){
        res.send(err)
    }
}
