const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectId } = require('mongodb')
const { response } = require('express')

module.exports = {
    addAddress:(details,userId)=>{
        let addObj = {
            name:details.name,
            mobile:details.mobile,
            country:details.country,
            state:details.state,
            address:details.address,
            pincode:details.pincode,
        }

        return new Promise(async(resolve,reject)=>{
            let userAddress = await db.get().collection(collection.USER_ADDRESS).findOne({user:ObjectId(userId)})
            if(userAddress){
                db.get().collection(collection.USER_ADDRESS).updateOne({user:ObjectId(userId)},
                {
                    $push:{details:addObj}
                }
                ).then((response)=>{
                    resolve()
                })
            }else{
                let addressObj = {
                    user:ObjectId(userId),
                    details:[addObj]
                }
                db.get().collection(collection.USER_ADDRESS).insertOne(addressObj).then((response)=>{
                    resolve()
                })
            }
        })
    },
    showAddress:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            const address = db.get().collection(collection.USER_ADDRESS).findOne({user:ObjectId(userId)})
            resolve(address)
        })
    }
}