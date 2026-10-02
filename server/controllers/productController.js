import mongoose from "mongoose";
import Product from "../models/Product.js";
import cloudinary from "../utils/cloudinaryconfig.js";

// Creating Product
export const createProduct = async (req, res) => {
  const uploadedPublicIds = [];

  try {
    console.log("Req Body Data:", req.body);
    const { title, slug, category, brand, specifications, description } =
      req.body;

    let variants = [];
    if (typeof req.body.variants === "string") {
      try {
        variants = JSON.parse(req.body.variants);
      } catch (parseErr) {
        console.error("JSON Parse Error in variants:", parseErr);
        return res.status(400).json({
          success: false,
          message: "Invalid JSON format for variants",
        });
      }
    } else {
      variants = req.body.variants || [];
    }

    let specs = specifications;
    if (typeof specifications === "string") {
      try {
        specs = JSON.parse(specifications);
      } catch (e) {
        specs = [];
      }
    }

    const isInvalid =
      !title?.trim() ||
      !slug?.trim() ||
      !description?.trim() ||
      !brand?.trim() ||
      !category ||
      !Array.isArray(specs) ||
      specs.some((s) => !s?.key?.trim() || !s?.value?.trim()) ||
      !Array.isArray(variants) ||
      variants.length === 0 ||
      variants.filter((v) => v?.isDefault === true).length !== 1 ||
      variants.some(
        (v) =>
          !v?.color?.trim() ||
          typeof v?.isDefault !== "boolean" ||
          !Array.isArray(v?.sizes) ||
          v.sizes.length === 0 ||
          v.sizes.some(
            (sz) =>
              !sz?.size?.trim() ||
              typeof sz?.price !== "number" ||
              sz.price < 0 ||
              typeof sz?.stock !== "number" ||
              sz.stock < 0,
          ),
      );

    if (isInvalid) {
      console.log("--> Validation Failed in createProduct");
      return res.status(400).json({
        success: false,
        message: "Invalid or missing product inputs",
      });
    }

    variants = variants.map((variant, index) => {
      const uploadedImgs = [];

      if (req.uploadedImages) {
        Object.keys(req.uploadedImages).forEach((key) => {
          if (key.includes(`_${index}_`) || key === `variant_${index}_images`) {
            uploadedImgs.push(...req.uploadedImages[key]);
          }
        });
      }

      uploadedImgs.forEach((img) => {
        if (img.public_id) uploadedPublicIds.push(img.public_id);
      });

      return {
        ...variant,
        images: uploadedImgs,
      };
    });

    const product = await Product.create({
      title,
      slug,
      category,
      brand,
      specifications: specs,
      description,
      variants,
    });

    return res.status(201).json({
      message: "Product Created successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error in createProduct:", error);

    if (uploadedPublicIds.length > 0) {
      console.log("Cleaning up uploaded images from Cloudinary");
      await Promise.all(
        uploadedPublicIds.map((public_id) =>
          cloudinary.uploader.destroy(public_id),
        ),
      );
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Update a Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true },
    ).lean();

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("error in updating product", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Delete a Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID format" });
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("error in product deleting", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Getting Products
export const gettingProducts = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const query = {};

    if (categoryId) {
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID format",
        });
      }

      query.category = categoryId;
    }

    const products = await Product.find(query).sort({ createdAt: -1 }).lean();

    return res.status(200).json({
      success: true,
      message:
        products.length === 0
          ? "No products found"
          : "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error("error in gettings product", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a Product Details
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }
    const product = await Product.findById(id).lean();
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.error("error in getting product", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
