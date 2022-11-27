const bcrypt = require('bcrypt')
const collection = require('../config/collection')
const db = require('../config/connection')


module.exports={
    doLogin:(adminData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response ={}
            let admin=await db.get().collection(collection.ADMIN_CREDENTIALS).findOne({username:adminData.username})
            if(admin){
                bcrypt.compare(adminData.password,admin.password).then((status)=>{
                    
                    if(status){
                        response.admin=admin
                        response.status=true
                        resolve(response)
                    }else{
                        response.invalid = true
                        resolve(response)
                    }
                })
            }else{
                response.noUser = true
                resolve(response)
            }
        })
    }
}

