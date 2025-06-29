const mongoose = require('mongoose');
const messagesSchema  = new mongoose.Schema({ 
    senderid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    recevierid : {
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