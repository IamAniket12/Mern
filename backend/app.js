const mongoose = require("mongoose")
const express = require("express")
require('dotenv').config()
const app = express()

mongoose.connect(process.env.DATABASE,{ useUnifiedTopology: true,useUnifiedTopology:true,useCreateIndex:true })
.then(()=>{
    console.log("DB Connected")
})

const port = process.env.PORT||3000
app.listen(port,()=>{
    console.log(`App is running at ${port}`)
})