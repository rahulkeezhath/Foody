 const userCartMgmt = require('../../Model/userCartMgmt')
 const userProfileMgmt = require('../../Model/userProfile')


const profilePage = async(req,res)=>{
    let userData = req.session.user
    let cartCount = null
    if(req.session.loggedIn){
        cartCount = await userCartMgmt.getCartCount(req.session.user._id)
    }
    let userDetails = await userProfileMgmt.getUserDetails(userData._id)
    res.render('user/userProfile',{admin:false,user:true,userData,cartCount,userDetails})
}


const editProfile = async(req,res)=>{
    let userData = req.session.user
    let cartCount = null
    if(req.session.loggedIn){
        cartCount = await userCartMgmt.getCartCount(req.session.user._id)
    }
    let userDetails = await userProfileMgmt.getUserDetails(userData._id)
    res.render('user/editProfile',{admin:false,user:true,userData,cartCount,userDetails})
}

const updateProfile = async(req,res)=>{
    let cartCount = null
    if(req.session.loggedIn){
        cartCount = await userCartMgmt.getCartCount(req.session.user._id)
    }
    userProfileMgmt.updateProfile(req.session.user,req.body).then(async()=>{
        let userData = req.session.user
        let userDetails = await userProfileMgmt.getUserDetails(userData._id)
        res.render('user/userProfile',{admin:false,user:true,cartCount,userDetails,userData})
    })
}

module.exports = {
    profilePage,
    editProfile,
    updateProfile
}   