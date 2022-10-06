function checkAuth(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}
function checkNotAuth(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/home')
    }
    next()
}
module.exports = checkAuth
module.exports.notAuth = checkNotAuth