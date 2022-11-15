const { response } = require('express')
const adminLogin = require('../../Model/adminLogin')

const adminLoginPage = (req,res)=>{
  
    res.render('admin/adminHome',{admin:true,user:false, title:'ADMIN HOME PAGE'})
}

const adminLoginAction = (req,res)=>{
    console.log(req.body);
    adminLogin.doLogin(req.body).then((response)=>{
        if(response.status){
            req.session.admin = true
            res.render('admin/adminHome',{admin:true,user:false,title:'ADMIN HOME'})
        }
        else{
            res.redirect('/admin')
        }
    })
}

const adminHome = (req,res)=>{
    res.render('admin/adminHome',{admin:true,user:false, title:'DASHBOARD'})
}

const adminLogout = (req,res)=>{
    req.session.destroy(function(err){
        if(err)
        console.log('error');
        else
        res.redirect('/admin')
    })
}

const adminOrderPage = (req,res)=>{
    res.render('admin/adminOrderPage',{admin:true,user:false, title:'ORDERS'})
}

module.exports={
    adminLoginPage,
    adminLoginAction,
    adminHome,
    adminLogout,
    adminOrderPage
}
