const mongoose = require('mongoose');
const messagesSchema  = new mongoose.Schema({ 
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    receiverId : {
         type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    text : {
        type : String
    },
    image : {
        type :String
    }
},{timestamps : true});
const message = mongoose.model("message",messagesSchema);
module.exports = message;