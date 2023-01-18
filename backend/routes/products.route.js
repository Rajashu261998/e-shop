const express = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct,getSingleProduct } = require("../controllers/products.controller")

const router = express.Router()


router.route("/product").get(getAllProducts)

router.route("/product/new").post(createProduct)

router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getSingleProduct)





module.exports =router