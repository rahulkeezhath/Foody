const userWishlist = (req,res)=>{
    let userData = req.session.user
    res.render('user/wishlist',{admin:false,user:true,userData})
}

module.exports = {
    userWishlist
}