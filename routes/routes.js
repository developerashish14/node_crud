const express = require('express');
const usersControllers = require('../controller/users');
const router = express.Router();
const multer = require("multer"); //image uploade




//upload image start
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads");
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname);
    },
});

var upload = multer({
    storage : storage,
}).single("image");
//uplode image end

router.post("/add",upload,(req,res)=>{
    usersControllers.add(req,res);
});

router.get("/",(req,res)=>{
    usersControllers.fetch_all(req,res);
});

router.get("/add",(req,res)=>{
    res.render("add_users",{title:"add user"});
});


//--------------------------------
router.get("/edit/:id",upload,(req,res)=>{
    usersControllers.fetch_1(req,res);
});

router.post("/update",upload,(req,res)=>{
    usersControllers.update(req,res);
});

router.get("/delete/:id",(req,res)=>{
    usersControllers.delete(req,res);
});

router.get("/send_mail/:email",(req,res)=>{
    usersControllers.send_mail(req,res);
});



module.exports = router;