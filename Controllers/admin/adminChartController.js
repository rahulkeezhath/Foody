const userMgmt = require('../../Model/adminUser')
const orderMgmt = require('../../Model/adminOrder')
const { response } = require('express')

const chartStatusCount = async(req,res)=>{
    let user = await userMgmt.showUser()
    let userLength = user.length
    let orderPlacedLength = await orderMgmt.CheckStatusOrders()
    res.send({userLength,orderPlacedLength})
}

   const orderStatusCount = async(req,res)=>{
    orderMgmt.showOrderStatus().then((response)=>{
      let pending
      let placed

      for(values of response){
        if(values._id.status == 'placed'){
          placed = values.count
        }else if(values._id.status == 'pending'){
          pending = values.count
        }
      }
      res.render('admin/adminHome',{admin:true,user:false,pending,placed}) 
    })
   }


module.exports = {
  chartStatusCount,
  orderStatusCount
}