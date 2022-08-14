const express = require("express")
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();

const { signUpFun, signInFun, userList, getProfile, profilePic } = require("./controller")
const {authMiddleWare, isHarsha} = require("./../../util")
const router = express.Router()


router.post("/sign-up", signUpFun)
router.post("/sign-in", signInFun)
// router.get("/user-list",authMiddleWare, userList)
router.get("/user-list", userList)

router.get("/my-profile",authMiddleWare, isHarsha, getProfile)
router.post("/profilePic",multipartMiddleware,  profilePic)

module.exports = router