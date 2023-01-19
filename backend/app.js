const express = require("express")
const erroMiddleWare = require("./middleware/error.middleware")
const app = express()
app.use(express.json())
// routes
const products = require("./routes/products.route")
const user = require("./routes/user.routes")

app.use("/api/v1",products)
app.use("/api/v1",user)
app.use(erroMiddleWare)



module.exports = app
    
