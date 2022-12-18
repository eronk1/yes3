const userC = require('../dataBase/userLoginInfo');
const check = require('../check/signUpCheck');
const bcrypt = require('bcrypt');
const { find } = require('../dataBase/userLoginInfo');

const run = async (req,res)=>{
    let user = req.body.username;
    let pass = req.body.password;
    let confirmPass = req.body.confirmPassword;
    let checked = await check(user,pass,confirmPass);
    if(checked===0){
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(pass,salt);
        userC.createAccount(user,hashedPassword);
        res.render('loginPage/login')
    }else{
        let returnStatement = {};
        switch(checked){
            case 1:
            returnStatement = {status:false,problem:1, message:"Username Taken"};
            break;
            case 2:
            returnStatement = {status:false,problem:1,message:"Please input Username"};
            break;
            case 3:
            returnStatement = {status:false,problem:2,message:"Please input Password"};
            break;
            case 4:
            returnStatement = {status:false,problem:3,message:"Please confirm your password"};
            break;
            case 5:
            returnStatement = {status:false,problem:3,message:"Passwords do not match"};
            break;
            case 6:
            returnStatement = {status:false,problem:4,message:"Something went wrong"};
            break;
        }
        let finalReturn = findUsername().then(val => {
            returnStatement['Username'] = val;
            return returnStatement;
        })
        
        res.render('signUpPage/signUp',await finalReturn)
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