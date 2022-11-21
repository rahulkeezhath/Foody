const { response } = require('express')
const { ObjectId } = require('mongodb')
const collection = require('../config/collection')
const db = require('../config/connection')
const { use } = require('../routes/user')

module.exports = {
    addToCart:(productId,userId)=>{
        let proObj = {
            item:ObjectId(productId),
            quantity:1
        }
            return new Promise(async(resolve,reject)=>{
                let userCart = await db.get().collection(collection.ADD_CART).findOne({user:ObjectId(userId)})
                if(userCart){
                    let proExist = userCart.products.findIndex(product => product.item==productId)

                    if(proExist!=-1){
                        db.get().collection(collection.ADD_CART).updateOne({user:ObjectId(userId),'products.item':ObjectId(productId)},
                        {
                            $inc :{'products.$.quantity':1}
                        }
                        ).then(()=>{
                            resolve()
                        })
                    }else{
                    db.get().collection(collection.ADD_CART).updateOne({user:ObjectId(userId)},
                    {
                        $push:{products:proObj}
                    }
                    ).then((response)=>{
                        resolve()
                    })
                }
                }else{
                    let cartObj={
                        user:ObjectId(userId),
                        products:[proObj]
                    }
                    db.get().collection(collection.ADD_CART).insertOne(cartObj).then((response)=>{
                        resolve()
                    })
                }
            })
    },
    getCartProducts:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let cartItems =  await db.get().collection(collection.ADD_CART).aggregate([
                {
                    $match:{user:ObjectId(userId)}
                },
                {
                    $unwind: '$products'
                },
                {
                    $project:{
                        item:'$products.item',
                        quantity:'$products.quantity'
                    }
                },
                {
                    $lookup:{
                        from: collection.ADD_PRODUCT,
                        localField: 'item',
                        foreignField: '_id',
                        as: 'products'
                    }
                },
                {
                    $project:{
                        item:1,quantity:1,products:{$arrayElemAt:['$products',0]} 
                    }
                }
            ]).toArray()
            resolve(cartItems)
        })
    },
    getCartCount:(userId)=>{ 
        return new Promise(async(resolve,reject)=>{
            let count =0
            const cart = await db.get().collection(collection.ADD_CART).findOne({user:ObjectId(userId)})
            if(cart){
                count = cart.products.length
            }
            resolve(count)
        })
    },
    changeQuantity:(details)=>{
        console.log(details);
        details.count = parseInt(details.count)
        details.quantity = parseInt(details.quantity)

        return new Promise((resolve,reject)=>{
            if(details.count==-1 && details.quantity==1){
                db.get().collection(collection.ADD_CART).updateOne({_id:ObjectId(details.cart)},
                {
                    $pull:{products:{item:ObjectId(details.product)}}
                }
                ).then((response)=>{
                    resolve({removeProduct:true})
                })
            }else{  
            db.get().collection(collection.ADD_CART).updateOne({_id:ObjectId(details.cart),'products.item':ObjectId(details.product)},
            {
                $inc :{'products.$.quantity':details.count}
            }
            ).then((response)=>{
                resolve({status:true})
            })
        }
    })
},
    getTotalAmount:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let userCart = await db.get().collection(collection.ADD_CART).findOne({user:ObjectId(userId)})
            if(userCart.products.length >0){
            let totalAmount =  await db.get().collection(collection.ADD_CART).aggregate([
                {
                    $match:{user:ObjectId(userId)}
                },
                {
                    $unwind: "$products"
                },
                {
                    $project:{
                        item:'$products.item',
                        quantity:'$products.quantity'
                    }
                },
                {
                    $lookup:{
                        from: collection.ADD_PRODUCT,
                        localField: 'item',
                        foreignField: "_id",
                        as: "products"
                    }
                },
                {
                    $project:{
                        item:1,quantity:1,products:{$arrayElemAt:['$products',0]} 
                    }
                },
                {
                    $group:{ 
                        _id:"",
                        total:{
                            $sum:{
                                $multiply:[
                                    "$quantity","$products.sellingPrice"
                                ]
                            }
                        }
                    }
                }

            ]).toArray()
            response.totalAmount = totalAmount[0].total
            resolve(response.totalAmount)
        }else{
            response.totalAmount = 0
            resolve(response.totalAmount)
        }
        })
    },  
    TotalPrice:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let userCart = await db.get().collection(collection.ADD_CART).findOne({user:ObjectId(userId)})
            if(userCart.products.length >0){
            const TotalPrice = await db.get().collection(collection.ADD_CART).aggregate([
                {
                    $match:{user:ObjectId(userId)}
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
                        from: collection.ADD_PRODUCT,
                        localField: 'item',
                        foreignField: "_id",
                        as: "products"
                    }
                },
                {
                    $project:{
                        item:1,quantity:1,products:{$arrayElemAt:['$products',0]} 
                    }
                },
                {
                    $project:{ 
                        _id:"",
                        total:{
                            $sum:{
                                $multiply:[
                                    "$quantity","$products.sellingPrice"
                                ]
                            }
                        }
                    }
                }

            ]).toArray()
            response.TotalPrice = TotalPrice[0].total
            resolve(response.TotalPrice)
        }else{
            response.TotalPrice = 0
            resolve(response.TotalPrice)
        }
        })
    },
    placeOrder:(order,products,total)=>{
        return new Promise((resolve,reject)=>{
            console.log(order,products,total);
            let status = order['payment-method']==='COD'?'placed':'pending'
            let orderObj={
                deliveryDetails:{
                    name:order.name,
                    address:order.address,
                    country:order.country,
                    state:order.state,
                    pincode:order.pincode,
                    mobile:order.mobile
                },
                userId:ObjectId(order.userId),
                paymentMethod:order['payment-method'],
                products:products,
                totalAmount:total,
                status:status,
                date:new Date()
            }

            db.get().collection(collection.ORDER_COLLECTION).insertOne(orderObj).then((response)=>{
                db.get().collection(collection.ADD_CART).deleteOne({user:ObjectId(order.userId)})
                resolve(response.insertedId)
            })
        })

    },
    getCartProductList:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let cart = await db.get().collection(collection.ADD_CART).findOne({user:ObjectId(userId)})
            resolve(cart.products)
        })
    },
    deleteCartProduct:(item,userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.ADD_CART)
            .updateOne({user:ObjectId(userId)},
            {$pull:{products:{item:ObjectId(item)}}}
            ).then((response)=>{
                resolve(response)
            })
        })
            }
}   
