const adminBanner = require('../../Model/adminBanner')

const adminBannerPage = (req,res)=>{
        adminBanner.showBanner().then((banner)=>{
             res.render('admin/adminBannerPage',{admin:true,user:false, title:'Banners',banner})
        })
   
}

const addBannerPage = (req,res)=>{
       const{
        newBanner,
       }= req.body
        adminBanner.doBanner({
            productImage: req.file.path,
            newBanner,
        }).then((response)=>{
            res.redirect('/admin/adminBannerPage')
        })
    }

const deleteBanner = (req,res)=>{
    let id = req.query  
    adminBanner.deleteBanner(id).then((response)=>{
        res.json(response)
    })
}


module.exports = {
    adminBannerPage,
    addBannerPage,
    deleteBanner,
  
}