const userModel = require("./model").userModel
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const saltRounds = 10;
const fs = require("fs")


exports.signUpFun = async (req,res) => {
    try{
        let body = req.body 
        // console.log(body.name)
        if(!body.name){
            res.status(200).send({msg:"Name is mandatory."})
        }
        else if(!body.password){
            res.status(200).send({msg: "Password is mandatory."})
        }
        else if(!body.email){
            res.status(200).send({msg:"Email is mandatory."})
        }
        else if(!body.dob){
            res.status(200).send({msg:"DOB is mandatory."})
        }
        else if(!body.branch){
            res.status(200).send({msg:"Branch is mandatory."})
        }
        else{
            let isUserPresent = await userModel.findOne({email: req.body.email})
            if(!isUserPresent){
                console.log("Before hashing "+body.password);
                body.password = await bcrypt.hash(body.password , saltRounds)
                let createUser = await userModel.create(body)
                res.send({msg:"User created successfully."})
                console.log("After hashing "+body.password);
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

exports.userList = async (req,res, next) =>{
    try{
        let response = await userModel.find()
        res.send(response)
    }
    catch(err){
        res.send(err)
    }
}

exports.getProfile = async (req,res) =>{
    try{
        let response = await userModel.findOne({id:req.jwt.data._id})
        res.send({msg:"Profile Fetched", data: response})
    }
    catch(err){
        res.send(err)
    }
}

exports.profilePic = async (req,res) =>{
    try{
        let response = await userModel.findOne({name: req.body.name})
        console.log(response);
        // let resp = req.files
        console.log(req.files);
        console.log(__dirname);
        console.log("Test");
        console.log("test" + req.files.data.originalFilename);
        fs.copyFileSync(req.files.data.path,__dirname+"/../../images/"+req.files.data.originalFilename)

        response.set({profilePic: __dirname+"/../../images/"+req.files.data.originalFilename})
        console.log(response);
        res.send({msg:"Files Fetched", data: response})
    }
    catch(err){
        res.send(err)
    }
}

// exports.profilePic = async (req,res) =>{
//     try{
//         console.log(req.files);
//         let response = req.files
//         res.send(response)
//     }
//     catch(err){
//         res.send(err)
//     }
// }



exports.signInFun = async (req,res) => {
    try{
        let body = req.body 
        // console.log(body.name)
        if(!body.password){
            res.status(200).send({msg: "Password is mandatory."})
        }
        else if(!body.email){
            res.status(200).send({msg:"Email is mandatory."})
        }
        else{
            let isUserPresent = await userModel.findOne({email: req.body.email}).lean().exec()
            if(isUserPresent){
                // console.log("Before hashing "+body.password);
                let loggedIn = await bcrypt.compare(body.password , isUserPresent.password)
                // let createUser = await userModel.create(body)
                if(loggedIn){
                    // console.log(isUserPresent)
                    // console.log(delete isUserPresent.password)         
                    // delete isUserPresent.password
                    let token = jwt.sign({
                        data: {_id : isUserPresent._id, name : isUserPresent.name}
                    }, "MySecret", {expiresIn: '2h'})
                    // console.log(isUserPresent)          
                    res.send({msg:"User logged in.",data:isUserPresent, token})
                }
                else
                res.send({msg:"Enter correct password"})
                // console.log("After hashing "+body.password);
            }
            else{
                res.send({msg:"User doesn't exists."})
            }
        }
    }
    catch (err) {
        res.status(400).send({msg: "Internal Server Error" + err.message})
    }
}