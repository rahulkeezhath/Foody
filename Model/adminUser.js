const { response } = require('express')
const { ObjectId } = require('mongodb')
const collection = require('../config/collection')
const db = require('../config/connection')

module.exports = {
    showUser:()=>{
        return new Promise(async(resolve,reject)=>{
            let userDetails = await db.get().collection(collection.USER_CREDENTIALS).find().toArray()
            resolve(userDetails)
        })
    },
    blockUser:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_CREDENTIALS).updateOne({ _id:ObjectId(userId)},
            
            {
                $set:{
                    state:"blocked"
                }
            }
            ).then((response)=>{
                resolve(response)
            })
        })
    },
    unblockUser:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_CREDENTIALS).updateOne({_id:ObjectId(userId)},
            {
                $set:{
                    state:"active"
                }
            }
            ).then((response)=>{
                resolve(response)
            })
        })
        
    }

}