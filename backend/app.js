const mongoose = require("mongoose")
const express = require("express")
require('dotenv').config()
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
//My Routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
//DBConnection

mongoose.connect(process.env.DATABASE,{ useUnifiedTopology: true,useUnifiedTopology:true,useCreateIndex:true })
.then(()=>{
    console.log("DB Connected")
})


//Middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


//Routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)

//Port
const port = process.env.PORT||3000


app.listen(port,()=>{
    console.log(`App is running at ${port}`)
})