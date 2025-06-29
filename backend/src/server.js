require("dotenv").config();
const express = require("express");
const app = express();
const connect = require("./db/db.js");
connect();


const authroute = require("./routes/auth.route.js");
app.use("/api/auth",authroute);
  
const port  = process.env.PORT || 3001
app.listen(port ,()=>{
    console.log("server is running on port 3000");
})