const cloudinary = require("../utils/cloudinary");

const uploadImageToCloudinary = async (imageBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
    imageBuffer.pipe(cloudinary.uploader.upload_stream({ resource_type: "image" }));
  });
};

module.exports = { uploadImageToCloudinary };
