import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'


export const protect=async(req,res,next)=>{

    try {

         const token = req.cookies.token;

         if (!token) {
           return res.status(400).json({
             success: false,
             message: "not authorized",
           });
         }

         const decode = await jwt.verify(token, process.env.JWT_SECRETKET);
         if (!decode) {
           return res.status(400).json({
             success: false,
             message: "token expired",
           });
         }

         req.user = await User.findById(decode.id).select("-password");
         next();
        
    } catch (error) {
console.log(error)
         return res.status(401).json({
           success: false,
           message: "Invalid token",
         });
        
    }
   
}