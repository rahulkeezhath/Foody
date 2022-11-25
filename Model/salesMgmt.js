const db = require('../config/connection')
const collection = require('../config/collection')

module.exports = {
    getSalesReport:(fromDate,toDate)=>{
        fromDate = new Date(fromDate).toLocaleDateString("en-US")
        toDate = new Date(toDate).toLocaleDateString("en-US")

        return new Promise(async(resolve,reject)=>{
            let orderList = await db.get().collection(collection.ORDER_COLLECTION).find(
                {$and:[
                    {date:
                     {$gte:fromDate}
                    }, 
                    {date:
                        {$lte:toDate}
                    }
            ]
        }).toArray()
        resolve(orderList)
        })
    }
}