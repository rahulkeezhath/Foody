const { response } = require("express")
const { ObjectId } = require("mongodb")
const collection = require("../config/collection")
const db = require('../config/connection')

module.exports={
    doProduct:(imageID,addProduct)=>{
        return new Promise(async(resolve,reject)=>{
            let state = 'Active'
            db.get().collection(collection.ADD_PRODUCT).insertOne(imageID,addProduct,state).then((data)=>{
                resolve.apply(data)
            })
        })
    },
    showProduct:()=>{
        return new Promise(async(resolve,reject)=>{
            let product = await db.get().collection(collection.ADD_PRODUCT).find().toArray()
            resolve(product)
        })
    },

    
  getProductDetails: (productId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.ADD_PRODUCT)
        .findOne({ _id: ObjectId(productId) })
        .then((product) => {
          resolve(product);
        });
    });
  },

    editProduct:(id,product,image)=>{
        return new Promise((resolve,reject)=>{
        db.get().collection(collection.ADD_PRODUCT).updateOne({_id:ObjectId(id)},{
            $set:{
              productName:product.productName,
              sellingPrice:parseInt(product.sellingPrice),
              category:product.category,
              brand:product.brand,
              quantity:product.quantity,
              productDescription:product.productDescription,
              Picture: image,
              state:'Active'
            }
        }).then((response)=>{
            resolve(response)
        })
        })
    },
    outOfStock:(productDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.ADD_PRODUCT).updateOne({_id:ObjectId(productDetails)},
            {
                $set:{state:'Deleted'}
            }
            ).then((response)=>{
                resolve(response)
            })
        })
    },
    Instock:(productDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.ADD_PRODUCT).updateOne({_id:ObjectId(productDetails)},
            {
                $set:{state:'Active'}
            }
            ).then((response)=>{
                resolve(response)
            })
        })
    }
}