const bcrypt = require('bcrypt')
const { response } = require('express')
const collection = require('../config/collection')
const db = require('../config/connection')

module.exports={
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let response ={}
            let user = await db.get().collection(collection.USER_CREDENTIALS).findOne({email:userData.email})
            if(user){
                if(user.verified == 1){
                    bcrypt.compare(userData.password,user.password).then((status)=>{
                        console.log(status);
                        if(status){
                            console.log("login success");
                            response.user=user
                            response.status=true
                            resolve(response)
                        }else{
                            console.log("login failed")
                            resolve({status:false})
                        }
                    })
                }
                else
            {
                resolve({status:false})

            }

                
            }else{
                console.log("login not success")
                resolve({status:false})
            }
        })
    },
    doSignup:(verified,name,email,phoneNumber,password)=>{
        return new Promise(async(resolve,reject)=>{
            password=await bcrypt.hash(password,10)
            db.get().collection(collection.USER_CREDENTIALS).insertOne({verified,name,email,phoneNumber,password}).then((data)=>{
                resolve(data)
            })
        })

    },

    userVerified:(userID)=>{
        return new Promise(async(resolve,reject)=>{
            let user = await db.get().collection(collection.USER_CREDENTIALS).findOne({_id:userID})
            await db.get().collection(collection.USER_CREDENTIALS).updateOne({_id:userID},{
                $set:{
                    verified: 1
                }
            }).then((response)=>{
                response.user = user
                resolve(response)
            })
        })
    }
}