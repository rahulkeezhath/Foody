const { response } = require('express')
const couponMgmt = require('../../Model/coupon')


const couponPage = (req,res)=>{
    res.render("admin/adminCouponPage",{admin:true,user:false,title:"COUPON CONTROL PAGE"})
}

const createPage = (req,res)=>{
    res.render('admin/adminCreateCouponPage',{admin:true,user:false,title:"CREATE COUPON"})
}

const addCoupon = (req,res)=>{
    let couponData = req.body
    couponMgmt.addCoupon(couponData).then((response)=>{
        res.json(response)
    })
}

module.exports = {
    couponPage,
    createPage,
    addCoupon   
}