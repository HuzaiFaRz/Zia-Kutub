import cloudinary from "../utils/cloudinary.js";

export const uploadingImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      req.uploadedImages = [];
      return next();
    }

    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "ZIA_KUTUB/PRODUCTS",
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve({
              url: result.secure_url,
              public_id: result.public_id,
            });
          },
        );

        stream.end(fileBuffer);
      });
    };

    // 3. Saari `req.files` ko Parallel upload karein Promise.all se
    const uploadPromises = req.files.map((file) =>
      uploadToCloudinary(file.buffer),
    );
    const uploadedResults = await Promise.all(uploadPromises);

    // 4. Results ko Next Controller ke liye req object par attach kar dein
    req.uploadedImages = uploadedResults;

    next(); // Agle controller / function par jayein
  } catch (error) {
    console.error("Images Uploading Error:", error);
    return res.status(500).json({
      success: false,
      message: "Cloudinary Image Upload Failed",
      error: error.message,
    });
  }
};
