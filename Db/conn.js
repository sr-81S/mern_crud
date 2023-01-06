const mongoose = require("mongoose")

const DB_CONNECT = process.env.DB

mongoose.connect(DB_CONNECT,{
    
    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=>console.log("DB Connected")).catch((error)=>console.log(error.message));