const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    Username:'String',
    Password:'String',
    Level: Number,
    Points: Number,
    xp: Number

})
const user = mongoose.model("userInfo",userSchema);
async function run(username,password){
    console.log({Username: username, Password: password,Level:0,Points:0,xp:0})
    await user.create({Username: username, Password: password,Level:0,Points:0,xp:0});
}
//exports database
module.exports = user;
//exports function that signs up the user
module.exports.createAccount = run;