const { response } = require("express")
const userCartMgmt = require('../../Model/userCartMgmt')
const razorpayMgmt = require('../../Model/razorpay')

const userCheckout = (req,res)=>{
  let userData = req.session.user
  res.render('user/checkout',{admin:false,user:true,userData})
}

const placeOrder = async(req,res)=>{
  let userData = req.session.user
  let cartCount = null
  if(req.session.user){
  cartCount = await userCartMgmt.getCartCount(req.session.user._id)
  let products=  await userCartMgmt.getCartProducts(req.session.user._id)
  let totalAmount = await userCartMgmt.getTotalAmount(req.session.user._id)
  res.render('user/checkout',{admin:false,user:true,userData,cartCount,products,totalAmount})
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
 console.log(req.body);
 }


 const verifyPayment = (req,res)=>{
  console.log(req.body);
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

module.exports = {
  userCheckout,
  placeOrder,
  payment,
  verifyPayment
}
