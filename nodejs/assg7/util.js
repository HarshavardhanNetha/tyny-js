const jwt = require("jsonwebtoken")

exports.authMiddleWare = (req,res,next) => {
    try{
        let token = req.headers["token"] 
        if(!token){
            res.send({msg:"Not token found."})
        }
        else{
            let mydata = jwt.verify(token, "MySecret")
            req.jwt = mydata
            next()
        }
    }
    catch(err){
        console.log(err)
        res.send({err: "Invalid Token"})
    }
}


exports.isHarsha = (req,res,next) => {
    try{
        if(req.jwt.data.name !== "Harshavardhan"){
            res.send({msg:"Unathorized Access."})
        }
        else{
            next()
        }
    }
    catch(err){
        console.log(err)
        res.send({err: "Invalid Token"})
    }
}