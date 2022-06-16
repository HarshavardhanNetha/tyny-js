const express = require("express")
const router = express.Router()
const Blog = require('../models/blog')


router.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: "Number Two Blog to DB",
        content: "The content of second blog will be updated shortly"
    })
    blog.save().then((result) => {
        res.send(result)
    })
        .catch((err) => {
            res.send(err)
        })
})

router.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.get('/single-blog', (req, res) => {
    Blog.findById('62a5effa03aa4804a607b866')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = router