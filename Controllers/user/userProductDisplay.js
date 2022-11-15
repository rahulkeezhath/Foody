const productDisplay = require('../../Model/userFrontDisplay')
const userCartMgmt = require('../../Model/userCartMgmt')

const showProductDetails = async(req,res)=>{
    let cartCount = null
    if(req.session.user){
    cartCount = await userCartMgmt.getCartCount(req.session.user._id)
    }
    let userData = req.session.user
    let productId = req.query.id
    let product = await productDisplay.viewProductDetails(productId)

    res.render('user/singleProduct',{user:true,admin:false, product,userData,cartCount})
}

module.exports = {
    showProductDetails
}   