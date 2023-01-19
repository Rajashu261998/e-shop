const express = require("express")
const {registerUser, loginUser, logout} = require("../controllers/user.controller")

const router = express.Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").get(logout)





module.exports = router