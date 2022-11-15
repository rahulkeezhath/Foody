const collection = require('../config/collection')
const db = require('../config/connection')

module.exports = {
    showUser:()=>{
        return new Promise(async(resolve,reject)=>{
            let userDetails = await db.get().collection(collection.USER_CREDENTIALS).find().toArray()
            resolve(userDetails)
        })
    }
}