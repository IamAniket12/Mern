const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema;

const ProductINCartSchema = new mongoose.Schema({
        product:{
            type:ObjectId,
            ref:"Product"
        },
        name:String,
        count:Number,
        price:Number


})


const productcart = mongoose.model("ProductCart",ProductINCartSchema)

const orderSchema = new mongoose.Schema({
    products:[ProductINCartSchema],
    transaction_id:{},
    amount:{type:Number},
    address:String,
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User"
    }



},{timestamps:true})

const order = mongoose.model("Order",orderSchema)

module.exports = {productcart,order}