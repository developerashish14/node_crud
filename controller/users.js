
const User = require("../model/users");
const fs = require("fs");
const nodemailer = require("nodemailer");
const users = {};
users.fetch_all = async (req,res)=>{
    const result =User.find().then((data, docs)=>{
        res.render("index", {
                         user_data: data,
                         message: req.flash('message')
                     });
                     console.log(docs);
    },
    (e)=>{
        req.flash('message',e);
    }
    )

}


users.add = async (req,res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename,
    });
     const result = user.save().then(()=>{
        req.flash('message','User added successfully');
        res.redirect("/");
    },
    (e)=>{
        
        req.flash('message',e);
    }
    )
}


users.fetch_1 = async (req,res)=>{
    //User.find()
    let id = req.params.id;
    //console.log(id);
   
    const result =User.findById(id).then((data, docs)=>{
        res.render("edit_users", {
                         user: data,
                         message: req.flash('message')
                     });
                     console.log(docs);
    },
    (e)=>{
        req.flash('message',e);
    }
    )

}

users.update = async (req,res)=>{
    let id = req.body.edt_id;
    let new_image = "";
    if(req.file){
        new_image = req.file.filename;
        try{
            fs.unlinkSync("./uploads/"+req.body.old_image);
        }catch(err){
            console.log(err);
        }
    }else{
        new_image = req.body.old_image;
    }
    let data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: new_image,
    };
    const result =User.findByIdAndUpdate(id,data).then(()=>{
        res.redirect('/');
    },
    (e)=>{
        req.flash('message',e);
    }
    )
}


users.delete = async (req,res)=>{
    let id = req.params.id;
    const result =User.findByIdAndRemove(id).then((results,error)=>{
        try{
            fs.unlinkSync("./uploads/"+results.image);
        }catch(err){
            console.log(err);
        }
        res.redirect('/');
    },
    (e)=>{
        req.flash('message',e);
    }
    )
}


users.send_mail = async (req,res)=>{
    let id = req.params.email;
    let transporter = nodemailer.createTransport({
        host:"smtp.ethereal.email",
        port:587,
        secure:false, //true for 465 false for other ports
        auth :{
            user:"as637757@gmail.com",
            pass:"as.31234",
        },
    });

    let info = await transporter.sendMail({
        from : 'developer.ashish14@gmail.com',
        to: "developer.ashish14@gmail.com",
        subject :"hello",
        text : "hello word",
        html : "<b>helo world</b>",
    });

    console.log("message" ,info.messageId);
    console.log("preview ",nodemailer.getTestMessageUrl(info));
}
module.exports = users;