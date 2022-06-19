const express = require("express")
const blogController = require('../controllers/blogController')

const router = express.Router()
const Blog = require('../models/blog')

router.get('/create', (req, res) => {
    res.render('create', { title: "Create Blog" })
})

router.get('/:id', blogController.blog_get_single)

router.get('/', blogController.blog_index)

router.post('/', blogController.blog_index_post)

router.delete('/:id', blogController.blog_delete)

module.exports = router