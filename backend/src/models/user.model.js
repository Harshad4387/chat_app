const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        unique : true ,
        required : true
    },
    fullName : {
        type : String,
        required : true
    },
    password  :  {
        type : String ,
        required : true,
        minlength : 6
    },
    profilePic  : {
        type  : String ,//cloudinary url
        default : ""
    }


},{timestamps : true})

const User = mongoose.model("User",userSchema);
module.exports = User;