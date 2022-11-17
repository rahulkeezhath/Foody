 const userCartMgmt = require('../../Model/userCartMgmt')
 const userProfileMgmt = require('../../Model/userProfile')


const profilePage = async(req,res)=>{
    let userData = req.session.user
    let cartCount = null
    if(req.session.loggedIn){
        cartCount = await userCartMgmt.getCartCount(req.session.user._id)
    }
    let userDetails = await userProfileMgmt.getUserDetails()
    res.render('user/userProfile',{admin:false,user:true,userData,cartCount,userDetails})
}

module.exports = {
    profilePage
}   