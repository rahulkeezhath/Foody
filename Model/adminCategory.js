const { response } = require('express')
const { ObjectId } = require('mongodb')
const collection = require('../config/collection')
const db = require('../config/connection')

module.exports={
    doCategory:(imageID,addCategory)=>{
        return new Promise(async(resolve,reject)=>{
            console.log(addCategory)
            db.get().collection(collection.ADD_CATEGORY).insertOne(imageID,addCategory).then((data)=>{
                resolve.apply(data)
            })
        })
    },
    showCategory:()=>{
        return new Promise(async(resolve,reject)=>{
            let category = await db.get().collection(collection.ADD_CATEGORY).find().toArray()
            resolve(category)
        })
    },

 

    deleteCategory:(categoryId)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.ADD_CATEGORY).deleteOne({_id:ObjectId(categoryId)}).then((response)=>{
                resolve(response)
            })
        })
    }
}   