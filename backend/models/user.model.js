const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")
const { default: isEmail } = require("validator/lib/isEmail")
const jwt = require("jsonwebtoken")

require("dotenv").config()

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [6, "Password should be greater than 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  });

//   password hsahig using bcrypt
userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next()
    }
    this.password  = await bcrypt.hash(this.password, 8)
})

// JWT Token

userSchema.methods.getJWTToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expireIn: process.env.JWT_EXPIRE
    })
}

const UserModel = mongoose.model("users",userSchema)

module.exports = {
    UserModel
}