const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const app = express()

const dburl = "mongodb+srv://tyny:rgukt123@cluster0.zqrjahw.mongodb.net/tyny?retryWrites=true&w=majority"
mongoose.connect(dburl)
    .then((res) => {
        app.listen(3000)
        console.log("Conneceted to db");
    })
    .catch((err) => console.log("Error connecting to db"))

app.set('view engine', 'ejs')
// to set other folder for views
// app.set("views","myviews")

// middlewares

app.use((req, res, next) => {
    console.log("In middleware one")
    console.log(req.hostname);
    next()
})
app.use((req, res, next) => {
    console.log("In middleware two")
    // console.log(req.hostname);
    next()
})

//  third party middleware
app.use(morgan('dev'))

// middleware to serve static files
app.use(express.static('public'))

app.get('/', (req, res) => {
    // let blogs = [{ title: "Blog Number One", content: "This is content of blog number one." }, { title: "Blog Number Two", content: "This is content of blog number two." }]
    // res.send("<p>Home Page</p>")
    // res.sendFile('./views/index.html', {root: __dirname})
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: "Home", blogs: result })
            // res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
})

app.get('/about', (req, res) => {
    // res.send("<p>About Page</p>")
    // res.sendFile('./views/about.html', {root: __dirname})
    res.render('about', { title: "About Us" })
})

//redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

app.get('/blog/create', (req, res) => {
    res.render('create', { title: "Create Blog" })
})

app.get('/add-blog', (req, res) => {
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

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
})

app.get('/single-blog', (req, res) => {
    Blog.findById('62a5effa03aa4804a607b866')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
})

//404 page
app.use((req, res) => {
    // res.status(404).sendFile('/views/404.html', { root: __dirname })
    res.status(404).render('404', { title: "404 Not Found" })
})