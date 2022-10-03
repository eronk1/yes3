if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userC = require('./dataBase/userLoginInfo');

const signUp = require('./action/signUp');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./passport-task/passport-config');
mongoose.connect(process.env.MONGOOSE_KEY,()=>(console.log('connected')));//connecting to mongoose DB
app.set('view engine','ejs');
app.set('views','views');//sets views to views folder

app.use(express.urlencoded({extended: false}));
initializePassport(
    passport, 
    async username=>{
        //console.log(await userC.find({Username:username})+"DJFKJFDKDKDKDKKDK");
        return await userC.find({Username:username})
    },//await function
    async ID => await userC.find({id:ObjectId(ID)})//mongoose _id search up how to access mongoose Id
);
app.use(flash());
app.use(session({
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/',(req,res)=>{res.render('starterPage/starter')});//starting page
app.get('/home',(req,res)=>{res.render()})
app.get('/signUp',(req,res)=>{res.render('signUpPage/signUp')});//sends user to sign up page
app.post('/signUp',(req,res)=>signUp(req,res));//POST request to sign up
app.get('/login',(req,res)=>{res.render('loginPage/login')});
app.post('/login',passport.authenticate('local',{
    successRedirect: '/home',
    failureRedirect:'/login',
    failureFlash: true
}))
app.get('/IntegratedI',(req,res)=>{res.render('integrated1page/integrated1')});//Math 1 page
app.listen(process.env.PORT,()=>{console.log("Listening on port 3000")});//listening on PORT