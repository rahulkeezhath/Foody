const { response } = require("express")
const userCartMgmt = require('../../Model/userCartMgmt')
const userOrderMgmt = require('../../Model/userOrder')

const orderSuccess = async(req,res)=>{
    let userData = req.session.user
    let cartCount = null
    if(req.session.user){
    cartCount = await userCartMgmt.getCartCount(req.session.user._id)
    }
        res.render('user/orderPlaced',{user:true,admin:false,userData,cartCount})
}

const orderProducts = async(req,res)=>{
    let userData = req.session.user
    let cartCount = null
    if(req.session.user){
    cartCount = await userCartMgmt.getCartCount(req.session.user._id)
    }
    let orders = await userOrderMgmt.getUserOrders(req.session.user._id)
    res.render('user/orderProduct',{user:true,admin:false,userData,cartCount,orders})
}

const viewOrderProducts = async(req,res)=>{ 
    let userData = req.session.user
    let cartCount = null
    if(req.session.user){
    cartCount = await userCartMgmt.getCartCount(req.session.user._id)
    }
    let orderItems = await userOrderMgmt.getOrderProducts(req.query.id)
    res.render('user/viewOrderProducts',{admin:false,user:true,userData,cartCount,orderItems})
}



module.exports = {
    orderSuccess,
    orderProducts,
    viewOrderProducts
}