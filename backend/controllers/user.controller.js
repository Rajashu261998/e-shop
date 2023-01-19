const  ErrorHandler = require("../utils/erroHandler")
const catchErrorMiddleware = require("../middleware/catchError.middleware")
const {UserModel} = require("../models/user.model")
const sendToken = require("../utils/jwtToken")


// registration form ---user
const registerUser = catchErrorMiddleware( async (req,res,next)=>{

    const {name,email,password} = req.body

    const user = await UserModel.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is a sample id",
            url:"profile pic"
        }
    })

   sendToken(user,201,res)

})

// Login user

const loginUser = catchErrorMiddleware( async (req,res,next)=>{

    const {email,password} = req.body

    // checking if uer given password and email both

    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",400))
    }

    const user =await UserModel.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))

    }

    const isPasswordMatched =await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or passworrd",401))
    }

    const token = user.getJWTToken()

    sendToken(user,200,res)
})

module.exports = {

    registerUser,loginUser
}