const { ObjectId, ObjectID } = require('mongodb')
const collection = require('../config/collection')
const db = require('../config/connection')

module.exports={
    doBanner:(imageID,addBanner)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collection.ADD_BANNER).insertOne(imageID,addBanner).then((data)=>{
                resolve.apply(data)
            })
        })
    },
    showBanner:()=>{
        return new Promise(async(resolve,reject)=>{
            let banner = await db.get().collection(collection.ADD_BANNER).find().toArray()
            resolve(banner)
        })
    },

    deleteBanner:(bannerId)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.ADD_BANNER).deleteOne({_id:ObjectId(bannerId)}).then((response)=>{
                resolve(response)
            })
        })
    }
}   