const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectId } = require('mongodb')

module.exports = {
    displayProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let product = await db.get().collection(collection.ADD_PRODUCT).find({state:'Active'}).toArray()
            resolve(product)
        })
    },

    viewProductDetails:(productId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.ADD_PRODUCT).findOne({_id:ObjectId(productId)}).then((product)=>{
                resolve(product)
            })
        })
    }
}