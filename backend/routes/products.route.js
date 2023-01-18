const express = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/products.controller")

const router = express.Router()


router.route("/product").get(getAllProducts)

router.route("/product/new").post(createProduct)

router.route("/product/:id").put(updateProduct).delete(deleteProduct)





module.exports =router