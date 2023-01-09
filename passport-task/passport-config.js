const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {ObjectId} = require('mongodb');
const passport = require('passport');
const userC = require('../dataBase/userLoginInfo');
const session = require('express-session');

function initializePassport(passport,getUserByUsername,getUserById){
    const authenticateUser = async (username,password,done)=>{
        const user = await getUserByUsername(username)
        if(user[0]==null){
            return done(null,false,{message:"Username or Password Incorrect"})
        }
        try{
            if(await bcrypt.compare(password,user[0].Password)){
                return done(null,user)
            }else{
                console.log(user[0])
                return done(null,false,{message: 'Username or Password Incorrect'})
            }
        }catch(e){
            console.log("errored")
            return done(null,false,{message: 'Something went wrong'})
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