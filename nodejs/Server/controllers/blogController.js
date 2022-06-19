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

const blog_index_post = (req, res) => {
    console.log(req.body)
    const blog = new Blog(req.body)
    blog.save()
        .then((result => {
            // res.send(result)
            res.redirect("/")
        }))
        .catch((error => {
            res.send(error)
        }))
}

const blog_delete = (req, res) => {
    // console.log(req.body)
    // const blog = new Blog(req.body)
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' })
        })
        .catch(err => {
            console.log(err)
        })
}

const blog_get_single = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then((result => {
            res.render('blog', { title: "Single Blog", blog: result })
        }))
        .catch((error => {
            res.send(error)
        }))
}

module.exports = {
    blog_index,
    blog_index_post,
    blog_delete,
    blog_get_single
}