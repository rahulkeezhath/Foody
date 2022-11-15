const { response } = require('express')
const Product = require('../../Model/adminProduct')
const category = require('../../Model/adminCategory')
const brand = require('../../Model/adminBrand')
const e = require('express')


const adminProductAction = (req,res)=>{
    Product.showProduct().then((product)=>{
        res.render('admin/adminProductPage',{admin:true,user:false, title:'PRODUCTS CONTROL PAGE',product})
    })
}

const addNewProduct = (req,res)=>{
        category.showCategory().then((category)=>{
            brand.showBrand().then((brand)=>{
                res.render('admin/adminAddProductPage',{admin:true, user:false, title:'ADD PRODUCT PAGE',category,brand})
        
            })
        })
    }

const editProduct = async(req,res)=>{
    let productId = req.query.id
    let product = await Product.getProductDetails(productId)
    category.showCategory().then((category)=>{
    brand.showBrand().then((brand)=>{
        res.render('admin/adminEditProductPage',{admin:true,user:false, title:'EDIT PRODUCT PAGE',category,brand,product})
    })
    })
}


const addProductPage = (req,res)=>{
       const{
        productName,
        actualPrice,
        sellingPrice,
        category,
        brand,
        quantity,
        productDescription,
        featuredProducts,
        recentProducts
       }= req.body
        Product.doProduct({
            Picture: req.file.filename,
            productName,
            actualPrice,
            sellingPrice,
            category,
            brand,
            quantity,
            productDescription,
            recentProducts,
            featuredProducts
        }).then((response)=>{
            res.redirect('/admin/adminProductPage')
        })
    }


const deleteProduct = (req,res)=>{
    let productId = req.query.id
    Product.deleteProduct(productId).then((response)=>{
        res.redirect('/admin/adminProductPage')
    })
}


const editProductAction = (req,res)=>{
    let id = req.body.id
    let newProductData= req.body
    let newImageId = req.file.filename
    Product.editProduct(id, newProductData, newImageId).then(()=>{
        Product.showProduct().then((product)=>{
            
            res.render("admin/adminProductPage",{admin:true,user:false, title:'PRODUCT CONTROL PAGE',product})
        })
    })
}


module.exports={
    adminProductAction,
    addNewProduct,
     addProductPage,
     editProduct,  
    deleteProduct,
    editProductAction
}