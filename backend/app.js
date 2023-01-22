const express = require("express")
const erroMiddleWare = require("./middleware/error.middleware")
const app = express()
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path")

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
// routes
const product = require("./routes/products.route")

const user = require("./routes/user.routes")
const order = require("./routes/order.route")
const payment = require("./routes/products.route")

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);




app.use(erroMiddleWare)



module.exports = app
    
