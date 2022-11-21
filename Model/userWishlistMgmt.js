const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectId } = require('mongodb')
const { response } = require('express')

module.exports={
    addToWishlist:(productId,userId)=>{
        let proObj = {
            item:ObjectId(productId),
            quantity:1
        }
            return new Promise(async(resolve,reject)=>{
                let userWishlist = await db.get().collection(collection.ADD_WISHLIST).findOne({user:ObjectId(userId)})
                if(userWishlist){
                    let proExist = userWishlist.products.findIndex(product => product.item==productId)

                    if(proExist!=-1){
                        db.get().collection(collection.ADD_WISHLIST).updateOne({user:ObjectId(userId),'products.item':ObjectId(productId)},
                        {
                            $inc :{'products.$.quantity':1}
                        }
                        ).then(()=>{
                            resolve()
                        })
                    }else{
                    db.get().collection(collection.ADD_WISHLIST).updateOne({user:ObjectId(userId)},
                    {
                        $push:{products:proObj}
                    }
                    ).then((response)=>{
                        resolve()
                    })
                }
                }else{
                    let wishlistObj={
                        user:ObjectId(userId),
                        products:[proObj]
                    }
                    db.get().collection(collection.ADD_WISHLIST).insertOne(wishlistObj).then((response)=>{
                        resolve()
                    })
                }
            })
    },
    getWishlistProducts:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let wishlistItems =  await db.get().collection(collection.ADD_WISHLIST).aggregate([
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
            resolve(wishlistItems)
        })
    },
    getWishlistCount:(userId)=>{ 
        return new Promise(async(resolve,reject)=>{
            let count =0
            const wishlist = await db.get().collection(collection.ADD_WISHLIST).findOne({user:ObjectId(userId)})
            if(wishlist){
                count = wishlist.products.length
            }
            resolve(count)
        })
    },
    deleteWishlistProduct:(userId,productId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.ADD_WISHLIST).updateOne({user:ObjectId(userId)},
            {
                $pull: {products:{item:ObjectId(productId)}}
            }
            ).then((response)=>{
                resolve(response)
            })
        })
    }
}