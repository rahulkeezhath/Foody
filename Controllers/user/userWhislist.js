const { response } = require("express")
const userCartMgmt = require('../../Model/userCartMgmt')
const userWishlistMgmt = require('../../Model/userWishlistMgmt')


const userWishlist = async(req,res)=>{
    let userData = req.session.user
    let cartCount = null
    let wishlistCount = null
    if(req.session.user){
        cartCount = await userCartMgmt.getCartCount(req.session.user._id)
        wishlistCount= await userWishlistMgmt.getWishlistCount(req.session.user._id)
    let products=  await userWishlistMgmt.getWishlistProducts(req.session.user._id)
    res.render('user/wishlist',{admin:false,user:true,userData,cartCount,wishlistCount,products})
    }else{
    res.render('user/userLogin',{user:false,admin:false,userData})
    }
}
    
const addToWishlist = (req,res)=>{
    userWishlistMgmt.addToWishlist(req.params.id,req.session.user._id).then(()=>{
        res.json({status:true})
    })
}

const deleteWishlistProduct = (req,res)=>{
    let userData = req.session.user._id
    let productId = req.query.id
    userWishlistMgmt.deleteWishlistProduct(userData,productId).then((response)=>{
        res.redirect('/wishlist')
    })
}

module.exports = {
    userWishlist,
    addToWishlist,
    deleteWishlistProduct
}