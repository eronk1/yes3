if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const flash = require('express-flash');
const passport = require('passport');
const userC = require('./dataBase/userLoginInfo');



const signUp = require('./action/signUp');
const initializePassport = require('./passport-task/passport-config');
const checkAuth = require('./passport-task/checkAuthentication');//middleware for redirection depending on auth status
const checkNotAuth = checkAuth.notAuth;
const renderFile = require('./action/renderFile');
const LogOut = require('./action/logout');

mongoose.connect(process.env.MONGOOSE_KEY,()=>(console.log('connected')));//connecting to mongoose DB
app.set('view engine','ejs');
app.set('views','views');//sets views to views folder

app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(initializePassport.checkSession);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

app.get('/',checkNotAuth,renderFile.starterPage);//starting page
app.get('/home',checkAuth,renderFile.homePage)//home page after login
app.get('/signUp',checkNotAuth,renderFile.signUp);//sends user to sign up page
app.get('/login',checkNotAuth,renderFile.login);//login page

app.get('/sat/practice',checkAuth,renderFile.sat);//Math 1 page
app.get('/sat/practice/lawsOfExponents',checkAuth,renderFile.satLawsOfExponents);

app.post('/signUp',checkNotAuth,(req,res)=>{signUp(req,res)});//POST request to sign up
app.post('/login',checkNotAuth,initializePassport.authenticateRedirect);//passport.authenticate failure/success redirect
app.post('/logout',checkAuth, function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

app.listen(process.env.PORT,()=>{console.log(`Listening on port ${process.env.PORT}`)});//listening on PORT