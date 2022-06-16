// naming convention
const Blog = require('../models/blog')


const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: "Home", blogs: result })
            // res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports = {
    blog_index
}