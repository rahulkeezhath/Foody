const db = require('../config/connection')
const collection = require('../config/collection')
const { response } = require('express')

module.exports = {
    updateProfile:(userId,data)=>{
        return new Promise(async(resolve,reject)=>{
           await db.get().collection(collection.USER_CREDENTIALS).updateOne({_id:userId},
                
                {
                    $set:{
                        name:data.name,
                        gender:data.gender
                    }
                }
                ).then((response)=>{
                    resolve(response)
                })
        })
    },
    getUserDetails:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let userData = await db.get().collection(collection.USER_CREDENTIALS).findOne({_id:userId})
            resolve(userData)
        })
    },
    editEmailPhone:(userId,data)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_CREDENTIALS).updateOne({_id:userId},
                
                {
                    $set:{
                        mobileNo:data.mobile,
                        email:data.email
                    }
                }
                ).then((response)=>{
                    resolve(response)
                })
        })
    }
}