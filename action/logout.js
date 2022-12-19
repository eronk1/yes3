const logout = (req,res)=>{
    req.logOut();
    res.redirect('/');
}

module.exports = logout;