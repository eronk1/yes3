const userC = require('../dataBase/userLoginInfo');
const check = async function (username,password,confirmPassword){
    const user = `${username}`.length;
    const pass = `${password}`.length;
    const confirmPass = `${confirmPassword}`.length;
    if(password===confirmPassword&&3<=user&&user<=18&&6<=pass&&pass<=72){
    let run = async ()=>{
        let usercount = await userC.find({Username:username}).count()
        if(usercount>0){
            console.log('Username taken')
            return 1
        }else{
            console.log('Valid username and password')
            return 0//username and password is valid(permission to sign up)
        }
      }
    return await run()

    }else if(user==0){
        return 2//no username
    }else if(pass==0){
        return 3//no password
    }else if(confirmPass==0){
        return 4//no confirm password
    }else if(password!==confirmPassword){
        return 5//passwords do not match
    }else{
        return 6//something went wrongS
    }
}
//async function hi(){findUsers.then(value => console.log(value))}
//hi();


module.exports = check;