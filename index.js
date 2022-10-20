const express = require('express');
const app = express();
app.set("view engine","ejs")
app.use( express.static( "public" ) );
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
const mongoose = require('mongoose');
const userModel = require('./models/userModel');
const { register, deleteUser, details } = require('./controllers/usersController');
const { checkUser } = require('./middlewares/userMiddleware');


// Setting up mongoose connection
mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Portal'
}) .then((res)=>{
    console.log('Mongoose connected successfully');
}) .catch (err=>{
    console.log(err);
})


// let userDetails = [];


app.listen(4200,()=>{
    console.log("Port connection succesful");
})

app.get("/",(req,res)=>{
    res.render("pages/home")
})

app.get("/details", details)

app.get("/register",(req,res)=>{
    res.render("pages/register", {message:'',status:''})
})

app.post("/details", register);

app.post("/delete", deleteUser);

app.get("/testmiddle", checkUser)