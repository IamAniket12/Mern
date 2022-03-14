const User = require("../models/user")
const {check,validationResult} = require("express-validator")
var jwt = require("jsonwebtoken")
var expressjwt = require("express-jwt")
require('dotenv').config()
exports.signup = (req,res)=>{


    const errors = validationResult(req)
    if (!errors.isEmpty())
    {
          return res.status(422).json({
              error:errors.array()[0].msg
          })
    }
     const user = new User(req.body)
    
     user.save((err,user)=>{
         if(err)
         {
             return res.status(400).json({
                 err:"Not able to save user in database"
             })
         }

         res.json({
             name:user.name,
             email:user.email,
             id:user._id
         })
     })

}

exports.signout = (req,res)=>{
    //clear the cookie
    res.clearCookie("token")
    res.json({
        messgae:"User Signout Successfully"
    })
 }

 exports.signin = (req,res)=>{
     const {email,password} = req.body;
     const errors = validationResult(req)
     if (!errors.isEmpty())
     {
           return res.status(422).json({
               error:errors.array()[0].msg
           })
     }
    User.findOne({email},(err,user)=>{
        if(err || !user)
        {
            return res.status(400).json({
                error:"User not found"
            })
        }
        if(!user.authenticate(password))
        {
            return res.status(400).json({
                error:"Email and password do not match"
            })
        }
        //creating token
    
        const authtoken = jwt.sign({_id:user._id},process.env.SECRET)
        //put token in cookie
        res.cookie("token",authtoken,{expire:new Date()+1000})
        //send response to frontend
        const   {_id,name,email,role} = user
        return res.json({
            authtoken,user:{_id,name,email,role}
        })


    })
    
 }


////Protected routes
exports.isSignedIn = expressjwt({
secret:process.env.SECRET,
userProperty:"auth"
});



////Custom Middleware
 

exports.isAuthenticated = (req,res,next)=>{
    let checker = req.profile && req.auth && req.profile._id==req.auth._id
    if(!checker)
    {
        return res.status(403).json({
            error:"Access Denied"
        })
    }
    next()
}


exports.isAdmin = (req,res,next)=>{
    if(req.profle.role===0)
    {
        res.status(403).json({
            error:"You are not admin,Access denied"
        })
    }

    next()
}