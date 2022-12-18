const userC = require('../dataBase/userLoginInfo');
const check = require('../check/signUpCheck');
const bcrypt = require('bcrypt');

const run = async (req,res)=>{
    let user = req.body.username;
    let pass = req.body.password;
    let confirmPass = req.body.confirmPassword;
    if(await check(user,pass,confirmPass)===0){
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(pass,salt);
        userC.createAccount(user,hashedPassword);
        res.render('loginPage/login',await check(user,pass,confirmPass))
    }else{
        console.log('username or password is not valid');
        res.render('signUpPage/signUp',await check(user,pass,confirmPass))
    }
}

function findUsername() {
    const allUser = [];
    return new Promise((resolve, reject) => {
        userC.find(function(err, result) {
            if (err) throw err;
            for(let user of result){
                allUser.push(user.Username);
            }
            resolve(allUser);
        })
    })
    }
module.exports = run
module.exports.findUsername = findUsername();