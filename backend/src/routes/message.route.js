const express = require("express");
const router = express.Router();
const verifyjwt = require('../middlewares/auth.middleware');
const {getusersforsidebar,getmessages,sendmessages}= require("../controllers/messages.controller");

router.get("/users",verifyjwt,getusersforsidebar);
router.get("/:id",verifyjwt,getmessages);
router.post("/send/:id",verifyjwt,sendmessages);

module.exports = router;