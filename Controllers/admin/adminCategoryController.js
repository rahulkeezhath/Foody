const { response } = require('express')
const adminCategory = require('../../Model/adminCategory')


const adminCategoryAction = (req,res)=>{  
    adminCategory.showCategory().then((category)=>{
        res.render('admin/adminCategoryPage',{admin:true, user:false, title:"CATEGORY CONTROL PAGE",category})
    })
}

const addNewCategory = (req,res)=>{
        const{
            newCategory,
        }=req.body
    adminCategory.doCategory({categoryImage:req.file.filename,
        newCategory,
    }).then((response)=>{
        res.redirect('/admin/adminCategoryPage') 
    })
}




const deleteCategory = (req,res)=>{
    let categoryId = req.query.id
    adminCategory.deleteCategory(categoryId).then((response)=>{
        res.redirect('/admin/adminCategoryPage')
    })
}

module.exports={
    adminCategoryAction,  
    addNewCategory,
    deleteCategory   
}