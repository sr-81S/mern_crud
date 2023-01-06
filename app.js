require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()
const mongoose = require("mongoose")
require("./Db/conn")
const users = require("./models/userSchema")
const cors = require("cors")
const router = require("./routes/router")






app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(router)


const port = process.env.PORT || 5000;

//heroku 
if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"))
    const path = require("path");
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})