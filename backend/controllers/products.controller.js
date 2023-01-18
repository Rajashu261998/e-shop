const { ProductModel } = require("../models/product.model")



// create products --Admin
const createProduct = async (req,res,next)=>{
    const product = await ProductModel.create(req.body)

    res.status(200).json({
        success:true,
        product
    })
}

// get all products

const getAllProducts = async (req,res)=>{

    const products = await ProductModel.find()
    res.status(200).json({
        success:true,
        products
    })
}


// update product --Admin

const updateProduct = async (req,res)=>{

    let product = ProductModel.findById(req.params.id)

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
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
}

// delete Product --Admin

const deleteProduct = async (req,res)=>{

    const product = await ProductModel.findById(req.params.id)


    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    await product.remove()

    res.status(200).json({
        success:true,
        message:"Product Deleted"
    })
}


// get single product details

const getSingleProduct = async (req,res,next)=>{

    const product = await ProductModel.findById(req.params.id)

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    res.status(200).json({
        success:true,
        product
    })

}


module.exports={
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getSingleProduct
}