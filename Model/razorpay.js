const db = require('../config/connection')
const collection = require('../config/collection')
const Razorpay = require('razorpay');
const { resolve } = require('node:path');
const { ObjectId } = require('mongodb');
var instance = new Razorpay({
    key_id: 'rzp_test_B60nPeKFrDrUak',
    key_secret: '09yiEwDXaDvZrKtniP6UCmrj',
  });

module.exports={
    generateRazorpay:(orderId,total)=>{
        return new Promise((resolve,reject)=>{
            var options ={
                amount:total*100,
                currency: "INR",
                receipt: ""+orderId
            }
            instance.orders.create(options,function(err,order) {
                if(err){
                    console.log(err);
                }else{
                console.log("New Order",order);
                resolve(order)
                }
             })
        })
    },
    verifyPayment:(details)=>{
        return new Promise((resolve,reject)=>{
            let {
                createHmac,
              } = require('node:crypto');
            let hmac = createHmac('sha256','09yiEwDXaDvZrKtniP6UCmrj');   
            console.log("aaa",details.payment); 
            console.log("aaa",details.payment.razorpay_payment_id); 

            hmac.update(details.payment.razorpay_order_id + '|' + details.payment.razorpay_payment_id);   
            hmac = hmac.digest('hex')
            if(hmac == details.payment.razorpay_signature){
                resolve()
            }else{
                reject()
            }
        })
    },
    changePaymentStatus:(orderId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.ORDER_COLLECTION).updateOne({_id:ObjectId(orderId)},
            {
                $set:{
                    status:'placed'
                }
            }
            
            ).then(()=>{
                resolve()
            })
        })
    }
}