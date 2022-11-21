const express = require('express')
const router = express.Router()
const admin = require('../Controllers/admin/adminLoginController')
const addCategory = require('../Controllers/admin/adminCategoryController')
const addBrand = require('../Controllers/admin/adminBrandController')
const addProduct = require('../Controllers/admin/adminProductController')
const adminUser = require('../Controllers/admin/adminUserController')
const adminBanner = require('../Controllers/admin/adminBannerController')
const adminOrder = require('../Controllers/admin/adminOrderController')
const adminCoupon = require('../Controllers/admin/adminCouponController')
const upload = require('../Middlewares/multer')
const { route } = require('./user')
const  adminSessionCheck  = require('../Middlewares/sessionMiddleware')



//Admin router

router.get('/',adminSessionCheck.adminSessionChecker,admin.adminLoginPage)
router.post('/adminLoginAction',admin.adminLoginAction)
router.get('/adminHome',adminSessionCheck.adminSessionChecker,admin.adminHome)  
router.get('/adminLogout',admin.adminLogout) 


//User Router

router.get('/adminUserPage',adminSessionCheck.adminSessionChecker,adminUser.adminUserPage)
router.post('/userManagement/block',adminSessionCheck.adminSessionChecker,adminUser.userBlock)
router.post('/userManagement/unblock',adminSessionCheck.adminSessionChecker,adminUser.userUnblock)


//Category router

router.get('/adminCategoryPage',adminSessionCheck.adminSessionChecker,addCategory.adminCategoryAction)
router.post('/addCategory',adminSessionCheck.adminSessionChecker,upload.single('categoryImage'),addCategory.addNewCategory)
router.get('/deleteCategory',adminSessionCheck.adminSessionChecker,addCategory.deleteCategory)


// Brand router

router.get('/adminBrandPage',adminSessionCheck.adminSessionChecker,addBrand.adminBrandAction)
router.post('/addBrand',adminSessionCheck.adminSessionChecker,addBrand.addNewBrand)
router.get('/editBrand',adminSessionCheck.adminSessionChecker,addBrand.getBrand)
router.post('/editBrand',adminSessionCheck.adminSessionChecker,addBrand.editBrandAction)
router.get('/deleteBrand',adminSessionCheck.adminSessionChecker,addBrand.deleteBrand)

// Product router

router.get('/adminProductPage',adminSessionCheck.adminSessionChecker,addProduct.adminProductAction)
router.get('/addProducts',adminSessionCheck.adminSessionChecker,addProduct.addNewProduct)
router.post('/addNewProduct',adminSessionCheck.adminSessionChecker,upload.single('productImage'),addProduct.addProductPage)
router.get('/editProduct',adminSessionCheck.adminSessionChecker,addProduct.editProduct)
router.post('/editProductAction',adminSessionCheck.adminSessionChecker,upload.single('productImage'),addProduct.editProductAction)
router.get('/deleteProduct',adminSessionCheck.adminSessionChecker,addProduct.deleteProduct)


// Banner router
router.get('/adminBannerPage',adminSessionCheck.adminSessionChecker,adminBanner.adminBannerPage)
router.post('/addBanner',adminSessionCheck.adminSessionChecker,upload.single('productImage'), adminBanner.addBannerPage)
router.delete('/deleteBanner',adminSessionCheck.adminSessionChecker,adminBanner.deleteBanner)

// Order router
router.get('/adminOrderPage',adminSessionCheck.adminSessionChecker,adminOrder.adminOrderPage)


//Coupon router
router.get('/adminCoupon',adminSessionCheck.adminSessionChecker,adminCoupon.couponPage)
router.get('/adminAddCoupon',adminSessionCheck.adminSessionChecker,adminCoupon.createCouponPage)
router.post('/adminAddCoupon',adminSessionCheck.adminSessionChecker,adminCoupon.addCoupon)


module.exports = router