const userC = require('../dataBase/userLoginInfo');

const check = async function (username,password,confirmPassword){
    const user = `${username}`.length;
    const pass = `${password}`.length;
    const confirmPass = `${confirmPassword}`.length;
    console.log('check1')
    if(password===confirmPassword&&3<=user&&user<=18&&6<=pass&&pass<=72){
    let run = async ()=>{
        let usercount = await userC.find({Username:username}).count()
        if(usercount>0){
            console.log('Username taken')
            return {status:false,problem:1, message:"Username Taken"}
        }else{
            console.log('Valid username and password')
            return {status:true}//username and password is valid(permission to sign up)
        }
      }
    return await run()

    }else if(user==0){
        return {status:false,problem:1,message:"Please input Username"}//no username
    }else if(pass==0){
        return {status:false,problem:2,message:"Please input Password"}//no password
    }else if(confirmPass==0){
        return {status:false,problem:3,message:"Please confirm your password"}//no confirm password
    }else if(password!==confirmPassword){
        return {status:false,problem:3,message:"Passwords do not match"}//passwords do not match
    }else{
        return {status:false,problem:4,message:"Something went wrong"}//something went wrong
    }
}


module.exports = check;