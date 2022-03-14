var express = require("express")
var router = express.Router()
const {signout,signup,signin, isSignedIn} = require("../controllers/auth")
const {check} = require("express-validator")

router.get("/signout",signout)

router.post("/signup",[
    check("name").isLength({min:3}).withMessage("Name should be atleast 3 Length"),
    check("email").isEmail().withMessage("Please Enter Correct Email"),
    check("password").isLength({min:3}).withMessage("Please enter password more that 3 lengths")
],
signup)




router.post("/signin",[
    check("email").isEmail().withMessage("Please Enter Correct Email"),
    check("password").isLength({min:3}).withMessage("Please Filed id required")
],
signin)

router.get("/testroute",isSignedIn,(req,res)=>{
     res.json(req.auth)
})

module.exports = router;