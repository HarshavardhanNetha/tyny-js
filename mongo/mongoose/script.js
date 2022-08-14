const mongoose =  require("mongoose")
const User = require("./User")

mongoose.connect("mongodb://localhost:27017/tyny", ()=>{
    console.log("Connected to DB");
}, (e) => {
    console.log(e)
})


const run = async () =>{
    const user = new User({name:"Harsha", age:20})
    console.log(user);
    await user.save()
}

run()
