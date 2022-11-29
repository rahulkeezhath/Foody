const { response } = require('express')
const adminorderMgmt = require('../../Model/adminOrder')

const adminOrderPage = (req,res)=>{
    adminorderMgmt.showOrders().then((orderItems)=>{
        res.render('admin/adminOrderPage',{admin:true,user:false, title:'ORDERS',orderItems})
    })
}

const viewOrderProducts = (req,res)=>{
    let productId = req.query.id
    adminorderMgmt.getOrderProducts(productId).then((orderProducts)=>{
        res.render('admin/orderProductsPage',{admin:true,user:false,title:'ORDER CONTROL PAGE',orderProducts})
    })
}

const updateOrderDetails = (req,res)=>{
    let status = req.body
    adminorderMgmt.updateOrderStatus(status).then((response)=>{
        res.send(response)
    })
}

module.exports={
    adminOrderPage,
    viewOrderProducts,
    updateOrderDetails
} 