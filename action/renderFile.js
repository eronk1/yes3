const findUsername = require('./signUp').findUsername;

const starterPage = (req,res)=>{res.render('starterPage/starter')};
const homePage = (req,res)=>{res.render('homePage/home',{name: req.user[0].Username,Level:req.user[0].Level,xp:req.user[0].xp,Points:req.user[0].Points})};

const signUp = (req,res)=>{
    findUsername.then(value => res.render('signUpPage/signUp',{status:true,problem:0, message:"Something went wrong",Username: value}))
};
const login = (req,res)=>{res.render('loginPage/login',{message:req.flash('error')})};
const integrated1 = (req,res)=>{res.render('integrated1Views/integrated1')};
const integrated1Variables = (req,res)=>{res.render('integrated1Views/variables')};

module.exports.starterPage = starterPage;
module.exports.homePage = homePage;
module.exports.signUp = signUp;
module.exports.login = login;
module.exports.integrated1 = integrated1;
module.exports.integrated1Variables = integrated1Variables;