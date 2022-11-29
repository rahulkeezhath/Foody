const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')

cloudinary.config({ 
    cloud_name: process.env.Cloudinary_Cloud_Name, 
    api_key: process.env.Cloudinary_Api_Key, 
    api_secret: process.env.Cloudinary_Api_Secret 
  });
  
  const storage = new CloudinaryStorage({cloudinary,params:{folder:'Images',allowedformats:['jpg','jpeg','png']}})

  module.exports = {
    storage,
    cloudinary
  }