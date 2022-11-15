const express = require('express')
const router = express.Router()
const user = require('../Controllers/user/userLoginController')
const userCart = require('../Controllers/user/userCart')
const userProduct = require('../Controllers/user/userProductDisplay')
const userShop = require('../Controllers/user/userShop')
const userWishlist = require('../Controllers/user/userWhislist')
const userCheckout = require('../Controllers/user/userCheckout')
const userSessionCheck = require('../Middlewares/sessionMiddleware')


router.get('/',user.userLoginPage)
router.post('/userLoginAction',user.userLoginPage)
router.get('/login',user.userLoginAction)
router.post("/login",user.userLoginControl)

router.post('/signup',user.userSignupAction)
router.get('/signup',user.userSignupPage)
router.get('/logout',user.userSignoutAction)
router.post('/verifyOtp',user.verifyOtp)


router.get('/cart',userSessionCheck.userSessionChecker,userCart.userCart)
router.get('/addToCart/:id',userSessionCheck.userSessionChecker,userCart.addToCart)
router.post('/changeProductQuantity',userSessionCheck.userSessionChecker,userCart.changeProductQuantity)




router.get('/viewSingleProduct',userProduct.showProductDetails)

router.get('/viewCategory',userShop.viewShop)

router.get('/wishlist',userSessionCheck.userSessionChecker,userWishlist.userWishlist)


router.get('/checkout',userSessionCheck.userSessionChecker,userCheckout.userCheckout)
router.get('/placeOrder',userSessionCheck.userSessionChecker,userCheckout.placeOrder)
router.post('/placeOrder',userSessionCheck.userSessionChecker,userCheckout.payment)

module.exports=router