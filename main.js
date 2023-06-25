require('dotenv').config();
const express = require('express');
const mongoose  = require('mongoose');
const session = require('express-session'); //session
var flash = require('connect-flash');  // flase message
const cron = require('node-cron');
const app = express();


cron.schedule('* * * * *',() =>{
    console.log('running a task every minte');
});

app.use(session({
    secret:'secret',
    cookie:{maxAge:60000},
    resave: false,
    saveUninitialized:false
}));
app.use(flash());

app.use("",require("./routes/routes"));
const PORT = process.env.PORT || 4000;


//database connection
mongoose.set('strictQuery',false)
mongoose.connect(process.env.DB_URI)
.then(() => console.log('Connected'));
mongoose.pluralize(null);



app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(
    session({
        secret:"my secret key",
        cookie:{ maxAge:60000 },
        saveUninitialized:true,
        resave:false,
    })
);

app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})


app.use(express.static('uploads')); //  show image view page
app.set("view engine","ejs");


app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`);
}); 