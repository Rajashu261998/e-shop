const mongoose = require("mongoose")

require("dotenv").config()

mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGO_URL, () => {
//   console.log("Connected to MongoDB");
// });
const connection =mongoose.connect(process.env.mongoURL);
// const connection = mongoose.connect(process.env.mongoURL)

module.exports = {
    connection
}