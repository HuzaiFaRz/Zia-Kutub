import { useState } from "react";
import { Listbox } from "@headlessui/react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ImagePlus,
  LoaderCircle,
  PackagePlus,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { buttonCancleStyle } from "../global";
import { NavLink } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import api from "../api/axios";

const categories = [
  { id: "quran-kareem", name: "Quran Kareem" },
  { id: "books", name: "Islamic Books" },
  { id: "prayer-mat", name: "Prayer Mat" },
  { id: "koofi", name: "Koofi / Topi" },
  { id: "fragrance-oil", name: "Fragrance Oil" },
  { id: "accessories", name: "Accessories" },
];

const Admin_Add_Product = () => {
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: null,
    brand: "Generic",
    isAvailable: true,
    specifications: [
      {
        key: "",
        value: "",
      },
    ],

    variants: [
      {
        color: "Standard",
        price: "",
        stock: "",
        isDefault: true,
        images: [],
      },
    ],
  });

  const handleProductChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (category) => {
    setProduct((prev) => ({
      ...prev,
      category,
    }));
  };

  const handleSpecificationChange = (index, field, value) => {
    setProduct((prev) => {
      const specifications = [...prev.specifications];

      specifications[index] = {
        ...specifications[index],
        [field]: value,
      };

      return {
        ...prev,
        specifications,
      };
    });
  };

  const addSpecification = () => {
    if (product.specifications.length >= 6) return;

    setProduct((prev) => ({
      ...prev,
      specifications: [
        ...prev.specifications,
        {
          key: "",
          value: "",
        },
      ],
    }));
  };

  const removeSpecification = (index) => {
    if (product.specifications.length === 1) return;

    setProduct((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }));
  };

  const handleVariantChange = (index, field, value) => {
    setProduct((prev) => {
      const variants = [...prev.variants];

      variants[index] = {
        ...variants[index],
        [field]: value,
      };

      return {
        ...prev,
        variants,
      };
    });
  };

  const addVariant = () => {
    if (product.variants.length >= 6) return;

    setProduct((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          color: "",
          price: "",
          stock: "",
          isDefault: false,
          images: [],
        },
      ],
    }));
  };

  const removeVariant = (index) => {
    if (product.variants.length === 1) return;

    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const setDefaultVariant = (index) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) => ({
        ...variant,
        isDefault: i === index,
      })),
    }));
  };

  const handleImages = (index, e) => {
    const files = Array.from(e.target.files);

    if (files[0]) {
      if (!files[0].type.startsWith("image/")) {
        toast("Please Select Image");
        console.error("Not an image.");
        return;
      }
    }

    setProduct((prev) => {
      const variants = [...prev.variants];
      const currentImages = variants[index].images;
      const remainingSlots = 2 - currentImages.length;
      const allowedFiles = files.slice(0, remainingSlots);
      const imageObjects = allowedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      variants[index] = {
        ...variants[index],
        images: [...currentImages, ...imageObjects],
      };
      return {
        ...prev,
        variants,
      };
    });

    e.target.value = "";
  };

  const removeImage = (variantIndex, imageIndex) => {
    setProduct((prev) => {
      const variants = [...prev.variants];

      const image = variants[variantIndex].images[imageIndex];

      if (image?.preview) {
        URL.revokeObjectURL(image.preview);
      }

      variants[variantIndex] = {
        ...variants[variantIndex],
        images: variants[variantIndex].images.filter(
          (_, i) => i !== imageIndex,
        ),
      };

      return {
        ...prev,
        variants,
      };
    });
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...product,
      category: product.category?.id,
      slug: generateSlug(product.title),
    };

    if (
      !product.title ||
      !product.description ||
      !product.brand ||
      product.category === null
    ) {
      toast("Please Fill Basic Info", product.category);
      return;
    }

    const specificationsChecking = product.specifications.find(
      (fields) => !fields.key || !fields.value,
    );

    if (specificationsChecking) {
      toast("Please Fill Specification Fields");

      return;
    }

    const variantChecking = product.variants.find(
      (fields) =>
        !fields.color ||
        !fields.price ||
        !fields.stock ||
        fields.images.length === 0 ||
        !fields.isDefault,
    );

    if (variantChecking) {
      toast("Please Fill Variant Fields");
      return;
    }

    try {
      setLoading(true);
      console.log("PRODUCT DATA:", productData);

      console.log(`http://localhost:5000/api/products/create`)

      const res = await api.post("/products/create", productData);

      console.log(res);
    } catch (error) {
      setLoading(false);

      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-beige px-4 py-6 sm:px-6 lg:px-10">
      {loading && (
        <div className="flex items-center justify-center fixed top-0 right-0  backdrop-blur-xl w-full h-screen z-100 text-beige">
          <LoaderCircle className="animate-spin" size={300} />
        </div>
      )}

      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        rtl={false}
        draggable
        theme="dark"
        toastClassName="!bg-[#1f150c] !text-[#e1dcc9] !border !border-[#412d15] !rounded-2xl !font-lato-regular !shadow-[0_10px_35px_rgba(12,12,12,0.35)]"
        bodyClassName="!text-[#e1dcc9] !font-sora !text-sm"
        progressClassName="!bg-[#e1dcc9]"
      />
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex gap-5 items-center bg-mehroon rounded-2xl text-beige p-3">
          <NavLink
            to={"/admin"}
            type="button"
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-beige text-brown`}
          >
            <ChevronLeft size={20} />
          </NavLink>

          <div>
            <h1 className="text-2xl font-bold sm:text-3xl font-playfair-bold">
              Add Product
            </h1>
            <p className="mt-1 text-sm text-beige/70">
              Add a new product to your Islamic store
            </p>
          </div>
        </div>

        <form>
          <div className="flex flex-col gap-6">
            <section className="flex flex-col gap-5 bg-mehroon text-beige rounded-2xl p-5 sm:p-7">
              <div>
                <h2 className="text-2xl font-bold font-cinzel-bold">
                  Product Information
                </h2>

                <p className="mt-1 text-sm text-beige/70">
                  Basic information about your product
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2 font-lato-regular tracking-wider">
                  <label className="text-lg text-beige" htmlFor="tittle">
                    Product Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="tittle"
                    value={product.title}
                    onChange={handleProductChange}
                    placeholder="e.g. Premium Oud Attar"
                    required
                    className="w-full rounded-xl bg-brown/80 px-4 py-3 text-beige placeholder:text-beige/50"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <div className="relative flex w-full min-w-0 flex-1 flex-col gap-2">
                    <label className="text-lg text-beige">Category</label>
                    <Listbox
                      value={product.category}
                      onChange={handleCategoryChange}
                    >
                      <Listbox.Button className="w-full flex items-center justify-between rounded-xl bg-brown/80 px-4 py-3 text-beige placeholder:text-beige/50">
                        <span
                          className={
                            product.category ? "text-beige" : "text-beige/40"
                          }
                        >
                          {product.category?.name || "Select Category"}
                        </span>
                        <ChevronDown size={18} className="text-beige" />
                      </Listbox.Button>
                      <Listbox.Options className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-beige/80 backdrop-blur-2xl p-1 outline-none">
                        {categories.map((category) => (
                          <Listbox.Option
                            key={category.id}
                            value={category}
                            className={({ active }) =>
                              `flex cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-sm ${active ? "bg-brown text-beige" : "text-mehroon"}`
                            }
                          >
                            {({ selected }) => (
                              <>
                                <span>{category.name}</span>
                                {selected && <Check size={17} />}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Listbox>
                  </div>

                  <div className="flex w-full min-w-0 flex-1 flex-col gap-2">
                    <label className="text-lg text-beige" htmlFor="brand">
                      Brand
                    </label>

                    <input
                      type="text"
                      id="brand"
                      name="brand"
                      value={product.brand}
                      onChange={handleProductChange}
                      placeholder="Generic"
                      className="w-full rounded-xl bg-brown/80 px-4 py-3 text-beige placeholder:text-beige/50"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-lg text-beige" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    value={product.description}
                    onChange={handleProductChange}
                    rows={5}
                    placeholder="Write a detailed description..."
                    className="w-full rounded-xl bg-brown/80 px-4 py-3 text-beige placeholder:text-beige/50 resize-none"
                  />
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-5 bg-mehroon text-beige rounded-2xl p-5 sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-cinzel-bold">
                    Specifications
                  </h2>

                  <p className="mt-1 text-sm text-beige/70">
                    Maximum 6 specifications
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addSpecification}
                  disabled={product.specifications.length >= 6}
                  className="flex items-center justify-center gap-2 rounded-xl bg-beige px-4 py-2.5 text-sm font-semibold text-mehroon disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus size={18} />
                  Add Specification
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {product.specifications.map((specification, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3 sm:flex-row sm:items-center"
                  >
                    <input
                      type="text"
                      value={specification.key}
                      onChange={(e) =>
                        handleSpecificationChange(index, "key", e.target.value)
                      }
                      placeholder="Key e.g. Material"
                      className="w-full rounded-xl bg-brown/80 px-4 py-3 text-beige placeholder:text-beige/50"
                    />

                    <input
                      type="text"
                      value={specification.value}
                      onChange={(e) =>
                        handleSpecificationChange(
                          index,
                          "value",
                          e.target.value,
                        )
                      }
                      placeholder="Value e.g. Velvet"
                      className="w-full rounded-xl bg-brown/80 px-4 py-3 text-beige placeholder:text-beige/50"
                    />

                    <button
                      type="button"
                      onClick={() => removeSpecification(index)}
                      disabled={product.specifications.length === 1}
                      className="m-2 disabled:cursor-not-allowed disabled:opacity-40 sm:self-auto text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {product.specifications.length >= 6 && (
                <p className="text-sm text-beige/60">
                  You have reached the maximum of 6 specifications.
                </p>
              )}
            </section>

            <section className="flex flex-col gap-5 bg-mehroon text-beige rounded-2xl p-5 sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-cinzel-bold">
                    Product Variants
                  </h2>
                  <p className="mt-1 text-sm text-beige/70">
                    Maximum 6 variants • Maximum 2 images per variant
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addVariant}
                  disabled={product.variants.length >= 6}
                  className="flex items-center justify-center gap-2 rounded-xl bg-beige px-4 py-2.5 text-sm font-semibold text-mehroon disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus size={18} />
                  Add Variant
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {product.variants.map((variant, variantIndex) => (
                  <div
                    key={variantIndex}
                    className="rounded-2xl border border-beige/15 p-4 sm:p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 font-extrabold items-center justify-center rounded-full bg-beige text-xs text-mehroon">
                          {variantIndex + 1}
                        </div>
                      </div>

                      {product.variants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeVariant(variantIndex)}
                          className="m-2 disabled:cursor-not-allowed disabled:opacity-40 sm:self-auto text-red-500"
                        >
                          <Trash2 size={17} />
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col gap-4 lg:flex-row mt-3">
                      {/* Color */}

                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <label className="text-sm text-beige" htmlFor="color">
                          Color
                        </label>

                        <input
                          id="color"
                          type="text"
                          value={variant.color}
                          onChange={(e) =>
                            handleVariantChange(
                              variantIndex,
                              "color",
                              e.target.value,
                            )
                          }
                          placeholder="Standard"
                          className="w-full rounded-xl bg-brown/80 px-4 py-3 text-beige placeholder:text-beige/50"
                        />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <label className="text-sm text-beige" htmlFor="price">
                          Price
                        </label>
                        <input
                          id="price"
                          type="number"
                          min="0"
                          value={variant.price}
                          onChange={(e) =>
                            handleVariantChange(
                              variantIndex,
                              "price",
                              e.target.value,
                            )
                          }
                          placeholder="0"
                          required
                          className="w-full rounded-xl bg-brown/80 px-4 py-3 text-beige placeholder:text-beige/50"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <label className="text-sm text-beige" htmlFor="stock">
                          Stock
                        </label>
                        <input
                          id="stock"
                          type="number"
                          min="0"
                          value={variant.stock}
                          onChange={(e) =>
                            handleVariantChange(
                              variantIndex,
                              "stock",
                              e.target.value,
                            )
                          }
                          placeholder="0"
                          required
                          className="w-full rounded-xl bg-brown/80 px-4 py-3 text-beige placeholder:text-beige/50"
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="mb-3 flex items-center justify-between">
                        <label className="text-sm text-beige">
                          Product Images
                        </label>

                        <span className="text-xs text-beige/60">
                          {variant.images.length}/2
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {variant.images.map((image, imageIndex) => (
                          <div
                            key={imageIndex}
                            className="group relative h-24 w-24 overflow-hidden rounded-xl border border-beige/20"
                          >
                            <img
                              src={image.preview}
                              className="h-full w-full object-cover"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                removeImage(variantIndex, imageIndex)
                              }
                              className={`flex absolute top-1 right-1 h-6 w-6 shrink-0 items-center justify-center rounded-full bg-beige text-brown opacity-0 transition group-hover:opacity-100`}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}

                        {variant.images.length < 2 && (
                          <label className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-beige/30 text-beige/60 transition hover:border-beige/70">
                            <ImagePlus size={23} />

                            <span className="text-xs font-medium">
                              Add Image
                            </span>

                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={(e) => handleImages(variantIndex, e)}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setDefaultVariant(variantIndex)}
                      className="mt-5 flex items-center gap-3"
                    >
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          variant.isDefault
                            ? "border-beige bg-beiborder-beige"
                            : "border-beige/40"
                        }`}
                      >
                        {variant.isDefault && (
                          <div className="h-2 w-2 rounded-full bg-beige" />
                        )}
                      </div>

                      <span className="text-sm text-beige">
                        Use as default variant
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </section>
            <section className="flex flex-col gap-5 bg-mehroon text-beige rounded-2xl p-5 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-cinzel-bold">
                    Product Status
                  </h2>

                  <p className="mt-1 text-sm text-beige/70">
                    Control how this product appears
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setProduct((prev) => ({
                        ...prev,
                        isAvailable: !prev.isAvailable,
                      }))
                    }
                    className={`rounded-xl bg-beige px-4 py-2.5 text-sm font-semibold text-mehroon
                      ${
                        product.isAvailable
                          ? "bg-beige text-beige"
                          : "bg-beige/60 text-beige"
                      }
                    `}
                  >
                    {product.isAvailable ? "Available" : "Not Available"}
                  </button>
                </div>
              </div>
            </section>

            <div className="w-full flex justify-end gap-4 items-center text-beige bg-mehroon rounded-2xl p-4">
              <NavLink to={"/admin"} className={`${buttonCancleStyle}`}>
                Cancel
              </NavLink>

              <button
                type="submit"
                className={`flex items-center justify-center gap-2 rounded-xl bg-beige px-4 py-2.5 text-sm font-semibold text-mehroon`}
                onClick={handleSubmit}
              >
                <PackagePlus size={19} />
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin_Add_Product;
