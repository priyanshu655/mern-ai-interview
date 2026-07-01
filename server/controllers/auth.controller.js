import genToken from "../config/token.js";
import User from "../models/user.mode.js"
export const googleAuth=async(req,res)=>{
    console.log("GOOGLE AUTH HIT");
    try {
        const {name,email}=req.body;
        let user=await User.findOne({email});
        if(!user){
            user=await User.create({
                name,
                email
            })
        }

        let token=await genToken(user._id);
        console.log("Generated Token:", token);
console.log("Type:", typeof token);
       res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
});

       return res.status(200).json({
    success: true,
    user
});
    } catch (error) {
        return res.status(500).json({
    message: error.message || "Google authentication failed"
});
    }
}

export const logOut=async (req,res)=>{
    try {
        await res.clearCookie("token");
        return res.status(200).json({message:"Logout Successfully"})
    } catch (error) {
          return res.status(500).json({
            message:`Logout error error ${error.response.data.message}`
        })
    }
}