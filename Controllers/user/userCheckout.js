const { response } = require("express")
const userCartMgmt = require('../../Model/userCartMgmt')
const razorpayMgmt = require('../../Model/razorpay')
const userCouponMgmt = require('../../Model/userCoupon')
const userAddressMgmt = require('../../Model/userAddress')


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
  let totalValue = Math.round(req.query.finalTotal)
  let cartCount = null
  if(req.session.user){
  cartCount = await userCartMgmt.getCartCount(req.session.user._id)
  let products=  await userCartMgmt.getCartProducts(req.session.user._id)
     await userAddressMgmt.showAddress(req.session.user._id).then((addressList)=>{
    let address = addressList ? addressList.address : "";
    res.render('user/checkout',{admin:false,user:true,userData,cartCount,products,totalValue,addressList,address})
   })
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
  let finalTotal = Math.round(req.body.totalValue)
  let details = req.body
  details.finalTotal = parseInt(details.totalValue)
  if(details.couponCode===''){
    let shippingCharge = (5/100)*details.totalValue
    finalTotal = parseInt(details.totalValue) +shippingCharge
    res.json(finalTotal)
  }else{
    let couponDetails = await userCouponMgmt.getCouponDetails(details.couponCode)
    if(couponDetails){
      await userCouponMgmt.getDiscount(couponDetails,details.totalValue).then((response)=>{
        finalTotal = response.discountedTotal
        finalTotal = Math.round(finalTotal)
        res.json(finalTotal)
      })
    }else{
      let shippingCharge =  (5/100)*details.totalValue
      finalTotal = details.totalValue + shippingCharge
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
