const mongoose = require("mongoose")

let productSchema = new mongoose.Schema({
    name: {type: String},
    color: {type: String},
    size: {type: String},
    price: {type: Number},
    category: {type: String}
})

exports.productModel = mongoose.model("products", productSchema)