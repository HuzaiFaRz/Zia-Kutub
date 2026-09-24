import Product from "../models/Product.js";

// Creating Product
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      slug,
      category,
      brand,
      isActive,
      isFeatured,
      specifications,
      variants,
      description,
    } = req.body;

    if (
      !title ||
      !slug ||
      !description ||
      title.trim().length < 3 ||
      /^\s|\s$|\s{2,}/.test(title) ||
      !category ||
      !Array.isArray(variants) ||
      variants.length === 0 ||
      variants.length > 6 ||
      variants.some(
        (variant) =>
          !variant.color?.trim() ||
          variant.price === undefined ||
          isNaN(variant.price) ||
          variant.price < 0 ||
          variant.stock === undefined ||
          isNaN(variant.stock) ||
          variant.stock < 0 ||
          !Array.isArray(variant.images) ||
          variant.images.length === 0 ||
          variant.images.length > 2 ||
          variant.images.some((image) => !image.url?.trim()),
      ) ||
      (specifications &&
        (!Array.isArray(specifications) ||
          specifications.length > 6 ||
          specifications.some(
            (spec) => !spec.key?.trim() || !spec.value?.trim(),
          )))
    ) {
      return res
        .status(400)
        .json({ message: "Invalid or missing product inputs" });
    }

    const product = await Product.create(req.body);
    res.status(201).json({
      message: "Product Created successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.error("Product Creating Error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Getting all Product
export const gettingProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ createAt: -1 });
    res.status(201).json({
      message: "Products Get successfully",
      success: true,
      products,
    });
  } catch (error) {
    console.error("Product Getting Error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Update a Product
export const updateProduct = async (req, res) => {
  try {
    const updates = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({
      message: "Products updated successfully",
      success: true,
      updates,
    });
  } catch (error) {
    console.error("Product Update Error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Delete a Product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(201).json({
      message: "Products Deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Product Deleting Error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
