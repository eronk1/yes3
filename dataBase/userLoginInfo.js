const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    Username:'String',
    Password:'String'
})
const user = mongoose.model("userInfo",userSchema);
async function run(username,password){
    await user.create({Username: username, Password: password});
}
//exports database
module.exports = user;
//exports function that signs up the user
module.exports.createAccount = run;