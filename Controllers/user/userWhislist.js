const { response } = require("express")
const userWishlistMgmt = require('../../Model/userWishlistMgmt')


const userWishlist = async(req,res)=>{
    let userData = req.session.user
    let cartCount = null
    if(req.session.user){
        cartCount = await userWishlistMgmt.getWishlistCount(req.session.user._id)
    let products=  await userWishlistMgmt.getWishlistProducts(req.session.user._id)
    res.render('user/wishlist',{admin:false,user:true,userData,cartCount,products})
    }else{
    res.render('user/userLogin',{user:false,admin:false,userData})
    }
}
    
const addToWishlist = (req,res)=>{
    userWishlistMgmt.addToWishlist(req.params.id,req.session.user._id).then(()=>{
        res.json({status:true})
    })
}



module.exports = {
    userWishlist,
    addToWishlist
}