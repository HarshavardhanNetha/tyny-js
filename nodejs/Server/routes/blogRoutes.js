const express = require("express")
const blogController = require('../controllers/blogController')

const router = express.Router()
const Blog = require('../models/blog')

router.get('/create', (req, res) => {
    res.render('create', { title: "Create Blog" })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then((result => {
            res.render('blog', { title: "Single Blog", blog: result })
        }))
        .catch((error => {
            res.send(error)
        }))
})

router.get('/', blogController.blog_index)

router.post('/', (req, res) => {
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
})

router.delete('/:id', (req, res) => {
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
})

module.exports = router