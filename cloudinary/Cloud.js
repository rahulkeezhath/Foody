const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')

cloudinary.config({ 
    cloud_name: 'dxxhgvlhz', 
    api_key: '892291954787137', 
    api_secret: '8s-OkXfeSXsMLOt2egMOu2xIE6M' 
  });
  
  const storage = new CloudinaryStorage({cloudinary,params:{folder:'Images',allowedformats:['jpg','jpeg','png']}})

  module.exports = {
    storage,
    cloudinary
  }