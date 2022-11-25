const reportModel = require('../../Model/salesMgmt')

const  getSalesReport = (req,res)=>{
    let fromDate = req.query.fromDate
    let toDate = req.query.toDate
    reportModel.getSalesReport(fromDate,toDate).then((orderList)=>{
        res.send(orderList)
    })
}

module.exports = {
    getSalesReport
}