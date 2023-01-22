const app = require("./app")
const cloudinary = require("cloudinary");

require("dotenv").config()
const {connection} = require("./db")


// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });


  

 const server = app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log("connection to DB")
    }
    catch(err){
        console.log("Error")
        console.log(err)
    }
    console.log(`Server is running at port ${process.env.port}`)
})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// unhandled promise
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });