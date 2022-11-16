 const userCartMgmt = require('../../Model/userCartMgmt')

const profilePage = async(req,res)=>{
    let userData = req.session.user
    let cartCount = null
    if(req.session.loggedIn){
        let products=  await userCartMgmt.getCartProducts(req.session.user._id)
        cartCount = await userCartMgmt.getCartCount(req.session.user._id)
    res.render('user/userProfile',{admin:false,user:true,userData,cartCount,products})
}else{
    res.redirect('/')
}
}

module.exports = {
    profilePage
}   