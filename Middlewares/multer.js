const multer = require('multer')

const storage = multer.diskStorage({
    destination: './public/admin/images',
    filename:(req, file, cb)=>{
        cb(null, Date.now()+file.originalname)
    }
})


const upload = multer({
storage : storage,
fileFilter:(req,file,cb)=>{
    if(
        file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/webp'
    ){
        cb(null, true)
    }else{
        cb(null, false)
        cb(new Error('only jpeg, jpg, png, webp'))
    }
}    
})

module.exports = upload