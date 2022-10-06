const express = require('express');
const app = express();
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
    }else{
        console.log('username or password is not valid');
        // res.render('signUpPage/signUp',{message:check(user,pass,confirmPass).message})
    }
}

module.exports = run