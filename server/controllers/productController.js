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

    const isSpecificationsInvalid = specifications.some(
      (field) => !field?.key?.trim() || !field?.value?.trim(),
    );

    const isVariantInvalid = variants.some((field) => {
      const isColorInvalid = !field?.color?.trim();
      const isPriceInvalid =
        typeof field?.price !== "number" || field.price < 0;
      const isStockInvalid =
        typeof field?.stock !== "number" || field.stock < 0;
      const isImagesInvalid =
        !Array.isArray(field?.images) || field.images.length === 0;
      const isDefaultInvalid = typeof field?.isDefault !== "boolean";

      return (
        isColorInvalid ||
        isPriceInvalid ||
        isStockInvalid ||
        isImagesInvalid ||
        isDefaultInvalid
      );
    });

    if (
      !title ||
      !slug ||
      !description ||
      !brand ||
      category === null ||
      isVariantInvalid ||
      isSpecificationsInvalid
    ) {
      return res
        .status(400)
        .json({ message: "Invalid or missing product inputs" });
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
