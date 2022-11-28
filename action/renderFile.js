const starterPage = (req,res)=>{res.render('starterPage/starter')};
const homePage = (req,res)=>{res.render('homePage/home',{name: req.user[0].Username})};
const signUp = (req,res)=>{res.render('signUpPage/signUp')};
const login = (req,res)=>{res.render('loginPage/login')};
const integrated1 = (req,res)=>{res.render('integrated1Views/integrated1')};
const integrated1Variables = (req,res)=>{res.render('integrated1Views/variables')};

module.exports.starterPage = starterPage;
module.exports.homePage = homePage;
module.exports.signUp = signUp;
module.exports.login = login;
module.exports.integrated1 = integrated1;
module.exports.integrated1Variables = integrated1Variables;