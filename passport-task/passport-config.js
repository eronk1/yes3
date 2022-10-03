const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initializePassport(passport,getUserByUsername,getUserById){
    const authenticateUser = async (username,password,done)=>{
        console.log(username)
        const user = await getUserByUsername(username)
        if(user==null){
            return done(null,false,{message:"Username not found"})
        }

        try{
            console.log(await password+' comparing pass '+await user[0].Password)
            if(await bcrypt.compare(password,user[0].Password)){
                console.log('compared pass')
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
        console.log(await getUserById(id))
        return done(null,await getUserById(id))
    })
}
module.exports = initializePassport;