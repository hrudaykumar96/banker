const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const loginControlers=async(req, res)=>{
    try {
        const {email, password}=req.body
        const emailAvailable=await Users.findOne({where:{email:email}})
        if(!emailAvailable){
            res.send("not user")
        }
        else{
            const passwordAvailable= await bcrypt.compare(password,emailAvailable.password)
            if(passwordAvailable){
                const token = jwt.sign({email:email},"SECRETKEY")
                res.cookie("token",token)
                res.send("authenticated")
            }
            else{
                res.send("incorrect password")
            }
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports=loginControlers