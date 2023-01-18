const app = require("./app")


require("dotenv").config()
const {connection} = require("./db")



app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log("connection to DB")
    }
    catch(err){
        console.log("Error")
        console.log(err)
    }
    console.log(`Server is runningnat port ${process.env.port}`)
})