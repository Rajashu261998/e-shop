const catchErrorMiddleware = require("../middleware/catchError.middleware")
const { ProductModel } = require("../models/product.model")
const ApiFeatures = require("../utils/apiFeatures")
const { ErrorHandler } = require("../utils/erroHandler")



// create products --Admin
const createProduct = catchErrorMiddleware(async (req,res,next)=>{
    const product = await ProductModel.create(req.body)

    res.status(200).json({
        success:true,
        product
    })
})

// get all products --Admin

const getAllProducts = catchErrorMiddleware(async (req,res,next)=>{
    const apiFeature = new ApiFeatures(ProductModel.find(), req.query).search().filter()
    let products = await apiFeature.query
    res.status(200).json({
        success:true,
        products
    })
})


// update product --Admin

const updateProduct = catchErrorMiddleware(async (req,res,next)=>{

    let product = await ProductModel.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }
    product = await ProductModel.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        product
    })
})

// delete Product --Admin

const deleteProduct = catchErrorMiddleware(async (req,res,next)=>{

    const product = await ProductModel.findById(req.params.id)


    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    await product.remove()

    res.status(200).json({
        success:true,
        message:"Product Deleted"
    })
})


// get single product details

const getSingleProduct = catchErrorMiddleware(async (req,res,next)=>{

    const product = await ProductModel.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success:true,
        product
    })

})


module.exports={
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getSingleProduct
}