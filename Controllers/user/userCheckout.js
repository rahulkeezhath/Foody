const { response } = require("express")
const userCartMgmt = require('../../Model/userCartMgmt')
const razorpayMgmt = require('../../Model/razorpay')
const userCouponMgmt = require('../../Model/userCoupon')
const userAddressMgmt = require('../../Model/userAddress')
const userAddress = require("../../Model/userAddress")

const userCheckout = async(req,res)=>{
  let userData = req.session.user
  let cartCount = null
  if(req.session.user){
  cartCount = await userCartMgmt.getCartCount(req.session.user._id)
  let totalAmount = await userCartMgmt.getTotalAmount(req.session.user._id)
  res.render('user/checkout',{admin:false,user:true,userData,cartCount,totalAmount})
  }
}

const placeOrder = async(req,res)=>{
  let userData = req.session.user
  let totalValue = req.query.finalTotal
  let cartCount = null
  if(req.session.user){
  cartCount = await userCartMgmt.getCartCount(req.session.user._id)
  let products=  await userCartMgmt.getCartProducts(req.session.user._id)
   let addressList = await userAddressMgmt.showAddress(req.session.user._id)
  // let totalAmount = await userCartMgmt.getTotalAmount(req.session.user._id)

  res.render('user/checkout',{admin:false,user:true,userData,cartCount,products,totalValue,addressList})
  }
}

const payment = async(req,res)=>{
  let products = await userCartMgmt.getCartProductList(req.body.userId)
  let totalPrice = await userCartMgmt.getTotalAmount(req.body.userId)
  userCartMgmt.placeOrder(req.body,products,totalPrice).then((orderId)=>{
    if(req.body['payment-method']==='COD'){
      res.json({codSuccess:true})
    }else{
      razorpayMgmt.generateRazorpay(orderId,totalPrice).then((response)=>{
        res.json(response)
      })
    }

  })
 }


 const verifyPayment = (req,res)=>{
  razorpayMgmt.verifyPayment(req.body).then(()=>{
    razorpayMgmt.changePaymentStatus(req.body.order.receipt).then(()=>{
      console.log("Payment Successfull");
      res.json({status:true})
    })
  }).catch((err)=>{
    console.log(err);
    res.json({status:false,errMsg:'Payment Failed'})
  })
 }


 const displayCheckoutPage = async(req,res)=>{
  let finalTotal = req.body.finalTotal
  let details = req.body
  if(details.couponCode===''){
    finalTotal = details.finalTotal +(5/100)*details.finalTotal
    res.json(finalTotal)
  }else{
    let couponDetails = await userCouponMgmt.getCouponDetails(details.couponCode)
    if(couponDetails){
      await userCouponMgmt.getDiscount(couponDetails,details.totalValue).then((response)=>{
        finalTotal = response.discountedTotal
        res.json(response.discountedTotal)
      })
    }else{
      finalTotal = details.totalValue + (5/100)*details.totalValue
      res.json(finalTotal)
    }
  }
  
 }

module.exports = {
  userCheckout,
  placeOrder,
  payment,
  verifyPayment,
  displayCheckoutPage
}
