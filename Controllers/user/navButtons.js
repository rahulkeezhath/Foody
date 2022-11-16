const userCartMgmt = require('../../Model/userCartMgmt')

const aboutPage = async(req,res)=>{
    let userData = req.session.user
    let cartCount = null
    if(req.session.user){
    cartCount = await userCartMgmt.getCartCount(req.session.user._id)
    res.render('user/about',{admin:false,user:true,userData,cartCount})
    }
}

const contactPage = async(req,res)=>{
    let userData = req.session.user
    let cartCount = null
    if(req.session.user){
    cartCount = await userCartMgmt.getCartCount(req.session.user._id)
    res.render('user/contact',{admin:false,user:true,userData,cartCount})
    }
}




module.exports = {
    aboutPage,
    contactPage
}