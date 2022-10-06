const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {ObjectId} = require('mongodb');
const passport = require('passport');
const userC = require('../dataBase/userLoginInfo');
const session = require('express-session');

function initializePassport(passport,getUserByUsername,getUserById){
    const authenticateUser = async (username,password,done)=>{
        const user = await getUserByUsername(username)
        if(user==null){
            return done(null,false,{message:"Username not found"})
        }

        try{
            if(await bcrypt.compare(password,user[0].Password)){
                return done(null,user)
            }else{
                return done(null,false,{message: 'Password incorrect'})
            }
        }catch(e){
            return done(e)
        }
    }

    passport.use(new LocalStrategy({usernameField: 'username'},authenticateUser))
    passport.serializeUser((user,done)=>{
        return done(null,user[0].id)
    })
    passport.deserializeUser(async(id,done)=>{
        return done(null,await getUserById(id))
    })
}
initializePassport(
    passport, 
    async username=>{
        return await userC.find({Username:username})
    },
    async ID => {
        let Id = new ObjectId(ID);
        return await userC.find({_id:Id})
    }
);
const authenticateRedirect = passport.authenticate('local',{
    successRedirect: '/home',
    failureRedirect:'/login',
    failureFlash: true
})

const checkSession = session({
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false
})


module.exports = initializePassport;
module.exports.authenticateRedirect = authenticateRedirect;
module.exports.checkSession = checkSession