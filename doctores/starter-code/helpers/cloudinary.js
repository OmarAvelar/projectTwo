const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dqf4hmvy0",
  api_key: "447699217275836",
  api_secret: "oI1Xk7iIg9lCe_hhn6fpE0FtKDE"
});
var storage = cloudinaryStorage({
  cloudinary,
  folder: "Doctores",
  allowedFormats: ["jpg", "png", "jpeg", "gif", "pdf"],
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadCloud = multer({ storage: storage });
module.exports = uploadCloud;
