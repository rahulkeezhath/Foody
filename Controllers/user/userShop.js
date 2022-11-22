const categoryProducts = require('../../Model/userCategoryShop')
const userCartMgmt = require('../../Model/userCartMgmt')

const viewShop = async(req,res)=>{
    let cartCount = null
    if(req.session.user){
    cartCount = await userCartMgmt.getCartCount(req.session.user._id)
    }
    let userData = req.session.user
    let categoryId = req.query.id
    let product = await categoryProducts.viewProductDetails(categoryId)
        res.render('user/categoryShop',{admin:false,user:true,userData,product,cartCount})
   
}

module.exports = {
    viewShop
}  