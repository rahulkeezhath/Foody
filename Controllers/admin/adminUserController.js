const { response } = require('express')
const adminUser = require('../../Model/adminUser')

const adminUserPage = (req,res)=>{
    adminUser.showUser().then((user_Details)=>{
    res.render('admin/adminUserPage',{admin:true,user:false, title:'USER CONTROL PAGE',user_Details})
})
    }

    const userBlock = (req,res)=>{
        adminUser.blockUser(req.body.userId).then((response)=>{
            res.json({status:true})
        })
    }

    const userUnblock = (req,res)=>{
        adminUser.unblockUser(req.body.userId).then((response)=>{
            res.json({status:true})
        })
    }

module.exports = {
    adminUserPage,
    userBlock,
    userUnblock
}