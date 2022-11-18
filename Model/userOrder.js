const db = require('../config/connection')
const collection = require('../config/collection');
const { ObjectId } = require('mongodb');

module.exports = {
    getUserOrders:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            console.log(userId)
            let orders = await db.get().collection(collection.ORDER_COLLECTION).find({userId:ObjectId(userId)}).toArray()
            resolve(orders)
        })
    },
    getOrderProducts:(orderId)=>{
        return new Promise(async(resolve,reject)=>{
            let orderItems = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $match:{_id:ObjectId(orderId)}
                },
                {
                    $unwind:'$products'
                },
                {
                    $project:{
                        item:'$products.item',
                        quantity:'$products.quantity'
                    }
                },
                {
                    $lookup:{
                        from:collection.ADD_PRODUCT,
                        localField:'item',
                        foreignField:'_id',
                        as:'products'
                    }
                },
                {
                    $project:{
                        item:1,quantity:1,products:{$arrayElemAt:['$products',0]} 
                    }
                }
            ]).toArray()
            resolve(orderItems)
            console.log(orderItems);
        })
    }    
}