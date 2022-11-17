const adminorderMgmt = require('../../Model/adminOrder')

const adminOrderPage = (req,res)=>{
    adminorderMgmt.showOrders().then((orderItems)=>{
        res.render('admin/adminOrderPage',{admin:true,user:false, title:'ORDERS',orderItems})
    })
}

module.exports={
    adminOrderPage
}