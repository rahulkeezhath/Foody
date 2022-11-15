const { response } = require('express')
const { ObjectId } = require('mongodb')
const collection = require('../config/collection')
const db = require('../config/connection')

module.exports={
    doBrand:(addBrand)=>{
        return new Promise(async(resolve,reject)=>{
            console.log(addBrand)
            db.get().collection(collection.ADD_BRAND).insertOne(addBrand).then((data)=>{
                resolve(data)
            })
        })
    },
    showBrand:()=>{
        return new Promise(async(resolve,reject)=>{
            let brand = await db.get().collection(collection.ADD_BRAND).find().toArray()
            resolve(brand)
        })
    },

    getBrand:(brandId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.ADD_BRAND).findOne({_id: ObjectId(brandId)}).then((data)=>{
                resolve(data)
            })
        })
    },

    editBrand:(brandId, brandNewData)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.ADD_BRAND).updateOne({_id:ObjectId(brandId)},{
                $set:{
                    brand: brandNewData
                }
            }).then((response)=>{
                resolve()
            })
        })
    },

    deleteBrand:(brandId)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.ADD_BRAND).deleteOne({_id:ObjectId(brandId)}).then((response)=>{
                resolve(response)
            })
        })
    }

}