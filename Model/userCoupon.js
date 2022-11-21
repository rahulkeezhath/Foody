const db = require('../config/connection')
const collection = require('../config/collection')
const { response } = require('express')

module.exports = {
  getCouponDetails:(couponCode) =>{
    return new Promise(async(resolve,reject)=>{
        let couponDetails = await db.get().collection(collection.COUPON_COLLECTION).findOne({couponCode: couponCode})
        resolve(couponDetails)
    })
  },
  getDiscount:(couponDetails,total)=>{
    return new Promise(async(resolve,reject)=>{
        if(couponDetails){
            let discount = couponDetails.discount
            let todayDate = new Date()
            let endDate = Date.parse(couponDetails.endDate)
            let discountedTotal
            todayDate = todayDate.toLocaleDateString("en-US")
            todayDate = Date.parse(todayDate)
            if(todayDate<=endDate){
                discountedTotal = total - (discount/100)*total + (5/100)*total
                response.discountedTotal = discountedTotal
                response.couponStatus = true
                response.discount = discount
                resolve(response)
            }else{
                response.couponStatus = false
                response.discountedTotal = total + (5/100)*total
                response.discount = 0
                resolve(response)
            }
        }else{
            response.couponStatus = false
            response.discountedTotal = total + (5/100)*total
            response.discount = 0
            resolve(response)
        }
    })
  }
    
}