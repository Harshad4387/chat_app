require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const connect = require("./db/db.js");
connect();
const cookie = require("cookie-parser");
app.use(cookie());


const authroute = require("./routes/auth.route.js");
app.use("/api/auth",authroute);

const messageroute = require("./routes/message.route.js");
app.use("/api/messages",messageroute);
  
const port  = process.env.PORT || 3001
app.listen(port ,()=>{
    console.log("server is running on port 3000");
})