const express = require("express")
const { signUpFun, signInFun, userList, getProfile } = require("./controller")
const {authMiddleWare, isHarsha} = require("./../../util")
const router = express.Router()

router.post("/sign-up", signUpFun)
router.post("/sign-in", signInFun)
router.get("/user-list",authMiddleWare, userList)
router.get("/my-profile",authMiddleWare, isHarsha, getProfile)

module.exports = router