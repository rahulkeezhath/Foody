const { response } = require('express')
const adminLogin = require('../../Model/adminLogin')
const count = require('../../Model/count')

const adminLoginPage = (req,res)=>{
  
    res.render('admin/adminHome',{admin:true,user:false, title:'ADMIN HOME PAGE'})
}

const adminLoginAction = async(req,res)=>{
    let userCount = await count.userCount()
    let brandCount = await count.categoryCount()
    let categoryCount = await count.categoryCount()
    let productCount = await count.productCount()
    let orderCount = await count.orderCount()
    let orderedCount = await count.orderedCount()
    let placedCount = await count.placedCount()
    let deliveredCount = await count.deliveredCount()
    let shippedCount = await count.shippedCount()

    adminLogin.doLogin(req.body).then((response)=>{
        if(response.status){
            req.session.admin = true
            res.render('admin/admin-home',{admin:true,user:false,title:'ADMIN HOME',userCount,brandCount,categoryCount,productCount,orderCount,orderedCount,placedCount,deliveredCount,shippedCount})
        }else if(response.invalid){
            res.render('admin/adminLogin',{admin:false,user:false,error:"Invalid Username or Password"})
        }else if (response.noUser){
            res.render('admin/adminLogin',{admin:false,user:false,error:"Admin Not Found"})
        }
    })
}

const adminHomeButtton = async(req,res)=>{
    let userCount = await count.userCount()
    let brandCount = await count.categoryCount()
    let categoryCount = await count.categoryCount()
    let productCount = await count.productCount()
    let orderCount = await count.orderCount()
    let orderedCount = await count.orderedCount()
    let placedCount = await count.placedCount()
    let deliveredCount = await count.deliveredCount()
    let shippedCount = await count.shippedCount()
    res.render('admin/admin-home',{admin:true,user:false,title:'DASHBOARD',userCount,brandCount,categoryCount,orderCount,orderedCount,placedCount,productCount,orderCount,deliveredCount,shippedCount})
}


const adminHome = async(req,res)=>{
    let userCount = await count.userCount()
    let brandCount = await count.categoryCount()
    let categoryCount = await count.categoryCount()
    let productCount = await count.productCount()
    let orderCount = await count.orderCount()
    let orderedCount = await count.orderedCount()
    let placedCount = await count.placedCount()
    let deliveredCount = await count.deliveredCount()
    let shippedCount = await count.shippedCount()
    res.render('admin/admin-home',{admin:true,user:false, title:'DASHBOARD',userCount,brandCount,categoryCount,placedCount,productCount,orderedCount,orderCount,deliveredCount,shippedCount})
}

const adminLogout = (req,res)=>{
    req.session.destroy(function(err){
        if(err)
        console.log('error');
        else
        res.redirect('/admin')
    })
}



module.exports={
    adminLoginPage,
    adminLoginAction,
    adminHomeButtton ,
    adminHome,
    adminLogout,
}
