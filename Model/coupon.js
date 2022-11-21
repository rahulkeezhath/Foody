const db = require('../config/connection')
const collection = require('../config/collection')
const { response } = require('express')

module.exports = {
    addCoupon:(data)=>{
        let discountAmount = parseInt(data.discountAmount)
        let discountPercentage = parseInt(data.discountPercentage)
        let couponCode = data.couponCode.toUpperCase()

        let couponData = {
            offerName: data.offerName,
            couponCode: couponCode,
            offerType: data.offerType,
            offerMethod: data.offerMethod,
            startDate: startDate,
            endDate: data.endDate,
            discountAmount: discountAmount ? discountAmount:0,
            discountPercentage: discountPercentage ? discountPercentage:0,
            minimumAmount: data.minimumAmount,
            totalUsage: data.totalUsage,
            status: "Pending",
            totalUsage: 0
        }
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.COUPON_COLLECTION).insertOne(couponData).then((response)=>{
                resolve(response)
            })
        })
    },
    
}