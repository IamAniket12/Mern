
const express = require("express");

const app = express()

const port =3000
app.get('/', (req,res)=>{
    res.send('Hello world!')
})

app.get('/signout',(req,res)=> {
    res.send('Trying to access signup page..')
})

app.listen(port,()=>{
    console.log(`We are using on port1 ${port}`)
})
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

//Nodemon reload automatically
