const userCartMgmt = require('../../Model/userCartMgmt')


const userWishlist = async(req,res)=>{
    let userData = req.session.user
    let cartCount = null
    if(req.session.user){
    cartCount = await userCartMgmt.getCartCount(req.session.user._id)
    }
    res.render('user/wishlist',{admin:false,user:true,userData,cartCount})
}

module.exports = {
    userWishlist
}