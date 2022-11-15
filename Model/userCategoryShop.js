const { ObjectId } = require('mongodb')
const collection = require('../config/collection')
const db = require('../config/connection')

module.exports = {
    viewProductDetails:(categoryId)=>{
        return new Promise(async(resolve,reject)=>{
            let category = await db.get().collection(collection.ADD_CATEGORY).findOne({_id:ObjectId(categoryId)})
            let CATEGORYNAME = await category.newCategory
            let product = await db.get().collection(collection.ADD_PRODUCT).find({category:CATEGORYNAME}).toArray()
            resolve(product)
        })
    }
}