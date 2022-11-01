const {OAuth2Client}=require("google-auth-library")
const User=require("../models/Users")
const jwt=require('jsonwebtoken')

const client=new OAuth2Client("752367686296-0scm5me6nrjuc64f9dc36i88c7mstjrt.apps.googleusercontent.com")
exports.googlelogin=(req,res)=>{
    const {tokenId}=req.body
    client.verifyIdToken({idToken: tokenId, audience:"752367686296-0scm5me6nrjuc64f9dc36i88c7mstjrt.apps.googleusercontent.com"}).then(response=>{
        const {email_verified,email,name,sub,picture}=response.payload
        if(email_verified){
            User.findOne({email}).exec((err,user)=>{
                if(err){
                    return res.status(400).json({
                        message:"Soething went wrong..."
                    })
                }else{
                    if(user){
                        const token=jwt.sign({_id:user._id},process.env.cookieKey,{expiresIn:'3d'});
                        const {_id,name,email,sub,picture}=response.payload
                        res.json({
                            token,
                            user:{_id,name,email,sub,picture}
                        })
                    }else{
                        let newUser=new User({
                            name: name,
                            unique_google_id: sub,
                            thumbnail_pic: picture,
                            email
                        })
                        newUser.save((err,data)=>{
                            if(err){
                                return res.status(400).json({
                                    message:"Soething went wrong..."
                                })
                            }
                            const token=jwt.sign({_id:data._id},process.env.cookieKey,{expiresIn:'3d'});
                            const {_id,name,email,sub,picture}=response.payload
                            res.json({
                                token,
                                user:{_id,name,email,sub,picture}
                            })
                        })
                    }
                }
            })
        }
    console.log(response.payload)
    })
}