const { response } = require('express')
const couponMgmt = require('../../Model/admincoupon')


const couponPage = (req,res)=>{
    couponMgmt.displayCoupon().then((availableCoupons)=>{
        res.render("admin/adminCouponPage",{admin:true,user:false,title:"COUPON CONTROL PAGE",availableCoupons})
    })
}   
const createCouponPage = (req,res)=>{
     res.render('admin/adminCreateCouponPage',{admin:true,user:false,title:"CREATE COUPON"})
}

const addCoupon = (req,res)=>{
    console.log(req.body);
   couponMgmt.addCoupon(req.body).then(()=>{
    couponMgmt.displayCoupon().then((availableCoupons)=>{
        res.render('admin/adminCouponPage',{admin:true,user:false,title:"CREATE COUPON",availableCoupons})
    })
   })
}

const deleteCoupon = (req,res)=>{
    let couponId = req.query.id
    couponMgmt.deleteCoupon(couponId).then((response)=>{
        res.json(response)
    })
}

module.exports = {
    couponPage,
    createCouponPage,
    addCoupon,
    deleteCoupon   
}