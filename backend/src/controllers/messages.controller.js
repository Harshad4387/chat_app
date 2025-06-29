const User = require("../models/user.model");
const message = require("../models/messages.model.js");
const cloudinary = require("../utils/cloudinary.js");
const { io, getReceiverSocketId } = require("../utils/socket.js");
const getusersforsidebar = async (req,res)=>{
    try {
        const myid  = req.user._id;
        const filterusers = await User.find({_id : {$ne : myid}}).select("-password");
        res.status(200).json(filterusers);
        
    } catch (error) {
        console.log("error in getusersforsidebar controller ");
        res.status(500).json({message : "internal server error"});
        
    }
}
const getmessages = async (req,res)=>{
    try {
        const {id : friendid} = req.params;
        const myid = req.user._id;
        const messages = await message.find({
            $or : [{senderId : myid , receiverId : friendid },
                {senderId :  friendid, receiverId : myid}]
        });

        res.status(200).json(messages);
        
    } catch (error) {
        console.log("error in getmessages controller" , error.message);
        res.status(500).json({message : "internal server error"});
        
    }
}
const sendmessages = async (req,res)=>{
    try {
        const myid = req.user._id;
        const {text,image} = req.body;
        const {id : recevierid} = req.params;
        let imageurl;
        if(image){
            const uploadedimage = await cloudinary.uploader.upload(image);
            imageurl = uploadedimage.secure_url;

        }
        const newMessage = new message({
            senderId :  myid,
            receiverId : recevierid,
            text ,
            image : imageurl,
        })

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(recevierid);
       if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

        res.status(201).json(newMessage);
        
    } catch (error) {
        console.log("error in send message controller",error.message);
        res.status(500).json({message : "internal server error"})
        
    }
}


module.exports = {getusersforsidebar,getmessages,sendmessages};
