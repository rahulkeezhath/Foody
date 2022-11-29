const db = require('../config/connection')
const collection = require("../config/collection")

module.exports = {
    userCount:()=>{
        return new Promise(async(resolve,reject)=>{
            let userCount = await db.get().collection(collection.USER_CREDENTIALS).find().count()
            resolve(userCount)
        })
    },
    categoryCount:()=>{
        return new Promise(async(resolve,reject)=>{
            let categoryCount = await db.get().collection(collection.ADD_CATEGORY).find().count()
            resolve(categoryCount)
        })
    },
    productCount:()=>{
        return new Promise(async(resolve,reject)=>{
            let productCount = await db.get().collection(collection.ADD_PRODUCT).find().count()
            resolve(productCount)
        })
    },
    brandCount:()=>{
        return new Promise(async(resolve,reject)=>{
            let brandCount = await db.get().collection(collection.ADD_BRAND).find().count()
            resolve(brandCount)
        })
    },
    orderCount:()=>{
        return new Promise(async(resolve,reject)=>{
            let orderCount = await db.get().collection(collection.ORDER_COLLECTION).find().count()
            resolve(orderCount)
        })
    },
    orderedCount:()=>{
        return new Promise(async(resolve,reject)=>{
            let orderedCount = await db.get().collection(collection.ORDER_COLLECTION).find({status:'ordered'}).count()
            resolve(orderedCount)
        })
    },
    placedCount:()=>{
        return new Promise(async(resolve,reject)=>{
            let placedCount = await db.get().collection(collection.ORDER_COLLECTION).find({status:'placed'}).count()
            resolve(placedCount)
        })
    },
    deliveredCount:()=>{
        return new Promise(async(resolve,reject)=>{
            let deliveredCount = await db.get().collection(collection.ORDER_COLLECTION).find({status:'Delivered'}).count()
            resolve(deliveredCount)
        })
    },
    shippedCount:()=>{
        return new Promise(async(resolve,reject)=>{
            let shippedCount = await db.get().collection(collection.ORDER_COLLECTION).find({status:'Shipped'}).count()
            resolve(shippedCount)
        })
    }
}