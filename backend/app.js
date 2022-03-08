const mongoose = require("mongoose")
const express = require("express")
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/tshirt',{ useUnifiedTopology: true,useUnifiedTopology:true,useCreateIndex:true })
.then(()=>{
    console.log("DB Connected")
})

const port = 3000
app.listen(port,()=>{
    console.log(`App is running at ${port}`)
})