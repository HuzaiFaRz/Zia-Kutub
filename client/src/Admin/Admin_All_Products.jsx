import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../api/axios";
import Loading from "../Components/Loading";
import { FileCheck, ShieldAlert, SquarePen, Trash } from "lucide-react";
import { AuthUseContext } from "../Contexts/Auth_Context_Provider";
import { toast } from "react-toastify";

const Admin_All_Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { categories } = AuthUseContext();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await api.get("/products/get");
        setProducts(() => [...response.data.products]);
        setLoading(false);
        toast(response.data.message);
      } catch (error) {
        setLoading(false);
        console.error(error.message);
        toast(error.message);
      }
    })();
  }, []);

  const deleteProduct = (id) => {
    console.log(id);
  };

  if (loading) return <Loading />;

  return (
    <section className="w-full h-full bg-mehroon mt-5">
      <div className="w-full p-4 items-center text-center justify-center">
        <h1 className="text-4xl mb-2 text-beige font-cinzel-bold">
          All Products
        </h1>
        <p className="text-sm text-beige/80 font-lato-regular">
          Manage your Islamic lifestyle store inventory, cap models, and prayer
          mat variants.
        </p>
      </div>

      <div className="actionbar w-full p-3">
        <input type="search" placeholder="search Product" />
        {/* <button className="bg-beige text-mehroon" onClick={getss}>
          get
        </button> */}
      </div>
      <div className="w-full h-full bg-beige flex flex-wrap justify-evenly items-center gap-20 p-5">
        {products.length === 0 ? (
          <h1 className="font-cinzel-bold text-4xl text-dark w-full text-center">
            No Products Found
          </h1>
        ) : (
          products?.map((elem, ind) => {
            const {
              _id,
              title,
              slug,
              description,
              category,
              brand,
              isAvailable,
              specifications,
              variants,
              createdAt,
              updatedAt,
            } = elem;

            const createdAtConvert = new Date(createdAt).toLocaleString(
              "en-US",
              {
                dateStyle: "medium",
                timeStyle: "short",
              },
            );

            const updateAtConvert = new Date(updatedAt).toLocaleString(
              "en-US",
              {
                dateStyle: "medium",
                timeStyle: "short",
              },
            );

            // const { key, value } = specifications;
            // const { color, sizes, isDefault, images } = variants;
            // const { size, price, stock } = sizes;

            const defaultVariant = variants.find((e) => e.isDefault);
            const whichCategory = categories.find((e) => e._id === category);

            return (
              <div
                className="w-100 h-full min-h-[1000px] bg-beige shadow-2xl p-3 flex flex-col justify-center items-center gap-4 cursor-pointer border-3 border-dashed rounded-br-4xl"
                key={ind}
                id={`${_id}__$$${slug}`}
              >
                <span
                  className={`bg-white self-end text-sm py-1 px-4 rounded-xl flex items-center justify-center gap-2 ${isAvailable ? "text-green-500" : "text-red-400"}`}
                >
                  {isAvailable ? "Available" : "Not Available"}
                  {isAvailable ? (
                    <FileCheck size="15" />
                  ) : (
                    <ShieldAlert size="15" />
                  )}
                </span>

                <div className="overflow-hidden">
                  <img
                    src={defaultVariant.images[0].url}
                    alt={`${slug}_${defaultVariant.images[0].url}`}
                    className="w-full object-cover transition hover:scale-105 duration-500"
                  />
                </div>

                <div className="w-full flex flex-col items-center gap-1 font-lato-regular">
                  <div className="flex justify-between w-full items-center">
                    <span
                      className="text-sm text-mehroon/80 font-playfair-regular"
                      id={whichCategory.slug}
                    >
                      {whichCategory.name}
                    </span>
                    <span className="text-xs text-brown/80">{brand}</span>
                  </div>

                  <div>
                    <h1 className="text-lg font-cinzel-bold">{title}</h1>
                    <p className="text-sm font-lato-regular text-brown mt-3">
                      {description}
                    </p>
                  </div>
                </div>

                <div className="w-full flex flex-col">
                  <h1 className="font-playfair-bold mb-2">
                    Product Specification:
                  </h1>
                  {specifications.map((elem, ind) => {
                    const { key, value } = elem;
                    return (
                      <div
                        key={ind}
                        className="flex items-baseline w-full gap-3"
                      >
                        <span className="text-[15px] font-lato-regular shrink-0">
                          {key}
                        </span>

                        {/* Responsive dotted/dashed line */}
                        <span className="flex-1 border-b border-dashed border-brown/40 min-w-5 relative -top-1" />

                        {/* Value */}
                        <span className="text-sm font-lato-light text-right shrink-0 max-w-[45%] wrap-break-word">
                          {value}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="w-full flex flex-col">
                  <h1 className="font-playfair-bold mb-2">Other Variants:</h1>
                  {variants.map((elem, ind) => {
                    const { color, sizes } = elem;

                    return (
                      <div
                        key={ind}
                        className="w-full py-3 border-b border-brown/20"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-lato-regular">
                            Color:
                          </span>
                          <span className="text-sm font-lato-light">
                            {color}
                          </span>
                        </div>

                        {sizes.map((item, sizeInd) => {
                          const { size, price, stock } = item;

                          return (
                            <div
                              key={sizeInd}
                              className="flex items-center gap-2 text-sm"
                            >
                              <span>{size}</span>

                              <span className="flex-1 border-b border-dotted border-brown/30" />

                              <span>Rs. {price}</span>
                              <span className="text-xs">({stock})</span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                <div className="w-full flex justify-between items-center">
                  <span className="text-2xl font-cinzel-bold">
                    Rs. {defaultVariant.sizes[0].price} PKR
                  </span>
                  <span
                    className={`self-end text-sm rounded-xl mt-3 ${defaultVariant.sizes[0].stock > 0 ? "text-mehroon" : "text-red-400"}`}
                  >
                    {defaultVariant.sizes[0].stock > 0
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>
                </div>

                <div className="w-full flex flex-wrap gap-5 justify-evenly items-center">
                  <NavLink
                    to={`/admin/product/edit/${_id}`}
                    className="px-4 py-2 rounded bg-dark text-green-500 border border-red-900/40 text-xs tracking-wider uppercase flex items-center justify-center gap-2"
                  >
                    <SquarePen className="w-4 h-4" />
                    <span>Edit Product</span>
                  </NavLink>
                  <button
                    onClick={() => deleteProduct(_id)}
                    className="px-4 py-2 rounded bg-dark text-red-500 border border-red-900/40 text-xs tracking-wider uppercase flex items-center justify-center gap-2"
                  >
                    <Trash className="w-4 h-4" />
                    <span>Delete Product</span>
                  </button>
                </div>

                <div className="flex flex-wrap w-full items-start gap-1 text-sm text-mehroon/80">
                  <div>
                    <span className="font-bold">Create At:</span>
                    <span className="pl-2">{createdAtConvert}</span>
                  </div>
                  <div>
                    <span className="font-bold">Last Update:</span>

                    <span className="pl-2">
                      {createdAt === updatedAt
                        ? "Not Update Yet."
                        : updateAtConvert}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Admin_All_Products;
