const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectId } = require('mongodb')

module.exports={
    showOrders:()=>{
        return new Promise(async(resolve,reject)=>{
            let orderItems = await db.get().collection(collection.ORDER_COLLECTION).find().toArray()


            if(orderItems.length>0){
                let user = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                    {
                        $lookup:{
                            from:collection.USER_CREDENTIALS,
                            localField:'Name',
                            foreignField:"_id",
                            as:"userDetails"
                        }
                    }
                ]).toArray()
                resolve(user)
            }else{
                resolve({ordersEmpty:true})
            }
        })
    },
    showAllOrderedProducts:(productId)=>{
        return new Promise(async(resolve,reject)=>{
            let orderProducts = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $match:{_id:ObjectId(productId)}
                },
                {
                    $lookup:{
                        from:collection.USER_CREDENTIALS,
                        localField:"Name",
                        foreignField:"_id",
                        as:"userDetails"
                    }
                },
                {
                    $unwind:"$deliveryDetails.products"
                }
            ]).toArray()
            resolve(orderProducts)
        })
    },
    CheckStatusOrders:()=>{
        return new Promise(async(resolve,reject)=>{
            let orderStatus = await db.get().collection(collection.ORDER_COLLECTION).find({status:'Placed'}).toArray()
            let orderPlacedLength = orderStatus.length
            resolve(orderPlacedLength)
        })
    },
    showOrderStatus:()=>{
            return new Promise(async(resolve,reject)=>{
                let status = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                    {
                        $group:{
                            _id:{status:'$status'},
                            count:{$count:{}}
                        }
                    },
                    {
                        $project:{
                            '_id.status':1,
                            count:1
                        }
                    }
                ]).toArray()
                resolve(status)
            })
    }
} 