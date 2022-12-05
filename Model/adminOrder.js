const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectId } = require('mongodb')
const { response } = require('express')

module.exports={
    showOrders:()=>{
        return new Promise(async(resolve,reject)=>{
            let orderItems = await db.get().collection(collection.ORDER_COLLECTION).find().sort({date:-1}).toArray()


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
                            _id:{status:'status'},
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
    },
    updateOrderStatus:(data)=>{
        return new Promise((resolve,reject)=>{
            let orderId = data.id
            let status = data.status
            db.get().collection(collection.ORDER_COLLECTION).updateOne({_id:ObjectId(orderId)},
            {
                $set:{
                    status:status
                }
            }
            ).then((response)=>{
                resolve(response)
            })
        })
    }
} 