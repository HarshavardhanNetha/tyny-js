const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })


// need to create a blog model to export and use. Like | Schema - Class | Model - ClassInstance/Obj 
const Blog = mongoose.model('Blog', blogSchema) //pluralises the name given in first arg and automatically searches in that collection
// arg2 defines what type of data is stored, i.e schema

module.exports = Blog