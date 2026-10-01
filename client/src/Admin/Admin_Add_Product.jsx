import { useState } from "react";
import { Listbox } from "@headlessui/react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ImagePlus,
  PackagePlus,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";
import Loading from "../Components/Loading";

const categories = [
  {
    _id: "66f0a1b2c3d4e5f678901234",
    name: "Quran Kareem",
    slug: "quran-kareem",
  },
  { _id: "66f0a1b2c3d4e5f678901235", name: "Islamic Books", slug: "books" },
  { _id: "66f0a1b2c3d4e5f678901236", name: "Prayer Mat", slug: "prayer-mat" },
  { _id: "66f0a1b2c3d4e5f678901237", name: "Koofi / Topi", slug: "koofi" },
  {
    _id: "66f0a1b2c3d4e5f678901238",
    name: "Fragrance Oil",
    slug: "fragrance-oil",
  },
  { _id: "66f0a1b2c3d4e5f678901239", name: "Accessories", slug: "accessories" },
];

const Admin_Add_Product = () => {
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    title: "",
    description: "",
    slug: "",
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
        sizes: [
          {
            size: "",
            price: "",
            stock: "",
          },
        ],
        isDefault: true,
        images: [],
      },
    ],
  });

  const generateSlug = (title) => {
    if (title) {
      return title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
    }
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTittleSlug = (e) => {
    const { value } = e.target;
    setProduct((prev) => ({
      ...prev,
      title: value,
      slug: generateSlug(value),
    }));
  };

  const handleCategoryChange = (category) => {
    setProduct((prev) => ({
      ...prev,
      category: category,
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
          sizes: [
            {
              size: "",
              price: "",
              stock: "",
            },
          ],
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

  const addSizesInVariant = (variantIndex) => {
    if (product.variants[variantIndex].sizes.length >= 5) return;
    setProduct((prev) => {
      const variants = [...prev.variants];

      variants[variantIndex] = {
        ...variants[variantIndex],
        sizes: [
          ...variants[variantIndex].sizes,
          {
            size: "",
            price: "",
            stock: "",
          },
        ],
      };

      return {
        ...prev,
        variants,
      };
    });
  };

  const variantSizeHandler = (variantIndex, sizeIndex, e) => {
    setProduct((prev) => {
      const variants = [...prev.variants];
      const sizes = [...variants[variantIndex].sizes];

      sizes[sizeIndex] = {
        ...sizes[sizeIndex],
        size: e.target.value,
      };

      variants[variantIndex] = {
        ...variants[variantIndex],
        sizes,
      };

      return {
        ...prev,
        variants,
      };
    });
  };

  const variantPriceHandler = (variantIndex, sizeIndex, e) => {
    setProduct((prev) => {
      const variants = [...prev.variants];
      const sizes = [...variants[variantIndex].sizes];

      sizes[sizeIndex] = {
        ...sizes[sizeIndex],
        price: e.target.value,
      };

      variants[variantIndex] = {
        ...variants[variantIndex],
        sizes,
      };

      return {
        ...prev,
        variants,
      };
    });
  };

  const variantStockHandler = (variantIndex, sizeIndex, e) => {
    setProduct((prev) => {
      const variants = [...prev.variants];
      const sizes = [...variants[variantIndex].sizes];

      sizes[sizeIndex] = {
        ...sizes[sizeIndex],
        stock: e.target.value,
      };

      variants[variantIndex] = {
        ...variants[variantIndex],
        sizes,
      };

      return {
        ...prev,
        variants,
      };
    });
  };

  const removeVariantSizes = (variantIndex, sizeIndex) => {
    setProduct((prev) => {
      const variants = [...prev.variants];

      variants[variantIndex] = {
        ...variants[variantIndex],
        sizes: variants[variantIndex].sizes.filter((_, i) => i !== sizeIndex),
      };

      return {
        ...prev,
        variants,
      };
    });
  };

  const handleImages = (index, e) => {
    const files = Array.from(e.target.files);
    const MAX_SIZE = 3 * 1024 * 1024;
    if (files[0]) {
      if (!files[0].type.startsWith("image/")) {
        toast("Please Select Image");
        console.error("Not an image.");
        return;
      }
      if (files[0].size > MAX_SIZE) {
        toast("File is too large! Maximum 5MB.");
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
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      title,
      description,
      slug,
      category,
      brand,
      specifications,
      variants,
      isAvailable,
    } = product;

    if (
      !title?.trim() ||
      !description?.trim() ||
      !brand.trim() ||
      category === null ||
      category === undefined ||
      !category
    ) {
      toast("Please Fill Basic Info");
      return;
    }

    let spaceRegex = /^\s|\s$|\s{2,}/;

    if (
      spaceRegex.test(title) ||
      spaceRegex.test(description) ||
      spaceRegex.test(brand)
    ) {
      toast("No extra spaces allowed in Fields");
    }

    const specificationsChecking = specifications.find(
      (fields) => !fields.key.trim() || !fields.value.trim,
    );

    if (specificationsChecking) {
      toast("Please Fill Specification Fields");
      return;
    }

    const variantChecking = variants.find(
      (variant) =>
        !variant.color ||
        variant.images.length === 0 ||
        variant.sizes.length === 0 ||
        variant.sizes.some(
          (size) => !size.size || size.price === "" || size.stock === "",
        ),
    );
    const defaultCount = variants.filter(
      (variant) => variant.isDefault === true,
    ).length;
    const variantIsDefaultChecking = defaultCount !== 1;

    if (variantChecking || variantIsDefaultChecking) {
      toast("Please Fill Variant Fields");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("slug", slug);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("isAvailable", isAvailable);
    formData.append("specifications", JSON.stringify(specifications));

    const cleanVariants = variants.map((variant) => ({
      color: variant.color,
      sizes: variant.sizes.map((size) => ({
        size: size.size,
        price: Number(size.price),
        stock: Number(size.stock),
      })),
      isDefault: variant.isDefault,
    }));

    formData.append("variants", JSON.stringify(cleanVariants));
    variants.forEach((variant, ind) => {
      if (variant.images && variant.images.length > 0) {
        variant.images.forEach((imgObj, vidx) => {
          if (imgObj.file) {
            formData.append(
              `${slug}_${variant.color}_${ind}_${vidx}`,
              imgObj.file,
            );
          }
        });
      }
    });

    try {
      setLoading(true);
      const response = await api.post("/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast(response.data.message);
      setLoading(false);
      setProduct(product);
      console.log("Product Created:", response.data.message);
      // setTimeout(() => {
      //   navigate("/admin");
      // }, 2000);
    } catch (error) {
      setLoading(false);
      console.error("Upload error:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-beige px-4 py-6 sm:px-6 lg:px-10">
      {loading && <Loading />}

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
                    onChange={handleTittleSlug}
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
                          {product.category
                            ? categories.map(
                                (e) => e._id === product.category && e.name,
                              )
                            : "Select Category"}
                        </span>
                        <ChevronDown size={18} className="text-beige" />
                      </Listbox.Button>
                      <Listbox.Options className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-beige/80 backdrop-blur-2xl p-1 outline-none">
                        {categories.map((category) => (
                          <Listbox.Option
                            key={category._id}
                            value={category._id}
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

                <div className="flex flex-col gap-2">
                  <label className="text-lg text-beige" htmlFor="description">
                    Slug{" "}
                    <span className="text-sm text-beige/50">
                      (Auto Generated)
                    </span>
                  </label>
                  <input
                    type="text"
                    disabled
                    name="slug"
                    id="slug"
                    value={product.slug}
                    placeholder="Auto Generated"
                    className="w-full rounded-xl bg-brown/80 px-4 py-3 text-beige placeholder:text-beige/50 cursor-not-allowed"
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
                    {product.specifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSpecification(index)}
                        disabled={product.specifications.length === 1}
                        className="m-2 disabled:cursor-not-allowed disabled:opacity-40 sm:self-auto text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
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
                    Maximum 6 variants • Maximum 2 images per variant • Maximum
                    5 sizes per variant
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

                    <div className="flex flex-col gap-4 items-center mt-3 w-full">
                      {/* Color */}

                      <div className="flex w-full flex-1 flex-col gap-2">
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

                      <div className="mt-5 w-full">
                        <div className="mb-3 flex items-center justify-between">
                          <div>
                            <label className="text-sm text-beige">Sizes</label>
                            <p className="text-xs text-beige/50">
                              Add size, price and stock for this color
                            </p>
                          </div>

                          <button
                            type="button"
                            disabled={
                              product.variants[variantIndex].sizes.length >= 5
                            }
                            onClick={() => addSizesInVariant(variantIndex)}
                            className="flex items-center justify-center gap-2 rounded-xl bg-beige px-4 py-2.5 text-sm font-semibold text-mehroon disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Plus size={15} />
                            Add Size
                          </button>
                        </div>

                        <div className="flex flex-col gap-3">
                          {variant.sizes.map((sizeItem, sizeIndex) => (
                            <div
                              key={sizeIndex}
                              className="flex flex-col gap-3 rounded-xl border border-beige/10 p-3 sm:flex-row sm:items-end"
                            >
                              {/* Size */}
                              <div className="flex min-w-0 flex-1 flex-col gap-2">
                                <label className="text-xs text-beige/70">
                                  Size
                                </label>

                                <input
                                  type="text"
                                  value={sizeItem.size}
                                  onChange={(e) =>
                                    variantSizeHandler(
                                      variantIndex,
                                      sizeIndex,
                                      e,
                                    )
                                  }
                                  placeholder="e.g. S, M, L, 56, 58"
                                  className="w-full rounded-xl bg-brown/80 px-4 py-3 text-beige placeholder:text-beige/50"
                                />
                              </div>

                              {/* Price */}
                              <div className="flex min-w-0 flex-1 flex-col gap-2">
                                <label className="text-xs text-beige/70">
                                  Price
                                </label>

                                <input
                                  type="number"
                                  min="0"
                                  value={sizeItem.price}
                                  onChange={(e) =>
                                    variantPriceHandler(
                                      variantIndex,
                                      sizeIndex,
                                      e,
                                    )
                                  }
                                  placeholder="0"
                                  className="w-full rounded-xl bg-brown/80 px-4 py-3 text-beige placeholder:text-beige/50"
                                />
                              </div>

                              {/* Stock */}
                              <div className="flex min-w-0 flex-1 flex-col gap-2">
                                <label className="text-xs text-beige/70">
                                  Stock
                                </label>

                                <input
                                  type="number"
                                  min="0"
                                  value={sizeItem.stock}
                                  onChange={(e) =>
                                    variantStockHandler(
                                      variantIndex,
                                      sizeIndex,
                                      e,
                                    )
                                  }
                                  placeholder="0"
                                  className="w-full rounded-xl bg-brown/80 px-4 py-3 text-beige placeholder:text-beige/50"
                                />
                              </div>

                              {/* Remove Size */}
                              {variant.sizes.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeVariantSizes(variantIndex, sizeIndex)
                                  }
                                  className="mb-2 text-red-500"
                                >
                                  <Trash2 size={18} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
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
              <NavLink
                to={"/admin"}
                className={`flex items-center gap-3 px-4 py-2 rounded text-beige font-lato-regular text-sm bg-brown tracking-widest`}
              >
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
