const { response } = require('express')
const userCouponMgmt = require('../../Model/userCoupon')
const userCartMgmt = require('../../Model/userCartMgmt')

const applyCoupon = async(req,res)=>{
    let userData = req.session.user
    let couponCode = req.body.couponCode
    totalValue = await userCartMgmt.getTotalAmount(req.session.user._id)
    let TOTAL = totalValue
    let couponDetails = await userCouponMgmt.getCouponDetails(couponCode)
    if(couponDetails && TOTAL>=2000 && TOTAL<=20000){
    await userCouponMgmt.getDiscount(couponDetails,TOTAL).then((response)=>{
        res.json(response)
    })
}else{
    
}
}

module.exports = {
    applyCoupon
}