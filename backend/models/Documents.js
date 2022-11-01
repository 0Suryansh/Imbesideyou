const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    user_id:String,
    doc_type:String,
    input_para:String,
    output_para:String
});

const Document=mongoose.model('doc',userSchema)
module.exports=Document;