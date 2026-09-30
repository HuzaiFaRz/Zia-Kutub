import cloudinary from "../utils/cloudinaryconfig.js";

export const uploadingImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      req.uploadedImages = {};
      return next();
    }

    const uploadToCloudinary = (fileBuffer, fieldname, slug) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "PRODUCTS",
            public_id: `${fieldname}_${Date.now()}`,
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary Single Stream Error:", error);
              return reject(error);
            }
            resolve({
              url: result.secure_url,
              public_id: result.public_id,
            });
          },
        );

        stream.end(fileBuffer);
      });
    };

    const slug = req.body.slug || "uncategorized";
    const uploadedImagesMap = {};

    const uploadPromises = req.files.map(async (file) => {
      try {
        const result = await uploadToCloudinary(
          file.buffer,
          file.fieldname,
          slug,
        );

        if (!uploadedImagesMap[file.fieldname]) {
          uploadedImagesMap[file.fieldname] = [];
        }
        uploadedImagesMap[file.fieldname].push(result);
      } catch (err) {
        console.error(`Failed to upload file field ${file.fieldname}:`, err);
        throw err;
      }
    });

    await Promise.all(uploadPromises);

    req.uploadedImages = uploadedImagesMap;
    console.log("Image Upload Success! Moving to createProduct...");

    return next();
  } catch (error) {
    console.error("Fatal Error in uploadingImages Middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Cloudinary Image Upload Failed",
      error: error.message,
    });
  }
};
