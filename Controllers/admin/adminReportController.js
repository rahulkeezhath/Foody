const reportModel = require('../../Model/salesMgmt')

const  getSalesReport = (req,res)=>{
    let fromDate = req.query.fromDate
    let toDate = req.query.toDate
    reportModel.getSalesReport(fromDate,toDate).then((salesReport)=>{
        res.render('admin/salesReport',{admin:false,user:false,title:"SALES REPORT",salesReport})
    })
}
  
module.exports = {
    getSalesReport
}