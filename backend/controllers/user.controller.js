const { ErrorHandler } = require("../utils/erroHandler")
const catchErrorMiddleware = require("../middleware/catchError.middleware")
const {UserModel} = require("../models/user.model")


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

    const token = user.getJWTToken()

    res.status(200).json({
        success:true,
        token
    })

})

module.exports = registerUser