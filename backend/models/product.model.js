const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name:{
        type:String,
        requied:[true, "Please Enter Product Name"]
    },
    description:{
        type:String,
        requied:[true, "Please Enter Product Description"],
        trim:true
    },
    price:{
        type:Number,
        requied:[true, "PLease Enter Product Price"],
        maxLength:[6, "Price can not exceed 8 digits"]
    },
    rating:{
        type:Number,
        default:0
    },
    image:[
        {
        public_id:{
            type:String,
            requied:true
        },
        url:{
            type:String,
            requied:true
        }
    }
    ],
    category:{
        type:String,
        requied:[true,"Please Enter Product Category"]
    },
    Stock:{
        type:Number,
        requied:[true,"Please Enter Product Stock"],
        maxLength:[4,"Stock can not greater than 4 digits"],
        default:1
    },
    numberReviews:[
        {
            name:{
                type:String,
                requied:true
            },
            Comment:{
                type:String,
                requied:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const ProductModel = mongoose.model("product", productSchema)

module.exports={
    ProductModel
}