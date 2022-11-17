const { response } = require("express")
const userCartMgmt = require("../../Model/userCartMgmt")

const userCart = async(req,res)=>{
    let userData = req.session.user
    let cartCount = null
    if(req.session.loggedIn){
    let products=  await userCartMgmt.getCartProducts(req.session.user._id)
    cartCount = await userCartMgmt.getCartCount(req.session.user._id)
    let totalValue = 0
    if(products.length>0){
        totalValue = await userCartMgmt.getTotalAmount(req.session.user._id)
    }
   
    res.render('user/cart',{admin:false,user:true,userData,products,cartCount,totalValue})
    }else{
        res.render('user/userLogin',{user:false,admin:false,userData})
    }
}

const addToCart = (req,res)=>{
    userCartMgmt.addToCart(req.params.id,req.session.user._id).then(()=>{
        res.json({status:true})
    })
}

const changeProductQuantity = (req,res,next)=>{
    let userData = req.session.user
    userCartMgmt.changeQuantity(req.body).then((response)=>{ 
        userCartMgmt.getTotalAmount(userData._id).then((result)=>{
            let totalValue = result.totalAmount
            res.json({response,result,totalValue})
        })
     
    })
}



module.exports = {
    userCart,
    addToCart,
    changeProductQuantity
}