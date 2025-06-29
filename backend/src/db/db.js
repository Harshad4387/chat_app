const mongoose = require("mongoose");

const connect = async()=>{
    try{
        const connection = await mongoose.connect(`${process.env.MONGO_URL}/chatapp`);
        console.log("database conneted succesfully");
        // console.log(connection);

    }
    catch(error){
        console.log(error);
    }
}

module.exports = connect;