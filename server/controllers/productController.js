import mongoose from "mongoose";
import Product from "../models/Product.js";

// Creating Product
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      slug,
      category,
      brand,
      specifications,
      variants,
      description,
    } = req.body;

    const isSpecificationsInvalid =
      !Array.isArray(specifications) ||
      specifications.some(
        (field) => !field?.key?.trim() || !field?.value?.trim(),
      );

    const isVariantInvalid =
      !Array.isArray(variants) ||
      variants.length === 0 ||
      variants.some((variant) => {
        const isColorInvalid = !variant?.color?.trim();

        const isSizesInvalid =
          !Array.isArray(variant?.sizes) ||
          variant.sizes.length === 0 ||
          variant.sizes.some((size) => {
            const isSizeInvalid = !size?.size?.trim();

            const isPriceInvalid =
              typeof size?.price !== "number" || size.price < 0;

            const isStockInvalid =
              typeof size?.stock !== "number" || size.stock < 0;

            return isSizeInvalid || isPriceInvalid || isStockInvalid;
          });

        const isImagesInvalid =
          !Array.isArray(variant?.images) || variant.images.length === 0;

        const isDefaultInvalid = typeof variant?.isDefault !== "boolean";

        return (
          isColorInvalid ||
          isSizesInvalid ||
          isImagesInvalid ||
          isDefaultInvalid
        );
      });

    const defaultVariants = variants.filter(
      (variant) => variant?.isDefault === true,
    );

    if (
      !title?.trim() ||
      !slug?.trim() ||
      !description?.trim() ||
      !brand?.trim() ||
      !category ||
      isVariantInvalid ||
      isSpecificationsInvalid
    ) {
      return res.status(400).json({
        message: "Invalid or missing product inputs",
      });
    }

    if (defaultVariants.length !== 1) {
      return res.status(400).json({
        message: "Exactly one default variant is required",
      });
    }

    console.log(req.uploadedImages);

    const product = await Product.create(req.body);
    res.status(201).json({
      message: "Product Created successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.error("error in creating product", error);
    return res.status(500).json({
      message: error.message,
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
        query.category = categoryId;
      }
    }
    const products = await Product.find(filter).sort({ createdAt: -1 }).lean();
    const message =
      products.length === 0
        ? "No products found"
        : "Products fetched successfully";
    return res.status(200).json({
      success: true,
      message,
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
