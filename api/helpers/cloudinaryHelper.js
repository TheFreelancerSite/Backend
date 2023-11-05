const cloudinary = require("../utils/cloudinary");

const uploadImageToCloudinary = async (imageBuffer) => {
  return new Promise(async (resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });

    const timeoutMs = 60000; 
    const timeout = setTimeout(() => {
      uploadStream.destroy(new Error('Request Timeout'));
    }, timeoutMs);

    try {
      imageBuffer.pipe(uploadStream);
      clearTimeout(timeout); 
    } catch (err) {
      clearTimeout(timeout); 
      reject(err);
    }
  });
};

module.exports = { uploadImageToCloudinary };
