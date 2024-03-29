const findUsername = require('./signUp').findUsername;

const starterPage = (req,res)=>{res.render('starterPage/starter')};
const homePage = (req,res)=>{res.render('homePage/home',{name: req.user[0].Username,Level:req.user[0].Level,xp:req.user[0].xp,Points:req.user[0].Points})};

const signUp = (req,res)=>{
    findUsername.then(value => res.render('signUpPage/signUp',{status:true,problem:0, message:"Something went wrong",Username: value}))
};
const login = (req,res)=>{res.render('loginPage/login',{message:req.flash('error')})};
const sat = (req,res)=>{res.render('satViews/sat')};
const satLawsOfExponents = (req,res)=>{res.render('satViews/satQuizzes/lawsOfExponents')};

module.exports.starterPage = starterPage;
module.exports.homePage = homePage;
module.exports.signUp = signUp;
module.exports.login = login;
module.exports.sat = sat;
module.exports.satLawsOfExponents = satLawsOfExponents;