const express = require("express")

const app = express()
app.use(express.json())
// routes
const products = require("./routes/products.route")

app.use("/api/v1",products)
module.exports = app
    
