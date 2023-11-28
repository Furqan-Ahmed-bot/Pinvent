const multer = require("multer");

// Define File storge


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {

        cb(null, new Date().toISOString().replace(/:/g, "-") +  "-" + file.originalname) //15/09/23 
    }
  })  

  //specify file format that can be saved

  function fileFilter (req, file, cb) {
    if(file.mimetype === "image/png" || 
       file.mimetype === "image/jpg" ||
       file.mimetype === "image/jpeg"
    ){
      cb(null, true)

    }
    else{
      cb(null, false)

    }
  }

  //file formatter

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
  
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }



  const upload = multer({storage ,  fileFilter});

  module.exports = {upload , formatFileSize};   