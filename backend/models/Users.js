const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:String,
    unique_google_id:String,
    thumbnail_pic:String,
    email:String
});

const User=mongoose.model('user',userSchema)
module.exports=User;