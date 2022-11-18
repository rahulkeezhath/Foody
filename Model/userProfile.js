const db = require('../config/connection')
const collection = require('../config/collection')
const { response } = require('express')
const { ObjectId } = require('mongodb')

module.exports = {
    updateProfile:(userData,data)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_CREDENTIALS).updateOne({_id:ObjectId(userData._id)},
                
                {
                    $set:{
                        name:data.Name,
                        phoneNumber:data.Mobile,
                        email:data.Email
                    }
                }
                ).then((response)=>{
                    resolve(response)
                })
        })
     },
    getUserDetails:(userID)=>{
        return new Promise(async(resolve,reject)=>{
            let userData = await db.get().collection(collection.USER_CREDENTIALS).findOne({_id:ObjectId(userID)})
            resolve(userData)
        })
    }
}