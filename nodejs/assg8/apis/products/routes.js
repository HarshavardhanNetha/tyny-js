const express = require("express")
const { createProduct, category, colour, topFive, nthHighestProductsList, productList, profilePic } = require("./controller")
// const {authMiddleWare, isHarsha} = require("./../../util")
const router = express.Router()
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.post("/create", createProduct)
router.post("/categories", category)
router.post("/colour", colour)
router.post("/topFive", topFive)
router.post("/nthHighest", nthHighestProductsList)
router.get("/productsList", productList)
router.post("/profile",multipartMiddleware,  profilePic)


// router.post("/sign-up", signUpFun)
// router.post("/sign-in", signInFun)
// router.get("/user-list",authMiddleWare, userList)
// router.get("/my-profile",authMiddleWare, isHarsha, getProfile)

module.exports = router