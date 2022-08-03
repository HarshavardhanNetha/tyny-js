const express = require("express")
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userModel = require("./apis/users/model").userModel
const dburl = "mongodb+srv://tyny:rgukt123@cluster0.zqrjahw.mongodb.net/tyny?retryWrites=true&w=majority"
mongoose.connect(dburl)
    .then((res) => {
        app.listen(3000)
        console.log("Conneceted to db");
    })
    .catch((err) => console.log("Error connecting to db"))
// app.listen(3000)

app.use("/user", require("./apis/users/routes"))

