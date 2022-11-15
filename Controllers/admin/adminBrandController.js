const { response } = require('express')
const brand = require('../../Model/adminBrand')
const category = require('../../Model/adminCategory')

const adminBrandAction = (req,res)=>{
        category.showCategory().then((category)=>{  
    brand.showBrand().then((brand)=>{
     res.render('admin/adminBrandPage',{admin:true,user:false,title:'BRAND CONTROL PAGE',brand,category})
    })
})
    }

const addNewBrand = (req,res)=>{
    brand.doBrand(req.body).then((response)=>{
        res.redirect('/admin/adminBrandPage')
    }) 
}
const getBrand = async(req,res)=>{
    let brandId = req.query.id
    let brandNewData = await brand.getBrand(brandId)
        category.showCategory().then((brand)=>{
            res.render('admin/adminBrandPage',{admin:true,user:false, brand, brandNewData, title:'EDIT BRAND PAGE'})
        })
    }

const editBrandAction = (req,res)=>{
    let id = req.body.brandId
    let brandName = req.body.editBrand
    brand.editBrand(id,brandName).then(()=>{
        res.redirect('/admin/adminBrandPage')
    })
}



const deleteBrand = (req,res)=>{
    let brandId = req.query.id
    brand.deleteBrand(brandId).then((response)=>{
        res.redirect('/admin/adminBrandPage')
    })
}


module.exports={
    adminBrandAction,
    addNewBrand,
    getBrand,
    editBrandAction,
    deleteBrand
}
  