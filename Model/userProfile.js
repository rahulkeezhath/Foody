const db = require('../config/connection')
const collection = require('../config/collection')
const { response } = require('express')
const { ObjectId } = require('mongodb')
const bcrypt = require('bcrypt')

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
    },
    updatePassword:async(userId,password)=>{
        password.password = await bcrypt.hash(password.password,10)
        console.log(password.password);
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_CREDENTIALS).updateOne({_id:ObjectId(userId)},
            {
                $set: {
                    password: password.password
                }
            }
            ).then((response)=>{
                resolve(response)
            })
        })
    }
}