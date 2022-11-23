 const userCartMgmt = require('../../Model/userCartMgmt')
 const userProfileMgmt = require('../../Model/userProfile')
 const userAddressMgmt = require('../../Model/userAddress')
const { response } = require('express')


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

const addressPage = async(req,res)=>{
    let userData = req.session.user
    let cartCount = null
    if(req.session.loggedIn){
        cartCount = await userCartMgmt.getCartCount(req.session.user._id)
    }
    let totalValue = req.query.finalTotal
    res.render('user/addressAdd',{admin:false,user:true,userData,cartCount,totalValue})
}


const addAddress = (req,res)=>{
    let userData = req.session.user._id
    userAddressMgmt.addAddress(req.body,userData).then((response)=>{
        res.redirect('/addressAddPage')
    })
}

module.exports = {
    profilePage,
    editProfile,
    updateProfile,
    addressPage,
    addAddress
}   